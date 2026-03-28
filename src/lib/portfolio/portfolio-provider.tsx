"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { DEFAULT_PORTFOLIO_CONTENT } from "./defaults";
import { mergePortfolioContent } from "./merge";
import type { PortfolioContent } from "./types";

type PortfolioContextValue = {
  content: PortfolioContent;
  setContent: (
    next: PortfolioContent | ((prev: PortfolioContent) => PortfolioContent),
  ) => void;
  savePortfolio: () => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJsonFile: (file: File) => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
  loadError: Error | null;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const portfolioQueryKey = ["portfolio"] as const;

async function fetchPortfolio(): Promise<PortfolioContent> {
  const res = await fetch("/api/portfolio");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg =
      typeof err === "object" && err && "error" in err
        ? String((err as { error: unknown }).error)
        : res.statusText;
    throw new Error(msg || "Failed to load portfolio");
  }
  const data = await res.json();
  return mergePortfolioContent(data);
}

export function PortfolioConfigProvider({
  children,
  initialPortfolio,
  initialFetchedAt,
}: {
  children: ReactNode;
  initialPortfolio?: PortfolioContent;
  initialFetchedAt?: number;
}) {
  const queryClient = useQueryClient();

  const hasServerSeed = initialPortfolio !== undefined;
  const serverBaseline = useMemo(
    () =>
      initialPortfolio !== undefined
        ? mergePortfolioContent(initialPortfolio)
        : undefined,
    [initialPortfolio],
  );

  const query = useSuspenseQuery({
    queryKey: portfolioQueryKey,
    queryFn: fetchPortfolio,
    initialData: hasServerSeed ? serverBaseline : undefined,
    initialDataUpdatedAt: hasServerSeed
      ? (initialFetchedAt ?? Date.now())
      : undefined,
    staleTime: hasServerSeed && initialFetchedAt === 0 ? 0 : 30_000,
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

  const savePortfolio = useCallback(() => {
    const current =
      queryClient.getQueryData<PortfolioContent>(portfolioQueryKey) ??
      DEFAULT_PORTFOLIO_CONTENT;
    const promise = mutation.mutateAsync(mergePortfolioContent(current));
    toast.promise(promise, {
      loading: "Saving…",
      success: "Portfolio saved",
      error: (e) =>
        e instanceof Error ? e.message : "Failed to save portfolio",
    });
  }, [queryClient, mutation]);

  const setContent = useCallback(
    (
      next: PortfolioContent | ((prev: PortfolioContent) => PortfolioContent),
    ) => {
      queryClient.setQueryData<PortfolioContent>(portfolioQueryKey, (prev) => {
        const base: PortfolioContent = prev ?? DEFAULT_PORTFOLIO_CONTENT;
        const resolved: PortfolioContent =
          typeof next === "function"
            ? (next as (prev: PortfolioContent) => PortfolioContent)(base)
            : (next as PortfolioContent);
        return mergePortfolioContent(resolved);
      });
    },
    [queryClient],
  );

  const resetToDefaults = useCallback(() => {
    const fresh = structuredClone(DEFAULT_PORTFOLIO_CONTENT);
    queryClient.setQueryData(portfolioQueryKey, fresh);
    const promise = mutation.mutateAsync(fresh);
    toast.promise(promise, {
      loading: "Resetting…",
      success: "Restored defaults",
      error: (e) =>
        e instanceof Error ? e.message : "Failed to reset portfolio",
    });
  }, [queryClient, mutation]);

  const exportJson = useCallback(() => {
    const content =
      queryClient.getQueryData<PortfolioContent>(portfolioQueryKey) ??
      DEFAULT_PORTFOLIO_CONTENT;
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
      let parsed: unknown;
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        toast.error(
          "Invalid JSON file. Use a backup exported from this admin.",
        );
        throw new Error("Invalid JSON");
      }
      const merged = mergePortfolioContent(parsed);
      queryClient.setQueryData(portfolioQueryKey, merged);
      const promise = mutation.mutateAsync(merged);
      toast.promise(promise, {
        loading: "Importing…",
        success: "Imported and saved",
        error: (e) =>
          e instanceof Error ? e.message : "Failed to save imported data",
      });
      await promise;
    },
    [queryClient, mutation],
  );

  const content = query.data;

  const value = useMemo<PortfolioContextValue>(
    () => ({
      content,
      setContent,
      savePortfolio,
      resetToDefaults,
      exportJson,
      importJsonFile,
      isLoading: query.isFetching,
      isSaving: mutation.isPending,
      loadError: null,
    }),
    [
      content,
      setContent,
      savePortfolio,
      resetToDefaults,
      exportJson,
      importJsonFile,
      query.isFetching,
      mutation.isPending,
    ],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContent(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error(
      "usePortfolioContent must be used within PortfolioConfigProvider",
    );
  }
  return ctx;
}
