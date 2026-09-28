import type { ReactNode } from "react";
import { RegnrForm } from "./RegnrForm";
import { Card } from "../design-system/components/core/Card.jsx";
import { Icon } from "../design-system/components/core/Icon.jsx";
import { Button } from "../design-system/components/core/Button.jsx";
import { Callout } from "../design-system/components/core/Callout.jsx";
import { PlateInput } from "../design-system/components/forms/PlateInput.jsx";
import { RankBadge } from "../design-system/components/product/RankBadge.jsx";
import { DisclosureNote } from "../design-system/components/product/DisclosureNote.jsx";

type Props = {
    onSubmit: (kjennemerke: string) => void;
    loading: boolean;
    feil: string | null;
};

const HVORDAN = [
    {
        n: "01",
        icon: "search",
        title: "Slå opp skiltet",
        text: "Vi henter tekniske data fra Statens vegvesen: modell, år, drivstoff og EU-kontroll.",
    },
    {
        n: "02",
        icon: "list-checks",
        title: "Svar på noen spørsmål",
        text: "Tilstand, kilometerstand, hvor fort bilen må vekk og hvor mye jobb du vil legge i salget.",
    },
    {
        n: "03",
        icon: "list-ordered",
        title: "Få kanalene rangert",
        text: "Seks salgskanaler rangert, med begrunnelse og faktiske tilbydere under hver kanal.",
    },
] as const;

const KANALER = [
    { icon: "users", name: "Privatsalg", text: "Du annonserer selv og selger til en privatperson." },
    { icon: "gavel", name: "Forhandlerauksjon", text: "Forhandlere byr mot hverandre på bilen din." },
    { icon: "banknote", name: "Fastpris-oppkjøp", text: "En aktør kjøper bilen direkte til fast pris." },
    { icon: "store", name: "Kommisjonssalg", text: "Forhandler selger bilen for deg mot provisjon." },
    { icon: "handshake", name: "Innbytte", text: "Bilen går i bytte mot en ny bil hos forhandler." },
    { icon: "landmark", name: "Auksjonshus", text: "Åpen auksjon med spesialiserte kjøpergrupper." },
] as const;

const EKSEMPEL_RADER = [
    { rank: 1, name: "Forhandlerauksjon", note: "Oppgjør 2–5 dager" },
    { rank: 2, name: "Fastpris-oppkjøp", note: "Oppgjør 1–3 dager" },
    { rank: 3, name: "Innbytte", note: "Ved levering" },
    { rank: 4, name: "Privatsalg", note: "2–8 uker" },
] as const;

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
    return (
        <div className="k-secthead">
            <div>
                <div className="k-eyebrow">{eyebrow}</div>
                <h2 className="mt-2">{title}</h2>
            </div>
            {action}
        </div>
    );
}

function HeroPreview() {
    return (
        <Card pad="md" className="shadow-[var(--shadow-md)]">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="k-eyebrow">Eksempel på resultat</div>
                    <div className="mt-1 [font:var(--type-h4)]">Volkswagen Golf 1.6 TDI</div>
                </div>
                <PlateInput size="sm" value="EK 84213" readOnly/>
            </div>
            <div className="flex flex-col gap-2">
                {EKSEMPEL_RADER.map((r) => (
                    <div
                        key={r.rank}
                        className={`flex items-center gap-3 rounded-md border border-line-subtle p-3 ${
                            r.rank === 1 ? "bg-accent-quiet" : "bg-card"
                        }`}
                    >
                        <RankBadge rank={r.rank} size="sm"/>
                        <span className="[font:var(--type-label)]">{r.name}</span>
                        <span className="ml-auto [font:var(--type-caption)] text-ink-muted">{r.note}</span>
                    </div>
                ))}
                <div className="pt-1 [font:var(--type-caption)] text-ink-muted">+ 2 kanaler til</div>
            </div>
        </Card>
    );
}

function scrollTilOppslag() {
    document.getElementById("skilt-oppslag")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function LandingScreen({ onSubmit, loading, feil }: Props) {
    return (
        <div>
            <div className="k-wrap">
                <section className="k-hero">
                    <div>
                        <div className="k-eyebrow">
                            <Icon name="shield-check" size={14}/>
                            Uavhengig · ingen prisvurdering
                        </div>
                        <h1 className="k-h1">Hvor bør bilen din selges?</h1>
                        <p className="k-lead">
                            Slå opp skiltet, svar på noen spørsmål, og få seks salgskanaler rangert — med
                            begrunnelse og faktiske tilbydere under hver kanal.
                        </p>
                        <div id="skilt-oppslag">
                            <RegnrForm onSubmit={onSubmit} loading={loading}/>
                        </div>
                        {feil && (
                            <Callout tone="danger" className="mb-4">
                                {feil}
                            </Callout>
                        )}
                        <DisclosureNote variant="both"/>
                    </div>
                    <HeroPreview/>
                </section>
            </div>

            <section id="slik-virker-det" className="k-section bg-card">
                <div className="k-wrap">
                    <SectionHead eyebrow="Slik virker det" title="Tre steg, ingen registrering"/>
                    <div className="k-grid3">
                        {HVORDAN.map((h) => (
                            <Card key={h.n} pad="md">
                                <div className="k-step">
                                    <div className="flex items-center gap-3">
                                        <Icon name={h.icon} size={24} strokeColor="var(--kobolt-600)"/>
                                        <span className="k-stepnum">{h.n}</span>
                                    </div>
                                    <h3>{h.title}</h3>
                                    <p className="[font:var(--type-body-sm)] text-ink-secondary">{h.text}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="salgskanaler" className="k-section">
                <div className="k-wrap">
                    <SectionHead
                        eyebrow="Seks kanaler"
                        title="Kanalene vi rangerer"
                        action={
                            <Button variant="secondary" iconAfter="arrow-right" onClick={scrollTilOppslag}>
                                Se hva som passer din bil
                            </Button>
                        }
                    />
                    <div className="k-grid3">
                        {KANALER.map((c) => (
                            <Card key={c.name} pad="md" interactive>
                                <div className="flex items-start gap-3">
                                    <Icon name={c.icon} size={20} strokeColor="var(--text-muted)" className="mt-0.5"/>
                                    <div>
                                        <div className="[font:var(--type-h4)]">{c.name}</div>
                                        <p className="mt-1 [font:var(--type-body-sm)] text-ink-secondary">{c.text}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="om-dataene" className="k-section k-section--dark">
                <div className="k-wrap grid grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="k-eyebrow" style={{ color: "var(--sitron-300)" }}>
                            Om dataene
                        </div>
                        <h2 className="my-3 text-ink-inverse">Tekniske data fra registeret, vurderingen fra deg</h2>
                        <p className="max-w-[48ch] [font:var(--type-body-lg)] text-ink-inverse">
                            Vi slår opp skiltnummeret hos Statens vegvesen og bruker de tekniske dataene som de
                            er. Alt som handler om tilstand, hastverk og egeninnsats er dine egne svar. Vi
                            legger ikke til en verdivurdering.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <Button variant="accent" iconAfter="arrow-right" onClick={scrollTilOppslag}>
                                Slå opp bilen din
                            </Button>
                            <Button variant="ghost" style={{ color: "var(--text-inverse-secondary)" }}>
                                Les om metoden
                            </Button>
                        </div>
                    </div>
                    <Card tone="inverse" pad="md">
                        <div className="mb-4 k-eyebrow" style={{ color: "var(--text-inverse-secondary)" }}>
                            Dette henter vi
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["Merke", "Modell", "Registreringsstatus", "Drivstoff", "Girkasse", "Effekt", "Egenvekt", "Karosseri", "Antall seter", "Totalvekt","Euroklasse", "CO2-utslipp", "Rekkevidde", "EU-kontroll"].map(
                                (t) => (
                                    <span
                                        key={t}
                                        className="bs-tag"
                                        style={{
                                            background: "transparent",
                                            borderColor: "var(--border-inverse)",
                                            color: "var(--text-inverse-secondary)"
                                        }}
                                    >
                    {t}
                  </span>
                                ),
                            )}
                        </div>
                        <div className="mt-6">
                            <DisclosureNote variant="official" inverse/>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
