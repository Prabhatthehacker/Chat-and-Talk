/** Pupper's mascot: a cute golden retriever puppy. */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Pupper, a golden retriever puppy">
      <path d="M12 34 a20 18 0 1 0 40 0 a20 18 0 1 0 -40 0 Z" fill="#E2A83E" />
      <path d="M15 21 C7 20 3.5 36 9.5 46 C13.5 51.5 18.5 45 19.5 36 C20.3 29.5 19 22.5 15 21 Z" fill="#B9772A" />
      <path d="M49 21 C57 20 60.5 36 54.5 46 C50.5 51.5 45.5 45 44.5 36 C43.7 29.5 45 22.5 49 21 Z" fill="#B9772A" />
      <path d="M32 17 C29.5 22 30 26.5 32 29 C34 26.5 34.5 22 32 17 Z" fill="#F2C468" />
      <path d="M20.5 41 a11.5 8.5 0 1 0 23 0 a11.5 8.5 0 1 0 -23 0 Z" fill="#FBE8C4" />
      <path d="M19 40.5 a3 2 0 1 0 6 0 a3 2 0 1 0 -6 0 Z" fill="#F4A08A" fillOpacity="0.55" />
      <path d="M39 40.5 a3 2 0 1 0 6 0 a3 2 0 1 0 -6 0 Z" fill="#F4A08A" fillOpacity="0.55" />
      <path d="M29.2 45.5 C29 51.5 35 51.5 34.8 45.5 Z" fill="#F0707F" />
      <path d="M32 39.8 L32 44 M32 44 C30.2 46.8 26.8 46.4 26.3 44.2 M32 44 C33.8 46.8 37.2 46.4 37.7 44.2" fill="none" stroke="#2B1B12" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.8 36.8 a4.2 3.1 0 1 0 8.4 0 a4.2 3.1 0 1 0 -8.4 0 Z" fill="#2B1B12" />
      <path d="M30.4 35.6 a1.3 0.8 0 1 0 2.6 0 a1.3 0.8 0 1 0 -2.6 0 Z" fill="#FFFFFF" fillOpacity="0.6" />
      <path d="M21.2 29.5 a3.3 3.3 0 1 0 6.6 0 a3.3 3.3 0 1 0 -6.6 0 Z" fill="#2B1B12" />
      <path d="M36.2 29.5 a3.3 3.3 0 1 0 6.6 0 a3.3 3.3 0 1 0 -6.6 0 Z" fill="#2B1B12" />
      <path d="M24.5 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z" fill="#FFFFFF" />
      <path d="M39.5 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z" fill="#FFFFFF" />
    </svg>
  );
}
export function Avatar({ name, size = 44, group }: { name: string; size?: number; group?: boolean }) {
  const parts = name.replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/).filter(Boolean);
  const text = group ? '👥' : parts.length ? (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() : '?';
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  const hue = 20 + (h % 40); // stays inside the warm range
  return <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: `hsl(${hue} 55% 82%)`, color: `hsl(${hue} 45% 28%)` }} aria-hidden>{text}</span>;
}
