/**
 * Auto-generert fra https://akfell-datautlevering.atlas.vegvesen.no/v3/api-docs.
 * Ikke rediger manuelt — kjør `npm run generate:types` på nytt for å oppdatere.
 */
export interface paths {
    "/kjoretoyoppslag/bulk/understellsnummer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Henter kjoretoydata og eierinformasjon basert på liste av understellsnummer. */
        post: operations["hentKjoretoydataForUnderstellsnummer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kjoretoyoppslag/bulk/kuid": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Henter kjoretoydata basert på kuid og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. Kun informasjon om eierskap, registrering og kjennemerke påvirkes av eventuell angitt DTG */
        post: operations["hentKjoretoyForKuid"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kjoretoyoppslag/bulk/kjennemerke": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Henter kjoretoydata basert på kjennemerke og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. */
        post: operations["hentKjoretoydataForKjennemerke"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intern/kuid": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Henter kjoretoydata basert på kuid og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. Kun informasjon om eierskap, registrering og kjennemerke påvirkes av eventuell angitt DTG */
        post: operations["hentKjoretoyForKuidUtenKvote"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intern/kuid/uteneier": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Henter kjoretoydata basert på kuid og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. Kun informasjon om registrering og kjennemerke påvirkes av eventuell angitt DTG */
        post: operations["hentKjoretoyForKuidUtenKvoteUtenEier"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kjoretoyoppslag/person": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Henter kjoretoydata og eierinformasjon basert på fodselsnummer eller idnummer og etternavn og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. */
        get: operations["hentKjoretoydataForFnrDnrEtternavn"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/kjoretoyoppslag/organisasjon": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Henter kjoretoydata og eierinformasjon basert på organisasjonsnummer og evt. dtg (dato-tidsgruppe) hvis klienten ønsker informasjon på et gitt tidspunkt. */
        get: operations["hentKjoretoydataForOrganisasjonsnummer"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/enkeltoppslag/kjoretoydata": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Henter kjoretoydata basert på understellsnummer, kjennemerke, eller personlig kjennemerke */
        get: operations["hentKjoretoydata"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        UnderstellsnummerRequest: {
            /**
             * @description Kjøretøyets understellsnummer
             * @default
             */
            understellsnummer: string;
        };
        AdrGodkjenning: {
            adrAnmerkninger?: string;
            adrAttestnummer?: string;
            adrBeskyttelseOverLastbarerKode?: components["schemas"]["KodeverkType"];
            adrEX2EX3GodkjentGods?: string;
            adrKjoretoyLukket?: boolean;
            adrNasjonaleKrav?: boolean;
            adrPabyggTypeKode?: components["schemas"]["KodeverkType"];
            adrTankTekniskeData?: components["schemas"]["AdrTankTekniskeData"];
            adrTidligereBestemmelser?: boolean;
            adrTilleggsbremsEffekt?: string;
            adrTilleggsbremsIkkeAktuelt?: boolean;
            adrTransportorAdresse?: string;
            adrTransportorNavn?: string;
            adrTransportorPostnrSted?: string;
            adrTypeKode?: string[];
            adrVekselbyggID?: string;
            adrVekselbyggIDFra?: string;
            adrVekselbyggIDTil?: string;
        };
        AdrTankGodkjentGods: {
            adrTankGodkjentFor?: string;
            adrTankStofferIhhtTankkode?: boolean;
        };
        AdrTankInndelingVolum: {
            adrTankInndelingVolum?: number[];
        };
        AdrTankTekniskeData: {
            /** Format: int32 */
            adrTankAntallRom?: number;
            adrTankFabrikat?: string;
            adrTankGodkjenningsnummer?: string;
            adrTankGodkjentGods?: components["schemas"]["AdrTankGodkjentGods"][];
            adrTankInndeling?: components["schemas"]["AdrTankInndelingVolum"];
            adrTankKode?: string;
            adrTankKofferdam?: boolean;
            adrTankLos?: boolean;
            /** Format: date */
            adrTankNesteTetthetsproveDato?: string;
            /** Format: date */
            adrTankNesteTrykkproveDato?: string;
            adrTankOverflyttetFra?: string;
            /** Format: int32 */
            adrTankProduksjonsAr?: number;
            adrTankSerienummer?: string;
            adrTankSpesielleBestemmelser?: string;
            /** Format: int32 */
            adrTankVolum?: number;
        };
        Adresse: {
            adresselinje1?: string;
            adresselinje2?: string;
            adresselinje3?: string;
            kommunenavn?: string;
            kommunenummer?: string;
            land?: string;
            landkode?: string;
            postnummer?: string;
            poststed?: string;
        };
        Aksel: {
            /** Format: int32 */
            antallHjul?: number;
            /** Format: int32 */
            avstandTilNesteAksling?: number;
            belastbar?: boolean;
            bremseAksel?: boolean;
            drivAksel?: boolean;
            /** Format: int32 */
            egenvektAksel?: number;
            /** Format: int32 */
            egenvektAkselMaks?: number;
            /** Format: int32 */
            egenvektAkselMin?: number;
            /** Format: int32 */
            fordelingAvTillattTotalvektAkselMaks?: number;
            /** Format: int32 */
            fordelingAvTillattTotalvektAkselMin?: number;
            /** Format: int64 */
            id?: number;
            loftbar?: boolean;
            luftfjaering?: boolean;
            /** Format: int32 */
            maksAvstandTilNesteAksling?: number;
            /** Format: int32 */
            maksimalSporvidde?: number;
            /** Format: int32 */
            minAvstandTilNesteAksling?: number;
            /** Format: int32 */
            minimalSporvidde?: number;
            plasseringAksel?: string;
            /** Format: int32 */
            sporvidde?: number;
            styreAksel?: boolean;
            /** Format: int32 */
            tekniskTillattAkselLast?: number;
            /** Format: int32 */
            tekniskTillattAkselLastForhoyet?: number;
            /** Format: int32 */
            tekniskTillattAkselLastVeg?: number;
        };
        AkselDekkOgFelg: {
            /** Format: int64 */
            akselId?: number;
            belastningskodeDekk?: string;
            belastningskodeDekkTraktor?: string;
            dekkdimensjon?: string;
            felgdimensjon?: string;
            hastighetskodeDekk?: string;
            innpress?: string;
            /** Format: int32 */
            tillattAkselLastTraktor?: number;
            tvilling?: boolean;
        };
        AkselDekkOgFelgKombinasjon: {
            akselDekkOgFelg?: components["schemas"]["AkselDekkOgFelg"][];
            /** Format: int32 */
            tillattTotalvektTraktor?: number;
        };
        AkselGruppe: {
            akselListe?: components["schemas"]["AkselListe"];
            /** Format: int32 */
            egenvektAkselGruppe?: number;
            /** Format: int32 */
            egenvektAkselGruppeMaks?: number;
            /** Format: int32 */
            egenvektAkselGruppeMin?: number;
            /** Format: int32 */
            fordelingAvTillattTotalvektAkselGruppeMaks?: number;
            /** Format: int32 */
            fordelingAvTillattTotalvektAkselGruppeMin?: number;
            /** Format: int32 */
            id?: number;
            plasseringAkselGruppe?: string;
            /** Format: int32 */
            tekniskTillattAkselGruppeLast?: number;
            /** Format: int32 */
            tekniskTillattAkselGruppeLastVeg?: number;
        };
        AkselInfo: {
            akselGruppe?: components["schemas"]["AkselGruppe"][];
            /** Format: int32 */
            antallAksler?: number;
            forbindelseMellomDrivaksler?: components["schemas"]["KodeverkType"];
        };
        AkselListe: {
            aksel?: components["schemas"]["Aksel"][];
        };
        Bremse: {
            abs?: boolean;
            bremsesystem?: string;
            driftsbremsBak?: string;
            driftsbremsForan?: string;
            tilhengerBremseforbindelse?: string[];
            /** Format: float */
            trykkMeterledningTilhengerkopling?: number;
            /** Format: float */
            trykktilsluttning1?: number;
            /** Format: float */
            trykktilsluttning2?: number;
        };
        BruktImportInfo: {
            importland?: components["schemas"]["Importland"];
            /** Format: int32 */
            kilometerstand?: number;
            tidligereUtenlandskKjennemerke?: string;
            tidligereUtenlandskVognkortNummer?: string;
        };
        DekkOgFelg: {
            akselDekkOgFelgKombinasjon?: components["schemas"]["AkselDekkOgFelgKombinasjon"][];
            dekkOgFelgSidevogn?: components["schemas"]["DekkOgFelgSidevogn"];
        };
        DekkOgFelgSidevogn: {
            belastningskodeDekkSidevogn?: string;
            dekkdimensjonSidevogn?: string;
            felgdimensjonSidevogn?: string;
            hastighetskodeDekkSidevogn?: string;
            innpressSidevogn?: string;
        };
        Dimensjoner: {
            /** Format: int32 */
            bredde?: number;
            /** Format: int32 */
            hoyde?: number;
            /** Format: int32 */
            lengde?: number;
            /** Format: int32 */
            lengdeInnvendigLasteplan?: number;
            /** Format: int32 */
            maksimalBredde?: number;
            /** Format: int32 */
            maksimalHoyde?: number;
            /** Format: int32 */
            maksimalLengde?: number;
            /** Format: int32 */
            maksimalLengdeInnvendigLasteplan?: number;
        };
        Drivstoff: {
            drivstoffKode?: components["schemas"]["KodeverkType"];
            /** Format: float */
            effektVektForhold?: number;
            /** Format: float */
            maksEffektPrTime?: number;
            /** Format: float */
            maksNettoEffekt?: number;
            /** Format: int32 */
            maksNettoEffektVedOmdreiningstallMin1?: number;
            /** Format: int32 */
            maksNettoEffektVedOmdreiningstallMin1Maks?: number;
            /** Format: int32 */
            maksOmdreining?: number;
            /** Format: float */
            spenning?: number;
            /** Format: int32 */
            tomgangsOmdreiningstall?: number;
        };
        DyretransportGodkjenning: {
            fornyelse?: boolean;
            /** Format: float */
            gulvareal?: number;
            hestetransporttype?: components["schemas"]["KodeverkType"];
            /** Format: int32 */
            takhoyde?: number;
        };
        EFTypegodkjenningsId: {
            typegodkjenningNrTekst?: string;
            typegodkjenningnummer?: components["schemas"]["Typegodkjenningsnummer"];
            variant?: string;
            versjon?: string;
        };
        EierskapBegrenset: {
            eier?: components["schemas"]["PersonEnhetBegrenset"];
            leasingtaker?: components["schemas"]["PersonEnhetBegrenset"];
            medeier?: components["schemas"]["PersonEnhetBegrenset"];
            underenhet?: components["schemas"]["PersonEnhetBegrenset"];
            /** Format: date-time */
            vedtakstidspunkt?: string;
        };
        Enhet: {
            organisasjonsnavn?: string;
            organisasjonsnummer?: string;
        };
        Fabrikant: {
            fabrikantAdresse?: string;
            fabrikantNavn?: string;
            fabrikantRepresentantAdresse?: string;
            fabrikantRepresentantNavn?: string;
        };
        ForbrukOgUtslipp: {
            /** Format: float */
            antallPartikler?: number;
            /** Format: float */
            co2BlandetKjoring?: number;
            /** Format: float */
            co2Bykjoring?: number;
            /** Format: float */
            co2Landeveiskjoring?: number;
            /** Format: float */
            coProsent?: number;
            /** Format: int32 */
            elEnergiforbruk?: number;
            /** Format: float */
            forbrukBlandetKjoring?: number;
            /** Format: float */
            forbrukBykjoring?: number;
            /** Format: float */
            forbrukLandeveiskjoring?: number;
            malemetode?: components["schemas"]["KodeverkType"];
            malemetodeAnnen?: string;
            partikkelfilterFabrikkmontert?: boolean;
            partikkelfilterUtslipp?: boolean;
            /** Format: int32 */
            rekkeviddeKm?: number;
            /** Format: float */
            utslippCOgPrKWh?: number;
            /** Format: float */
            utslippCOmgPrKm?: number;
            /** Format: float */
            utslippHCgPrKWh?: number;
            /** Format: float */
            utslippHCgPrMin?: number;
            /** Format: float */
            utslippHCmgPrKm?: number;
            /** Format: float */
            utslippHCogNOxMgPrKm?: number;
            /** Format: float */
            utslippKorrigertAbsorpsjonskoeffisient?: number;
            /** Format: float */
            utslippNMHCmgPrKm?: number;
            /** Format: float */
            utslippNOxGPrKWh?: number;
            /** Format: float */
            utslippNOxMgPrKm?: number;
            /** Format: float */
            utslippPartikkelAntallPrKm?: number;
            /** Format: float */
            utslippPartiklerGPrKWh?: number;
            /** Format: float */
            utslippPartiklerMgPrKm?: number;
            /** Format: float */
            utslippTHCmgPrKm?: number;
            /** Format: float */
            utslippTHCogNOxMgPrKm?: number;
            /** Format: float */
            vektetKombinertDrivstoff?: number;
            /** Format: int32 */
            vektetKombinertDrivstoffCO2?: number;
            wltpKjoretoyspesifikk?: components["schemas"]["WLTP"];
            wltpTypegodkjenningMaks?: components["schemas"]["WLTP"];
            wltpTypegodkjenningMedium?: components["schemas"]["WLTP"];
            wltpTypegodkjenningMin?: components["schemas"]["WLTP"];
        };
        ForstegangsTekniskGodkjenning: {
            bruktimport?: components["schemas"]["BruktImportInfo"];
            /** Format: date */
            forstegangRegistrertDato?: string;
            fortollingOgMva?: components["schemas"]["FortollingOgMva"];
            godkjenningsId?: string;
            godkjenningsundertype?: components["schemas"]["KodeverkType"];
            /** Format: date */
            gyldigFraDato?: string;
            /** Format: date-time */
            gyldigFraDatoTid?: string;
            kvalitetskodeForstegangRegDato?: components["schemas"]["KodeverkType"];
            oppbygdMedAvgiftsfritak?: components["schemas"]["OppbygdMedAvgiftsfritak"];
            unntak?: components["schemas"]["Unntak"][];
        };
        Forstegangsregistrering: {
            /** Format: date */
            registrertForstegangNorgeDato?: string;
        };
        FortollingOgMva: {
            annenReferanse?: string;
            beskrivelse?: string;
            dokumentreferanse?: string;
            fortollingsreferanse?: string;
            /** Format: int32 */
            linje?: number;
        };
        Generelt: {
            fabrikant?: components["schemas"]["Fabrikant"][];
            ferdigbyggetEllerEndretSomFolger?: string;
            handelsbetegnelse?: string[];
            merke?: components["schemas"]["Merke"][];
            tekniskKode?: components["schemas"]["KodeverkType"];
            tekniskUnderkode?: components["schemas"]["KodeverkType"];
            typebetegnelse?: string;
            unntakFra?: string;
        };
        Girutveksling: {
            girNummer?: string;
            /** Format: int32 */
            girutveksling?: number;
        };
        Godkjenning: {
            forstegangsGodkjenning?: components["schemas"]["ForstegangsTekniskGodkjenning"];
            kjoretoymerknad?: components["schemas"]["Kjoretoymerknad"][];
            registreringsbegrensninger?: components["schemas"]["Registreringsbegrensninger"];
            tekniskGodkjenning?: components["schemas"]["TekniskGodkjenning"];
            tilleggsgodkjenninger?: components["schemas"]["Tilleggsgodkjenning"][];
        };
        Importland: {
            landNavn?: string;
            landkode?: string;
        };
        KarosseriOgLasteplan: {
            antallDorer?: number[];
            /** Format: int32 */
            avstandNavSkjermbueBak?: number;
            /** Format: int32 */
            avstandNavSkjermbueForan?: number;
            bussKategori?: string;
            dorUtforming?: string[];
            fargeFjar?: string;
            forankringSikkerhetsseler?: string;
            forervern?: string;
            forervernBoyle?: string;
            godkjentADR?: string;
            hydrauliskLoft?: boolean;
            karosseriArt?: string;
            karosseritype?: components["schemas"]["KodeverkType"];
            kjennemerketypeBak?: components["schemas"]["KodeverkType"];
            kjennemerkestorrelseBak?: components["schemas"]["KodeverkType"];
            kjennemerketypeForan?: components["schemas"]["KodeverkType"];
            kjennemerkestorrelseForan?: components["schemas"]["KodeverkType"];
            kjennemerketypeVenstre?: components["schemas"]["KodeverkType"];
            kjennemerkestorrelseVenstre?: components["schemas"]["KodeverkType"];
            kjoringSide?: string;
            oppbygningUnderstellsnummer?: string;
            /** Format: int32 */
            overhengBak?: number;
            pabyggsKode?: components["schemas"]["KodeverkType"];
            passasjerHandtak?: string;
            plasseringAvDorer?: components["schemas"]["KodeverkType"];
            plasseringFabrikasjonsplate?: components["schemas"]["KodeverkType"][];
            plasseringMerkeplateTrimming?: string;
            plasseringUnderstellsnummer?: components["schemas"]["KodeverkType"][];
            rFarge?: components["schemas"]["KodeverkType"][];
            sikkerhetsseler?: string;
            styremekanismeArt?: string;
            temperaturregulertSkap?: boolean;
            vendbarForerplass?: boolean;
        };
        Kjennemerke: {
            /** Format: date-time */
            fomTidspunkt?: string;
            kjennemerke?: string;
            /** @enum {string} */
            kjennemerkekategori?: "KJORETOY" | "NORMAL" | "PERSONLIG" | "PROVE";
            kjennemerketype?: components["schemas"]["KodeverkType"];
            /** Format: date-time */
            tilTidspunkt?: string;
        };
        KjoretoyIdentitetBegrenset: {
            kjennemerke?: string;
            understellsnummer?: string;
            kuid?: string;
        };
        KjoretoyMedBegrensedeEieropplysninger: {
            kjoretoyId?: components["schemas"]["KjoretoyIdentitetBegrenset"];
            forstegangsregistrering?: components["schemas"]["Forstegangsregistrering"];
            kjennemerke?: components["schemas"]["Kjennemerke"][];
            registrering?: components["schemas"]["Registrering"];
            godkjenning?: components["schemas"]["Godkjenning"];
            periodiskKjoretoyKontroll?: components["schemas"]["PeriodiskKjoretoyKontroll"];
            eierskap?: components["schemas"]["EierskapBegrenset"];
        };
        Kjoretoyklassifisering: {
            beskrivelse?: string;
            efTypegodkjenning?: components["schemas"]["EFTypegodkjenningsId"];
            kjoretoyAvgiftsKode?: components["schemas"]["KodeverkType"];
            nasjonalGodkjenning?: components["schemas"]["NasjonaltGodkjenningsnummer"];
            spesielleKjennetegn?: string;
            tekniskKode?: components["schemas"]["KodeverkType"];
            tekniskUnderkode?: components["schemas"]["KodeverkType"];
            iSamsvarMedTypegodkjenning?: boolean;
        };
        Kjoretoymerknad: {
            merknad?: string;
            merknadtypeKode?: string;
        };
        KodeverkType: {
            kodeBeskrivelse?: string;
            kodeNavn?: string;
            kodeTypeId?: string;
            kodeVerdi?: string;
            tidligereKodeVerdi?: string[];
        };
        Kopling: {
            /** Format: int32 */
            avstandFremstePktTilSenterKopling?: number;
            /** Format: int32 */
            avstandSenterKoplingTilBakerstePkt?: number;
            /** Format: int32 */
            avstandSenterKoplingTilForsteAksel?: number;
            /** Format: int32 */
            avstandSisteAkselTilKingpinMaks?: number;
            /** Format: int32 */
            avstandSisteAkselTilKingpinMin?: number;
            /** Format: int32 */
            avstandSisteAkselTilSenterKopling?: number;
            /** Format: float */
            belastningDverdi?: number;
            /** Format: int32 */
            belastningLoddrettMaks?: number;
            /** Format: float */
            belastningSverdi?: number;
            /** Format: float */
            belastningUverdi?: number;
            /** Format: int32 */
            belastningVannrettMaks?: number;
            /** Format: float */
            belastningVverdi?: number;
            eftype?: string;
            fabrikantKopling?: string;
            handelsbetegnelseKopling?: string;
            type?: components["schemas"]["KodeverkType"];
        };
        Korreksjon: {
            godkjenningErKorrigert?: boolean;
            /** Format: date */
            virkningsdato?: string;
            felterEndret?: string[];
        };
        Krav: {
            kravomrade?: components["schemas"]["KodeverkType"];
            kravoppfyllelse?: components["schemas"]["KodeverkType"];
        };
        LarevognGodkjenning: {
            forekortklasser?: components["schemas"]["KodeverkType"];
            larevogn?: components["schemas"]["KodeverkType"];
        };
        Lyd: {
            /** Format: int32 */
            innvendigStoyniva?: number;
            /** Format: int32 */
            kjorestoy?: number;
            /** Format: int32 */
            standstoy?: number;
            stoyMalingOppgittAv?: components["schemas"]["KodeverkType"];
            /** Format: int32 */
            vedAntallOmdreininger?: number;
        };
        Merke: {
            merke?: string;
            merkeKode?: string;
        };
        MiljoOgDrivstoffGruppe: {
            drivstoffKodeMiljodata?: components["schemas"]["KodeverkType"];
            forbrukOgUtslipp?: components["schemas"]["ForbrukOgUtslipp"][];
            lyd?: components["schemas"]["Lyd"];
        };
        Miljodata: {
            /** Format: float */
            co2BesparelsePgaOkoInnovasjon?: number;
            euroKlasse?: components["schemas"]["KodeverkType"];
            lyddemperUtblas?: string;
            miljoOgdrivstoffGruppe?: components["schemas"]["MiljoOgDrivstoffGruppe"][];
            okoInnovasjon?: boolean;
            typeOkoInnovasjon?: string;
        };
        Motor: {
            /** Format: int32 */
            antallSylindre?: number;
            arbeidsprinsipp?: components["schemas"]["KodeverkType"];
            avgassResirkulering?: boolean;
            blandingsDrivstoff?: string;
            drivstoff?: components["schemas"]["Drivstoff"][];
            fabrikant?: string;
            fordampningsutslippKontrollSystem?: boolean;
            katalysator?: boolean;
            kjolesystem?: string;
            ladeluftkjoler?: boolean;
            luftInnsproytning?: boolean;
            motorKode?: string;
            motorNummer?: string;
            oksygenSensor?: boolean;
            overladet?: boolean;
            partikkelfilterMotor?: boolean;
            /** Format: int32 */
            slagvolum?: number;
            sylinderArrangement?: components["schemas"]["KodeverkType"];
        };
        MotorOgDrivverk: {
            /** Format: int32 */
            antallGir?: number;
            /** Format: int32 */
            antallGirBakover?: number;
            /** Format: int32 */
            effektKraftuttakKW?: number;
            girPlassering?: string;
            girkassetype?: components["schemas"]["KodeverkType"];
            giroverforingsType?: string;
            girutvekslingPrGir?: components["schemas"]["Girutveksling"][];
            hybridElektriskKjoretoy?: boolean;
            hybridKategori?: components["schemas"]["KodeverkType"];
            maksimumHastighet?: number[];
            maksimumHastighetMalt?: number[];
            motor?: components["schemas"]["Motor"][];
            obd?: boolean;
            /** Format: float */
            totalUtvekslingHoyesteGir?: number;
            utelukkendeElektriskDrift?: boolean;
        };
        NasjonaltGodkjenningsnummer: {
            nasjonaltGodkjenningsAr?: string;
            nasjonaltGodkjenningsHovednummer?: string;
            nasjonaltGodkjenningsUndernummer?: string;
        };
        OppbygdMedAvgiftsfritak: {
            arkivreferanse?: string[];
            delekjoretoy?: components["schemas"]["TekniskKjoretoyIdentitet"][];
            erstattetKjoretoy?: components["schemas"]["TekniskKjoretoyIdentitet"];
        };
        OvrigeTekniskeData: {
            /** Format: int32 */
            datafeltIndeks?: number;
            datafeltNavn?: string;
            datafeltVerdi?: string;
        };
        PeriodiskKjoretoyKontroll: {
            /** Format: date */
            kontrollfrist?: string;
            /** Format: date */
            sistGodkjent?: string;
        };
        PersonEnhetBegrenset: {
            adresse?: components["schemas"]["Adresse"];
            enhet?: components["schemas"]["Enhet"];
            /** Format: date-time */
            fomTidspunkt?: string;
            person?: components["schemas"]["PersonnavnMedFodselsdato"];
            /** Format: date-time */
            tilTidspunkt?: string;
        };
        PersonnavnMedFodselsdato: {
            etternavn?: string;
            /** Format: date */
            fodselsdato?: string;
            fornavn?: string;
            mellomnavn?: string;
        };
        Persontall: {
            /** Format: int32 */
            bareplasser?: number;
            /** Format: int32 */
            rullestolplasser?: number;
            sitteplassListe?: components["schemas"]["SitteplassListe"];
            /** Format: int32 */
            sitteplasserForan?: number;
            /** Format: int32 */
            sitteplasserNede?: number;
            /** Format: int32 */
            sitteplasserOppe?: number;
            /** Format: int32 */
            sitteplasserStillstand?: number;
            /** Format: int32 */
            sitteplasserTotalt?: number;
            /** Format: int32 */
            sitteplasserTotaltSomVarebilKlasse2?: number;
            /** Format: int32 */
            staplasser?: number;
        };
        Registrering: {
            /** Format: date-time */
            fomTidspunkt?: string;
            kjoringensArt?: components["schemas"]["KodeverkType"];
            neringskode?: string;
            neringskodeBeskrivelse?: string;
            registreringsstatus?: components["schemas"]["KodeverkType"];
            /** Format: date-time */
            registrertForstegangPaEierskap?: string;
            /** Format: date-time */
            tilTidspunkt?: string;
            vektarsavgiftOppgittGrunnlag?: components["schemas"]["VektarsavgiftOppgittGrunnlag"];
            /** Format: date-time */
            avregistrertSidenDato?: string;
        };
        Registreringsbegrensninger: {
            registreringsbegrensning?: components["schemas"]["KodeverkType"][];
        };
        Sitteplass: {
            beltekraftbegrenser?: boolean;
            beltestrammer?: boolean;
            frontairbag?: boolean;
            hodegardinairbag?: boolean;
            kneairbag?: boolean;
            posisjon?: string;
            /** Format: int32 */
            rad?: number;
            sideairbag?: boolean;
        };
        SitteplassListe: {
            sitteplass?: components["schemas"]["Sitteplass"][];
        };
        TekniskGodkjenning: {
            godkjenningsId?: string;
            godkjenningsundertype?: components["schemas"]["KodeverkType"];
            /** Format: date */
            gyldigFraDato?: string;
            /** Format: date-time */
            gyldigFraDatoTid?: string;
            kjoretoyklassifisering?: components["schemas"]["Kjoretoyklassifisering"];
            korreksjon?: components["schemas"]["Korreksjon"];
            krav?: components["schemas"]["Krav"][];
            tekniskeData?: components["schemas"]["TekniskeData"];
            unntak?: components["schemas"]["Unntak"][];
        };
        TekniskKjoretoyIdentitet: {
            kuid?: string;
            understellsbasertId?: components["schemas"]["UnderstellsbasertId"];
        };
        TekniskeData: {
            akslinger?: components["schemas"]["AkselInfo"];
            bremser?: components["schemas"]["Bremse"];
            dekkOgFelg?: components["schemas"]["DekkOgFelg"];
            dimensjoner?: components["schemas"]["Dimensjoner"];
            generelt?: components["schemas"]["Generelt"];
            karosseriOgLasteplan?: components["schemas"]["KarosseriOgLasteplan"];
            miljodata?: components["schemas"]["Miljodata"];
            motorOgDrivverk?: components["schemas"]["MotorOgDrivverk"];
            ovrigeTekniskeData?: components["schemas"]["OvrigeTekniskeData"][];
            persontall?: components["schemas"]["Persontall"];
            tilhengerkopling?: components["schemas"]["Tilhengerkopling"];
            vekter?: components["schemas"]["Vekter"];
        };
        Tilhengerkopling: {
            kopling?: components["schemas"]["Kopling"][];
        };
        Tilleggsgodkjenning: {
            godkjenningstype?: components["schemas"]["KodeverkType"];
            /** Format: date */
            godkjentFra?: string;
            /** Format: date-time */
            godkjentFraDatoTid?: string;
            /** Format: date */
            godkjentTil?: string;
            /** Format: date-time */
            godkjentTilDatoTid?: string;
            korreksjon?: components["schemas"]["Korreksjon"];
            krav?: components["schemas"]["Krav"][];
            tilleggsgodkjenningSpesifikkeData?: components["schemas"]["TilleggsgodkjenningSpesifikkeData"];
        };
        TilleggsgodkjenningSpesifikkeData: {
            adrGodkjenning?: components["schemas"]["AdrGodkjenning"];
            dyretransportGodkjenning?: components["schemas"]["DyretransportGodkjenning"];
            larevognGodkjenning?: components["schemas"]["LarevognGodkjenning"];
        };
        Typegodkjenningsnummer: {
            direktiv?: string;
            land?: string;
            serie?: string;
            utvidelse?: string;
        };
        UnderstellsbasertId: {
            merkekode?: string;
            understellsnummer?: string;
        };
        UnderstellsnummerBulkResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            responser?: components["schemas"]["UnderstellsnummerResponse"][];
        };
        UnderstellsnummerResponse: {
            feilmelding?: string;
            request?: components["schemas"]["UnderstellsnummerRequest"];
            kjoretoydataListe?: components["schemas"]["UnderstellsnummerTreffWrapper"][];
        };
        UnderstellsnummerTreffWrapper: {
            kjoretoydata?: components["schemas"]["KjoretoyMedBegrensedeEieropplysninger"];
            feilmelding?: string;
        };
        Unntak: {
            unntak?: components["schemas"]["KodeverkType"];
        };
        VektOgBremse: {
            bremseType?: string;
            /** Format: int32 */
            vogntogvekt?: number;
        };
        VektarsavgiftOppgittGrunnlag: {
            /** Format: int32 */
            antallAkslerTilhenger?: number;
            /** Format: int32 */
            totalvektTilhenger?: number;
        };
        Vekter: {
            /** Format: int32 */
            egenvekt?: number;
            /** Format: int32 */
            egenvektMaksimum?: number;
            /** Format: int32 */
            egenvektMinimum?: number;
            /** Format: int32 */
            egenvektTilhengerkopling?: number;
            frontOgHjulVekter?: string;
            /** Format: int32 */
            nyttelast?: number;
            /** Format: int32 */
            tekniskTillattForhoyetTotalvekt?: number;
            /** Format: int32 */
            tekniskTillattTotalvekt?: number;
            /** Format: int32 */
            tekniskTillattTotalvektVeg?: number;
            /** Format: int32 */
            tekniskTillattVektPahengsvogn?: number;
            /** Format: int32 */
            tekniskTillattVektSemitilhenger?: number;
            /** Format: int32 */
            tillattHjulLastSidevogn?: number;
            /** Format: int32 */
            tillattTaklast?: number;
            /** Format: int32 */
            tillattTilhengervektMedBrems?: number;
            /** Format: int32 */
            tillattTilhengervektUtenBrems?: number;
            /** Format: int32 */
            tillattTotalvekt?: number;
            /** Format: int32 */
            tillattVektSlepevogn?: number;
            /** Format: int32 */
            tillattVertikalKoplingslast?: number;
            /** Format: int32 */
            tillattVogntogvekt?: number;
            /** Format: int32 */
            tillattVogntogvektVeg?: number;
            vogntogvektAvhBremsesystem?: components["schemas"]["VektOgBremse"][];
        };
        WLTP: {
            /** Format: float */
            co2EkstraHoy?: number;
            /** Format: float */
            co2Hoy?: number;
            /** Format: float */
            co2Kombinert?: number;
            /** Format: float */
            co2Lav?: number;
            /** Format: float */
            co2Middels?: number;
            /** Format: float */
            co2VektetKombinert?: number;
            /** Format: float */
            forbrukEkstraHoy?: number;
            /** Format: float */
            forbrukHoy?: number;
            /** Format: float */
            forbrukKombinert?: number;
            /** Format: float */
            forbrukLav?: number;
            /** Format: float */
            forbrukMiddels?: number;
            /** Format: float */
            forbrukVektetKombinert?: number;
            /** Format: int32 */
            rekkeviddeKmBlandetkjoring?: number;
            /** Format: int32 */
            rekkeviddeKmBykjoring?: number;
            /** Format: int32 */
            elEnergiforbruk?: number;
            /** Format: float */
            nedcForbrukBykjoring?: number;
            /** Format: float */
            nedcForbrukLandeveiskjoring?: number;
            /** Format: float */
            nedcForbrukBlandetKjoring?: number;
            /** Format: float */
            nedcCo2BykjoringGPrKm?: number;
            /** Format: float */
            nedcCo2LandeveiskjoringGPrKm?: number;
            /** Format: float */
            nedcCo2BlandetKjoringGPrKm?: number;
            /** Format: float */
            nedcVektetKombinertDrivstoffCo2?: number;
            /** Format: float */
            nedcVektetKombinertDrivstoff?: number;
            /** Format: int32 */
            nedcEnergiforbruk?: number;
            /** Format: int32 */
            nedcRekkeviddeKm?: number;
            /** Format: float */
            veilastkoeffisientf0?: number;
            /** Format: float */
            veilastkoeffisientf1?: number;
            /** Format: float */
            veilastkoeffisientf2?: number;
            /** Format: float */
            testmasse?: number;
            /** Format: float */
            frontalareal?: number;
        };
        KuidRequest: {
            /**
             * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
             * @default
             * @example 2016-11-15T23:00:00.000+01:00
             */
            dtg: string;
            /**
             * @description Kjøretøyets kuid
             * @default
             */
            kuid: string;
        };
        KuidBulkResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            responser?: components["schemas"]["KuidResponse"][];
        };
        KuidResponse: {
            feilmelding?: string;
            request?: components["schemas"]["KuidRequest"];
            kjoretoydata?: components["schemas"]["KjoretoyMedBegrensedeEieropplysninger"];
        };
        KjennemerkeRequest: {
            /**
             * @description Kjøretøyets kjennemerke eller personlige kjennemerke
             * @default
             */
            kjennemerke: string;
            /**
             * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
             * @default
             * @example 2016-11-15T23:00:00.000+01:00
             */
            dtg: string;
        };
        KjennemerkeBulkResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            responser?: components["schemas"]["KjennemerkeResponse"][];
        };
        KjennemerkeResponse: {
            feilmelding?: string;
            request?: components["schemas"]["KjennemerkeRequest"];
            kjoretoydata?: components["schemas"]["KjoretoyMedBegrensedeEieropplysninger"];
        };
        KjoretoyUtenEieropplysninger: {
            kjoretoyId?: components["schemas"]["KjoretoyIdentitetBegrenset"];
            forstegangsregistrering?: components["schemas"]["Forstegangsregistrering"];
            kjennemerke?: components["schemas"]["Kjennemerke"][];
            registrering?: components["schemas"]["Registrering"];
            godkjenning?: components["schemas"]["Godkjenning"];
            periodiskKjoretoyKontroll?: components["schemas"]["PeriodiskKjoretoyKontroll"];
        };
        KuidBulkUtenEierResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            responser?: components["schemas"]["KuidUtenEierResponse"][];
        };
        KuidUtenEierResponse: {
            feilmelding?: string;
            request?: components["schemas"]["KuidRequest"];
            kjoretoydata?: components["schemas"]["KjoretoyUtenEieropplysninger"];
        };
        FodselsnummerRequest: {
            /**
             * @description Fodselsnummer til eier, medeier eller leasingtaker
             * @default
             */
            fodselsnummer: string;
            /**
             * @description Etternavn til eier, medeier eller leasingtaker
             * @default
             */
            etternavn: string;
            /**
             * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
             * @default
             * @example 2016-11-15T23:00:00.000+01:00
             */
            dtg: string;
        };
        FodselsnummerResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            feilmelding?: string;
            request?: components["schemas"]["FodselsnummerRequest"];
            kjoretoydataListe?: components["schemas"]["KjoretoydataWrapper"][];
        };
        Kjoretoy: {
            kjoretoyId?: components["schemas"]["KjoretoyIdentitetBegrenset"];
            forstegangsregistrering?: components["schemas"]["Forstegangsregistrering"];
            kjennemerke?: components["schemas"]["Kjennemerke"][];
            registrering?: components["schemas"]["Registrering"];
            godkjenning?: components["schemas"]["Godkjenning"];
            periodiskKjoretoyKontroll?: components["schemas"]["PeriodiskKjoretoyKontroll"];
            eierskap?: components["schemas"]["EierskapBegrenset"];
        };
        KjoretoydataWrapper: {
            kjoretoydata?: components["schemas"]["Kjoretoy"];
            feilmelding?: string;
        };
        OrganisasjonsnummerRequest: {
            /**
             * @description Organisasjonsummeret til eier eller medeier
             * @default
             */
            organisasjonsnummer: string;
            /**
             * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
             * @default
             * @example 2016-11-15T23:00:00.000+01:00
             */
            dtg: string;
            /**
             * Format: int32
             * @description Sidenummer for paginering hvis søkeresultatet gir flere treff enn antall-parameteren, begynner på side 0
             * @default
             */
            side: number;
            /**
             * Format: int32
             * @description Antall treff som skal returneres per side
             * @default
             */
            antall: number;
        };
        OrganisasjonsnummerResponse: {
            /** Format: int32 */
            gjenstaendeKvote?: number;
            feilmelding?: string;
            request?: components["schemas"]["OrganisasjonsnummerRequest"];
            kjoretoydataListe?: components["schemas"]["KjoretoydataWrapper"][];
        };
        EnkeltOppslagKjoretoydata: {
            kjoretoyId?: components["schemas"]["KjoretoyIdentitetBegrenset"];
            forstegangsregistrering?: components["schemas"]["Forstegangsregistrering"];
            kjennemerke?: components["schemas"]["Kjennemerke"][];
            registrering?: components["schemas"]["Registrering"];
            godkjenning?: components["schemas"]["Godkjenning"];
            periodiskKjoretoyKontroll?: components["schemas"]["PeriodiskKjoretoyKontroll"];
        };
        KjoretoydataResponse: {
            feilmelding?: string;
            kjoretoydataListe?: components["schemas"]["EnkeltOppslagKjoretoydata"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    hentKjoretoydataForUnderstellsnummer: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UnderstellsnummerRequest"][];
            };
        };
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UnderstellsnummerBulkResponse"];
                };
            };
            /** @description Antall elementer i request overstiger maks antall lovlig */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["UnderstellsnummerBulkResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    hentKjoretoyForKuid: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["KuidRequest"][];
            };
        };
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkResponse"];
                };
            };
            /** @description Antall elementer i request overstiger maks antall lovlig */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    hentKjoretoydataForKjennemerke: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["KjennemerkeRequest"][];
            };
        };
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KjennemerkeBulkResponse"];
                };
            };
            /** @description Antall elementer i request overstiger maks antall lovlig */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KjennemerkeBulkResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    hentKjoretoyForKuidUtenKvote: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["KuidRequest"][];
            };
        };
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkResponse"];
                };
            };
            /** @description Antall elementer i request overstiger maks antall lovlig */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkResponse"];
                };
            };
        };
    };
    hentKjoretoyForKuidUtenKvoteUtenEier: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["KuidRequest"][];
            };
        };
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkUtenEierResponse"];
                };
            };
            /** @description Antall elementer i request overstiger maks antall lovlig */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KuidBulkUtenEierResponse"];
                };
            };
        };
    };
    hentKjoretoydataForFnrDnrEtternavn: {
        parameters: {
            query: {
                /** @description Fodselsnummer/D-nummer */
                fodselsnummer: string;
                /** @description Skrevet eksakt som etternavn i folkeregisteret */
                etternavn: string;
                /**
                 * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
                 * @example 2016-11-15T23:00:00+01:00
                 */
                dtg?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["FodselsnummerResponse"];
                };
            };
            /** @description Soket resulterer i mer enn antall lovlige treff */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["FodselsnummerResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    hentKjoretoydataForOrganisasjonsnummer: {
        parameters: {
            query: {
                /** @description Organisasjonsnummer */
                organisasjonsnummer: string;
                /**
                 * @description Valgfri dato-tid - informasjonen som returneres er den som var gyldig på dette tidspunktet
                 * @example 2016-11-15T23:00:00+01:00
                 */
                dtg?: string;
                side?: number;
                antall?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["OrganisasjonsnummerResponse"];
                };
            };
            /** @description Antall-parameter er høyere enn tillatt antall treff */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["OrganisasjonsnummerResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
    hentKjoretoydata: {
        parameters: {
            query?: {
                /** @description Kjøretøyets understellsnummer */
                understellsnummer?: string;
                /** @description Kjøretøyets kjennemerke eller personlige kjennemerke */
                kjennemerke?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Data for kjøretøy leveres ut */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "*/*": components["schemas"]["KjoretoydataResponse"];
                };
            };
            /** @description Antall kjoretoy i respons overstiger kvote */
            422: {
                headers: {
                    /** @description Prøv igjen etter midnatt (norsk tid) */
                    "Retry-After"?: unknown[];
                    [name: string]: unknown;
                };
                content: {
                    "*/*": string;
                };
            };
        };
    };
}
