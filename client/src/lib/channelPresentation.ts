import type { SalgskanalId } from "../../../shared/recommendation/types";

export type ChannelMeta = { icon: string; label: string };

export type ChannelMeterTone = "neutral" | "good" | "warn" | "bad";

export type ChannelMeter = {
  label: string;
  value: number;
  valueLabel: string;
  tone: ChannelMeterTone;
};

export type ChannelPresentation = {
  icon: string;
  meta: ChannelMeta[];
  meters: ChannelMeter[];
};

/**
 * Visual facts (icon, at-a-glance meta pills, trade-off meters) per channel
 * ARCHETYPE — grounded in shared/recommendation/types.ts KANAL_BESKRIVELSE, not in
 * individual leverandør data (which varies per tilbyder, see providers.ts).
 */
export const CHANNEL_PRESENTATION: Record<SalgskanalId, ChannelPresentation> = {
  privatsalg: {
    icon: "users",
    meta: [
      { icon: "clock", label: "Oppgjør: 2–8 uker" },
      { icon: "wrench", label: "Høy egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 5, valueLabel: "Høy", tone: "bad" },
      { label: "Tid til oppgjør", value: 2, valueLabel: "Uker", tone: "bad" },
      { label: "Rekkevidde", value: 5, valueLabel: "Hele landet", tone: "good" },
    ],
  },
  forhandlerauksjon: {
    icon: "gavel",
    meta: [
      { icon: "clock", label: "Oppgjør: 2–5 dager" },
      { icon: "wrench", label: "Lav egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 2, valueLabel: "Lav", tone: "good" },
      { label: "Tid til oppgjør", value: 4, valueLabel: "2–5 dager", tone: "good" },
      { label: "Rekkevidde", value: 5, valueLabel: "Hele landet", tone: "good" },
    ],
  },
  "fastpris-oppkjop": {
    icon: "banknote",
    meta: [
      { icon: "clock", label: "Oppgjør: 1–3 dager" },
      { icon: "wrench", label: "Minimal egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 1, valueLabel: "Minimal", tone: "good" },
      { label: "Tid til oppgjør", value: 5, valueLabel: "1–3 dager", tone: "good" },
      { label: "Rekkevidde", value: 2, valueLabel: "Én kjøper", tone: "warn" },
    ],
  },
  kommisjon: {
    icon: "store",
    meta: [
      { icon: "clock", label: "Oppgjør: 30–90 dager" },
      { icon: "wrench", label: "Minimal egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 1, valueLabel: "Minimal", tone: "good" },
      { label: "Tid til oppgjør", value: 2, valueLabel: "30–90 dager", tone: "bad" },
      { label: "Rekkevidde", value: 3, valueLabel: "Regionalt", tone: "warn" },
    ],
  },
  innbytte: {
    icon: "handshake",
    meta: [
      { icon: "clock", label: "Oppgjør: ved levering" },
      { icon: "wrench", label: "Minimal egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 1, valueLabel: "Minimal", tone: "good" },
      { label: "Tid til oppgjør", value: 5, valueLabel: "Samme dag", tone: "good" },
      { label: "Rekkevidde", value: 2, valueLabel: "Én forhandler", tone: "warn" },
    ],
  },
  auksjonshus: {
    icon: "landmark",
    meta: [
      { icon: "clock", label: "Oppgjør: varierer" },
      { icon: "wrench", label: "Middels egeninnsats" },
    ],
    meters: [
      { label: "Egeninnsats", value: 3, valueLabel: "Middels", tone: "warn" },
      { label: "Tid til oppgjør", value: 2, valueLabel: "Varierer", tone: "warn" },
      { label: "Rekkevidde", value: 3, valueLabel: "Nisjekjøpere", tone: "warn" },
    ],
  },
};
