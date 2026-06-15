export function Outcome({
  title,
  text,
  ctaText,
  ctaHref,
  tone
}: {
  title: string;
  text: string;
  ctaText: string;
  ctaHref: string;
  tone: "positive" | "neutral" | "caution" | "urgent";
}) {
  return (
    <div className={`outcome outcome-${tone}`}>
      <h2>{title}</h2>
      <p>{text}</p>
      <a className="primary-button" href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {ctaText}
      </a>
    </div>
  );
}
