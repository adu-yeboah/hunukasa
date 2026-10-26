/* Kente diamond weave  the 48px tile from the prototype headers.
   Server-safe; pass a unique `id` when two instances share a page. */
export function KentePattern({
  color = "#F7EFDF",
  id = "kente",
  className = "opacity-10",
}: {
  color?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 flex flex-col justify-between ${className}`}>
      <svg className="h-full w-full object-cover" height="100%" width="100%"  >
        <defs>
          <pattern height="48" id={id} patternUnits="userSpaceOnUse" width="48">
            <path d="M0 24 L24 0 L48 24 L24 48 Z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M12 24 L24 12 L36 24 L24 36 Z" fill={color} />
            <circle cx="24" cy="24" fill="none" r="3" stroke={color} strokeWidth="2" />
          </pattern>
        </defs>
        <rect fill={`url(#${id})`} height="100%" width="100%" />
      </svg>
    </div>
  );
}
