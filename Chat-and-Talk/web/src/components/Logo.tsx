export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Chat and Talk">
      <path d="M32 6C17 6 6 16 6 29c0 6 2.6 11.4 7 15.400L10 57l13-5.600c2.9.9 6 1.400 9 1.400 15 0 26-10 26-23S47 6 32 6z" fill="#E9B26F" />
      <path d="M30 4C15 4 4 14 4 27c0 6 2.6 11.4 7 15.400L8 55l13-5.600c2.9.9 6 1.400 9 1.400 15 0 26-10 26-23S45 4 30 4z" fill="#C58A47" />
      <circle cx="19" cy="28" r="3.600" fill="#FFF9EE" /><circle cx="30" cy="28" r="3.600" fill="#FFF9EE" /><circle cx="41" cy="28" r="3.600" fill="#FFF9EE" />
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
