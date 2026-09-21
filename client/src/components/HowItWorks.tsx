export function HowItWorks() {
  return (
    <div className="flex flex-col gap-3 text-body-sm text-ink-secondary">
      <p>
        Rangeringen er en poengsum, ikke et prisanslag. Den bygger på to ting: tekniske
        kjøretøydata fra Statens vegvesen (alder, EU-kontroll, drivstoff, rekkevidde med mer),
        og svarene du selv oppgir om tilstand, kilometerstand, hastverk, ønsket innsats,
        heftelser og eventuelt eget verdianslag.
      </p>

      <p>
        Hver salgskanal starter på et basispoeng som sier hva som er fornuftig for en helt
        gjennomsnittlig bil. Derfra justerer et sett med regler poengsummen opp eller ned ut
        fra akkurat din bil og din situasjon — for eksempel gir høy kilometerstand i forhold
        til alder et løft til fastpris-oppkjøp og et trekk for privatsalg, mens en bil du
        uansett skal bytte inn hos forhandler løftes kraftig mot innbytte.
      </p>

      <p>
        Til slutt skaleres poengsummen til en indeks fra 40 til 100, slik at kanalene blir
        enkle å sammenligne. Bunnen er bevisst ikke null — selv den lavest rangerte kanalen kan
        være et reelt alternativ for deg. Under hver kanal ser du hvilke konkrete forhold som
        talte for og imot, og hvilke aktører som faktisk tar imot bilen din.
      </p>
    </div>
  );
}
