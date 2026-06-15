export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span /> {eyebrow}
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
