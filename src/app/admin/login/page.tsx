"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configError = searchParams.get("error") === "config";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg =
          typeof err === "object" && err && "error" in err
            ? String((err as { error: unknown }).error)
            : "Login failed";
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      router.replace("/admin");
      router.refresh();
    },
  });

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-background p-6 shadow-sm">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Portfolio admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to edit content.</p>
        </div>
        {configError && (
          <p className="text-sm text-destructive">
            Server is missing AUTH_SECRET (32+ characters). Set it in the environment and restart.
          </p>
        )}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {login.isError && (
            <p className="text-sm text-destructive">
              {login.error instanceof Error ? login.error.message : "Something went wrong"}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={login.isPending}>
            {login.isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-muted/40 flex items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
