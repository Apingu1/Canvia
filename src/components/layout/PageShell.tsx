import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  text,
  children
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <div className="eyebrow">
            <span /> {eyebrow}
          </div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">{children}</div>
      </section>
    </>
  );
}
