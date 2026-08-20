import type { SVGProps } from "react";

/** Animated precision magnifier with a soft pulsing lens glow. */
export function AnimatedSearchIcon({
  className,
  strokeWidth = 2,
  active = false,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${active ? "search-anim" : ""} ${className ?? ""}`}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="10.75"
        cy="10.75"
        r="4.5"
        fill="currentColor"
        className="glow"
        opacity="0.35"
      />
      <g className="lens">
        <circle
          cx="10.75"
          cy="10.75"
          r="6.75"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.5 8.5c.6-1 1.6-1.7 2.7-1.9"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.7}
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
      <path
        d="M20.5 20.5l-4.9-4.9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
