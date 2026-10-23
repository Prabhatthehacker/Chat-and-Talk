export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" role="img" aria-label="Pupper">
      <defs>
        <linearGradient id="pupper-ear" x1="0" x2="1">
          <stop offset="0%" stopColor="#F8D77A" />
          <stop offset="100%" stopColor="#E7B84D" />
        </linearGradient>
      </defs>

      <circle cx="110" cy="110" r="95" fill="#E5F5F5" stroke="#F5F1E5" strokeWidth="8" />

      <path d="M64 74 L79 41 Q89 34 99 42 L104 75 Z" fill="url(#pupper-ear)" stroke="#5B3728" strokeWidth="6" strokeLinejoin="round" />
      <path d="M156 74 L141 41 Q131 34 121 42 L116 75 Z" fill="url(#pupper-ear)" stroke="#5B3728" strokeWidth="6" strokeLinejoin="round" />

      <path d="M46 96 Q53 48 110 42 Q167 48 174 96 L168 144 Q156 176 110 182 Q64 176 52 144 Z" fill="#F4C95A" stroke="#5B3728" strokeWidth="6" strokeLinejoin="round" />

      <path d="M78 102 Q82 85 98 82 Q104 80 108 86 Q110 92 109 99 Q101 109 84 109 Q79 109 78 102 Z" fill="#F2D782" stroke="#5B3728" strokeWidth="4" strokeLinejoin="round" />
      <path d="M142 102 Q138 85 122 82 Q116 80 112 86 Q110 92 111 99 Q119 109 136 109 Q141 109 142 102 Z" fill="#F2D782" stroke="#5B3728" strokeWidth="4" strokeLinejoin="round" />

      <path d="M78 116 Q83 134 97 141 Q105 146 110 146 Q115 146 123 141 Q137 134 142 116 L138 128 Q127 140 110 142 Q93 140 82 128 Z" fill="#F7D290" stroke="#5B3728" strokeWidth="5" strokeLinejoin="round" />

      <ellipse cx="86" cy="104" rx="10" ry="13" fill="#2A1C17" />
      <ellipse cx="134" cy="104" rx="10" ry="13" fill="#2A1C17" />

      <circle cx="82" cy="100" r="3" fill="#F9F4ED" />
      <circle cx="138" cy="100" r="3" fill="#F9F4ED" />

      <path d="M95 133 Q110 148 125 133" fill="none" stroke="#5B3728" strokeWidth="5" strokeLinecap="round" />
      <path d="M99 121 Q110 127 121 121" fill="none" stroke="#5B3728" strokeWidth="4" strokeLinecap="round" />

      <path d="M80 150 Q110 168 140 150" fill="none" stroke="#5B3728" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 147 Q62 162 72 164 Q81 163 86 156" fill="none" stroke="#5B3728" strokeWidth="5" strokeLinecap="round" />
      <path d="M158 147 Q158 162 148 164 Q139 163 134 156" fill="none" stroke="#5B3728" strokeWidth="5" strokeLinecap="round" />

      <circle cx="80" cy="158" r="5" fill="#F4D5B3" stroke="#5B3728" strokeWidth="2" />
      <circle cx="140" cy="158" r="5" fill="#F4D5B3" stroke="#5B3728" strokeWidth="2" />

      <path d="M62 80 Q46 85 44 98 Q46 112 58 111" fill="none" stroke="#5B3728" strokeWidth="6" strokeLinecap="round" />
      <path d="M158 80 Q174 85 176 98 Q174 112 162 111" fill="none" stroke="#5B3728" strokeWidth="6" strokeLinecap="round" />

      <circle cx="110" cy="154" r="8" fill="#D57552" stroke="#5B3728" strokeWidth="4" />
      <path d="M104 154 L116 154" stroke="#5B3728" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 147 L110 161" stroke="#5B3728" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Avatar({ name, size = 44, group }: { name: string; size?: number; group?: boolean }) {
  const parts = name.replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/).filter(Boolean);
  const text = group ? '👥' : parts.length ? (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() : '?';
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  const hue = 20 + (h % 40);
  return <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: `hsl(${hue} 55% 82%)`, color: `hsl(${hue} 45% 28%)` }} aria-hidden>{text}</span>;
}
