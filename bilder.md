# Bilderverzeichnis — Dein Start in Deutschland

Zentrale Dokumentation **aller** Bilder, die auf den Affiliate-/Partner-Service-Seiten
verwendet werden können.

## Regeln

- Alle zukünftigen Bilder sind standardmäßig **`.png`**.
- Die Website nutzt ein Bild **nur**, wenn die Datei tatsächlich im passenden Ordner
  existiert. Fehlt eine Datei, greift automatisch ein sauberer Platzhalter
  (farbige Bankkarten-Grafik bzw. monochromes Fallback) – es erscheinen **nie**
  kaputte Bildlinks.
- Es werden **keine externen Stockbilder** verwendet und **keine Bild-URLs erfunden**.
- Ordner-Struktur:
  - `images/` – Hero-Bilder, Produktbilder, Bankkarten-Motive, Logos
  - `Bilder/` – bestehende Website-Bilder (Logo, Icons), bleiben unverändert

## Hinweis zur Datenstruktur

Alle Bildpfade werden zentral in `js/data.js` hinterlegt (Felder `heroImage`,
`productImage`, `logo`). Eine Seite referenziert nur sich selbst – die Render-Funktion
prüft die Existenz der Datei und fällt bei fehlender Datei auf den Platzhalter zurück.

---

## 1. Service-Seiten

### 1.1 Bankkonto (`bankkonto.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `bankkonto-hero.png` | png | Hero-Bild der Bankkonto-Seite | Moderne Zusammenstellung aus Bankkarten (dezent, hell, hochwertig) – keine Logos, visuelle Aufbereitung | 1200 × 900 · 4:3 |
| `bank-c24.png` | png | Produktbild C24 Konto | Einzelne C24-Bankkarte vor neutralem Hintergrund | 600 × 600 · 1:1 |
| `bank-n26.png` | png | Produktbild N26 Standard | Einzelne N26-Bankkarte (schwarz) vor neutralem Hintergrund | 600 × 600 · 1:1 |
| `bank-revolut.png` | png | Produktbild Revolut Standard | Einzelne Revolut-Bankkarte (dunkel) vor neutralem Hintergrund | 600 × 600 · 1:1 |
| `bank-tfbank.png` | png | Produktbild TF Bank Girokonto | Einzelne TF-Bank-Karte vor neutralem Hintergrund | 600 × 600 · 1:1 |
| `bank-advanzia.png` | png | Produktbild Advanzia Mastercard Gold | Einzelne goldene Mastercard-Kreditkarte vor neutralem Hintergrund | 600 × 600 · 1:1 |

### 1.2 Kreditkarten (`kreditkarten.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `kreditkarten-hero.png` | png | Hero-Bild der Kreditkarten-Seite | Moderne Zusammenstellung aus Kreditkarten (dezent, hochwertig) | 1200 × 900 · 4:3 |
| `karte-advanzia-gold.png` | png | Produktbild Advanzia Mastercard Gold | Goldene Mastercard-Kreditkarte | 600 × 600 · 1:1 |
| `karte-barclays.png` | png | Produktbild Barclays Visa | Barclays-Visa-Karte | 600 × 600 · 1:1 |
| `karte-n26.png` | png | Produktbild N26 Kreditkarte | N26-Kreditkarte | 600 × 600 · 1:1 |

### 1.3 Einlagerung / Sachen einlagern (`sachen-einlagern.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `sachen-einlagern-hero.png` | png | Hero-Bild der Einlagerungs-Seite | Sauber gepackte Umzugskartons in einem hellen, modernen Lagerraum | 1200 × 900 · 4:3 |
| `savespace-logo.png` | png | Anbieter-Logo SaveSpace | Offizielles SaveSpace-Logo auf transparentem Hintergrund | 200 × 200 · 1:1 |

### 1.4 Internet & DSL (`internet.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `internet-hero.png` | png | Hero-Bild der Internet-/DSL-Seite | Moderne Kombination aus DSL-/Kabel-/Glasfaser-Darstellung | 1200 × 900 · 4:3 |

### 1.5 Strom & Energie (`strom-energie.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `strom-hero.png` | png | Hero-Bild der Strom-/Energie-Seite | Moderne Energie-/Strom-Darstellung | 1200 × 900 · 4:3 |

### 1.6 Versicherungen (`versicherungen.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `versicherung-hero.png` | png | Hero-Bild der Versicherungs-Seite | Moderne Versicherungs-/Schutz-Darstellung | 1200 × 900 · 4:3 |

### 1.7 Geldtransfer (`geldtransfer.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `geldtransfer-hero.png` | png | Hero-Bild der Geldtransfer-Seite | Moderne Geldtransfer-/Wechselkurs-Darstellung | 1200 × 900 · 4:3 |

### 1.8 ADAC & Mobilität (`adac-mobilitaet.html`)

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `adac-hero.png` | png | Hero-Bild der ADAC-/Mobilität-Seite | Moderne Mobilitäts-/Straßen-Darstellung | 1200 × 900 · 4:3 |

### 1.9 Deutschlandticket (`deutschlandticket.html`)

Es existiert **kein** dediziertes Hero-Bild. Die Seite nutzt im Hero das eingebaute
geometrische Fallback (`.tpl-hero__noimg` – diagonaler Akzent, „DE“-Geisterzahl, ÖPNV-Icon).
Soll zukünftig ein Bild verwendet werden, hier ablegen:

| Dateiname | Endung | Verwendung | Beschreibung | Empfohlene Größe / Seitenverhältnis |
|---|---|---|---|---|
| `deutschlandticket-hero.png` | png | Hero-Bild der Deutschlandticket-Seite | Moderne ÖPNV-/Ticket-Darstellung (Bus & Bahn) | 1200 × 900 · 4:3 |

---

## 2. Hinweise zur Bildqualität

- **Hero-Bilder** (1200 × 900): großzügiger Weißraum, dezente, helle Farbgebung,
  hochwertige Produktfotografie bzw. eine reine Gestaltungs-Aufbereitung. Text wird
  nicht in Bildern platziert (SEO).
- **Produktbilder / Bankkarten** (600 × 600): einzelnes Objekt, mittig, auf
  neutralem (hellen) Hintergrund, keine Logos mit Fremdrechten. Die Kartenfläche
  wird im Template bereits als reine CSS-/SVG-Grafik in einheitlichem Seitenverhältnis
  gerendert – ein echtes PNG ersetzt diese nur, wenn es vorhanden ist.
- **Logos** (200 × 200): offizielle Markenlogos, transparent, mit ausreichendem
  Sicherheitsabstand (clear space). Nicht recolorieren oder verzerren.
