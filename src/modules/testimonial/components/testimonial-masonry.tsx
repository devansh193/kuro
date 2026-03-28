"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export type TestimonialMasonryItem = {
  id: string;
  authorName: string;
  imageSrc?: string;
  testimonialText?: string;
  designation?: string;
};

function estimateHeightPx(text: string | undefined): number {
  const len = (text ?? "").length;
  return 160 + Math.min(480, Math.ceil(len / 55) * 22);
}

function distributeShortestColumn<
  T extends { id: string; testimonialText?: string },
>(
  items: T[],
  columnCount: number,
  heights: Record<string, number>,
  gapPx: number,
): T[][] {
  const cols: T[][] = Array.from({ length: columnCount }, () => []);
  const colHeights = Array(columnCount).fill(0) as number[];
  for (const item of items) {
    const h = heights[item.id] ?? estimateHeightPx(item.testimonialText);
    let best = 0;
    for (let c = 1; c < columnCount; c++) {
      if (colHeights[c]! < colHeights[best]!) best = c;
    }
    cols[best]!.push(item);
    colHeights[best] += h + gapPx;
  }
  return cols;
}

function useColumnCount(): number {
  const [n, setN] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setN(1);
      else if (w < 1024) setN(2);
      else setN(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

type Props = {
  items: TestimonialMasonryItem[];
  renderCard: (t: TestimonialMasonryItem) => ReactNode;
};

const GAP_PX = 24;

export function TestimonialMasonry({ items, renderCard }: Props) {
  const columnCount = useColumnCount();
  const heightsRef = useRef<Record<string, number>>({});
  const [measureVersion, setMeasureVersion] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ids = new Set(items.map((i) => i.id));
    for (const k of Object.keys(heightsRef.current)) {
      if (!ids.has(k)) delete heightsRef.current[k];
    }
  }, [items]);

  const columns = useMemo(() => {
    void measureVersion;
    return distributeShortestColumn(
      items,
      columnCount,
      heightsRef.current,
      GAP_PX,
    );
  }, [items, columnCount, measureVersion]);

  const onMeasured = useCallback((id: string, height: number) => {
    if (height <= 1) return;
    const prev = heightsRef.current[id];
    if (prev !== undefined && Math.abs(prev - height) <= 2) return;
    heightsRef.current[id] = height;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setMeasureVersion((v) => v + 1);
    }, 48);
  }, []);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <div className="flex w-full items-start gap-6">
      {columns.map((col, ci) => (
        <div key={ci} className="flex min-h-0 min-w-0 flex-1 flex-col gap-6">
          {col.map((t) => (
            <MeasuredWrap key={t.id} id={t.id} onMeasured={onMeasured}>
              {renderCard(t)}
            </MeasuredWrap>
          ))}
        </div>
      ))}
    </div>
  );
}

function MeasuredWrap({
  id,
  onMeasured,
  children,
}: {
  id: string;
  onMeasured: (id: string, h: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = el.getBoundingClientRect().height;
      onMeasured(id, h);
    });
    ro.observe(el);
    queueMicrotask(() => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) onMeasured(id, h);
    });
    return () => ro.disconnect();
  }, [id, onMeasured]);

  return (
    <div ref={ref} className="min-w-0 w-full max-w-full">
      {children}
    </div>
  );
}
