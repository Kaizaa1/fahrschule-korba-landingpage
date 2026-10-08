export type NavigationItem = {
  label: string;
  href: string;
};

export type DrivingClass = {
  code: string;
  name: string;
  description: string;
  note: string;
};

export type Instructor = {
  name: string;
  classes: string;
  focus: string;
  image: string;
  imageAlt: string;
};

export type PriceItem = {
  group: "Startkosten" | "Fahrstunden" | "Prüfungen" | "Extras";
  label: string;
  value: string;
  note?: string;
};

export const siteContent = {
  name: "Fahrschule Korba",
  location: "Krefeld",
  claim: "Führerschein so leicht wie noch nie",
  description:
    "Moderne Fahrausbildung in Krefeld mit klarer Planung, fairer Vorbereitung und Fahrlehrern, die zu dir passen.",
  offers: ["Klasse B", "B197", "Automatik", "Auffrischung"],
  primaryCta: "Termin buchen",
  secondaryCta: "Preise ansehen",
  navigation: [
    { label: "Klassen", href: "/#klassen" },
    { label: "Ablauf", href: "/#ablauf" },
    { label: "Team", href: "/#team" },
    { label: "Preise", href: "/#preise" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavigationItem[],
} as const;

export const imageAssets = {
  logoMark: "/images/korba-logo-mark.png",
  logoFull: "/images/korba-logo-full.png",
  car: "/images/korba-touareg-hero.png",
  teamCar: "/images/korba-touareg-team.png",
  app: "/images/korba-app.webp",
  team: {
    mara: "/images/team-mara.webp",
    leonie: "/images/team-leonie.webp",
    samir: "/images/team-samir.webp",
  },
} as const;

export const advantages = [
  {
    title: "Planung, die du verstehst",
    description: "Du weißt, was als Nächstes ansteht und wie du dich vorbereiten kannst.",
  },
  {
    title: "Theorie und Praxis zusammen gedacht",
    description: "Lernstand, Fahrstunden und Prüfungsvorbereitung greifen sinnvoll ineinander.",
  },
  {
    title: "Fahrlehrer passend auswählen",
    description: "Bei der Anfrage kannst du direkt angeben, mit wem du fahren möchtest.",
  },
  {
    title: "Ruhig bis zur Prüfung",
    description: "Klare Rückmeldungen helfen dir, sicherer und ohne unnötigen Druck zu lernen.",
  },
] as const;

export const drivingClasses: DrivingClass[] = [
  {
    code: "B",
    name: "Klasse B",
    description: "Der klassische Pkw-Führerschein mit Schaltwagen oder Automatik.",
    note: "Ab 17 mit Begleitung möglich",
  },
  {
    code: "B197",
    name: "B197",
    description: "Prüfung auf Automatik, nach Ausbildung auch Schaltwagen fahren.",
    note: "Automatik und Schaltung kombiniert",
  },
  {
    code: "AUTO",
    name: "Automatik",
    description: "Konzentriere dich ohne Schaltvorgänge vollständig auf Verkehr und Strecke.",
    note: "Ruhiger Einstieg",
  },
  {
    code: "AUF",
    name: "Auffrischung",
    description: "Gezielte Fahrstunden für Wiedereinstieg, Stadtverkehr oder Autobahn.",
    note: "Tempo nach deinem Bedarf",
  },
  {
    code: "INT",
    name: "Intensivkurs",
    description: "Kompakte Ausbildung mit verbindlicher Planung in einem engen Zeitraum.",
    note: "Nach Verfügbarkeit",
  },
] as const;

export const processSteps = [
  { title: "Beratung", description: "Wir klären Klasse, Zeitplan und offene Fragen." },
  { title: "Anmeldung", description: "Du erhältst eine klare Übersicht zu Unterlagen und Kosten." },
  { title: "Theorie", description: "Unterricht und App helfen dir, den Stoff sicher zu verstehen." },
  { title: "Praxis", description: "Deine Fahrstunden bauen nachvollziehbar aufeinander auf." },
  { title: "Vorbereitung", description: "Wir üben gezielt das, was für deine Prüfung noch fehlt." },
  { title: "Prüfung", description: "Du startest erst, wenn Fahrlehrer und du bereit dafür seid." },
] as const;

export const appFeatures = [
  "Theorie lernen",
  "Termine sehen",
  "Lernstand prüfen",
  "Nachrichten erhalten",
  "Prüfung vorbereiten",
] as const;

export const team: Instructor[] = [
  {
    name: "Mara Özdemir",
    classes: "Klasse B, B197, Automatik",
    focus: "Prüfungsvorbereitung und ruhiger Einstieg",
    image: imageAssets.team.mara,
    imageAlt: "Porträt von Fahrlehrerin Mara Özdemir",
  },
  {
    name: "Leonie Krüger",
    classes: "Klasse B, Auffrischung, Automatik",
    focus: "Fahrstundenplanung und Wiedereinstieg",
    image: imageAssets.team.leonie,
    imageAlt: "Porträt von Fahrlehrerin Leonie Krüger",
  },
  {
    name: "Samir Haddad",
    classes: "Klasse B, Schaltwagen, Sonderfahrten",
    focus: "Intensivkurse und praktische Prüfung",
    image: imageAssets.team.samir,
    imageAlt: "Porträt von Fahrlehrer Samir Haddad",
  },
];

export const prices: PriceItem[] = [
  { group: "Startkosten", label: "Grundbetrag", value: "349 €" },
  { group: "Startkosten", label: "Fahrschulapp", value: "49 € einmalig", note: "Enthält Lernstand und Prüfungsvorbereitung" },
  { group: "Fahrstunden", label: "Fahrstunde Klasse B", value: "62 € / 45 Min." },
  { group: "Fahrstunden", label: "Sonderfahrt", value: "72 € / 45 Min." },
  { group: "Prüfungen", label: "Vorstellung Theorieprüfung", value: "69 €" },
  { group: "Prüfungen", label: "Vorstellung Praxisprüfung", value: "179 €" },
  { group: "Extras", label: "B197 Zusatzmodul", value: "249 €" },
  { group: "Extras", label: "Auffrischungsstunde", value: "65 € / 45 Min." },
];

export const faqItems = [
  {
    question: "Was kostet der Führerschein bei Fahrschule Korba?",
    answer:
      "Die Gesamtkosten hängen von der Anzahl deiner Fahrstunden ab. Grundbetrag, App, Fahrstunden, Sonderfahrten und Prüfungsgebühren sind auf der Startseite einzeln aufgeführt.",
  },
  {
    question: "Welche Unterlagen brauche ich für die Anmeldung?",
    answer:
      "In der Regel brauchst du Ausweis, biometrisches Passfoto, Sehtest und Erste-Hilfe-Nachweis. Bei der Beratung bekommst du eine vollständige Checkliste.",
  },
  {
    question: "Was ist B197?",
    answer:
      "Bei B197 legst du die praktische Prüfung auf einem Automatikfahrzeug ab. Nach einer zusätzlichen Schaltkompetenzschulung darfst du anschließend auch Schaltwagen fahren.",
  },
  {
    question: "Kann ich mir den Fahrlehrer aussuchen?",
    answer:
      "Ja. Bei deiner Anfrage kannst du Mara, Leonie oder Samir auswählen. Wenn du flexibel bist, wählst du einfach egal.",
  },
  {
    question: "Gibt es Fahrlehrerinnen?",
    answer: "Ja. Im Team unterrichten zwei Fahrlehrerinnen und ein Fahrlehrer.",
  },
  {
    question: "Wie schnell bekomme ich Fahrstunden?",
    answer:
      "Das hängt von deinen Zeitfenstern und der aktuellen Planung ab. Wir stimmen einen realistischen Rhythmus mit dir ab, bevor es losgeht.",
  },
  {
    question: "Wie funktioniert die Fahrschulapp?",
    answer:
      "Die App bündelt Theoriefragen, Termine, Lernstand, Nachrichten und deine Prüfungsvorbereitung. Die Beispielkosten liegen bei 49 Euro einmalig.",
  },
  {
    question: "Kann ich die Ausbildung komplett mit Automatik machen?",
    answer:
      "Ja. Du kannst die praktische Ausbildung und Prüfung auf Automatik absolvieren. Wir erklären dir vorher, welche Fahrerlaubnisregelung zu deinem Ziel passt.",
  },
  {
    question: "Bietet ihr Auffrischungsstunden an?",
    answer:
      "Ja. Auffrischungsstunden können sich auf Stadtverkehr, Parken, Autobahn oder einen allgemeinen Wiedereinstieg konzentrieren.",
  },
  {
    question: "Wie läuft die Anmeldung ab?",
    answer:
      "Nach deiner Anfrage vereinbaren wir eine Beratung, klären deine Führerscheinklasse und gehen Unterlagen, Zeitplan und Kosten gemeinsam durch.",
  },
] as const;

export const contactDetails = {
  phone: "02151 000000",
  email: "hallo@fahrschule-korba.de",
  whatsapp: "02151 000000",
  openingHours: ["Mo-Do 14:00-18:30", "Fr 14:00-17:00"],
  demoNote: "Fiktive Kontaktdaten für den Website-Prototyp",
} as const;
