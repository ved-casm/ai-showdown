import Link from "next/link";

export default function Polaroid({
  src,
  caption,
  badge,
  rotate = "-2deg",
  delay = "0s",
  placeholderFor,
  swapPath,
  href,
}: {
  src?: string;
  caption: string;
  badge?: string;
  rotate?: string;
  delay?: string;
  placeholderFor?: string; // e.g. "Gemini" - renders the waiting sticky
  swapPath?: string;       // where the file drops in, shown on the sticky
  href?: string;           // makes the whole card a link (round page)
}) {
  const style = { ["--r" as string]: rotate, ["--d" as string]: delay } as React.CSSProperties;

  if (placeholderFor) {
    const inner = (
      <figure className="polaroid placeholder" style={style} data-testid={`placeholder-${placeholderFor.toLowerCase()}`}>
        <span className="pin" aria-hidden />
        <div className="ph">
          <div className="wait-note">
            <b>waiting for upload</b>
            {placeholderFor} hasn't sent their shot yet.
            <br />
            <code>
              drop it at <span className="pinfile">{swapPath}</span> and it hangs itself right here.
            </code>
          </div>
        </div>
        <figcaption className="cap">
          {caption}
          <span className="arr" aria-hidden>↗</span>
        </figcaption>
      </figure>
    );
    return href ? <Link href={href} className="plink">{inner}</Link> : inner;
  }

  const card = (
    <figure className="polaroid" style={style}>
      <span className="pin" aria-hidden />
      <div className="ph">
        <img src={src} srcSet={`${src!.replace(".avif", "-640.avif")} 640w, ${src} 1200w`} sizes="(max-width:860px) 30vw, 380px" alt={caption} loading="lazy" />
      </div>
      <figcaption className="cap">
        {badge && <i className="badge">{badge}</i>}
        {caption}
        <span className="arr" aria-hidden>↗</span>
      </figcaption>
    </figure>
  );
  return href ? <Link href={href} className="plink">{card}</Link> : card;
}
