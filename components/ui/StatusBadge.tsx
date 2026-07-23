interface StatusBadgeProps {
  label: string;
  className: string;
}

export function StatusBadge({
  label,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}