import { useEffect } from "react";

/**
 * ArtCraft-grade Momentum Smooth Scroll
 * Implements lightweight inertia-based dampening for desktop mousewheel/trackpad
 * while preserving native high-refresh touch scrolling on mobile.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Check if device is desktop with mousewheel support
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return; // Keep native touch momentum on mobile

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    let rafId = null;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    const getMaxScroll = () => {
      return document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateScroll = () => {
      // Lerp factor: 0.08 gives that silky, weighted ArtCraft momentum feel
      const diff = targetY - currentY;
      currentY += diff * 0.085;

      window.scrollTo(0, currentY);

      if (Math.abs(diff) > 0.5) {
        rafId = requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
      }
    };

    const onWheel = (e) => {
      // Allow internal scrolling on scrollable containers
      let target = e.target;
      while (target && target !== document.body && target !== document.documentElement) {
        const overflowY = window.getComputedStyle(target).overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && target.scrollHeight > target.clientHeight) {
          // If the element can still scroll, don't intercept
          const canScrollUp = e.deltaY < 0 && target.scrollTop > 0;
          const canScrollDown = e.deltaY > 0 && target.scrollTop + target.clientHeight < target.scrollHeight;
          if (canScrollUp || canScrollDown) return;
        }
        target = target.parentElement;
      }

      e.preventDefault();

      // Normalize wheel delta (normalize line/page delta modes)
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30; // lines
      if (e.deltaMode === 2) delta *= 800; // pages

      // Dampen rapid trackpad bursts
      targetY = clamp(targetY + delta, 0, getMaxScroll());

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    // Keep target in sync if user drags native scrollbar or resizes
    const onNativeScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    // Smooth scroll for anchor links (#home, #projects, etc.)
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute("href").slice(1);
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();
      const navOffset = 48; // sticky nav height
      const elTop = targetEl.getBoundingClientRect().top + window.scrollY - navOffset;

      targetY = clamp(elTop, 0, getMaxScroll());

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      document.removeEventListener("click", onAnchorClick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
