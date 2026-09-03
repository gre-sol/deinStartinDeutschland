# Bilder & visuelle Elemente – „Sachen einlagern“

Diese Datei dokumentiert **alle** Bilder und Icons, die die Unterseite
**„Sachen einlagern"** (`/sachen-einlagern`) verwendet.

> **Konvention:** Icons liegen unter `Bilder/icons/`, Fotos unter `Bilder/bilder/`.
> Die Seite referenziert die Dateien direkt per `<img src="Bilder/...">` mit
> **exakt** den unten genannten Dateinamen. Lege die Dateien dort selbst ab –
> während eine Datei fehlt, bleibt das Layout stabil (Platzhalter-Kasten).

**Stylegrundlage (bestehendes Design):**
- Minimalismus & Swiss Style
- Primärfarbe: `#2563EB` · Hell `#3B82F6` · Oberfläche `#FFFFFF` · Hintergrund `#FAFBFC`
- Phase „Deutschland verlassen“: Slate `#475569`, Hintergrund `#F8FAFC`
- Schrift: DM Sans / Inter, klare Hierarchie, viel Weißraum
- Helle, freundliche, vertrauenswürdige Optik ohne aufdringliche Farbakzente

---

## Ordnerstruktur

```
Bilder/
├── icons/      # Icons (SVG oder transparentes PNG, 1:1)
└── bilder/     # Fotos / größere Bilder
```

---

## A. Icons (`Bilder/icons/`)

### 1. Hero-Label
- **Datei:** `box.svg`
- **Verwendung:** im Label „Deutschland verlassen · Schritt 09"
- **Beschreibung:** Karton / gepackte Kiste als Symbol für „Gepäck vorbereiten".
- **Stil:** Linear-Strich, 1:1

### 2. Szenarien „Wann lohnt sich Einlagerung?"
| Datei        | Szenario                                        |
| ------------ | ------------------------------------------------ |
| `globe.svg`  | Längerer Aufenthalt im Ausland                   |
| `graduation.svg` | Auslandssemester / Studium                    |
| `briefcase.svg`  | Neuer Job oder Projekt im Ausland             |
| `compass.svg`    | Work & Travel                                |
| `sun.svg`        | Sabbatical                                   |
| `building.svg`   | Übergang zwischen zwei Wohnungen             |
| `truck.svg`      | Umzug ins Ausland                            |
| `home.svg`       | Untervermietung der bisherigen Wohnung       |

### 3. Karten „Welche Möglichkeiten gibt es?"
| Datei             | Karte                                  |
| ----------------- | -------------------------------------- |
| `truck-delivery.svg` | Einlagerung mit Abholung & Rücklieferung |
| `storage.svg`        | Self-Storage / eigene Lagerfläche     |

### 4. Chips „Was kann man einlagern?"
| Datei           | Stichwort                  |
| --------------- | -------------------------- |
| `sofa.svg`      | Möbel                      |
| `box-solid.svg` | Umzugskartons              |
| `t-shirt.svg`   | Kleidung                   |
| `cup.svg`       | Haushaltsgegenstände       |
| `lock.svg`      | Persönliche Gegenstände    |
| `bicycle.svg`   | Fahrräder                  |

### 5. Zurück-zur-Journey-Link
- **Datei:** `arrow-down-circle.svg`
- **Verwendung:** neben „Weitere Schritte für Deutschland verlassen entdecken"

---

## B. Fotos (`Bilder/bilder/`)

### 6. Hero-Visual
- **Datei:** `sachen-hero.png`
- **Position:** Hero der Seite
- **Beschreibung:** Moderne, minimalistische Aufnahme von gepackten Umzugskartons
  in einem hellen, ordentlichen Lagerraum mit Regalen. Heller, freundlicher Stil,
  dezente Abtönungen, viel Weißraum, keine unnötigen Details.
- **Format:** 16:9 (≈ 1200×675) · aktuell: `sachen-hero.png` von dir eingefügt

---

## C. Zusätzliche / optionale Elemente

### 7. SaveSpace – Partnerangebot (CTA-Bereich)
- **Datei (optional):** `Bilder/bilder/savespace-logo.svg` (offizielles Logo)
- **Verwendung:** Kennzeichnung des Partnerbereichs (Markenrichtlinien beachten)

### 8. Sozial-Preview / Open Graph
- **Datei (optional):** `Bilder/bilder/sachen-einlagern-og.jpg`
- **Format:** 1200×630 (1.91:1)
- **Verwendung:** `og:image` beim Teilen des Links

---

## Richtlinien für alle Elemente

- **Keine Emojis** – ausschließlich professionelle Icon-Dateien.
- **Konsistenter Stil** – gleiche Linienbreite, gleiche Farbtöne (`#2563EB`,
  `#475569`, Grautöne), gleicher Abstand pro Icon.
- **Barrierefreiheit** – dekorative Icons mit leerem `alt`/`aria-hidden`;
  bedeutungstragende Fotos mit aussagekräftigem `alt`.
- **Leistung** – Icons als SVG bevorzugen (skalierbar, klein); Fotos optimieren
  (WebP/JPEG, passende Größe, `loading="lazy"`).