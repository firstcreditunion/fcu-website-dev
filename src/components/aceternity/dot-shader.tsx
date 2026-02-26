"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export function DotDistortionShaderDemo() {
  return (
    <div className="relative h-screen w-full overflow-hidden rounded-lg">
      <DotDistortionShader
        dotGap={14}
        dotSize={1}
        mouseRadius={100}
        distortionStrength={1.2}
        returnSpeed={0.06}
        className="absolute inset-0"
      />
      <div className="relative z-10 mx-auto flex h-full flex-col items-start justify-center px-4">
        <div className="relative z-10 mx-auto flex h-full max-w-2xl flex-col items-start justify-center px-8">
          <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
            New components and templates every month
          </p>
          <h1 className="mb-6 text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            Build your next project in minutes, not hours.
          </h1>
          <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-300">
            We are a team of developers who are passionate about creating web
            apps that make you feel like you&apos;re in the future.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
              Get started →
            </button>
            <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
              <span className="mr-2">G</span> Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DotDistortionShaderProps {
  /** CSS class name for the container */
  className?: string;
  /** Gap between dots in pixels */
  dotGap?: number;
  /** Base dot size in pixels */
  dotSize?: number;
  /** Base color of dots (CSS color string) */
  dotColor?: string;
  /** Glow color for bright dots */
  glowColor?: string;
  /** Background color/gradient */
  backgroundColor?: string;
  /** Mouse influence radius in pixels */
  mouseRadius?: number;
  /** Distortion strength (0-1) */
  distortionStrength?: number;
  /** Animation speed for breathing effect */
  breathingSpeed?: number;
  /** Enable/disable mouse interaction */
  enableMouseInteraction?: boolean;
  /** Opacity of the dot grid */
  opacity?: number;
  /** How quickly dots return to original position (0-1) */
  returnSpeed?: number;
}

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  brightness: number;
  phase: number;
  breathingSpeed: number;
  glowIntensity: number;
  glowTarget: number;
  glowSpeed: number;
  nextGlowTime: number;
}

export const DotDistortionShader: React.FC<DotDistortionShaderProps> = ({
  className,
  dotGap = 16,
  dotSize = 1,
  dotColor = "var(--color-sky-700)",
  glowColor = "var(--color-sky-700)",
  // backgroundColor = "linear-gradient(to bottom, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
  backgroundColor,
  mouseRadius = 100,
  distortionStrength = 1,
  breathingSpeed = 1,
  enableMouseInteraction = true,
  opacity = 1,
  returnSpeed = 0.08,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const initDots = useCallback(
    (width: number, height: number) => {
      const dots: Dot[] = [];
      const cols = Math.ceil(width / dotGap) + 2;
      const rows = Math.ceil(height / dotGap) + 2;
      const offsetX = (width % dotGap) / 2;
      const offsetY = (height % dotGap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotGap + offsetX;
          const y = j * dotGap + offsetY;

          // Create organic brightness variation using noise-like function
          const noiseVal =
            Math.sin(i * 0.3 + j * 0.2) * 0.3 +
            Math.sin(i * 0.7 - j * 0.5) * 0.2 +
            Math.sin((i + j) * 0.4) * 0.2 +
            Math.random() * 0.3;

          const brightness = Math.max(0.1, Math.min(1, 0.3 + noiseVal));

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            brightness,
            phase: Math.random() * Math.PI * 2,
            breathingSpeed: 0.5 + Math.random() * 0.5,
            // Random glow state - stagger initial times so dots don't all glow at once
            glowIntensity: 0,
            glowTarget: 0,
            glowSpeed: 0.002 + Math.random() * 0.003, // Very slow glow speed
            nextGlowTime: Math.random() * 3, // Shorter stagger so more dots glow sooner
          });
        }
      }
      return dots;
    },
    [dotGap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resolve color if it's a CSS variable
    const resolveColor = (color: string) => {
      if (color.startsWith("var(")) {
        const varName = color.match(/var\(([^)]+)\)/)?.[1];
        if (varName) {
          return getComputedStyle(container).getPropertyValue(varName).trim();
        }
      }
      return color;
    };

    let stopped = false;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    // Cache the resolved color
    let resolvedDotColor = resolveColor(dotColor);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${Math.floor(width)}px`;
      canvas.style.height = `${Math.floor(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = initDots(width, height);
      // Re-resolve color on resize in case styles changed
      resolvedDotColor = resolveColor(dotColor);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    let isFirstMouseEntry = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Skip velocity calculation on first entry to prevent jump
        if (isFirstMouseEntry || mouseRef.current.x < 0) {
          mouseRef.current = { x, y };
          prevMouseRef.current = { x, y };
          mouseVelocityRef.current = { x: 0, y: 0 };
          isFirstMouseEntry = false;
        } else {
          prevMouseRef.current = { ...mouseRef.current };
          mouseRef.current = { x, y };

          // Calculate mouse velocity
          mouseVelocityRef.current = {
            x: mouseRef.current.x - prevMouseRef.current.x,
            y: mouseRef.current.y - prevMouseRef.current.y,
          };
        }
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
        mouseVelocityRef.current = { x: 0, y: 0 };
      }
    };

    // Use window-level mouse tracking to work even when content is above canvas
    window.addEventListener("mousemove", handleMouseMove);

    // Handle visibility change to prevent jump when returning to tab
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabVisible = false;
      } else {
        isTabVisible = true;
        // Reset timestamp to prevent large dt jump
        timeRef.current = 0;
        // Reset mouse velocity
        mouseVelocityRef.current = { x: 0, y: 0 };
        // Reset all dot velocities and snap to base position
        for (const dot of dotsRef.current) {
          dot.vx = 0;
          dot.vy = 0;
          dot.x = dot.baseX;
          dot.y = dot.baseY;
          // Reset glow state to avoid jarring transitions
          dot.glowIntensity = 0;
          dot.glowTarget = 0;
          dot.nextGlowTime = Math.random() * 2; // Stagger new glow times
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const draw = (timestamp: number) => {
      if (stopped) return;

      // Skip frame if tab was just hidden or timestamp not initialized
      if (timeRef.current === 0) {
        timeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min((timestamp - timeRef.current) / 16.67, 1.5); // Normalize to ~60fps, cap at 1.5x
      timeRef.current = timestamp;
      const { width, height } = container.getBoundingClientRect();

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = opacity;

      const time = timestamp * 0.001 * breathingSpeed;
      const timeSeconds = timestamp * 0.001;
      const mouseVelMagnitude = Math.sqrt(
        mouseVelocityRef.current.x ** 2 + mouseVelocityRef.current.y ** 2,
      );

      for (const dot of dotsRef.current) {
        // Random glow logic - check if it's time for this dot to glow
        if (timeSeconds >= dot.nextGlowTime) {
          if (dot.glowTarget === 0) {
            // Start glowing - random intensity between 0.6 and 1.0
            dot.glowTarget = 0.6 + Math.random() * 0.4;
            dot.glowSpeed = 0.001 + Math.random() * 0.002; // Very slow fade in
          } else {
            // Stop glowing
            dot.glowTarget = 0;
            dot.glowSpeed = 0.0005 + Math.random() * 0.001; // Very slow fade out
            // Schedule next glow (1-4 seconds from now) - shorter interval means more dots glowing
            dot.nextGlowTime = timeSeconds + 1 + Math.random() * 3;
          }
        }

        // Smoothly interpolate glow intensity towards target
        const glowDiff = dot.glowTarget - dot.glowIntensity;
        dot.glowIntensity += glowDiff * dot.glowSpeed * dt * 60;

        // If glow reached target and target is > 0, schedule dim time
        if (dot.glowTarget > 0 && Math.abs(glowDiff) < 0.05) {
          // Hold glow for 2-5 seconds then dim (longer hold time)
          dot.nextGlowTime = timeSeconds + 2 + Math.random() * 3;
        }
        // Calculate distance from mouse
        const dx = mouseRef.current.x - dot.baseX;
        const dy = mouseRef.current.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply displacement based on mouse velocity when within range
        if (
          distance < mouseRadius &&
          enableMouseInteraction &&
          mouseVelMagnitude > 0.5
        ) {
          // Displacement follows mouse movement direction
          const falloff = 1 - distance / mouseRadius;
          const strength = falloff * falloff * distortionStrength;

          // Add velocity in the direction of mouse movement
          dot.vx += mouseVelocityRef.current.x * strength * 0.3;
          dot.vy += mouseVelocityRef.current.y * strength * 0.3;
        }

        // Apply velocity to position
        dot.x += dot.vx * dt;
        dot.y += dot.vy * dt;

        // Spring back to original position
        const springX = (dot.baseX - dot.x) * returnSpeed * dt;
        const springY = (dot.baseY - dot.y) * returnSpeed * dt;
        dot.x += springX;
        dot.y += springY;

        // Apply friction/damping to velocity
        dot.vx *= 0.92;
        dot.vy *= 0.92;

        // Also add spring force to velocity for smoother return
        dot.vx += (dot.baseX - dot.x) * 0.02 * dt;
        dot.vy += (dot.baseY - dot.y) * 0.02 * dt;

        // Calculate animated brightness with breathing effect
        const breathingOffset =
          Math.sin(time * dot.breathingSpeed + dot.phase) * 0.15;
        const animatedBrightness = Math.max(
          0.05,
          Math.min(1, dot.brightness + breathingOffset),
        );

        // Displacement-based brightness boost (dots glow when moving)
        const displacement = Math.sqrt(
          (dot.x - dot.baseX) ** 2 + (dot.y - dot.baseY) ** 2,
        );
        const brightnessBoost = Math.min(0.5, displacement * 0.05);

        // Add the random glow intensity - this is the main glow effect
        const randomGlowBoost = dot.glowIntensity * 0.7;

        const finalBrightness = Math.min(
          1,
          animatedBrightness + brightnessBoost + randomGlowBoost,
        );

        // Draw dot with glow - enhanced for random glow effect
        const hasRandomGlow = dot.glowIntensity > 0.1;
        if (finalBrightness > 0.4 || hasRandomGlow) {
          // Use random glow intensity for stronger glow effect
          const baseGlowIntensity = (finalBrightness - 0.4) / 0.6;
          const combinedGlowIntensity = Math.max(
            baseGlowIntensity,
            dot.glowIntensity,
          );
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 10 + 20 * combinedGlowIntensity; // Stronger glow (10-30 range)
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = finalBrightness * opacity;
        ctx.fillStyle = resolvedDotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Decay mouse velocity over time
      mouseVelocityRef.current.x *= 0.9;
      mouseVelocityRef.current.y *= 0.9;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ro.disconnect();
    };
  }, [
    dotGap,
    dotSize,
    dotColor,
    glowColor,
    mouseRadius,
    distortionStrength,
    breathingSpeed,
    enableMouseInteraction,
    opacity,
    returnSpeed,
    initDots,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-white",
        className,
      )}
      style={{
        background: backgroundColor,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />
    </div>
  );
};
