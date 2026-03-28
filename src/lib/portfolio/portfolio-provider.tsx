"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { DEFAULT_PORTFOLIO_CONTENT } from "./defaults";
import { mergePortfolioContent } from "./merge";
import type { PortfolioContent } from "./types";

type PortfolioContextValue = {
  content: PortfolioContent;
  setContent: (next: PortfolioContent | ((prev: PortfolioContent) => PortfolioContent)) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJsonFile: (file: File) => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
  loadError: Error | null;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

const SAVE_DEBOUNCE_MS = 400;
export const portfolioQueryKey = ["portfolio"] as const;

async function fetchPortfolio(): Promise<PortfolioContent> {
  const res = await fetch("/api/portfolio");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = typeof err === "object" && err && "error" in err ? String((err as { error: unknown }).error) : res.statusText;
    throw new Error(msg || "Failed to load portfolio");
  }
  const data = await res.json();
  return mergePortfolioContent(data);
}

export function PortfolioConfigProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useQuery({
    queryKey: portfolioQueryKey,
    queryFn: fetchPortfolio,
    placeholderData: DEFAULT_PORTFOLIO_CONTENT,
  });

  const mutation = useMutation({
    mutationFn: async (body: PortfolioContent) => {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save");
      }
      const data = await res.json();
      return mergePortfolioContent(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(portfolioQueryKey, data);
    },
  });

  const scheduleSave = useCallback(
    (merged: PortfolioContent) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveTimer.current = null;
        mutation.mutate(merged);
      }, SAVE_DEBOUNCE_MS);
    },
    [mutation]
  );

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const setContent = useCallback(
    (next: PortfolioContent | ((prev: PortfolioContent) => PortfolioContent)) => {
      queryClient.setQueryData<PortfolioContent>(portfolioQueryKey, (prev) => {
        const base: PortfolioContent = prev ?? DEFAULT_PORTFOLIO_CONTENT;
        const resolved: PortfolioContent =
          typeof next === "function"
            ? (next as (prev: PortfolioContent) => PortfolioContent)(base)
            : (next as PortfolioContent);
        const merged = mergePortfolioContent(resolved);
        scheduleSave(merged);
        return merged;
      });
    },
    [queryClient, scheduleSave]
  );

  const resetToDefaults = useCallback(() => {
    const fresh = structuredClone(DEFAULT_PORTFOLIO_CONTENT);
    queryClient.setQueryData(portfolioQueryKey, fresh);
    mutation.mutate(fresh);
  }, [queryClient, mutation]);

  const exportJson = useCallback(() => {
    const content = queryClient.getQueryData<PortfolioContent>(portfolioQueryKey) ?? DEFAULT_PORTFOLIO_CONTENT;
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kuro-portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [queryClient]);

  const importJsonFile = useCallback(
    async (file: File) => {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const merged = mergePortfolioContent(parsed);
      queryClient.setQueryData(portfolioQueryKey, merged);
      mutation.mutate(merged);
    },
    [queryClient, mutation]
  );

  const content = query.data ?? DEFAULT_PORTFOLIO_CONTENT;

  const value = useMemo<PortfolioContextValue>(
    () => ({
      content,
      setContent,
      resetToDefaults,
      exportJson,
      importJsonFile,
      isLoading: query.isLoading,
      isSaving: mutation.isPending,
      loadError: query.error instanceof Error ? query.error : null,
    }),
    [
      content,
      setContent,
      resetToDefaults,
      exportJson,
      importJsonFile,
      query.isLoading,
      query.error,
      mutation.isPending,
    ]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolioContent(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolioContent must be used within PortfolioConfigProvider");
  }
  return ctx;
}
