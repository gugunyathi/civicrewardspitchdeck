import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, Building2, Check, Download, Gauge, Leaf, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import mapImage from "@/assets/sa-map.jpg";
import skylineImage from "@/assets/joburg-skyline.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Civic Rewards Investor Deck" },
    { name: "description", content: "The investment case for Civic Rewards, South Africa’s smart city intelligence and reinvestment platform." },
    { property: "og:title", content: "Civic Rewards Investor Deck" },
    { property: "og:description", content: "Smart city intelligence that turns verified civic action into resilient local economies." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const Header = ({ n, dark = false }: { n: string; dark?: boolean }) => (
  <div className={`absolute inset-x-12 top-8 z-10 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.14em] ${dark ? "text-primary-foreground/65" : "text-muted-foreground"}`}>
    <span className="display text-base normal-case tracking-normal"><b className="text-primary">C</b> CivicRewards</span><span>{n} / 11</span>
  </div>
);

const Title = ({ kicker, children, light = false }: { kicker: string; children: React.ReactNode; light?: boolean }) => (
  <div><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">{kicker}</p><h2 className={`display max-w-4xl text-[44px] font-extrabold leading-[1.02] ${light ? "text-primary-foreground" : "text-foreground"}`}>{children}</h2></div>
);

const Slide = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <section className={`slide ${className}`} data-slide>{children}</section>;

function Index() {
  const [exporting, setExporting] = useState(false);

  const downloadPdf = async () => {
    setExporting(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1280, 720], hotfixes: ["px_scaling"] });
      for (const [i, slide] of slides.entries()) {
        const canvas = await html2canvas(slide, { scale: 1, backgroundColor: null, useCORS: true, logging: false });
        if (i > 0) pdf.addPage([1280, 720], "landscape");
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, 1280, 720, undefined, "FAST");
      }
      pdf.save("Civic-Rewards-Investor-Deck.pdf");
    } finally { setExporting(false); }
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <div><p className="display text-lg font-extrabold">Investor deck</p><p className="text-xs text-muted-foreground">11 slides · September 2026</p></div>
          <Button onClick={downloadPdf} disabled={exporting}><Download size={17}/>{exporting ? "Building PDF…" : "Download PDF"}</Button>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1280px] flex-col gap-8 px-3">
        <div className="slide-shell"><Slide className="bg-deep text-primary-foreground">
          <img src={skylineImage} alt="Johannesburg skyline" className="absolute inset-0 h-full w-full object-cover opacity-30"/>
          <div className="absolute inset-0 bg-deep/75"/><div className="dot-field absolute inset-y-0 right-0 w-1/2 opacity-40"/>
          <Header n="01" dark/><div className="relative flex h-full flex-col justify-center px-16">
            <div className="mb-9 inline-flex w-fit items-center gap-2 border border-primary/50 bg-primary/15 px-3 py-2 text-xs font-bold text-primary"><Sparkles size={14}/> INVESTMENT OPPORTUNITY</div>
            <h1 className="display max-w-4xl text-[72px] font-extrabold leading-[0.95]">Infrastructure intelligence.<br/><span className="text-primary">Local wealth, compounded.</span></h1>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-primary-foreground/75">The data and reinvestment layer transforming civic action into resilient, investable smart cities.</p>
            <div className="absolute bottom-12 left-16 flex gap-10 text-sm font-bold"><span>PRE-SEED</span><span className="text-primary">$250K SAFE · 10% EQUITY</span><span>SOUTH AFRICA</span></div>
          </div>
        </Slide></div>

        <div className="slide-shell"><Slide><Header n="02"/><div className="grid h-full grid-cols-[1.1fr_.9fr] gap-10 px-14 pb-12 pt-24">
          <div><Title kicker="The problem">Cities cannot fix what they cannot see.</Title><p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">Fragmented reporting creates a costly infrastructure blindspot—then drives capital away from the communities that need it most.</p>
            <div className="mt-9 grid grid-cols-3 gap-3">{[["28", "days", "Average fault cycle"],["Opaque", "systems", "No verified SLA trail"],["Lost", "capital", "Rates & investment flight"]].map(([a,b,c])=><div className="border-t-4 border-accent bg-muted p-4" key={a}><p className="display text-3xl font-extrabold">{a}</p><p className="font-bold text-accent">{b}</p><p className="mt-2 text-xs text-muted-foreground">{c}</p></div>)}</div>
          </div><div className="flex flex-col justify-center gap-4">{[[Gauge,"Operational drag","Faults stall local businesses and productivity."],[Building2,"Corporate flight","Unreliable infrastructure blocks relocation and growth."],[Users,"Trust deficit","Citizens resist paying into systems they cannot audit."]].map(([Icon,t,d])=>{const I=Icon as typeof Gauge; return <div className="flex gap-4 border-b border-border pb-5" key={String(t)}><div className="flex h-10 w-10 shrink-0 items-center justify-center bg-signal-soft text-accent"><I size={20}/></div><div><h3 className="font-extrabold">{String(t)}</h3><p className="mt-1 text-sm text-muted-foreground">{String(d)}</p></div></div>})}</div>
        </div></Slide></div>

        <div className="slide-shell"><Slide><Header n="03"/><div className="h-full px-14 pb-12 pt-24"><Title kicker="The solution">One verified loop. Three compounding outcomes.</Title>
          <div className="mt-11 grid grid-cols-3 gap-5">{[[MapPin,"01","Capture","Residents submit geo-tagged photographic fault data."],[ShieldCheck,"02","Verify","Multi-party consensus removes noise, duplication and fraud."],[Leaf,"03","Reinvest","Proof-of-work mints value into local commerce or infrastructure assets."]].map(([Icon,n,t,d])=>{const I=Icon as typeof MapPin;return <div className="relative border border-border bg-card p-7" key={String(t)}><span className="absolute right-5 top-4 display text-5xl font-extrabold text-muted">{String(n)}</span><I className="mb-10 text-primary" size={34}/><h3 className="display text-2xl font-extrabold">{String(t)}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{String(d)}</p></div>})}</div>
          <div className="mt-7 flex items-center justify-between bg-deep px-7 py-5 text-primary-foreground"><span className="font-bold">From complaint management</span><ArrowRight className="text-primary"/><span className="font-bold">to an auditable infrastructure intelligence network</span></div>
        </div></Slide></div>

        <div className="slide-shell"><Slide className="bg-deep"><Header n="04" dark/><div className="h-full px-14 pb-12 pt-24"><Title kicker="The engine" light>Data becomes proof. Proof becomes capital.</Title>
          <div className="mt-10 flex items-center gap-3 text-primary-foreground">{["Citizen input","Supplier resolution","AI validation","Points minted"].map((x,i)=><div className="contents" key={x}><div className="flex-1 border border-primary/35 bg-primary/10 p-4 text-center font-bold">{x}</div>{i<3&&<ArrowRight className="shrink-0 text-primary"/>}</div>)}</div>
          <div className="mx-auto h-10 w-px bg-primary"/><div className="grid grid-cols-2 gap-5 text-primary-foreground">
            <div className="border-t-4 border-primary bg-primary/10 p-6"><p className="text-xs font-bold uppercase text-primary">Institutional rail</p><h3 className="display mt-2 text-2xl font-extrabold">Smart city reinvestment</h3><p className="mt-3 text-sm text-primary-foreground/65">Tokenised infrastructure bonds · IPP debt · fractional municipal debt</p><p className="display mt-7 text-4xl font-extrabold text-primary">9.5–11.4%</p><p className="text-xs uppercase text-primary-foreground/60">Target annual yield</p></div>
            <div className="border-t-4 border-accent bg-primary-foreground/5 p-6"><p className="text-xs font-bold uppercase text-accent">Community rail</p><h3 className="display mt-2 text-2xl font-extrabold">Hyper-local economic loop</h3><p className="mt-3 text-sm text-primary-foreground/65">Ward-locked redemption · measurable footfall · SME revenue growth</p><p className="display mt-7 text-4xl font-extrabold text-accent">100%</p><p className="text-xs uppercase text-primary-foreground/60">Traceable B2C footprint</p></div>
          </div></div>
        </Slide></div>

        <div className="slide-shell"><Slide><Header n="05"/><div className="grid h-full grid-cols-[.95fr_1.05fr] gap-12 px-14 pb-12 pt-24"><div><Title kicker="Why now">Three structural tailwinds are converging.</Title><img src={mapImage} alt="Three-dimensional map of South Africa" className="mt-7 h-64 w-full object-contain"/></div>
          <div className="flex flex-col justify-center gap-5">{[["01","Infrastructure risk","Insurers and asset managers need granular, real-time signals to price public-asset degradation."],["02","Traceable ESG capital","Enterprise boards need auditable proof of exactly where social capital is deployed."],["03","Cultural readiness","Letsema, iLima and Saamtrek already encode collective civic action. Civic Rewards makes it measurable."]].map(([n,t,d])=><div className="grid grid-cols-[44px_1fr] gap-4" key={n}><div className="display text-2xl font-extrabold text-primary">{n}</div><div><h3 className="font-extrabold">{t}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p></div></div>)}</div>
        </div></Slide></div>

        <div className="slide-shell"><Slide><Header n="06"/><div className="h-full px-14 pb-12 pt-24"><Title kicker="Market opportunity">A focused wedge into a global category.</Title><div className="mt-11 grid grid-cols-[1.35fr_1fr_.8fr] items-end gap-4">
          <div className="h-72 bg-deep p-7 text-primary-foreground"><p className="text-xs font-bold text-primary">TAM · GLOBAL</p><p className="display mt-4 text-5xl font-extrabold">$XXB</p><p className="mt-3 max-w-sm text-sm text-primary-foreground/65">Emerging-market smart-city analytics, local retail media and tokenised municipal debt.</p></div>
          <div className="h-56 bg-primary p-7 text-primary-foreground"><p className="text-xs font-bold">SAM · SOUTH AFRICA</p><p className="display mt-4 text-5xl font-extrabold">744</p><p className="mt-3 text-sm text-primary-foreground/75">Municipal wards across primary economic corridors.</p></div>
          <div className="h-44 bg-signal p-7 text-accent-foreground"><p className="text-xs font-bold">SOM · LIVE</p><p className="display mt-4 text-5xl font-extrabold">584</p><p className="mt-2 text-sm">Active wards across 7 metros.</p></div>
        </div><p className="mt-6 border-l-4 border-accent pl-4 text-sm text-muted-foreground"><b className="text-foreground">Investor diligence item:</b> validate and source the final TAM before external circulation.</p></div></Slide></div>

        <div className="slide-shell"><Slide className="bg-deep"><Header n="07" dark/><div className="h-full px-14 pb-12 pt-24"><Title kicker="Traction" light>Six years of field data. A clear automation wedge.</Title><div className="mt-9 grid grid-cols-4 gap-3">{[["6,500","residents"],["155,284","messages analysed"],["30,977","structured reports"],["33%","traffic handled by one person"]].map(([n,l])=><div className="border-t-4 border-primary bg-primary-foreground/5 p-5 text-primary-foreground" key={n}><p className="display text-3xl font-extrabold text-primary">{n}</p><p className="mt-2 text-xs text-primary-foreground/60">{l}</p></div>)}</div>
          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6 text-primary-foreground"><div className="border border-primary-foreground/15 p-6"><p className="text-xs uppercase text-primary-foreground/50">Today</p><p className="display mt-2 text-4xl font-extrabold">4 hrs/day</p><p className="mt-2 text-sm text-primary-foreground/65">Manual councillor administration</p></div><ArrowRight className="text-primary" size={34}/><div className="border border-primary bg-primary/10 p-6"><p className="text-xs uppercase text-primary">With Civic Rewards</p><p className="display mt-2 text-4xl font-extrabold">30 min/day</p><p className="mt-2 text-sm text-primary-foreground/65">1,277 hours reclaimed annually</p></div></div>
        </div></Slide></div>

        <div className="slide-shell"><Slide><Header n="08"/><div className="h-full px-14 pb-12 pt-24"><Title kicker="Business model">Monetise the stakeholders who win from uptime.</Title><div className="mt-9 grid grid-cols-2 gap-4">
          {[[Building2,"Municipalities & cities","2%","Revenue collection & bond sales"],[ShieldCheck,"Suppliers & contractors","$1K / mo","Fault tracking, SLA proof & compliance"],[Gauge,"Advertisers & insurers","$1K–$5K / mo","Ward media + predictive risk data APIs"],[Users,"Local ward businesses","$200 / mo","Community Champion placement & footfall"]].map(([Icon,t,p,d])=>{const I=Icon as typeof Building2;return <div className="flex items-center gap-5 border border-border bg-card p-5" key={String(t)}><div className="flex h-12 w-12 items-center justify-center bg-signal-soft text-accent"><I/></div><div className="min-w-0 flex-1"><h3 className="font-extrabold">{String(t)}</h3><p className="text-xs text-muted-foreground">{String(d)}</p></div><p className="display text-2xl font-extrabold text-primary">{String(p)}</p></div>})}
        </div><div className="mt-6 flex items-center justify-center gap-3 bg-muted p-4 text-sm font-bold"><span>Better data</span><ArrowRight size={16}/><span>Faster fixes</span><ArrowRight size={16}/><span>Higher uptime</span><ArrowRight size={16}/><span className="text-primary">Recurring stakeholder value</span></div></div></Slide></div>

        <div className="slide-shell"><Slide><Header n="09"/><div className="h-full px-14 pb-12 pt-24"><Title kicker="Competitive moat">Not another reporting app. A verified economic network.</Title><div className="mt-8 overflow-hidden border border-border"><div className="grid grid-cols-[.8fr_1fr_1fr] bg-deep px-5 py-3 text-xs font-bold uppercase text-primary-foreground"><span>Capability</span><span>Legacy apps</span><span className="text-primary">Civic Rewards</span></div>
          {[['Data integrity','Unstructured complaints','Multi-party consensus'],['User incentive','Citizen frustration','Household economics + assets'],['SLA impact','One-way reporting','Independent proof-of-work'],['Economic design','Disconnected from business','Ward-locked merchant flows']].map(r=><div className="grid grid-cols-[.8fr_1fr_1fr] items-center border-t border-border px-5 py-4 text-sm" key={r[0]}><b>{r[0]}</b><span className="text-muted-foreground">{r[1]}</span><span className="flex items-center gap-2 font-bold text-primary"><Check size={16}/>{r[2]}</span></div>)}</div>
          <p className="mt-6 text-center text-sm font-bold">The defensibility compounds with every <span className="text-primary">verified fault, supplier score, redemption and ward-level signal.</span></p>
        </div></Slide></div>

        <div className="slide-shell"><Slide><Header n="10"/><div className="h-full px-14 pb-12 pt-24"><Title kicker="The vision">The operating system for resilient smart cities.</Title><div className="mt-12 flex items-stretch gap-2">{["Better civic data","Faster municipal fixes","Infrastructure uptime","High-street productivity","Institutional reinvestment"].map((x,i)=><div className="contents" key={x}><div className={`flex flex-1 items-center justify-center p-5 text-center text-sm font-extrabold ${i===4?'bg-primary text-primary-foreground':'bg-muted'}`}>{x}</div>{i<4&&<ArrowRight className="mt-6 shrink-0 text-primary"/>}</div>)}</div>
          <blockquote className="display mx-auto mt-14 max-w-4xl text-center text-[32px] font-bold leading-tight text-foreground">“We turn clean smart-city intelligence into faster service delivery, stronger local economies and investable municipal resilience.”</blockquote>
        </div></Slide></div>

        <div className="slide-shell"><Slide className="bg-deep text-primary-foreground"><Header n="11" dark/><div className="dot-field absolute inset-y-0 right-0 w-1/2 opacity-30"/><div className="relative grid h-full grid-cols-[1fr_.72fr] gap-16 px-16 pb-14 pt-24"><div><Title kicker="The ask" light>Back the trust layer for Africa’s next generation of cities.</Title><p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/65">Capital accelerates enterprise-grade intelligence infrastructure, programmatic reinvestment rails and remaining metro rollout.</p><p className="mt-10 text-sm font-bold text-primary">CIVICREWARDS.CO.ZA <span className="px-3 text-primary-foreground/30">/</span> SOUTH AFRICA</p></div>
          <div className="flex flex-col justify-center border-l border-primary-foreground/15 pl-10"><p className="text-xs font-bold uppercase text-primary">Pre-seed SAFE</p><p className="display mt-2 text-7xl font-extrabold">$250K</p><p className="mt-2 text-lg font-bold">for 10% equity</p><div className="my-7 h-px bg-primary-foreground/15"/>{["Reinvestment rails","Enterprise API infrastructure","Metro rollout"].map(x=><p className="mb-3 flex items-center gap-2 text-sm" key={x}><Check size={16} className="text-primary"/>{x}</p>)}</div></div>
        </Slide></div>
      </div>
      <Button onClick={downloadPdf} disabled={exporting} className="fixed bottom-5 right-5 z-50 shadow-button"><ArrowDown size={17}/>{exporting ? "Building PDF…" : "Download immediately"}</Button>
    </main>
  );
}
