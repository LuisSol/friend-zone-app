import { SvgComponentProps } from "@/types/common";

export default function HomeIcon({
  className = "",
  color,
  size = 16,
}: SvgComponentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={color ? { color: color } : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10.182V20.5C3 21.328 3.672 22 4.5 22h15c.828 0 1.5-.672 1.5-1.5V10.182L12 2 3 10.182z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22v-6h4v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
