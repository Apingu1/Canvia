import { pathwaySteps } from "../../data/pathway";

export function PathwaySteps({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "pathway compact" : "pathway"}>
      {pathwaySteps.map((step) => (
        <article className="pathway-step" key={step.number}>
          <span>{step.number}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
