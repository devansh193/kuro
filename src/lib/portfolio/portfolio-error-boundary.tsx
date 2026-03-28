"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type State = { hasError: boolean; error: Error | null };

export class PortfolioErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2 p-6 bg-background">
          <p className="text-destructive text-center text-sm font-medium">
            Could not load portfolio
          </p>
          <p className="text-muted-foreground text-center text-xs max-w-md">
            {this.state.error.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
