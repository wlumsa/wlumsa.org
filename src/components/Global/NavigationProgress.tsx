"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type ProgressState = "idle" | "loading" | "finishing";

const MINIMUM_VISIBLE_MS = 320;
const FINISH_DURATION_MS = 180;
const SAFETY_TIMEOUT_MS = 10_000;

function isInternalNavigation(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }

  const target = event.target;
  if (!(target instanceof Element)) return false;

  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (
    !anchor ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return false;
  }

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin) return false;

  const current = new URL(window.location.href);
  return !(
    destination.pathname === current.pathname &&
    destination.search === current.search
  );
}

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progressState, setProgressState] = useState<ProgressState>("idle");
  const stateRef = useRef<ProgressState>("idle");
  const startedAtRef = useRef(0);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialRouteRef = useRef(true);

  const updateState = useCallback((nextState: ProgressState) => {
    stateRef.current = nextState;
    setProgressState(nextState);
  }, []);

  const clearTimers = useCallback(() => {
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    finishTimerRef.current = null;
    safetyTimerRef.current = null;
  }, []);

  const start = useCallback(() => {
    clearTimers();
    startedAtRef.current = performance.now();
    updateState("loading");

    safetyTimerRef.current = setTimeout(() => {
      updateState("idle");
    }, SAFETY_TIMEOUT_MS);
  }, [clearTimers, updateState]);

  const finish = useCallback(() => {
    if (stateRef.current !== "loading") return;

    const elapsed = performance.now() - startedAtRef.current;
    const remaining = Math.max(MINIMUM_VISIBLE_MS - elapsed, 0);

    finishTimerRef.current = setTimeout(() => {
      updateState("finishing");
      finishTimerRef.current = setTimeout(() => {
        clearTimers();
        updateState("idle");
      }, FINISH_DURATION_MS);
    }, remaining);
  }, [clearTimers, updateState]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isInternalNavigation(event)) start();
    };
    const handleHistoryNavigation = () => start();

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handleHistoryNavigation);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handleHistoryNavigation);
    };
  }, [start]);

  useEffect(() => {
    if (isInitialRouteRef.current) {
      isInitialRouteRef.current = false;
      return;
    }

    finish();
  }, [finish, pathname, searchParams]);

  useEffect(() => clearTimers, [clearTimers]);

  if (progressState === "idle") return null;

  return (
    <div
      className="navigation-progress"
      data-state={progressState}
      role="progressbar"
      aria-label="Loading the next page"
    >
      <span className="navigation-progress__bar" />
    </div>
  );
}
