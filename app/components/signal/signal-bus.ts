import { signal } from "./signalStore";

// A single module-level rAF that owns scroll → progress/smooth/velocity for the
// WHOLE site, independent of any canvas. Every section (and the hero) READS
// signal.*; nothing else writes it. This is what lets the hero canvas pause
// (frameloop:'never') without starving the sections of scroll velocity.

let journeyHeightPx = 0;
let started = false;
let last = 0;
let prevSmooth = 0;

export function setJourneyHeight(px: number) {
  journeyHeightPx = px;
}

function readProgress(): number {
  if (typeof window === "undefined") return 0;
  const scrollable = journeyHeightPx - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

function frame(now: number) {
  const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
  last = now;

  const raw = readProgress();
  signal.progress = raw;
  // Exponential damp toward raw (frame-rate independent).
  signal.smooth += (raw - signal.smooth) * (1 - Math.exp(-dt / 0.12));
  signal.velocity = Math.abs(signal.smooth - prevSmooth) / dt;
  prevSmooth = signal.smooth;

  // lenisVelocity decays toward 0 when no scroll events arrive.
  signal.lenisVelocity *= 0.9;

  requestAnimationFrame(frame);
}

export function startSignalBus() {
  if (started || typeof window === "undefined") return;
  started = true;
  requestAnimationFrame(frame);
}
