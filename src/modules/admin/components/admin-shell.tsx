"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { usePortfolioContent } from "@/lib/portfolio/portfolio-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "../admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { exportJson, importJsonFile, resetToDefaults, loadError, isSaving } =
    usePortfolioContent();
  const fileRef = useRef<HTMLInputElement>(null);

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
    },
    onSuccess: () => {
      toast.success("Signed out");
      router.replace("/admin/login");
      router.refresh();
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Logout failed");
    },
  });

  const onImportClick = () => fileRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      await importJsonFile(file);
    } catch {
      // Invalid JSON or save failure — provider already toasts specifics
    }
  };

  const onReset = () => {
    if (
      window.confirm(
        "Reset all content to built-in defaults? This cannot be undone unless you exported JSON.",
      )
    ) {
      resetToDefaults();
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 text-foreground flex flex-col">
      <header className="border-b border-border bg-background shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Site
            </Link>
            <span className="text-sm font-semibold tracking-tight">
              Portfolio admin
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {loadError && (
              <span
                className="text-xs text-destructive max-w-[14rem] truncate"
                title={loadError.message}
              >
                Load error — check DATABASE_URL
              </span>
            )}
            {isSaving && (
              <span className="text-xs text-muted-foreground">Saving…</span>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={logout.isPending}
              onClick={() => logout.mutate()}
            >
              Log out
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={onFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onImportClick}
            >
              Import JSON
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={exportJson}
            >
              Export JSON
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onReset}
            >
              Reset defaults
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 min-h-0 max-w-6xl mx-auto w-full">
        <aside className="w-52 shrink-0 border-r border-border bg-background hidden sm:block p-4">
          <nav className="flex flex-col gap-1">
            {ADMIN_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
      </div>
      <nav className="sm:hidden border-t border-border bg-background p-2 flex flex-wrap gap-1 justify-center">
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2 py-1.5 text-xs",
              pathname === item.href
                ? "bg-muted font-medium"
                : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
