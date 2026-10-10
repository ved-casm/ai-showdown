export function StringSvg() {
  return (
    <svg className="string-svg" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
      <path d="M8 20 Q 600 150 1192 20" stroke="#161616" strokeWidth="2" fill="none" />
      <circle cx="8" cy="20" r="6" fill="#161616" />
      <circle cx="1192" cy="20" r="6" fill="#161616" />
    </svg>
  );
}

export default function Clothesline({ children }: { children: React.ReactNode }) {
  return (
    <div className="line-wrap">
      <StringSvg />
      <div className="line-grid">{children}</div>
    </div>
  );
}
