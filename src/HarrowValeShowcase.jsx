import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Harrow & Vale — Securities Law (Scale)
 * Visual-only showcase page (no backend). Single component, minimal deps.
 * Uses your global style tokens (type scale, colors, cards) from App.jsx.
 */

export default function HarrowValeShowcase() {
  const [page, setPage] = useState("home"); // "home" | "services" | "service-mar" | "cases" | "pricing" | "about" | "contact"

  return (
    <div className="min-h-screen bg-[var(--clr-neutral)] text-[var(--clr-secondary)]">
      {/* Local cosmetic helpers, reusing your variables & 8pt system */}
      <style>{`
        .hv-container { max-width: var(--container); margin: 0 auto; padding: 0 1.5rem; }
        .hv-hero {
          position: relative;
          overflow: clip;
        }
        .hv-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--clr-accent); opacity: .85; }
        .hv-frame { position: relative; border: 1px solid var(--clr-subtle); border-radius: 12px; overflow: hidden; }
        .hv-art { position: absolute; inset: 0; background:
          radial-gradient(60% 60% at 0% 0%, rgba(59,130,246,0.12), transparent 60%),
          radial-gradient(50% 50% at 100% 100%, rgba(15,23,42,0.10), transparent 55%),
          linear-gradient(0deg, #fff, #fff);
        }
        .hv-badge { display:inline-flex; align-items:center; gap:.5rem; padding:.25rem .625rem; border-radius:999px; border:1px solid var(--clr-subtle); background:#fff; }
        .hv-link { text-decoration: underline; text-underline-offset: 3px; }
        .hv-muted { color: #64748B; }
        .hv-list li { display:flex; gap:.5rem; align-items:flex-start; }
        .hv-list li svg { flex: 0 0 auto; margin-top: .15rem; }
        .hv-cta { background: var(--clr-accent); color: #fff; }
        .hv-cta:hover { background: var(--clr-accent-hover); }
        .hv-nav a { opacity:.85; }
        .hv-nav a[aria-current="page"] { opacity:1; }
      `}</style>

      {/* Top bar */}
      <header className="bg-white/70 backdrop-blur border-b border-[var(--clr-subtle)] sticky top-0 z-40">
        <div className="hv-container py-3 flex items-center justify-between">
          <div className="ts-h5 font-semibold">Harrow &amp; Vale</div>
          <nav className="hidden md:flex hv-nav items-center gap-6 ts-h6">
            {[
              ["Home", "home"],
              ["Services", "services"],
              ["Cases", "cases"],
              ["Pricing", "pricing"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, key]) => (
              <a
                key={key}
                href="#"
                aria-current={page === key ? "page" : undefined}
                onClick={(e)=>{e.preventDefault(); setPage(key);}}
                className="hover:opacity-80"
              >
                {label}
              </a>
            ))}
            <button
              onClick={()=>setPage("contact")}
              className="hv-cta rounded-full px-4 py-2 inline-flex items-center gap-2"
            >
              Book consultation <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Page switch */}
      {page === "home" && <Home onPrimary={()=>setPage("contact")} onGoServices={()=>setPage("services")} />}
      {page === "services" && <Services onMAR={()=>setPage("service-mar")} />}
      {page === "service-mar" && <ServiceMAR onPrimary={()=>setPage("contact")} />}
      {page === "cases" && <Cases onPrimary={()=>setPage("contact")} />}
      {page === "pricing" && <Pricing onPrimary={()=>setPage("contact")} />}
      {page === "about" && <About onPrimary={()=>setPage("contact")} />}
      {page === "contact" && <Contact onPrimary={()=>setPage("contact")} />}

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--clr-subtle)] mt-12">
        <div className="hv-container py-8 ts-h6 hv-muted">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Harrow &amp; Vale — Securities Law</div>
            <div className="space-x-4">
              <span>Information here is general and not legal advice.</span>
              <a href="#" className="hv-link" onClick={(e)=>e.preventDefault()}>Privacy</a>
              <a href="#" className="hv-link" onClick={(e)=>e.preventDefault()}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Home({ onPrimary, onGoServices }) {
  return (
    <>
      <section className="hv-hero">
        <div className="hv-container pt-12 pb-10 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h1 className="ts-h1 font-semibold mb-3">
                Securities counsel that <span className="text-[var(--clr-accent)]">moves at deal speed.</span>
              </h1>
              <p className="ts-h5 hv-muted max-w-2xl">
                Prospectus, disclosure, and listings—delivered with partner accountability and timelines you can bank on.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <button onClick={onPrimary} className="hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
                  Book consultation <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={onGoServices} className="ts-h6 inline-flex items-center gap-2 hover:opacity-80">
                  View services <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Proof bar */}
              <div className="flex flex-wrap items-center gap-4 mt-6 hv-muted ts-h6">
                {[
                  "214+ filings reviewed",
                  "98.6% on-time delivery",
                  "EU/EEA + UK coverage",
                  "Partner-led review",
                ].map((t) => (
                  <span key={t} className="hv-badge">
                    <span className="hv-dot" /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              {/* 2:1 visual mock frame */}
              <div className="hv-frame ar-2-1">
                <div className="hv-art" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="bg-white/90 backdrop-blur rounded-lg border border-[var(--clr-subtle)] p-4">
                    <div className="ts-h6 font-semibold">What we do</div>
                    <ul className="mt-2 hv-list ts-h6 hv-muted space-y-1.5">
                      <li><Check className="w-4 h-4 text-[var(--clr-accent)]" /> Offerings &amp; Prospectus</li>
                      <li><Check className="w-4 h-4 text-[var(--clr-accent)]" /> Ongoing Disclosure &amp; MAR</li>
                      <li><Check className="w-4 h-4 text-[var(--clr-accent)]" /> Listing &amp; Governance</li>
                      <li><Check className="w-4 h-4 text-[var(--clr-accent)]" /> Fund Formation &amp; AIFMD</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="ts-h6 hv-muted mt-2 text-right">Editorial mock • 2:1</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="py-10 lg:py-20 bg-white border-y border-[var(--clr-subtle)]">
        <div className="hv-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="ts-h2 font-semibold">Services</h2>
            <span className="ts-h6 hv-muted">Scope that clarifies decisions.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Offerings & Prospectus", "Offering docs, circulars, regulator prep."],
              ["Ongoing Disclosure & MAR", "Calendar, drafting, approvals, training."],
              ["Listing & Governance", "Listing prep, policies, board cadence."],
              ["Fund Formation & AIFMD", "Structures, filings, cross-border rules."],
            ].map(([title, text]) => (
              <div key={title} className="card p-5">
                <div className="ts-h5 font-semibold">{title}</div>
                <p className="ts-h6 hv-muted mt-1.5">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case teaser */}
      <section className="py-10 lg:py-20">
        <div className="hv-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="hv-frame ar-2-1">
                <div className="hv-art" />
                <div className="absolute inset-0 p-6 flex items-end">
                  <div className="bg-white/90 backdrop-blur rounded-lg border border-[var(--clr-subtle)] p-4">
                    <div className="ts-h6 font-semibold">Cross-border offering</div>
                    <div className="ts-h6 hv-muted">Regulator Q&amp;A cycles reduced by <b>32%</b>. Clean response letter.</div>
                  </div>
                </div>
              </div>
              <div className="ts-h6 hv-muted mt-2">Case study mock • outcomes, not promises</div>
            </div>
            <div className="lg:col-span-5">
              <h3 className="ts-h4 font-semibold">Proof, not promises</h3>
              <p className="ts-h6 hv-muted mt-2">
                We show measurable outcomes: fewer Q&amp;A cycles, on-time rates, and process clarity. Anonymous summaries, regulator-safe.
              </p>
              <button className="mt-4 hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2" onClick={onPrimary}>
                Book consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Services({ onMAR }) {
  return (
    <section className="py-10 lg:py-20">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-3">Services</h1>
        <p className="ts-h6 hv-muted max-w-3xl">
          Clear scope. Senior review. Deadlines met without drama.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            ["Offerings & Prospectus", "Prospectus, offering circulars, regulator preparation and responses."],
            ["Ongoing Disclosure & MAR", "Disclosure calendar, drafting, approvals, training, and audit trail."],
            ["Listing & Governance", "Listing readiness, governance cadence, board materials, committee policies."],
            ["Fund Formation & AIFMD", "Structures, filings, and cross-border requirements across the EEA/UK."],
          ].map(([title, text]) => (
            <div key={title} className="card p-5">
              <div className="ts-h5 font-semibold">{title}</div>
              <p className="ts-h6 hv-muted mt-1.5">{text}</p>
              {title === "Ongoing Disclosure & MAR" && (
                <button onClick={onMAR} className="mt-3 ts-h6 hv-link">View details</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceMAR({ onPrimary }) {
  return (
    <section className="py-10 lg:py-20">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-2">Ongoing Disclosure &amp; MAR</h1>
        <p className="ts-h6 hv-muted max-w-3xl">
          Obligations don’t wait. We implement a disclosure calendar, draft and review notices, track approvals, and keep a clean audit trail.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-7">
            <div className="hv-frame ar-2-1">
              <div className="hv-art" />
              <div className="absolute inset-0 p-6 flex items-end">
                <ul className="bg-white/90 backdrop-blur rounded-lg border border-[var(--clr-subtle)] p-4 ts-h6 hv-muted space-y-1.5">
                  {[
                    "Disclosure calendar (alerts & owner)",
                    "Drafting & senior review",
                    "Regulator liaison & responses",
                    "Training & decision logs",
                  ].map((t) => (
                    <li key={t} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-[var(--clr-accent)]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ts-h6 hv-muted mt-2">Service visual • 2:1</div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="ts-h4 font-semibold">Outcomes</h3>
            <ul className="ts-h6 hv-muted mt-2 space-y-1.5">
              <li>Fewer last-minute crises</li>
              <li>Traceable approvals &amp; consistent tone</li>
              <li>Time back to focus on the deal</li>
            </ul>
            <button onClick={onPrimary} className="mt-4 hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
              Book consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cases({ onPrimary }) {
  return (
    <section className="py-10 lg:py-20">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-3">Selected work</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="hv-frame ar-2-1">
              <div className="hv-art" />
              <div className="absolute inset-0 p-6 flex items-end">
                <div className="bg-white/90 backdrop-blur rounded-lg border border-[var(--clr-subtle)] p-4">
                  <div className="ts-h6 font-semibold">Issuer A — cross-border offering</div>
                  <div className="ts-h6 hv-muted">Disclosure cycle time reduced by <b>32%</b>; clean regulator responses.</div>
                </div>
              </div>
            </div>
            <div className="ts-h6 hv-muted mt-2">Metrics-led, anonymous summaries</div>
          </div>
          <div className="lg:col-span-5">
            <div className="card p-5">
              <div className="ts-h5 font-semibold">Why this works</div>
              <p className="ts-h6 hv-muted mt-1.5">
                Outcomes build trust without over-promising. We show measurable impact and keep regulator-safe language.
              </p>
              <button onClick={onPrimary} className="mt-3 hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
                Book consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <ul className="ts-h6 hv-muted mt-4 space-y-1.5">
              <li>• Listing readiness &amp; governance</li>
              <li>• Ongoing disclosure programs</li>
              <li>• Fund structures across EEA/UK</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onPrimary }) {
  return (
    <section className="py-10 lg:py-20 bg-white border-y border-[var(--clr-subtle)]">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-3">Pricing ranges</h1>
        <p className="ts-h6 hv-muted max-w-3xl">
          Transparent ranges. Fixed scope where possible. Final quotes reflect jurisdiction, complexity, and timelines.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {[
            ["Offerings & Prospectus", "€8,000 – €24,000+"],
            ["Ongoing Disclosure (monthly)", "€2,000 – €6,000"],
            ["Listing & Governance", "€5,000 – €18,000+"],
            ["Fund Formation & AIFMD", "€12,000 – €40,000+"],
          ].map(([title, price]) => (
            <div key={title} className="card p-5">
              <div className="ts-h5 font-semibold">{title}</div>
              <div className="ts-h4 font-semibold mt-1">{price}</div>
            </div>
          ))}
        </div>
        <button onClick={onPrimary} className="mt-6 hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
          Request quote <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

function About({ onPrimary }) {
  return (
    <section className="py-10 lg:py-20">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-3">About</h1>
        <p className="ts-h6 hv-muted max-w-3xl">
          Partner-led counsel with cross-border fluency. Plain-English guidance, tight timelines, and measured outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            ["Elena Harrow", "Managing Partner — Capital Markets"],
            ["Jon Vale", "Partner — Funds & AIFMD"],
            ["Priya Raman", "Counsel — Disclosure & Governance"],
          ].map(([name, role]) => (
            <div key={name} className="card p-5">
              <div className="ts-h5 font-semibold">{name}</div>
              <div className="ts-h6 hv-muted">{role}</div>
              <ul className="mt-3 ts-h6 hv-muted space-y-1.5">
                <li>• Bar admissions EU/UK</li>
                <li>• 12–18y experience</li>
                <li>• Regulator-safe outcomes</li>
              </ul>
            </div>
          ))}
        </div>
        <button onClick={onPrimary} className="mt-6 hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
          Book consultation <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-10 lg:py-20">
      <div className="hv-container">
        <h1 className="ts-h1 font-semibold mb-3">Contact</h1>
        <p className="ts-h6 hv-muted max-w-3xl">
          Tell us your timeline and jurisdiction. We’ll triage within 2 business hours.
        </p>
        <form className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Field label="Name" placeholder="Jane Doe" />
          <Field label="Email" type="email" placeholder="you@company.com" />
          <Field label="Company" placeholder="Issuer or Fund name" />
          <Field label="Topic" placeholder="Disclosure / Prospectus / Listing / Fund" />
          <div className="md:col-span-2">
            <label className="ts-h6 block mb-1">Notes</label>
            <textarea className="w-full border border-[var(--clr-subtle)] rounded-lg p-3 bg-white" rows={5} placeholder="Deadline, jurisdictions, quick context..." />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <div className="ts-h6 hv-muted">No spam. We reply fast.</div>
            <button className="hv-cta rounded-full px-5 py-3 ts-h6 inline-flex items-center gap-2">
              Book consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, type="text", placeholder }) {
  return (
    <div>
      <label className="ts-h6 block mb-1">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full border border-[var(--clr-subtle)] rounded-lg p-3 bg-white" />
    </div>
  );
}
