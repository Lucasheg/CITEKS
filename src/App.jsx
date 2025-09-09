import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ArrowRight, Shield, Zap, Rocket, LineChart, MapPin, Mail, Menu, X,
} from "lucide-react";

/**
 * CITEKS — Forest Refresh (hash routes preserved)
 * Routes: /#/, /#/why-us, /#/projects, /#/brief/:slug, /#/pay/:slug, /#/thank-you, /#/privacy, /#/tech-terms
 * Systems preserved: Netlify forms, Stripe Embedded Checkout, Thank You session summary.
 * Visuals changed: waterfall hero, forest palette, airy editorial structure.
 */

function cx(...c){ return c.filter(Boolean).join(" "); }

/* ===== Theme (tokens are in CSS variables; these are convenience refs) ===== */
const theme = {
  neutral: "var(--clr-neutral)",
  secondary: "var(--clr-secondary)",
  accent: "var(--clr-accent)",
  accentHover: "var(--clr-accent-hover)",
  subtle: "var(--clr-subtle)",
};

/* ===== Showcase & Projects (same content, new look) ===== */
const showcaseSlides = [
  {
    key: "harbor-sage",
    title: "Harbor & Sage Law — Scale",
    caption: "Editorial layout, sharp type, transparent pricing, SEO-ready practice pages.",
    src: "/showcase/harbor-sage-law.png",
  },
  {
    key: "vigor-lab-hero",
    title: "Vigor Lab — Growth",
    caption: "High-energy hero + programs grid; optimized for fast decisions.",
    src: "/showcase/vigor-lab-hero.png",
  },
  {
    key: "urban-barber",
    title: "Urban Barber — Starter",
    caption: "Warm tones, craft-led details, curated editorial structure.",
    src: "/showcase/urban-barber.png",
    fallbacks: ["/showcase/barber.png", "/showcase/showcase-barber.png", "/showcase/odd-fellow-barber.png"],
  },
  {
    key: "sentienceworks",
    title: "SentienceWorks (AI) — Growth",
    caption: "Futuristic palette, kinetic motion, psychological copywriting.",
    src: "/showcase/sentienceworks-ai.png",
  },
];

const allProjects = {
  law: {
    title: "Harbor & Sage Law (Scale)",
    blurb:
      "A full Scale build for a business law firm. Editorial layout, sharp typography, transparent pricing, and SEO-ready practice pages. Designed for trust, clarity, and conversion.",
    src: "/showcase/harbor-sage-law.png",
  },
  gym: {
    title: "Vigor Lab — Growth",
    blurb:
      "Bold, energetic, action-led. A high-energy hero and a clear programs matrix drive quick sign-ups.",
    a: "/showcase/vigor-lab-hero.png",
    b: "/showcase/vigor-lab-programs.png",
    connective:
      "Hero primes motivation; programs grid reduces friction. One primary CTA repeated consistently.",
  },
  barber: {
    title: "Urban Barber (Starter)",
    blurb:
      "A personal, editorial take with warm tones and craft details. Clean structure and a clear booking flow.",
    src: "/showcase/urban-barber.png",
    fallbacks: ["/showcase/barber.png", "/showcase/showcase-barber.png", "/showcase/odd-fellow-barber.png"],
  },
  ai: {
    title: "SentienceWorks — AI Services (Growth)",
    blurb: "Electric motion with clear copy. Futuristic yet grounded for comprehension.",
    src: "/showcase/sentienceworks-ai.png",
  },
  museum: {
    title: "Meridian Museum (Concept)",
    blurb:
      "Editorial concept blending natural textures with clean layouts. Designed to evoke mood and presence.",
    src: "/showcase/meridian-museum.png",
  },
};

/* ===== Packages (unchanged logic/content) ===== */
const packages = [
  {
    slug: "starter",
    name: "Starter",
    price: 900,
    displayPrice: "$900",
    days: 4,
    rushDays: 2,
    rushFee: 200,
    blurb: "2–3 pages, custom design. Mobile + desktop. Modern animations.",
    perfectFor: "Cafés, barbers, freelancers",
    features: [
      "2–3 custom pages",
      "Responsive + performance pass",
      "Simple lead/contact form",
      "Launch in days, not weeks",
    ],
    cta: "Start Starter",
    timelineNote: "Typical timeline: 4 days (rush 2 days for an additional $200).",
  },
  {
    slug: "growth",
    name: "Growth",
    price: 2300,
    displayPrice: "$2,300",
    days: 8,
    rushDays: 6,
    rushFee: 400,
    blurb:
      "5–7 pages, custom design + SEO. Contact/booking, Maps, integrations, content guidance.",
    perfectFor: "Dentists, gyms, restaurants, small firms",
    features: [
      "5–7 custom pages",
      "On-page SEO + schema",
      "Contact / booking form + Maps",
      "3rd-party integrations",
      "Content guidance (no full copy)",
    ],
    highlight: true,
    cta: "Grow with Growth",
    timelineNote: "Typical timeline: 8 days (rush 6 days for an additional $400).",
  },
  {
    slug: "scale",
    name: "Scale",
    price: 7000,
    displayPrice: "$7,000",
    days: 14,
    rushDays: 10,
    rushFee: 800,
    blurb:
      "10+ pages, full custom design. Strategy, advanced SEO + analytics, booking/e-com/CRM, copy support.",
    perfectFor: "Law firms, real estate, healthcare, e-commerce brands",
    features: [
      "10+ pages, full custom",
      "Strategy session + funnel mapping",
      "Advanced SEO + analytics",
      "Booking systems / e-commerce",
      "CRM integrations",
      "Copywriting support",
    ],
    cta: "Scale with Scale",
    timelineNote: "Typical timeline: 14 days (rush 10 days for an additional $800).",
  },
];

/* ===== Router ===== */
function useHashRoute(){
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const clean = (hash || "#/").replace(/^#\/?/, "");
  const [path, ...rest] = clean.split("?")[0].split("/").filter(Boolean);
  const query = Object.fromEntries(new URLSearchParams(clean.split("?")[1] || ""));
  return { path: path || "", rest, query, raw: hash };
}
function navigate(to){ window.location.hash = to.startsWith("#") ? to : `#${to}`; }

/* ===== Helpers ===== */
function encodeFormData(data){ return new URLSearchParams(data).toString(); }
function handleImgError(e, fallbacks = []) {
  const el = e.currentTarget;
  const idx = parseInt(el.dataset.fbIdx || "0", 10);
  if (idx < fallbacks.length) {
    el.src = fallbacks[idx];
    el.dataset.fbIdx = String(idx + 1);
  }
}

/* ===== App ===== */
export default function App(){
  const route = useHashRoute();

  // Defer scroll if linked from other pages
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target && (route.path === "" || route.path === "/")) {
      sessionStorage.removeItem("scrollTo");
      const el = document.getElementById(target);
      if (el) setTimeout(()=> el.scrollIntoView({ behavior: "smooth", block:"start"}), 60);
    }
  }, [route.path]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--clr-neutral)] text-[var(--clr-secondary)]">
      <Header />
      {route.path === "" ? (
        <Home />
      ) : route.path === "why-us" ? (
        <WhyUs />
      ) : route.path === "projects" ? (
        <Projects />
      ) : route.path === "brief" && route.rest[0] ? (
        <Brief slug={route.rest[0]} />
      ) : route.path === "pay" && route.rest[0] ? (
        <Pay slug={route.rest[0]} />
      ) : route.path === "thank-you" ? (
        <ThankYou />
      ) : route.path === "privacy" ? (
        <PrivacyPolicy />
      ) : route.path === "tech-terms" ? (
        <TechTerms />
      ) : (
        <NotFound />
      )}
      <Footer />
      <NetlifyHiddenForms />
    </div>
  );
}

/* ===== Header (refreshed, minimal chrome) ===== */
function Header(){
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const linkAndClose = (handler) => (e) => { handler?.(e); setOpen(false); };

  return (
    <div className="w-full bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-[var(--clr-subtle)]">
      <div className="mx-auto max-w-[var(--container)] px-6 py-2 flex items-center justify-between">
        <a href="#/" className="ts-h5 font-semibold" onClick={()=>setOpen(false)}>CITEKS</a>
        <div className="hidden md:flex items-center gap-6 justify-end flex-1 ts-h6">
          <a href="#/" className="hover:opacity-80">Home</a>
          <a href="#/why-us" className="hover:opacity-80">Why us</a>
          <a href="#/projects" className="hover:opacity-80">Projects</a>
          <a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('packages');}} className="hover:opacity-80">Packages</a>
          <a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('contact');}} className="btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2">
            <Mail className="w-4 h-4"/> Contact
          </a>
        </div>
        <button className="md:hidden p-2" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{height:0, opacity:0}}
            animate={{height:"auto", opacity:1}}
            exit={{height:0, opacity:0}}
            className="md:hidden border-t border-[var(--clr-subtle)] bg-white"
          >
            <div className="px-6 py-3 flex flex-col gap-2 ts-h6">
              <a href="#/" onClick={linkAndClose()} className="py-2">Home</a>
              <a href="#/why-us" onClick={linkAndClose()} className="py-2">Why us</a>
              <a href="#/projects" onClick={linkAndClose()} className="py-2">Projects</a>
              <a href="#/" onClick={linkAndClose((e)=>{e.preventDefault(); scrollToId('packages');})} className="py-2">Packages</a>
              <a href="#/" onClick={linkAndClose((e)=>{e.preventDefault(); scrollToId('contact');})} className="btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2 justify-center mt-2">
                <Mail className="w-4 h-4"/> Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function scrollToId(id){
  const el = document.getElementById(id);
  if (!el) { sessionStorage.setItem("scrollTo", id); navigate("/"); }
  else { el.scrollIntoView({ behavior:"smooth", block:"start" }); }
}

/* ===== Pages ===== */
function Home(){
  return (
    <>
      <Hero />
      <ShowcaseHome />
      <Approach />
      <Packages />
      <ContactSection />
    </>
  );
}

/* ===== Hero (waterfall) ===== */
function Hero(){
  return (
    <section className="hero">
      <div
        className="hero-img"
        style={{
          backgroundImage: `url('/hero/waterfall.jpg')`,
        }}
        aria-hidden="true"
      />
      <div className="hero-overlay" />
      <div className="relative mx-auto max-w-[var(--container)] px-6 py-20 lg:py-32 text-white">
        <div className="grid-12 items-center">
          <div className="lg:col-span-7 col-span-4">
            <h1 className="ts-h1 font-semibold mb-3">
              Websites that breathe—
              <span className="block text-[var(--clr-neutral)]/90">dark green calm, sharp outcomes.</span>
            </h1>
            <p className="ts-h5 text-white/85 max-w-2xl mb-6">
              Premium, fast sites with a single goal per page. Nature-dark visuals, clear structure, motion with restraint, and search-friendly under the hood.
            </p>
            <div className="flex items-center gap-4">
              <a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('packages');}}
                 className="btn-accent px-6 py-3 rounded-full inline-flex items-center gap-2 ts-h6">
                <Rocket className="w-4 h-4"/> See packages
              </a>
              <a href="#/projects" className="ts-h6 inline-flex items-center gap-2 hover:opacity-90">
                View projects <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 ts-h6">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4"/> 14-day polish guarantee</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4"/> Limited to 2 new projects this month</div>
            </div>
          </div>
          <div className="lg:col-span-5 col-span-4" />
        </div>
      </div>
    </section>
  );
}

/* ===== Home Showcase (10% smaller than container) ===== */
function ShowcaseHome(){
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIndex((i)=> (i+1)%showcaseSlides.length), 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const slide = showcaseSlides[index];

  return (
    <section id="work" className="py-10 lg:py-20 bg-white border-y border-[var(--clr-subtle)]">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="ts-h2 font-semibold">Showcase projects</h2>
          <a href="#/projects" className="ts-h6 inline-flex items-center gap-2 hover:opacity-80">
            View all <ArrowRight className="w-4 h-4"/>
          </a>
        </div>

        <div className="relative showcase-wrap">
          <div className="relative border border-[var(--clr-subtle)] rounded-xl overflow-hidden">
            <div className="img-frame ar-2-1">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide.key}
                  src={slide.src}
                  alt={slide.title}
                  initial={{ opacity: 0, scale: 0.995 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.005 }}
                  transition={{ duration: 0.45 }}
                  className="img-el"
                  style={{ objectFit: "contain", background:"#fff" }}
                  onError={(e)=>handleImgError(e, slide.fallbacks)}
                  loading="eager"
                />
              </AnimatePresence>
              <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/35 to-transparent text-white">
                <div className="ts-h6 font-semibold">{slide.title}</div>
                <div className="ts-h6 opacity-90">{slide.caption}</div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-2 rounded-full">
              {showcaseSlides.map((s, i)=>(
                <button key={s.key} onClick={()=>setIndex(i)} aria-label={`Show slide ${i+1}`}
                  className={cx("h-2.5 rounded-full transition", i===index ? "bg-[var(--clr-accent)] w-6" : "bg-slate-300 w-2.5 hover:bg-slate-400")}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Approach (new visuals, same logic) ===== */
function Approach(){
  return (
    <section id="approach" className="py-12 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6 grid-12 items-start">
        <div className="col-span-4 lg:col-span-5">
          <h2 className="ts-h2 font-semibold mb-3">Grounded in clarity</h2>
          <p className="ts-h6 text-slate-700 max-w-xl">
            Pages carry one goal, proof shows up early, and micro-interactions reward intent—not distract. We design for breathability and action.
          </p>
        </div>
        <div className="col-span-4 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-0">
          {[
            { icon: LineChart, title: "Signal over noise", text: "Focused hierarchy, clean copy, and legible contrast." },
            { icon: Shield, title: "Trust built-in", text: "Social proof, guarantees, and transparent pricing." },
            { icon: Zap, title: "Responsive feedback", text: "Motion with restraint to guide—not perform." },
            { icon: Rocket, title: "Frictions removed", text: "Mobile-first speed, sharp forms, fewer steps." },
          ].map(({icon:Icon, title, text})=>(
            <div key={title} className="card p-6">
              <Icon className="w-6 h-6 text-[var(--clr-accent)]"/>
              <div className="ts-h5 font-semibold mt-3">{title}</div>
              <p className="ts-h6 text-slate-600 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Packages (unchanged data, new tone) ===== */
function Packages(){
  return (
    <section id="packages" className="py-10 lg:py-24 bg-white border-y border-[var(--clr-subtle)]">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h2 className="ts-h2 font-semibold mb-6">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p)=>(
            <motion.div
              key={p.slug}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.5 }}
              className={cx("card p-6 flex flex-col", p.highlight && "ring-2 ring-[var(--clr-accent)]")}
            >
              <div className="flex items-baseline justify-between">
                <div className="ts-h4 font-semibold">{p.name}</div>
                <div className="ts-h3 font-semibold">{p.displayPrice}</div>
              </div>
              <div className="ts-h6 text-slate-600 mt-1">{p.blurb}</div>
              <div className="ts-h6 text-slate-500 mt-2">Perfect for: {p.perfectFor}</div>
              <div className="ts-h6 text-slate-600 mt-2">{p.timelineNote}</div>
              <ul className="mt-3 space-y-2">
                {p.features.map((f)=>(
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[var(--clr-accent)] mt-0.5"/><span className="ts-h6">{f}</span>
                  </li>
                ))}
              </ul>
              <a href={`#/brief/${p.slug}`} className="btn-accent px-5 py-2 rounded-full ts-h6 inline-flex items-center gap-2 mt-5 self-start">
                {p.cta} <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
          ))}
        </div>
        <div className="ts-h6 text-slate-500 mt-6">* 14-day polish guarantee after launch.</div>
      </div>
    </section>
  );
}

/* ===== Contact ===== */
function ContactSection(){
  return (
    <section id="contact" className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6 grid-12">
        <div className="col-span-4 lg:col-span-5">
          <h2 className="ts-h2 font-semibold">Let’s build something that pays for itself</h2>
          <p className="ts-h6 text-slate-600 mt-2">Tell us a little about your project and we’ll reply fast.</p>
          <div className="mt-6 flex items-center gap-4 text-slate-700 ts-h6"><Mail className="w-5 h-5"/> contact@citeks.net</div>
          <div className="mt-2 flex items-center gap-4 text-slate-700 ts-h6"><MapPin className="w-5 h-5"/> Langmyrvegen 22a • Europe/Oslo</div>
        </div>
        <div className="col-span-4 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ===== Projects page (same structure, refreshed styles) ===== */
function Projects(){
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h1 font-semibold mb-4">Projects</h1>

        {/* Law */}
        <Block left={
          <Frame2x1 className="project-frame">
            <img src={allProjects.law.src} alt="Harbor & Sage Law — Scale" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
          </Frame2x1>
        } right={
          <>
            <h3 className="ts-h4 font-semibold">{allProjects.law.title}</h3>
            <p className="ts-h6 text-slate-700 mt-2">{allProjects.law.blurb}</p>
          </>
        }/>

        {/* Vigor */}
        <div className="border-t border-[var(--clr-subtle)] my-8" />
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-6 items-start mb-4">
            <div className="col-span-5">
              <Frame2x1 className="project-frame">
                <img src={allProjects.gym.a} alt="Vigor Lab — Hero" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
              </Frame2x1>
            </div>
            <div className="col-span-2 self-center">
              <p className="ts-h6 text-slate-700">{allProjects.gym.connective}</p>
            </div>
            <div className="col-span-5">
              <Frame2x1 className="project-frame">
                <img src={allProjects.gym.b} alt="Vigor Lab — Programs" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
              </Frame2x1>
            </div>
          </div>
          <h3 className="ts-h4 font-semibold">{allProjects.gym.title}</h3>
          <p className="ts-h6 text-slate-700 mt-1">{allProjects.gym.blurb}</p>
        </div>
        <div className="lg:hidden">
          <Frame2x1 className="project-frame">
            <img src={allProjects.gym.a} alt="Vigor Lab — Hero" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
          </Frame2x1>
          <p className="ts-h6 text-slate-700 mt-2">{allProjects.gym.connective}</p>
          <Frame2x1 className="project-frame mt-3">
            <img src={allProjects.gym.b} alt="Vigor Lab — Programs" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
          </Frame2x1>
          <h3 className="ts-h4 font-semibold mt-4">{allProjects.gym.title}</h3>
          <p className="ts-h6 text-slate-700 mt-1">{allProjects.gym.blurb}</p>
        </div>

        {/* Barber */}
        <div className="border-t border-[var(--clr-subtle)] my-8" />
        <Block left={
          <>
            <h3 className="ts-h4 font-semibold">{allProjects.barber.title}</h3>
            <p className="ts-h6 text-slate-700 mt-2">{allProjects.barber.blurb}</p>
          </>
        } right={
          <Frame2x1 className="project-frame">
            <img
              src={allProjects.barber.src}
              alt="Urban Barber — Starter"
              className="img-el" loading="lazy"
              onError={(e)=>handleImgError(e, allProjects.barber.fallbacks)}
              style={{objectFit:"contain", background:"#fff"}}
            />
          </Frame2x1>
        }/>

        {/* AI */}
        <div className="border-t border-[var(--clr-subtle)] my-8" />
        <Center>
          <Frame2x1 className="project-frame">
            <img src={allProjects.ai.src} alt="SentienceWorks — Growth" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
          </Frame2x1>
          <h3 className="ts-h4 font-semibold mt-3">{allProjects.ai.title}</h3>
          <p className="ts-h6 text-slate-700 mt-1">{allProjects.ai.blurb}</p>
        </Center>

        {/* Museum */}
        <div className="border-t border-[var(--clr-subtle)] my-8" />
        <Center narrow>
          <Frame2x1 className="project-frame">
            <img src={allProjects.museum.src} alt="Meridian Museum — Concept" className="img-el" loading="lazy" style={{objectFit:"contain", background:"#fff"}}/>
          </Frame2x1>
          <h3 className="ts-h4 font-semibold mt-3">{allProjects.museum.title}</h3>
          <p className="ts-h6 text-slate-700 mt-1">{allProjects.museum.blurb}</p>
        </Center>
      </div>
    </section>
  );
}

function Block({left, right}){
  return (
    <div className="grid grid-cols-12 gap-6 items-start">
      <div className="col-span-12 lg:col-span-7">{right}</div>
      <div className="col-span-12 lg:col-span-5">{left}</div>
    </div>
  );
}
function Center({children, narrow}){
  return (
    <div className="grid grid-cols-12 gap-6 items-start">
      <div className="col-span-12 lg:col-span-2" />
      <div className={cx("col-span-12", narrow ? "lg:col-span-8" : "lg:col-span-8")}>{children}</div>
      <div className="col-span-12 lg:col-span-2" />
    </div>
  );
}
function Frame2x1({ children, className = "" }) {
  return (
    <div className={cx("relative border border-[var(--clr-subtle)] rounded-xl overflow-hidden img-frame ar-2-1 bg-white", className)}>
      {children}
    </div>
  );
}

/* ===== Why Us ===== */
function WhyUs(){
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h1 font-semibold mb-4">Why choose CITEKS</h1>
        <p className="ts-h6 text-slate-700 max-w-3xl">
          Calm visuals with sharp structure. We center every page on one clear action, surface proof early, and remove friction—so more people say yes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            ["Clarity beats clever", "Decisions are faster when choices are fewer, labels plain, and the next step obvious."],
            ["Trust quickly", "Proof, guarantees, and transparent pricing lower perceived risk and boost confidence."],
            ["Friction kills conversions", "We trim steps, optimize forms, and keep load times tight. The easiest path wins."],
            ["Motion with restraint", "Micro-interactions give feedback without stealing attention from the goal."],
          ].map(([title, text])=>(
            <div key={title} className="card p-6">
              <div className="ts-h4 font-semibold">{title}</div>
              <p className="ts-h6 text-slate-700 mt-2">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a href="#/" onClick={(e)=>{e.preventDefault(); sessionStorage.setItem("scrollTo","packages"); navigate("/");}}
             className="btn-accent px-6 py-3 rounded-full ts-h6 inline-flex items-center gap-2">
            See packages <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Forms (Contact + Brief) ===== */
function ContactForm(){
  const [form, setForm] = useState({
    title: "Mr", first: "", last: "", email: "", project: "", budget: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  function validate(){
    const errs = {};
    if (!form.first) errs.first = "Required";
    if (!form.last) errs.last = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.project) errs.project = "Required";
    if (!form.budget) errs.budget = "Required";
    return errs;
  }
  async function submit(e){
    e.preventDefault();
    const errs = validate(); setErrors(errs);
    if (Object.keys(errs).length) return;
    const payload = { "form-name": "contact", ...form };
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(payload),
      });
      setSent(true);
    } catch {
      alert("Submission failed. Please email contact@citeks.net");
    }
  }
  return (
    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}
      className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" name="form-name" value="contact"/>
      <input type="hidden" name="bot-field"/>
      <div>
        <label className="ts-h6 block mb-1">Title</label>
        <select value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})}
          className="w-full border border-[var(--clr-subtle)] rounded-lg p-3 focus-ring bg-white">
          {["Mr","Ms","Mx","Dr","Prof","Other"].map(o=> <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <Input label="First name" value={form.first} onChange={(v)=>setForm({...form, first:v})} error={errors.first}/>
      <Input label="Surname" value={form.last} onChange={(v)=>setForm({...form, last:v})} error={errors.last}/>
      <Input label="Email" type="email" value={form.email} onChange={(v)=>setForm({...form, email:v})} error={errors.email}/>
      <Input label="Project type" value={form.project} onChange={(v)=>setForm({...form, project:v})} error={errors.project}/>
      <Select label="Budget" value={form.budget} onChange={(v)=>setForm({...form, budget:v})} error={errors.budget}
        options={["Up to $1,000","$1,000 – $2,500","$2,500 – $7,000","$7,000+"]}/>
      <TextArea label="Message" value={form.message} onChange={(v)=>setForm({...form, message:v})} rows={5}/>
      <div className="md:col-span-2 flex items-center justify-between">
        <div className="ts-h6 text-slate-600">No spam. We reply within 24h.</div>
        <button type="submit" className="btn-accent px-6 py-3 rounded-full ts-h6 inline-flex items-center gap-2">
          <Mail className="w-4 h-4"/> Send
        </button>
      </div>
      {sent && <div className="md:col-span-2 ts-h6 text-green-700">Thanks! Your message is in. We’ll respond shortly.</div>}
    </form>
  );
}
function Input({ label, value, onChange, error, type="text"}){
  return (
    <div>
      <label className="ts-h6 block mb-1">{label}</label>
      <input value={value} type={type} onChange={(e)=>onChange(e.target.value)}
        className={cx("w-full border rounded-lg p-3 focus-ring bg-white", error ? "border-red-400":"border-[var(--clr-subtle)]")}/>
      {error && <div className="ts-h6 text-red-600 mt-1">{error}</div>}
    </div>
  );
}
function Select({ label, value, onChange, options, error }){
  return (
    <div>
      <label className="ts-h6 block mb-1">{label}</label>
      <select value={value} onChange={(e)=>onChange(e.target.value)}
        className={cx("w-full border rounded-lg p-3 focus-ring bg-white", error ? "border-red-400":"border-[var(--clr-subtle)]")}>
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {error && <div className="ts-h6 text-red-600 mt-1">{error}</div>}
    </div>
  );
}
function TextArea({ label, value, onChange, rows=4 }){
  return (
    <div className="md:col-span-2">
      <label className="ts-h6 block mb-1">{label}</label>
      <textarea rows={rows} value={value} onChange={(e)=>onChange(e.target.value)}
        className="w-full border border-[var(--clr-subtle)] rounded-lg p-3 focus-ring bg-white"/>
    </div>
  );
}

/* ===== Brief (unchanged validation + multi-file) ===== */
function Brief({ slug }){
  const pkg = packages.find(p => p.slug === slug);
  if (!pkg) return <NotFound />;

  const [rush, setRush] = useState(false);
  const total = pkg.price + (rush ? pkg.rushFee : 0);

  const [form, setForm] = useState({
    company:"", contact:"", email:"", phone:"", pages:"", goal:"", assetsNote:"",
    seo:"", integrations:"", ecommerce:"", crm:"", references:"", competitors:"", notes:"",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  function validate(){
    const e = {};
    if (!form.company) e.company="Required";
    if (!form.contact) e.contact="Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email="Enter a valid email";
    if (!form.phone) e.phone="Required";
    if (!form.pages) e.pages="Required";
    if (!form.goal) e.goal="Required";
    if (!form.assetsNote && (!files || files.length===0)) e.assetsNote="Provide a note or upload at least one asset file";
    return e;
  }
  async function submitBrief(e){
    e.preventDefault();
    const e1 = validate(); setErrors(e1);
    if (Object.keys(e1).length) return;
    const fd = new FormData();
    fd.append("form-name", `brief-${pkg.slug}`);
    fd.append("package", pkg.name);
    fd.append("rush", rush ? "Yes":"No");
    fd.append("total", `$${total}`);
    Object.entries(form).forEach(([k,v])=> fd.append(k, v || ""));
    if (files?.length) Array.from(files).forEach(f=> fd.append("assetsFiles", f));
    try {
      await fetch("/", { method:"POST", body: fd });
      navigate(`/pay/${pkg.slug}?rush=${rush ? "1":"0"}`);
    } catch {
      alert("Submission failed. Please email contact@citeks.net");
    }
  }
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h2 font-semibold">{pkg.name} brief</h1>
        <p className="ts-h6 text-slate-700 mt-1">
          {pkg.displayPrice} · Typical timeline: {pkg.days} days (rush {pkg.rushDays} days +${pkg.rushFee})
        </p>

        <form name={`brief-${pkg.slug}`} data-netlify="true" netlify-honeypot="bot-field"
          encType="multipart/form-data" onSubmit={submitBrief}
          className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input type="hidden" name="form-name" value={`brief-${pkg.slug}`} />
          <input type="hidden" name="bot-field" />

          <div className="md:col-span-2 ts-h6 text-slate-700">
            Optional rush can be toggled here and on the payment page.
          </div>

          <Input label="Company / brand" value={form.company} onChange={(v)=>setForm({...form, company:v})} error={errors.company}/>
          <Input label="Contact name" value={form.contact} onChange={(v)=>setForm({...form, contact:v})} error={errors.contact}/>
          <Input label="Email" type="email" value={form.email} onChange={(v)=>setForm({...form, email:v})} error={errors.email}/>
          <Input label="Phone" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} error={errors.phone}/>
          <TextArea label="Goal of the site" value={form.goal} onChange={(v)=>setForm({...form, goal:v})}/>
          <Input label="Estimated pages" value={form.pages} onChange={(v)=>setForm({...form, pages:v})} error={errors.pages}/>
          <TextArea label="Available assets — notes" value={form.assetsNote} onChange={(v)=>setForm({...form, assetsNote:v})}/>
          <div>
            <label className="ts-h6 block mb-1">Upload assets (images, logos, docs)</label>
            <input name="assetsFiles" type="file" multiple onChange={(e)=>setFiles(e.target.files)}
              className="w-full border border-[var(--clr-subtle)] rounded-lg p-3 bg-white"/>
            <div className="ts-h6 text-slate-600 mt-1">You can upload multiple files.</div>
          </div>

          <TextArea label="SEO targets (keywords/locations)" value={form.seo} onChange={(v)=>setForm({...form, seo:v})}/>
          <Input label="Integrations (maps, booking, payments)" value={form.integrations} onChange={(v)=>setForm({...form, integrations:v})}/>
          <Input label="E-commerce (if needed)" value={form.ecommerce} onChange={(v)=>setForm({...form, ecommerce:v})}/>
          <Input label="CRM (if needed)" value={form.crm} onChange={(v)=>setForm({...form, crm:v})}/>
          <TextArea label="Reference sites (what you like)" value={form.references} onChange={(v)=>setForm({...form, references:v})}/>
          <Input label="Competitors" value={form.competitors} onChange={(v)=>setForm({...form, competitors:v})}/>
          <TextArea label="Notes / constraints" value={form.notes} onChange={(v)=>setForm({...form, notes:v})}/>

          <div className="md:col-span-2 flex items-center justify-between border-t border-[var(--clr-subtle)] pt-4 mt-2">
            <label className="ts-h6 flex items-center gap-2">
              <input type="checkbox" checked={rush} onChange={(e)=>setRush(e.target.checked)}/>
              Rush delivery: finish in {pkg.rushDays} days (+${pkg.rushFee})
            </label>
            <div className="ts-h5 font-semibold">Total: ${total}</div>
          </div>

          <div className="md:col-span-2 flex items-center justify-end">
            <button type="submit" className="btn-accent px-6 py-3 rounded-full ts-h6 inline-flex items-center gap-2">
              Continue <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ===== Stripe Embedded Checkout ===== */
function Pay({ slug }){
  const pkg = packages.find(p => p.slug === slug);
  if (!pkg) return <NotFound />;
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const initialRush = params.get("rush") === "1";

  const [rush, setRush] = useState(initialRush);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    async function go(){
      try {
        const res = await fetch("/.netlify/functions/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify({ slug, rush, origin: window.location.origin }),
        });
        if (!res.ok){
          const text = await res.text(); throw new Error(text || "Failed to create session");
        }
        const { clientSecret } = await res.json();
        setClientSecret(clientSecret); setError("");
      } catch (e) {
        try {
          const parsed = JSON.parse(e.message);
          setError(parsed.error || "Could not start checkout. Please email contact@citeks.net.");
        } catch {
          setError(e.message || "Could not start checkout. Please email contact@citeks.net.");
        }
      }
    }
    go();
  }, [slug, rush]);

  useEffect(() => {
    let cleanup = () => {};
    async function mount(){
      if (!clientSecret || !containerRef.current) return;
      const { loadStripe } = await import("@stripe/stripe-js");
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || window.STRIPE_PUBLISHABLE_KEY);
      if (!stripe){ setError("Stripe not available."); return; }
      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
      checkout.mount(containerRef.current);
      cleanup = () => checkout.destroy();
    }
    mount(); return () => cleanup();
  }, [clientSecret]);

  const total = pkg.price + (rush ? pkg.rushFee : 0);

  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h2 font-semibold">Payment</h1>
        <div className="card p-6 mt-6">
          <div className="ts-h4 font-semibold">{pkg.name}</div>
          <div className="ts-h6 text-slate-700 mt-1">Base price {pkg.displayPrice}. Typical timeline {pkg.days} days.</div>
          <div className="flex items-center justify-between mt-4">
            <label className="ts-h6 flex items-center gap-2">
              <input type="checkbox" checked={rush} onChange={(e)=>setRush(e.target.checked)}/>
              Rush delivery: finish in {pkg.rushDays} days (+${pkg.rushFee})
            </label>
            <div className="ts-h4 font-semibold">Total: ${total}</div>
          </div>
          <div className="mt-6">
            {error && <div className="ts-h6 text-red-600 mb-3 whitespace-pre-wrap">{error}</div>}
            <div ref={containerRef} id="checkout" className="w-full" />
          </div>
          <div className="mt-4 ts-h6 text-slate-600">Secure payment powered by Stripe.</div>
        </div>
      </div>
    </section>
  );
}

/* ===== Thank You (uses payment_intent for Transaction ID) ===== */
function ThankYou(){
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const sessionId = new URLSearchParams(window.location.hash.split("?")[1] || "").get("session_id");

  useEffect(() => {
    async function load(){
      if (!sessionId) return;
      try {
        const res = await fetch(`/.netlify/functions/session-status?session_id=${encodeURIComponent(sessionId)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed");
        setSummary(json);
      } catch {
        setError("We received your payment, but couldn’t load the details. We’ll email you shortly.");
      }
    }
    load();
  }, [sessionId]);

  const niceTotal = summary?.amount_total ? `$${(summary.amount_total/100).toFixed(2)} ${summary.currency?.toUpperCase()}` : "—";

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h2 font-semibold mb-2">Thank you!</h1>
        <p className="ts-h6 text-slate-700">
          Your payment was received. We’ll email you shortly from <b>contact@citeks.net</b> with next steps.
        </p>

        {summary && (
          <div className="card p-6 mt-6">
            <div className="ts-h5 font-semibold">Purchase summary</div>
            <div className="ts-h6 text-slate-700 mt-2 space-y-1">
              <div><b>Status:</b> {summary.payment_status}</div>
              <div><b>Transaction ID:</b> {summary.payment_intent_id || "—"}</div>
              <div><b>Package:</b> {summary.metadata?.package || "—"}</div>
              <div><b>Rush:</b> {summary.metadata?.rush === "true" ? "Yes":"No"}</div>
              <div><b>Total:</b> {niceTotal}</div>
            </div>
            <div className="ts-h6 text-slate-700 mt-3">
              Forgot something? Use the <a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('contact');}} className="underline">contact form</a> and include your Transaction ID above.
            </div>
          </div>
        )}
        {error && <div className="ts-h6 text-red-600 mt-4">{error}</div>}

        <a href="#/" className="ts-h6 btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2 mt-6">Back to home</a>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer(){
  return (
    <footer className="pt-10 border-t border-[var(--clr-subtle)] bg-white">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="ts-h5 font-semibold">CITEKS</div>
            <div className="ts-h6 text-slate-700 mt-2">Modern sites that convert.</div>
            <div className="ts-h6 text-slate-700 mt-2">Langmyrvegen 22a • Europe/Oslo</div>
            <a href="mailto:contact@citeks.net" className="ts-h6 text-[var(--clr-accent)] underline mt-2 inline-block">contact@citeks.net</a>
          </div>
          <div>
            <div className="ts-h6 font-semibold mb-2">Navigate</div>
            <ul className="ts-h6 text-slate-800 space-y-2">
              <li><a href="#/" className="hover:opacity-80">Home</a></li>
              <li><a href="#/why-us" className="hover:opacity-80">Why us</a></li>
              <li><a href="#/projects" className="hover:opacity-80">Projects</a></li>
              <li><a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('contact');}} className="hover:opacity-80">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="ts-h6 font-semibold mb-2">Info</div>
            <ul className="ts-h6 text-slate-800 space-y-2">
              <li><a href="#/privacy" className="hover:opacity-80">Privacy</a></li>
              <li><a href="#/tech-terms" className="hover:opacity-80">Technical terms</a></li>
            </ul>
          </div>
          <div>
            <div className="ts-h6 font-semibold mb-2">Follow</div>
            <ul className="ts-h6 text-slate-800 space-y-2">
              <li><a href="https://www.linkedin.com/company/108523228" target="_blank" rel="noreferrer" className="hover:opacity-80">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/citeks_net/" target="_blank" rel="noreferrer" className="hover:opacity-80">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-6 border-t border-[var(--clr-subtle)] mt-8">
          <div className="ts-h6">© {new Date().getFullYear()} CITEKS — All rights reserved</div>
          <div className="ts-h6"><a href="#/" onClick={(e)=>{e.preventDefault(); scrollToId('packages');}} className="hover:opacity-80">Pricing</a></div>
        </div>
      </div>
    </footer>
  );
}

/* ===== Hidden pages (kept) ===== */
function PrivacyPolicy(){
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h1 font-semibold mb-4">Privacy Policy</h1>
        <div className="card p-6 ts-h6 text-slate-800 space-y-3">
          <p><b>Who we are.</b> CITEKS builds fast, modern websites that convert. Contact: contact@citeks.net.</p>
          <p><b>What we collect.</b> Contact form and brief submissions (including uploads). No cookies.</p>
          <p><b>Use of data.</b> Replies, proposals, service delivery, payments (Stripe), accounting/legal compliance.</p>
          <p><b>Sharing.</b> Only with providers we use to operate (Netlify, Stripe). No selling of personal data.</p>
          <p><b>Retention.</b> Kept as needed for services and legal obligations, then deleted/anonymized.</p>
          <p><b>Security.</b> Reputable providers + reasonable measures. No method is 100% secure.</p>
          <p><b>Your rights.</b> Request access/correction/deletion via contact@citeks.net.</p>
          <p><b>International.</b> Processing in the EEA and other locations via our providers’ safeguards.</p>
          <p><b>Updates.</b> We’ll post any changes here.</p>
        </div>
        <a href="#/" className="ts-h6 btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2 mt-6">Back to home</a>
      </div>
    </section>
  );
}

function TechTerms(){
  const rows = [
    ["CTA (Call to Action)", "The primary action you want a visitor to take (e.g., call, book, buy)."],
    ["Conversion rate (CVR)", "Percentage of visitors who complete the desired action."],
    ["IA (Information Architecture)", "How content is structured and labeled for easy navigation."],
    ["Responsive", "Layouts that adapt to different screen sizes."],
    ["SEO", "Optimizing content/structure to rank in search."],
    ["Schema", "Structured data that helps search engines understand your content."],
    ["CRM", "Lead/customer tracking and integrations."],
    ["Analytics", "Tracking behavior and performance (e.g., conversions)."],
    ["Accessibility", "Designing so people of all abilities can use the site."],
    ["Performance", "How quickly a page loads and responds."],
  ];
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h1 font-semibold mb-4">Technical terms</h1>
        <div className="card p-6">
          <ul className="ts-h6 text-slate-800 space-y-2">
            {rows.map(([term, def]) => <li key={term}><b>{term}:</b> {def}</li>)}
          </ul>
        </div>
        <a href="#/" className="ts-h6 btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2 mt-6">Back to home</a>
      </div>
    </section>
  );
}

/* Hidden forms to make Netlify detect them */
function NetlifyHiddenForms(){
  return (
    <div style={{display:"none"}}>
      <form name="brief-starter" data-netlify="true" encType="multipart/form-data">
        <input name="company" />
        <input name="assetsFiles" type="file" />
      </form>
      <form name="brief-growth" data-netlify="true" encType="multipart/form-data">
        <input name="company" />
        <input name="assetsFiles" type="file" />
      </form>
      <form name="brief-scale" data-netlify="true" encType="multipart/form-data">
        <input name="company" />
        <input name="assetsFiles" type="file" />
      </form>
      <form name="contact" data-netlify="true">
        <input name="first" />
      </form>
    </div>
  );
}

function NotFound(){
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[var(--container)] px-6">
        <h1 className="ts-h2 font-semibold mb-2">Page not found</h1>
        <a href="#/" className="ts-h6 btn-accent px-5 py-2 rounded-full inline-flex items-center gap-2">Go home</a>
      </div>
    </section>
  );
}
