"use client";
/* eslint-disable */

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";

interface GlowingEffectProps {
  blur?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  movementDuration?: number;
  borderWidth?: number;
  children?: React.ReactNode;
}

const GlowingEffect = memo(
  ({
    blur = 12,
    spread = 40,
    variant = "default",
    glow = true,
    className,
    movementDuration = 2,
    borderWidth = 1,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const angleRef = useRef(0);

    // Animate glow angle continuously
    useEffect(() => {
      const animateAngle = () => {
        const element = containerRef.current;
        if (!element) return;

        const loop = () => {
          const nextAngle = (angleRef.current + 1) % 360;
          animate(angleRef.current, nextAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              angleRef.current = value;
              element.style.setProperty("--start", `${value}`);
              element.style.setProperty("--active", "1");
            },
          });

          animationFrameRef.current = requestAnimationFrame(loop);
        };

        loop();
      };

      animateAngle();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [movementDuration]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "1",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      var(--black),
                      var(--black) calc(25% / var(--repeating-conic-gradient-times))
                    )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                     radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                     radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
                     radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                     repeating-conic-gradient(
                       from 236.84deg at 50% 50%,
                       #dd7bbb 0%,
                       #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                       #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                       #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                       #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                     )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
