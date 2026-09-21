type OpenPageMarkProps = {
  className?: string;
  decorative?: boolean;
};

export function OpenPageMark({
  className = "h-9 w-9",
  decorative = true,
}: OpenPageMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden={decorative}
      role={decorative ? undefined : "img"}
    >
      <rect
        x="6"
        y="7"
        width="22"
        height="27"
        rx="4.5"
        fill="#FF9800"
        opacity="0.32"
      />
      <rect
        x="12"
        y="6"
        width="22"
        height="27"
        rx="4.5"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.15"
      />
      <path
        d="M18.5 14.5h9.5M18.5 19.5h9.5M18.5 24.5h6"
        stroke="#111111"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.28"
      />
    </svg>
  );
}
