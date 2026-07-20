"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "problem", numeral: "I", label: "Problem" },
  { id: "turn", numeral: "II", label: "Turn" },
  { id: "features", numeral: "III", label: "Features" },
  { id: "founder", numeral: "IV", label: "Founder" },
  { id: "begin", numeral: "V", label: "Begin" },
];

/**
 * A quiet table of contents, not a SaaS nav bar. Stays out of the way
 * entirely during the Hero's invocation, then fades in once the reader
 * has moved past it — one line of roman numerals, not a menu.
 */
export default function ChapterNav() {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  // Show/hide based on how much of the Hero is still in view.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio < 0.4),
      { threshold: [0, 0.4] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Scrollspy: whichever chapter crosses the vertical center of the
  // viewport is "active".
  useEffect(() => {
    const ids = ["top", ...CHAPTERS.map((c) => c.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className={`chapternav${visible ? "" : " is-hidden"}`}
    >
      <a href="#top" className="chapternav-brand">
        Divinity
      </a>
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={`chapternav-link${activeId === c.id ? " is-active" : ""}`}
          aria-current={activeId === c.id ? "true" : undefined}
        >
          {c.numeral}. {c.label}
        </a>
      ))}
    </nav>
  );
}
