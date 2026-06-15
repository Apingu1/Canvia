export function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="info-block">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

export function PricingCard({
  title,
  price,
  text,
  highlighted = false
}: {
  title: string;
  price: string;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "pricing-card highlighted" : "pricing-card"}>
      <span>{title}</span>
      <strong>{price}</strong>
      <p>{text}</p>
    </article>
  );
}

export function GovernanceCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="governance-card">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}
