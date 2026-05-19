import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles, Users, Award, MessageCircle, Mail, Phone } from "lucide-react";
import logo from "@/assets/cap-logo.png";
import wordmark from "@/assets/cap-wordmark.png";
import w1 from "@/assets/wedding-1.jpg";
import w2 from "@/assets/wedding-2.jpg";
import w3 from "@/assets/wedding-3.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CA Productions — Unveiling the art of you together" },
      { name: "description", content: "Premium wedding film and photography agency crafting cinematic stories with bespoke design, trusted networks, and flawless execution." },
      { property: "og:title", content: "CA Productions — Wedding Films & Photography" },
      { property: "og:description", content: "Cinematic wedding films and editorial photography." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const projects = [
  { names: "Muskan & Faizan", place: "Udaipur, India", img: w1 },
  { names: "Anamika & Shirin", place: "Goa, India", img: w2 },
  { names: "Riya & Arjun", place: "Jaipur, India", img: w3 },
];

const services = [
  { icon: Sparkles, title: "Bespoke Design", body: "Every story is sculpted with intention — from mood boards to the final frame, tailored entirely to you." },
  { icon: Users, title: "Trusted Network", body: "A handpicked circle of cinematographers, editors and stylists who share an obsession for craft." },
  { icon: Award, title: "Flawless Execution", body: "Calm on set, precise in post. We move quietly so your moments stay loud." },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Why Us", href: "#why" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="CA Productions" className="h-8 w-auto" />
          <span className="hidden sm:inline text-xs tracking-[0.3em] text-foreground/80 uppercase">CA Productions</span>
        </a>
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-sm tracking-wider text-foreground/70 hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground/90 hover:scale-110 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass mt-3 mx-auto max-w-7xl rounded-2xl px-6 py-5">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a onClick={() => setOpen(false)} href={l.href} className="block text-sm tracking-wider text-foreground/80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function VideoBackdrop() {
  return (
    <>
      <video
        autoPlay muted loop playsInline
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="/hero.mp4"
        poster={w1}
      />
      <div className="fixed inset-0 z-[1] bg-black/55" />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <img src={logo} alt="CA Productions" className="w-[min(80vw,560px)] h-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]" />
        <p className="mt-6 max-w-xl text-sm sm:text-base text-foreground/80 tracking-wide">
          Unveiling art of you together
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.4em] uppercase text-foreground/60 animate-pulse">
        Scroll
      </div>
    </section>
  );
}


function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-accent">Selected Work</span>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
              Our <span className="font-serif-italic text-accent">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-foreground/60 leading-relaxed">
            A small selection of recent wedding stories — each one a study in light, ritual, and tenderness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <a
              key={p.names}
              href="#contact"
              className={`group relative block overflow-hidden rounded-2xl ${i % 3 === 0 ? "sm:row-span-2 sm:h-[760px]" : "h-[420px]"}`}
            >
              <img
                src={p.img}
                alt={p.names}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[10px] uppercase tracking-[0.4em] text-accent/90 mb-2">Wedding Story</p>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight">{p.names}</h3>
                <p className="mt-1 text-xs text-foreground/60 tracking-wide">{p.place}</p>
              </div>
              <div className="absolute top-5 right-5 glass rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                View
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="relative py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-accent">Why Us</span>
        <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
          A pursuit of <span className="font-serif-italic text-accent">excellence</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm text-foreground/60 leading-relaxed">
          Three principles guide every frame we capture and every cut we make.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="glass-light group rounded-3xl p-10 text-left hover:scale-[1.02] active:scale-95 transition-transform duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 text-xl font-light tracking-wide">{title}</h3>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed tracking-wide">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const btns = [
    { icon: MessageCircle, label: "WhatsApp Us", href: "https://wa.me/" },
    { icon: Mail, label: "Send Email", href: "mailto:hello@caproductions.in" },
    { icon: Phone, label: "Call Us", href: "tel:+910000000000" },
  ];
  return (
    <footer id="contact" className="relative py-32 px-6 border-t border-border/50">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-accent">Get in Touch</span>
        <h2 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
          Let's Create <span className="font-serif-italic text-accent">Magic</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-foreground/60 leading-relaxed">
          Tell us about your day — the place, the people, the feeling. We'll take it from there.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4">
          {btns.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="glass group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm tracking-widest uppercase hover:scale-[1.03] active:scale-95 transition-transform duration-300"
            >
              <Icon size={16} strokeWidth={1.5} className="text-accent" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
        <img src={logo} alt="CA Productions" className="h-10 w-auto" />
        <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/40">
          © {new Date().getFullYear()} CA Productions · All rights reserved
        </p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3.5 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] hover:scale-[1.05] active:scale-95 transition-transform"
    >
      <MessageCircle size={20} strokeWidth={2} />
      <span className="hidden sm:inline text-sm tracking-wide font-medium">Message</span>
    </a>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <VideoBackdrop />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <div className="bg-gradient-to-b from-background/70 via-background/90 to-background/95 backdrop-blur-sm">
          <Projects />
          <Why />
          <Contact />
        </div>
      </div>
      <FloatingWhatsApp />
    </main>
  );
}
