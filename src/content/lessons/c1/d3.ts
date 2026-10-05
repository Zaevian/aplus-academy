import type { Lesson } from "../../schema";

export const C1_D3_LESSONS: Lesson[] = [
  {
    id: "C1-D3-O1-L1",
    objectiveId: "C1-D3-O1",
    slug: "display-panel-types",
    title: "LCD, OLED, and Mini-LED: what the panel actually is",
    description:
      "Compare IPS, TN, VA, OLED, and Mini-LED so you can match a display to color, contrast, motion, and burn-in risk.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D3-O1-IPS",
      "C1-D3-O1-TN",
      "C1-D3-O1-VA",
      "C1-D3-O1-OLED",
      "C1-D3-O1-MINILED",
    ],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A help-desk ticket that says 'the screen looks washed out' is not one problem. Off-angle TN, a failing backlight, OLED burn-in, and a Mini-LED halo around a logo are different physics. If you cannot name the panel family, you will replace the wrong part or give the wrong advice.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O1-L1-r1",
        title: "LCD is a shutter; the backlight does the lighting",
        markdown: `A **liquid crystal display (LCD)** does not emit light from each picture element (pixel). A backlight shines through a sandwich of polarizers and liquid crystals. The crystals twist when a voltage is applied and act as shutters that pass or block that light. Color filters turn white backlight into red, green, and blue subpixels.

Three LCD liquid-crystal alignments appear on CompTIA A+ V15:

**Twisted nematic (TN)** twists the crystals 90 degrees. It switches quickly, which is why older eSports panels advertised 1 ms response times, and it is cheap to manufacture. The cost is viewing angle. Sit above or beside a TN laptop and skin tones go gray or invert. Color accuracy is the weakest of the three LCD families. TN is a budget and legacy-gaming answer, not a photo-editing answer.

**In-plane switching (IPS)** rotates crystals in the plane of the glass instead of standing them up. That geometry keeps color more stable as you move off axis, so IPS is the default for office, design, and most modern laptops. Historically IPS was slower and more expensive than TN; modern IPS has closed much of the speed gap. IPS can show a pale glow in dark rooms at extreme corners ("IPS glow"). Contrast is typically lower than VA because some backlight always leaks.

**Vertical alignment (VA)** parks crystals perpendicular to the glass when a pixel is off, which blocks more backlight. VA therefore delivers higher static contrast and deeper-looking blacks than IPS. The tradeoff is slower transitions between dark shades (black smear in credits and night scenes) and viewing angles that sit between IPS and TN.

When a stem says "best color accuracy and viewing angles," think IPS. "Fastest cheap panel, poor angles" is TN. "Highest LCD contrast" is VA. Do not call any of them OLED. They all still need a backlight.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O1-L1-d1",
        component: "DisplayCompareDiagram",
        title: "Panel families side by side",
        caption:
          "TN, IPS, VA, OLED, and Mini-LED differ in how light is made and how it is shuttered.",
        notice:
          "Notice Mini-LED is still an LCD with a finer backlight. OLED has no backlight at all. Those two facts decide burn-in, thickness, and black level questions.",
        alt: "Five display types compared on backlight, viewing angle, contrast, motion, and burn-in risk.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O1-L1-kc1",
        questionIds: ["C1-D3-O1-IPS-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O1-L1-r2",
        title: "OLED emits; Mini-LED is a better flashlight behind glass",
        markdown: `**Organic light-emitting diode (OLED)** panels are self-emissive. Each subpixel is a tiny organic diode that makes its own light. To show black, the pixel turns off. That is why OLED contrast looks infinite in a dark room and why viewing angles stay wide: there is no backlight leaking around a shutter. The organic materials age. Static taskbars, channel logos, and HUD elements can **burn in** (permanent image retention). OLED peak brightness is often lower than a high-end Mini-LED LCD in a bright office, and some panels use pulse-width modulation that sensitive users notice as flicker.

**Mini light-emitting diode (Mini-LED)** is not a cousin of OLED. It is an LCD backlight made of thousands of very small LEDs instead of a handful of edge lights or a coarse full-array grid. Those LEDs are grouped into **local dimming zones**. A dark sky with a bright moon can dim most zones while the moon zone stays bright, which is how Mini-LED produces high-dynamic-range (HDR) punch without OLED's burn-in story. Because the liquid-crystal layer is still there, Mini-LED can **bloom** or halo around bright objects when a zone is larger than the object. Mini-LED sets are typically thicker than OLED and can be much brighter.

Exam traps:

- Mini-LED is a backlight technology for LCD. It is not "tiny OLED pixels."
- OLED burn-in is a real operational concern for kiosks, reception TVs, and CAD machines with static UI.
- Replacing a "dim laptop screen" is not automatically an LCD swap. On older **cold-cathode fluorescent lamp (CCFL)** panels the inverter or lamp dies first. On LED-backlit LCD the LED strip or its driver dies. On OLED the panel itself is the light source.

When a customer wants a conference-room display that sits on a logo for ten hours a day, Mini-LED or conventional LCD is usually safer than OLED. When they want a phone that looks black in a theater, OLED is the expected technology.`,
      },
      {
        type: "table",
        id: "C1-D3-O1-L1-t1",
        title: "Panel comparison at A+ depth",
        headers: ["Type", "How it makes light", "Strength", "Exam weakness"],
        rows: [
          ["TN LCD", "Backlight + fast shutters", "Response time, price", "Viewing angles, color"],
          ["IPS LCD", "Backlight + in-plane shutters", "Angles and color", "Contrast, IPS glow"],
          ["VA LCD", "Backlight + vertical shutters", "LCD contrast", "Motion smear, mid angles"],
          ["OLED", "Self-emissive pixels", "True black, thin, wide angles", "Burn-in, brightness"],
          ["Mini-LED", "LCD + dense LED local dimming", "HDR brightness, less burn-in", "Blooming; still an LCD"],
        ],
        caption: "Match the stem's priority (angles, contrast, burn-in, HDR) to one row. Do not memorize a single 'best' panel.",
      },
      {
        type: "callout",
        id: "C1-D3-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the stem mentions burn-in, the panel is OLED. If it mentions local dimming zones, blooming, or a dense LED backlight behind an LCD, the panel is Mini-LED. If it mentions washed-out color when viewed from the side on a cheap laptop, the panel is TN.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O1-L1-kc2",
        questionIds: ["C1-D3-O1-MINILED-Q001"],
      },
      {
        type: "summary",
        id: "C1-D3-O1-L1-sum",
        bullets: [
          "LCD (TN/IPS/VA) shutters a backlight; OLED pixels emit their own light.",
          "IPS wins angles and color; TN wins cheap speed; VA wins LCD contrast.",
          "Mini-LED is a fine-grained LCD backlight, not OLED.",
          "OLED burn-in and Mini-LED blooming are the two HDR failure modes to keep separate.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O1-L2",
    objectiveId: "C1-D3-O1",
    slug: "display-attributes-digitizer-inverter",
    title: "Digitizers, inverters, and the numbers on the box",
    description:
      "Separate the touch layer from the panel, know when an inverter exists, and read resolution, refresh, density, and gamut.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D3-O1-DIGITIZER",
      "C1-D3-O1-INVERTER",
      "C1-D3-O1-IPS",
      "C1-D3-O1-OLED",
    ],
    prerequisites: ["C1-D3-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A 2-in-1 with a perfect picture and dead touch is not 'a bad screen.' A 2008 CCFL laptop that is dark but faintly visible with a flashlight is not a failed GPU. Technicians who treat the lid as one part waste money.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O1-L2-r1",
        title: "Digitizer versus panel, inverter versus LED backlight",
        markdown: `A **digitizer** is the layer that turns a finger or stylus into coordinates. On phones and modern convertibles it is usually a capacitive overlay bonded to the glass. Older resistive digitizers needed pressure. Some drawing tablets and high-end convertibles add an active-stylus sensor (a separate digitizer controller) that works with a powered pen. The liquid-crystal or OLED panel underneath is independent. You can have:

- image works, touch dead — digitizer, flex cable, or touch controller
- touch works, image dead or backlight dead — panel, GPU, cable, or backlight
- stylus dead, finger touch fine — active digitizer/pen pairing, not the whole screen

Do not replace an entire LCD assembly on a corporate standard model until you have checked the vendor parts list. Many units sell glass/digitizer separate from the LCD.

An **inverter** belongs to **CCFL** backlights. The fluorescent tube wants high-voltage alternating current. The laptop battery and motherboard supply low-voltage direct current, so a small inverter board (often along the bottom of the lid) steps that up. Symptoms of inverter or CCFL failure: the image is faintly visible with a flashlight, the screen is black, or it flickers and then goes dark. **Light-emitting diode (LED)** backlights — including Mini-LED — run on DC and do **not** use that high-voltage inverter. Replacing an inverter on an LED-backlit panel is a parts-lookup failure.

When you open a lid, disconnect the battery first. Display cables are fragile and often run through the hinge. A damaged hinge cable can mimic GPU failure (flicker on lid angle) and is a cheaper first inspection than a motherboard.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O1-L2-d1",
        component: "DisplayCompareDiagram",
        title: "Layers you can fail independently",
        caption:
          "Glass and digitizer, LCD or OLED cell, backlight or self-emissive pixels, and (on CCFL only) the inverter.",
        notice:
          "Notice the flashlight test: a faint image on a black CCFL laptop points at backlight or inverter, not at 'no video.'",
        alt: "Cross-section of a laptop lid showing glass, digitizer, panel, backlight, and inverter only on CCFL designs.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O1-L2-kc1",
        questionIds: ["C1-D3-O1-DIGITIZER-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O1-L2-r2",
        title: "Resolution, refresh, density, and gamut",
        markdown: `**Screen resolution** is the pixel count: width times height. Full HD is 1920×1080. Quad HD is 2560×1440. Ultra HD / 4K is 3840×2160. More pixels at the same physical size means higher **pixel density**, usually quoted in pixels per inch (PPI). High PPI looks sharp for text; it also demands more graphics memory bandwidth and can make interface elements tiny unless the operating system scales.

**Refresh rate** is how many times per second the panel can present a new frame, in hertz (Hz). 60 Hz is the office default. 144 Hz and 240 Hz are gaming and motion-clarity numbers. A 144 Hz panel still needs a GPU and a cable that can carry that mode (DisplayPort or HDMI version matters). High refresh does not fix a 30 fps video file; it only helps when the source produces more frames.

**Color gamut** is the range of colors the panel can produce, often compared to sRGB, DCI-P3, or Adobe RGB. A marketing "100% sRGB" office IPS is plenty for tickets and documents. Photo work may specify a wide-gamut panel and a calibration target. OLED and good IPS generally cover wide gamuts more easily than TN. Mini-LED helps HDR *brightness* more than it magically expands gamut; quantum-dot films on some Mini-LED LCDs are what widen color.

Technician reading of a spec sheet: do not upsell 4K at 13 inches to a user who will run 150% scaling and hate small text. Do not sell a 60 Hz TN to a motion-design intern. Do not promise OLED in a reception kiosk that shows a static logo. The attributes exist so you can match the job, not so you can recite the largest number.`,
      },
      {
        type: "table",
        id: "C1-D3-O1-L2-t1",
        title: "Attribute decoder",
        headers: ["Attribute", "Unit / example", "What a technician uses it for"],
        rows: [
          ["Resolution", "1920×1080, 3840×2160", "Sharpness vs GPU load and UI scaling"],
          ["Pixel density", "PPI", "Whether text looks crisp at a given size"],
          ["Refresh rate", "60 / 144 / 240 Hz", "Motion clarity; needs GPU + cable support"],
          ["Color gamut", "sRGB, DCI-P3", "Office vs photo/video color needs"],
          ["Digitizer", "Capacitive / active stylus", "Touch or pen independent of the image"],
          ["Inverter", "CCFL laptops only", "Dark-but-visible image; not used on LED/OLED"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O1-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Ordering a whole LCD assembly because touch failed, or ordering an inverter for an LED-backlit or OLED panel. Read the service manual. CCFL + inverter is a specific older design.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O1-L2-kc2",
        questionIds: ["C1-D3-O1-INVERTER-Q001"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O1-L2-cp",
        questionIds: [
          "C1-D3-O1-IPS-Q002",
          "C1-D3-O1-TN-Q001",
          "C1-D3-O1-VA-Q001",
          "C1-D3-O1-OLED-Q001",
          "C1-D3-O1-MINILED-Q002",
          "C1-D3-O1-DIGITIZER-Q002",
          "C1-D3-O1-INVERTER-Q002",
        ],
      },
      {
        type: "lab",
        id: "C1-D3-O1-L2-lab",
        labId: "C1-D3-O1-DISPLAY-LAB",
        title: "Display technology matching lab",
        prompt:
          "Match IPS, high-refresh TN, OLED, and digitizer choices to the design, esports, film, and touch-dead tickets. Leave the CCFL inverter and whole-panel-for-touch unmatched.",
      },
      {
        type: "summary",
        id: "C1-D3-O1-L2-sum",
        bullets: [
          "Digitizer (touch/pen) can fail without the image failing.",
          "Inverters exist for CCFL backlights only; LED and OLED do not use them.",
          "Resolution, PPI, refresh, and gamut are matching tools, not a single 'better' score.",
          "Flashlight test plus lid-flex test separate backlight, cable, and GPU stories.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O2-L1",
    objectiveId: "C1-D3-O2",
    slug: "copper-t568-network-cables",
    title: "Copper Ethernet, T568A/B, and the jacket ratings",
    description:
      "Terminate T568A and T568B from a verified diagram, then pick UTP, STP, plenum, burial, and coax for the path.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D3-O2-T568",
      "C1-D3-O2-UTP",
      "C1-D3-O2-RJ45",
    ],
    prerequisites: ["C1-D3-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A cable that looks like Ethernet can still be the wrong category, the wrong jacket for a plenum, or the wrong pinout. The exam and the job both punish 'it clicked, so it is fine.'",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O2-L1-r1",
        title: "Categories, UTP versus STP, plenum and burial",
        markdown: `Twisted-pair Ethernet carries differential signals on four pairs. Twisting rejects interference. **Unshielded twisted pair (UTP)** is the office default. **Shielded twisted pair (STP)** (and related foiled constructions) adds a foil or braid for electrically noisy plants — factory floors, elevator rooms, long runs beside power. Shielding only helps if you bond it correctly at the patch panel or jack; a floating shield can become an antenna.

**Categories** you must reason about:

- **Cat 5e** — designed for 1 Gbps at 100 m, 100 MHz. Still common in walls.
- **Cat 6** — 250 MHz; 1 Gbps at 100 m and 10 Gbps at shorter runs (about 55 m).
- **Cat 6a** — 500 MHz; 10 Gbps at 100 m. Thicker, watch bend radius.
- **Cat 8** — data-center short runs at 25/40 Gbps; not a random office drop.

Distance, noise, and the switch's NIC speed decide the category — not the color of the boot.

**Plenum-rated** cable (often low-smoke FEP jackets, CMP) is required in air-handling spaces so a fire does not pump toxic smoke through HVAC. **Riser (CMR)** is for vertical shafts between floors. Ordinary PVC (CM) is for in-room patching. Using PVC in a plenum is a code and exam miss.

**Direct-burial** twisted pair is gel-filled or otherwise moisture-blocked for dirt. Indoor UTP in a trench becomes a green sponge. **Coaxial** (RG-6 with an **F-type** connector in consumer video/cable-modem work) is a different copper story: a center conductor, dielectric, shield, and jacket. You will still see F-type on cable modems. Do not put an RJ45 on RG-6 and call it Ethernet.`,
      },
      {
        type: "video",
        id: "C1-D3-O2-L1-see1",
        assetId: "t568-pair-swap",
        title: "SEE: T568 orange/green pair swap",
        caption:
          "Pins 1–8 stay numbered in HTML. Only the orange and green pairs move. This is not a generated photo.",
        transcript:
          "T568A and T568B use the same eight pin numbers. Only the orange and green pairs swap. Pins 4-5 stay blue and 7-8 stay brown. Same standard on both ends is a straight-through cable.",
      },
      {
        type: "diagram",
        id: "C1-D3-O2-L1-d1",
        component: "T568Diagram",
        title: "T568A and T568B — verified pinout",
        caption:
          "Same eight positions; the orange and green pairs swap between A and B. Both ends the same standard = straight-through.",
        notice:
          "This academy never uses generated photos for pinouts. Learn the sequence from this diagram and the cable lab. T568B is the more common U.S. field standard; T568A appears in some government and residential specs. Mixing A and B on the two ends creates a crossover, which modern auto-MDIX usually forgives — and which you should still not terminate by accident.",
        alt: "T568A and T568B eight-pin color sequences shown on an RJ45 plug.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O2-L1-kc1",
        questionIds: ["C1-D3-O2-T568-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O2-L1-r2",
        title: "RJ45, RJ11, punchdown, and how a straight-through is born",
        markdown: `**RJ45** is the eight-position modular plug and jack for Ethernet. **RJ11** is the smaller six-position family used for analog telephone and DSL. They are not interchangeable: an RJ11 can physically sit in the center of some RJ45 jacks and ruin a pair. Look at the width before you punch.

**T568B**, the sequence you will terminate most often in U.S. shops, is (pins 1–8): white/orange, orange, white/green, blue, white/blue, green, white/brown, brown. **T568A** swaps the orange and green pairs: white/green, green, white/orange, blue, white/blue, orange, white/brown, brown. Pins 4–5 (blue pair) and 7–8 (brown pair) stay put. Confirm every conductor against the **T568 diagram** in this lesson — do not invent an order from memory of a blog photo.

A **straight-through** cable uses the same standard on both ends and is what you want from PC to switch or wall jack to patch panel. A **crossover** mixed A and B when older NICs needed it; gigabit auto-MDIX made that a historical special case. If a cable tester shows 1–3 and 2–6 crossed, someone mixed standards.

**Punchdown** tools seat conductors onto insulation-displacement contacts on a 110 or Krone block or keystone jack. Keep pair twists up to the contact. Untwist more than about 13 mm (½ in) and you degrade the category you paid for. The cable lab will make you pick A or B and punch; the wall and the patch panel must match.

Crimp last: jacket seated under the plug's strain tab, eight conductors in order, one firm crimp, then test. A pretty plug that fails a wiremap is scrap.`,
      },
      {
        type: "lab",
        id: "C1-D3-O2-L1-lab",
        labId: "C1-D3-O2-CABLE-LAB",
        title: "Connector museum and T568 lab",
        prompt:
          "Terminate T568B on both ends, then identify RJ45, RJ11, and F-type from the museum. Do not guess pin colors — use the on-screen T568 diagram.",
      },
      {
        type: "callout",
        id: "C1-D3-O2-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Match the jacket to the space (plenum, riser, burial) before you match the category to the speed. A Cat 6a PVC run through a plenum fails inspection even if it negotiates 10 Gbps.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O2-L1-kc2",
        questionIds: ["C1-D3-O2-UTP-Q001"],
      },
      {
        type: "summary",
        id: "C1-D3-O2-L1-sum",
        bullets: [
          "UTP is the office default; STP needs a bonded shield in noisy plants.",
          "Plenum, riser, and direct-burial jackets are code, not cosmetics.",
          "T568A/B differ by swapping orange and green pairs; learn them from T568Diagram.",
          "Same standard both ends = straight-through. RJ45 is Ethernet; RJ11 is phone/DSL.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O2-L2",
    objectiveId: "C1-D3-O2",
    slug: "fiber-usb-video-power-connectors",
    title: "Fiber, USB, video, storage, and power connectors",
    description:
      "Identify SM/MM fiber, USB generations, HDMI/DP/DVI/VGA, SATA, Thunderbolt, Molex, Lightning, and DB9 without trusting generated photos.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D3-O2-FIBER",
      "C1-D3-O2-HDMI",
      "C1-D3-O2-USB",
      "C1-D3-O2-SATA",
      "C1-D3-O2-MOLEX",
      "C1-D3-O2-DB9",
    ],
    prerequisites: ["C1-D3-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "usb-if"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "USB-C is a shape, not a protocol. The same shell can carry USB 2.0 only, USB4, Thunderbolt, DisplayPort Alt Mode, or charger-only pins. If you treat the connector as the capability, you will buy the wrong dock.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O2-L2-r1",
        title: "Optical fiber and the video zoo",
        markdown: `**Optical fiber** carries light, not voltage, so it ignores electromagnetic interference and can run much farther than copper Ethernet. **Single-mode (SM)** fiber has a narrow core, uses laser transceivers, and is the campus and metro long-haul choice (kilometers). **Multimode (MM)** has a wider core, uses cheaper LED or VCSEL optics, and is the in-building / data-center short-haul choice (hundreds of meters depending on generation). Do not mix SM optics with MM cable and expect a link.

Connectors you must recognize:

- **ST (straight tip)** — bayonet, older fiber plants
- **SC (subscriber connector)** — square push-pull
- **LC (Lucent connector)** — small clip, the modern default in switches and SFPs

**Video cables** are not interchangeable just because they "have a picture."

- **VGA (Video Graphics Array)** — analog, 15-pin DE-15. Max useful resolution is modest; adapters to HDMI are digital-to-analog conversions with quality loss.
- **DVI (Digital Visual Interface)** — DVI-D is digital, DVI-A analog, DVI-I both. Single-link versus dual-link caps resolution. No audio.
- **HDMI (High-Definition Multimedia Interface)** — digital video plus audio plus CEC. Version (1.4, 2.0, 2.1) decides 4K refresh and HDR features.
- **DisplayPort** — digital video plus audio, common on PCs and GPUs, supports daisy-chaining on some hardware, and is the usual path for high refresh.
- **USB-C** as a video path uses DisplayPort Alt Mode or Thunderbolt. The cable and the port both have to support it.

A black-screen "HDMI cable" ticket is often a port that is DisplayPort, a dongle that needs power, or a cable that is USB-C charge-only.`,
      },
      {
        type: "video",
        id: "C1-D3-O2-L2-see1",
        assetId: "connector-seat",
        title: "SEE: HDMI, DisplayPort, VGA, and USB orientation",
        caption:
          "Each video plug seats only in its matching port. USB-A is trident-up. USB-C seats either way.",
        transcript:
          "HDMI, DisplayPort, and VGA are keyed differently. A plug that is not the matching port lifts back out. USB-A seats trident-up. USB-C seats either way. USB-C is a shell, not a protocol.",
      },
      {
        type: "diagram",
        id: "C1-D3-O2-L2-d1",
        component: "ConnectorGallery",
        title: "Connector museum",
        caption:
          "Identify by geometry and keying, not by a generated photo. USB-C is a shell; SATA is L-shaped; Molex is 4-pin peripheral power.",
        notice:
          "Notice DB9 is serial (RS-232), not VGA. VGA is 15-pin. Mixing those two is a classic exam distractor.",
        alt: "Gallery of USB-A, USB-C, Lightning, HDMI, DisplayPort, DVI, VGA, SATA, eSATA, LC/SC/ST fiber, Molex, and DB9.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O2-L2-kc1",
        questionIds: ["C1-D3-O2-FIBER-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O2-L2-r2",
        title: "USB generations, Thunderbolt, SATA, Molex, Lightning, DB9",
        markdown: `**USB 2.0** is 480 Mbps, typically USB-A, Mini-USB, or Micro-USB on older phones. **USB 3.x** (marketed as USB 3.0/3.1/3.2 SuperSpeed) adds extra pairs, often a blue USB-A insert, and much higher throughput. **USB-C** is the reversible 24-pin shell that can implement USB 2.0 only, USB 3.x, USB4, power delivery, audio, or video. Always read the port marking and the cable rating.

**Thunderbolt** (3 and 4 on USB-C; older Thunderbolt 2 used Mini DisplayPort) can carry PCIe, video, and power at very high combined bandwidth (40 Gbps class for TB3/4). A Thunderbolt dock will not show a GPU enclosure on a USB-only USB-C port.

**SATA** data is a thin 7-pin L-shaped connector; **SATA power** is a separate 15-pin connector from the PSU. **eSATA** is the external keyed variant for outside the chassis. Do not force SATA data into a SAS backplane blindly — **Serial Attached SCSI (SAS)** controllers may accept SATA drives, but SATA hosts do not speak SAS.

**Molex** is the old 4-pin peripheral power connector (yellow 12 V, red 5 V, two blacks). Adapters from Molex to SATA power exist; they are a last resort and a fire conversation if cheap.

**Lightning** is Apple's older reversible mobile connector (not USB-C). **DB9** (DE-9) is serial RS-232 for consoles, industrial controls, and some POS. Adapters (USB-C to HDMI, SATA to USB, DisplayPort to DVI) must match signal type: passive adapters work when the GPU already speaks that protocol; active adapters are needed when you convert analog/digital families.

Pick the cable for distance and purpose: LC multimode across a building, HDMI or DisplayPort to a monitor, USB-C with the right markings to a dock, SATA data+power to a desktop SSD, DB9 to a switch console.`,
      },
      {
        type: "table",
        id: "C1-D3-O2-L2-t1",
        title: "Connector to job",
        headers: ["Connector", "Typical job", "Do not confuse with"],
        rows: [
          ["LC / SC / ST", "Fiber to SFP or patch panel", "Each other: LC is small clip, ST is bayonet"],
          ["HDMI / DisplayPort", "Digital AV to a display", "VGA analog; DP vs HDMI version limits"],
          ["USB-A / USB-C / Micro / Mini", "Peripherals and charging", "USB-C shell ≠ Thunderbolt/USB4"],
          ["SATA 7-pin / eSATA", "Drive data", "SAS, SATA power 15-pin"],
          ["Molex 4-pin", "Legacy peripheral power", "CPU EPS, PCIe GPU power"],
          ["DB9", "Serial console", "VGA 15-pin"],
          ["Lightning", "Older Apple mobile", "USB-C on newer Apple devices"],
          ["F-type", "Coax / cable modem", "BNC or RJ45"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O2-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Single-mode + LC + kilometers. Multimode + short building run. VGA analog. HDMI and DisplayPort digital with audio. DB9 serial. Molex is power, not data. USB-C needs a capability check.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O2-L2-kc2",
        questionIds: ["C1-D3-O2-USB-Q001"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O2-L2-cp",
        questionIds: [
          "C1-D3-O2-T568-Q002",
          "C1-D3-O2-UTP-Q002",
          "C1-D3-O2-RJ45-Q001",
          "C1-D3-O2-FIBER-Q002",
          "C1-D3-O2-HDMI-Q001",
          "C1-D3-O2-SATA-Q001",
          "C1-D3-O2-MOLEX-Q001",
          "C1-D3-O2-DB9-Q001",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O2-L2-sum",
        bullets: [
          "SM fiber is long-haul laser; MM is short-haul. LC is the common SFP connector.",
          "VGA analog; HDMI/DisplayPort digital with audio; DVI is usually video-only.",
          "USB-C is a connector. Thunderbolt, USB4, and charge-only are different capabilities.",
          "SATA data ≠ SATA power ≠ Molex ≠ DB9. Identify by pins and purpose.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O3-L1",
    objectiveId: "C1-D3-O3",
    slug: "ram-dimm-ecc-channels",
    title: "RAM: DIMM, SODIMM, DDR, ECC, and channels",
    description:
      "Match module form factor and DDR generation to the board, then populate channels and decide when ECC is required.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D3-O3-DIMM",
      "C1-D3-O3-SODIMM",
      "C1-D3-O3-DDR",
      "C1-D3-O3-ECC",
      "C1-D3-O3-CHANNELS",
    ],
    prerequisites: ["C1-D3-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "RAM is volatile: contents die when power dies. The wrong generation will not seat. The wrong channel layout wastes performance. Non-ECC in a financial VM host is a reliability decision, not a price decision.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O3-L1-r1",
        title: "Form factors and DDR generations",
        markdown: `**Random-access memory (RAM)** the operating system uses for running code is **volatile**. Storage (SSD/HDD) is non-volatile. If a user says "I saved it in RAM," they did not save it.

**DIMM (Dual In-line Memory Module)** is the desktop and server stick: roughly 133–140 mm long with contacts on both sides of the edge. **SODIMM (Small Outline DIMM)** is the laptop and some mini-PC stick: about half the length. You cannot put a DIMM in a SODIMM slot. Some ultra-thin laptops solder RAM; those are not field-upgradeable regardless of how badly the user wants 64 GB.

**DDR (Double Data Rate)** generations — DDR3, DDR4, DDR5 in the machines you will still see — are electrically and physically keyed differently. The notch position changes so you should not be able to ram DDR4 into a DDR5 slot. They are **not** interchangeable, not with an adapter, not "if you push harder." Speeds are quoted in mega-transfers (e.g., DDR4-3200, DDR5-5600). The module, the CPU memory controller, and the motherboard QVL (qualified vendor list) must agree. Mixing sizes often works at the slowest common timing; mixing generations never does.

Install with the notch aligned, firm even pressure until side clips catch (or the laptop clip seats). Do not touch gold contacts. For laptops, disconnect power and battery if the service manual says so. Insufficient RAM looks like heavy swap, disk thrash, and "the PC is slow after Chrome." Failing RAM looks like random reboots, crash screens, and memory-diagnostic errors. Those are different tickets.

When you quote a kit, quote the generation, the speed class, and the capacity per stick — not "a 16 gig stick" with no DDR number. Boards list a maximum per slot and a maximum total. Two 32 GB DIMMs on a board that caps at 16 GB per slot will not POST no matter how expensive they were. After install, confirm size in firmware first, then in the operating system. If firmware sees 16 GB and Windows sees 8 GB, you have a seating, channel, or integrated-graphics reservation story, not a Windows reinstall story.`
      },
      {
        type: "video",
        id: "C1-D3-O3-L1-see1",
        assetId: "dimm-click",
        title: "SEE: DIMM notch and latches",
        caption: "HTML overlay says DIMM. Do not trust generated frame text.",
        transcript:
          "Align the DIMM notch to the slot. Press evenly until both side latches close. Do not force a different DDR generation.",
      },
      {
        type: "video",
        id: "C1-D3-O3-L1-see2",
        assetId: "sodimm-angle",
        title: "SEE: SODIMM angle versus DIMM scale",
        caption: "Laptop stick is shorter. Desktop DIMM does not fit.",
        transcript:
          "A SODIMM starts at an angle, then presses flat until the clips catch. A desktop DIMM is about twice as long and does not belong in a laptop slot.",
      },
      {
        type: "diagram",
        id: "C1-D3-O3-L1-d1",
        component: "DimmVsSodimmDiagram",
        title: "DIMM versus SODIMM",
        caption:
          "Same job (volatile working memory), different length and clip style. DDR generation is the notch, not the sticker color.",
        notice:
          "Notice the notch is offset differently by DDR generation. Forcing a module is how you destroy a slot.",
        alt: "Desktop DIMM next to laptop SODIMM with DDR notch positions marked.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O3-L1-kc1",
        questionIds: ["C1-D3-O3-DIMM-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O3-L1-r2",
        title: "Channels and ECC",
        markdown: `Modern CPUs talk to RAM on **channels**. **Single-channel** uses one module (or one populated channel) and wastes controller width. **Dual-channel** is the desktop default: install a matched pair in the slots the manual paints as the same channel pair — often slots 2 and 4, not "the first two next to the CPU." **Triple-** and **quad-channel** appear on HEDT and servers. The rule is: matched capacity, matched speed, populated per the board's channel diagram.

A board with four slots in two channels can run dual-channel with two sticks or with four. Four unmatched sticks may fall back to single-channel or throw POST errors. When a stem shows colored slots, fill the colors the vendor documents — usually one stick per channel first.

**ECC (error-correcting code)** RAM stores extra bits so the memory controller can detect and correct single-bit errors and detect many multi-bit errors. Servers, hypervisors, and scientific boxes want ECC. ECC modules, an ECC-capable CPU, and an ECC-aware motherboard must all be present. Putting ECC DIMMs in a desktop board that does not support ECC usually means the extra bits are ignored or the modules will not POST. Non-ECC in a workstation is normal. Unbuffered versus registered/buffered ECC is a server-population topic: do not mix registered ECC with unbuffered consumer DIMMs.

If a financial application owner asks for "more reliable RAM," the answer is ECC plus a supported platform — not a faster non-ECC RGB kit.

On a help-desk call, "I added RAM and it is still slow" is not automatically a bad module. Ask whether the new sticks are in the documented channel pair, whether the firmware memory size matches the kit, and whether the workload is actually disk-bound. Dual-channel is a bandwidth layout, not a RAID mirror of DIMMs. ECC will not make a 4 GB machine feel like 32 GB. Separate capacity, channels, generation, and error correction when you talk to the user or when you read an exam stem.`
      },
      {
        type: "table",
        id: "C1-D3-O3-L1-t1",
        title: "RAM decision table",
        headers: ["Situation", "Choose", "Why"],
        rows: [
          ["Desktop / workstation tower", "DIMM, matching DDR gen", "Full-size slots; notch must match"],
          ["Laptop / many NUCs", "SODIMM or soldered", "Measure; some boards are not upgradable"],
          ["Two slots painted the same color", "Populate per channel map", "Enables dual-channel"],
          ["Hypervisor / database server", "ECC (and supported CPU/board)", "Corrects single-bit errors"],
          ["DDR4 stick in a DDR5 board", "Buy DDR5", "Different keying and signaling"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O3-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Filling the two slots closest to the CPU 'because they look first' instead of the channel pair in the manual. You can end up in single-channel without noticing until a benchmark or an exam stem calls it out.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O3-L1-kc2",
        questionIds: ["C1-D3-O3-ECC-Q001"],
      },
      {
        type: "lab",
        id: "C1-D3-O3-L1-lab",
        labId: "C1-D3-O3-RAM-LAB",
        title: "RAM install matching lab",
        prompt:
          "Assign the correct module to the desktop dual-channel pair, the laptop SODIMM bay, and the ECC hypervisor host. Leave wrong-generation DDR5, SODIMM adapters, and non-ECC RGB unused.",
      },
      {
        type: "checkpoint",
        id: "C1-D3-O3-L1-cp",
        questionIds: [
          "C1-D3-O3-DIMM-Q002",
          "C1-D3-O3-SODIMM-Q001",
          "C1-D3-O3-DDR-Q001",
          "C1-D3-O3-ECC-Q002",
          "C1-D3-O3-CHANNELS-Q001",
          "C1-D3-O3-CHANNELS-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O3-L1-sum",
        bullets: [
          "DIMM is desktop/server; SODIMM is laptop. Neither is storage.",
          "DDR generations are keyed; they do not mix.",
          "Populate the channel pair the motherboard documents.",
          "ECC needs module + CPU + board support; it is the server reliability answer.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O4-L1",
    objectiveId: "C1-D3-O4",
    slug: "hdd-form-factors-spindle",
    title: "Hard drives: platters, spindle speeds, and form factors",
    description:
      "Explain how an HDD stores data, why 5400 vs 7200 vs 15K rpm matters, and when 2.5-inch versus 3.5-inch is the right bay.",
    estimatedMinutes: 18,
    conceptIds: ["C1-D3-O4-HDD", "C1-D3-O4-SSD"],
    prerequisites: ["C1-D3-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Clicking, grinding, and long sequential copies on a spinning disk are mechanical stories. Treating them like 'slow Windows' burns the recovery window.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O4-L1-r1",
        title: "Platters, heads, and why rpm is not a vibe",
        markdown: `A **hard disk drive (HDD)** stores bits as magnetic orientations on spinning platters. An actuator arm flies **read/write heads** nanometers above the surface. **Spindle speed**, in revolutions per minute (rpm), is how fast those platters turn.

Common speeds:

- **5400 rpm** — quieter, cooler, typical in older laptops and archive/NAS bulk. Lower throughput and higher latency.
- **7200 rpm** — the desktop and many NAS default. Better sequential and random performance than 5400 at the cost of heat and noise.
- **10,000 and 15,000 rpm** — enterprise SAS territory. Fast for spinning rust, loud, hot, and largely displaced by SSD for OS and database duty.

Latency is dominated by rotational delay and seek time. That is why an HDD can look fine on a large file copy and terrible on boot or database work (tiny reads). **Input/output operations per second (IOPS)** on an HDD are in the hundreds; a cheap SSD is in the tens or hundreds of thousands.

Mechanical failure modes you will hear: **clicking** (heads parking/retrying — back up now), **grinding** (bearing or head crash), and periodic seek noise that is normal. HDDs hate impact, strong magnets, and being used as a laptop drop test. They tolerate sequential writes for years if SMART (Self-Monitoring, Analysis and Reporting Technology — Domain 5) stays clean.

Do not defrag an SSD as ritual, and do not expect a 5400 rpm 2.5-inch drive to make a VM host feel new. Match the medium to the access pattern.

Capacity on the box is decimal (1 TB = 1,000,000,000,000 bytes in vendor ads). The operating system reports binary gibibytes, so a "2 TB" HDD shows up closer to 1.8 TiB. That is not missing space and it is not RAID tax. When a user says the new drive "lost 200 GB," measure before you RMA. Also remember that 2.5-inch is a size, not a technology: the bay can hold a spinning disk or a SATA SSD. If the ticket mentions rpm, it is an HDD. If it mentions NVMe, it is not this form-factor conversation unless an adapter is involved.`
      },
      {
        type: "table",
        id: "C1-D3-O4-L1-t1",
        title: "HDD form factors",
        headers: ["Form factor", "Typical use", "Notes"],
        rows: [
          ["3.5-inch", "Desktop, NAS, servers", "Needs 12 V as well as 5 V; heavier platters, higher capacity"],
          ["2.5-inch", "Laptops, some servers, USB enclosures", "Often 5 V only; 7 mm vs 9.5 mm thickness matters in ultrabooks"],
        ],
        caption: "Both can be SATA. 2.5-inch is not automatically an SSD. Measure the bay and the caddy.",
      },
      {
        type: "video",
        id: "C1-D3-O4-L1-see1",
        assetId: "hdd-ruler",
        title: "SEE: 3.5-inch versus 2.5-inch next to a ruler",
        caption: "Size is not the same as SSD. rpm means HDD.",
        transcript:
          "3.5-inch drives are desktop and NAS bays. 2.5-inch drives are laptops and some caddies. Form factor is size, not SSD versus spinning rust.",
      },
      {
        type: "diagram",
        id: "C1-D3-O4-L1-d1",
        component: "HddFormFactorDiagram",
        title: "HDD form factors",
        caption: "3.5-inch beside 2.5-inch with a millimeter scale.",
        notice: "A 2.5-inch bay can hold an HDD or a SATA SSD. rpm is the HDD tell.",
        alt: "3.5-inch and 2.5-inch drive outlines next to a ruler.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L1-kc1",
        questionIds: ["C1-D3-O4-HDD-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L1-r2",
        title: "When spinning still wins, and when it does not",
        markdown: `Cost per terabyte still favors HDDs for cold data: backups you actually restore from (wait — RAID is not that; see the RAID lesson), media archives, and bulk NAS. A four-bay NAS with 7200 rpm 3.5-inch drives is a reasonable home-lab and small-office file store if you accept the noise and the rebuild times.

Laptops almost always want a **solid-state drive (SSD)** as the system disk. A 2.5-inch 5400 rpm HDD in a modern laptop is a complaint generator. Desktops can mix: NVMe SSD for OS and apps, 3.5-inch HDD for bulk. That hybrid is a configuration, not RAID, unless you actually build an array.

Caddies, rubber grommets, and SATA power cables are part of the install. A 2.5-inch drive in a 3.5-inch bay needs a bracket. A 3.5-inch drive does not go in a laptop. Hot-swap bays in servers expect the correct sled; jamming a bare drive into a backplane is how you bend pins.

If the ticket is "PC slow" and the drive light is solid during every mouse click, check whether the system disk is still an HDD before you reimage Windows. If the ticket is "click of death," stop using the volume, image it if the data matters, and replace the drive. You cannot torque-wrench a head crash back into alignment.

Form factor still bites people on the bench. A 7 mm 2.5-inch drive may need a spacer in a 9.5 mm caddy. A 15 mm server SSD will not close a thin laptop lid. 3.5-inch drives want both 12 V and 5 V on the SATA power plug; a cheap adapter that only feeds 5 V will click and never spin. Label the bay, the caddy, and the interface before you promise a drop-in upgrade. Spindle speed is performance and acoustics, not a reliability rating — a quiet 5400 rpm archive disk can outlive a abused 15K disk. Reliability comes from monitoring, replacement, and backups.`
      },
      {
        type: "callout",
        id: "C1-D3-O4-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Spindle speed is a performance and acoustics spec, not a reliability spec. A 15K drive can still click itself to death. Reliability comes from SMART monitoring, replacement, and backups — not from rpm.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L1-kc2",
        questionIds: ["C1-D3-O4-HDD-Q002"],
      },
      {
        type: "summary",
        id: "C1-D3-O4-L1-sum",
        bullets: [
          "HDDs store data magnetically on platters; rpm sets rotational latency.",
          "5400 laptop/archive, 7200 desktop/NAS, 10K/15K legacy enterprise.",
          "3.5-inch desktop/NAS; 2.5-inch laptop and some servers — not the same as SSD.",
          "Clicking or grinding: stop, preserve data, replace. Do not 'defrag to fix it.'",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O4-L2",
    objectiveId: "C1-D3-O4",
    slug: "ssd-nvme-m2-removable",
    title: "SSD, NVMe, M.2, SAS, and removable media",
    description:
      "Tell SATA SSD from NVMe, read an M.2 key, and place flash, memory cards, and optical in the right job.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D3-O4-SSD",
      "C1-D3-O4-NVME",
      "C1-D3-O4-M2",
    ],
    prerequisites: ["C1-D3-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "pcie-sig"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "An M.2 slot can be SATA, NVMe, or both. Buying the wrong stick and blaming Windows is a weekly bench error.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O4-L2-r1",
        title: "SATA SSD, NVMe, PCIe, SAS, M.2, mSATA",
        markdown: `A **solid-state drive (SSD)** stores data in NAND flash. No platters, no seeking, far higher IOPS, better shock resistance, and a finite program/erase budget you will not usually exhaust in client duty.

The **interface** decides how the SSD talks to the rest of the PC:

- **SATA SSD** — 2.5-inch or M.2 SATA. Capped by the SATA 6 Gbps generation (~550 MB/s sequential). Feels transformational versus HDD, not versus NVMe.
- **NVMe (Non-volatile Memory Express)** — a protocol designed for flash that rides **PCI Express (PCIe)** lanes. Much higher queue depth and throughput (multiple GB/s). Usually an M.2 2280 stick or an add-in PCIe card.
- **PCIe** is the bus. NVMe is the language. A SATA SSD in an adapter card is still SATA.
- **SAS (Serial Attached SCSI)** — enterprise dual-port-capable interface, used with RAID HBAs and backplanes. SAS hosts often accept SATA drives; SATA hosts do not run SAS drives.

**M.2** is a form factor (a small card with a screw at one end). Length codes like 2280 mean 22 mm wide, 80 mm long. The **key** (notch) matters: **B key**, **M key**, **B+M**. M-key 2280 is the common NVMe SSD. Some boards' M.2 slots are SATA-only, some PCIe/NVMe-only, some wired for both. Read the motherboard legend.

**mSATA** is an older mini-SATA card used in some laptops. It is not M.2. Forcing mSATA into M.2 (or the reverse) is a parts mismatch.

Install NVMe in the slot the manual prefers (often the CPU-attached slot, not a chipset slot) if you care about maximum lanes. Do not cover the SSD with a sticker sandwich that prevents the motherboard heatspreader from contacting the NAND if the vendor shipped a thermal pad.`,
      },
      {
        type: "video",
        id: "C1-D3-O4-L2-see1",
        assetId: "m2-screw",
        title: "SEE: M.2 is the slot; NVMe is the protocol",
        caption: "HTML labels, not generated silkscreen.",
        transcript:
          "M.2 is the slot form factor. NVMe is the protocol that usually rides PCIe on that slot. Seat the card at an angle and fasten the one screw.",
      },
      {
        type: "video",
        id: "C1-D3-O4-L2-see2",
        assetId: "sata-data-power",
        title: "SEE: SATA data versus SATA power",
        caption: "Thin L-shaped data. Wide 15-pin power.",
        transcript:
          "SATA data is the thin L-shaped cable. SATA power is the wider 15-pin cable. Both click. They are not interchangeable with Molex without an adapter.",
      },
      {
        type: "diagram",
        id: "C1-D3-O4-L2-d1",
        component: "MotherboardDiagram",
        title: "Where storage actually plugs in",
        caption:
          "SATA ports on the board edge, M.2 under a heatsink, SAS on a RAID card or backplane — three different conversations.",
        notice:
          "Notice an M.2 slot labeled 'SATA/PCIe' can take either if the drive and key match. A slot labeled 'PCIe x4' will ignore a SATA M.2 stick.",
        alt: "Motherboard callouts for SATA connectors, M.2 NVMe slot, and a PCIe RAID/HBA slot.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L2-kc1",
        questionIds: ["C1-D3-O4-NVME-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L2-r2",
        title: "Flash drives, memory cards, and optical",
        markdown: `**Removable flash** (USB thumb drives) and **memory cards** (SD, microSD, CompactFlash in cameras) are NAND behind a controller, just like an SSD, with less firmware sophistication and often no thermal design. They are for transport and camera ingest, not for a database file that must survive a yank. Eject/unmount before pulling. Cheap USB sticks fail at a rate that should scare anyone storing the only copy of a thesis.

**Optical drives** — Compact Disc (CD), Digital Versatile Disc (DVD), Blu-ray — still appear in legacy software delivery, some government air-gap workflows, and "install from disc" tickets. Capacity and laser wavelength differ (Blu-ray is higher density). They are slow, they scratch, and they are not a backup strategy by themselves unless you verify the burn and store media properly. External USB optical is how you install from ISO on a desktop that lost its bay.

When a stem says "fastest client boot disk," the answer is NVMe M.2, not SATA SSD, not 15K SAS, not USB flash. When it says "hot-swap dual-port enterprise disk in a RAID shelf," think SAS. When it says "camera photographer," think memory card, not M.2.

Do not format the user's only SD card to test the slot. Copy off, then test with a known-good card.

Optical and flash still show up on exams because they still show up on desks. A government air-gap install from DVD, a camera ingest from SD, a Windows installer on USB 3 flash — those are real tickets. None of them is an OS disk for a VM host, and none of them is a backup strategy unless you verify the copy and store a second copy somewhere else. USB flash wears and gets yanked mid-write. Optical scratches. SD cards fail at the worst wedding. Treat removable media as transport. Treat NVMe as the boot disk. Treat SAS shelves as the server conversation. If a stem mixes those jobs, pick the medium that matches the job, not the one you upgraded last weekend.`
      },
      {
        type: "table",
        id: "C1-D3-O4-L2-t1",
        title: "Storage interface cheat sheet",
        headers: ["What you see", "Protocol / bus", "Typical ceiling in words"],
        rows: [
          ["2.5-inch SATA SSD", "SATA 6 Gbps", "Fast vs HDD, capped vs NVMe"],
          ["M.2 2280 NVMe", "NVMe on PCIe", "Default OS disk on modern PCs"],
          ["M.2 SATA", "SATA in M.2 clothing", "Needs a SATA-wired M.2 slot"],
          ["mSATA", "SATA mini card", "Older laptops; not M.2"],
          ["SAS HDD/SSD", "SAS to HBA/RAID", "Servers, dual-port shelves"],
          ["USB flash / SD", "USB / SD controller", "Removable; not a system disk"],
          ["DVD/Blu-ray", "Optical", "Legacy media; verify burns"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O4-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "NVMe is the protocol. PCIe is the bus. M.2 is the shape. All three can appear in one correct sentence: 'M.2 NVMe SSD on PCIe.' A SATA SSD can also be M.2. Read the key and the slot label.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L2-kc2",
        questionIds: ["C1-D3-O4-M2-Q001"],
      },
      {
        type: "summary",
        id: "C1-D3-O4-L2-sum",
        bullets: [
          "SATA SSDs are SATA-capped; NVMe uses PCIe and is the fast client default.",
          "M.2 is a form factor with SATA or NVMe keys; mSATA is a different card.",
          "SAS is the enterprise backplane language; SATA hosts do not run SAS drives.",
          "Flash and optical are removable tools, not substitutes for a planned backup.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O4-L3",
    objectiveId: "C1-D3-O4",
    slug: "understanding-raid",
    title: "Understanding RAID: performance, redundancy, and failure",
    description:
      "Build RAID 0, 1, 5, 6, and 10, fail drives on purpose, and separate redundancy from backup.",
    estimatedMinutes: 32,
    conceptIds: [
      "C1-D3-O4-RAID0",
      "C1-D3-O4-RAID1",
      "C1-D3-O4-RAID5",
      "C1-D3-O4-RAID6",
      "C1-D3-O4-RAID10",
    ],
    prerequisites: ["C1-D3-O4-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O4-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Organizations combine disks to gain speed, usable capacity, or the ability to survive a failed drive. That last idea is redundancy. It is not a backup. RAID will happily, instantly, and in perfect health, encrypt or delete your only copy.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r1",
        title: "A logical array is not a pile of letters",
        markdown: `**RAID (Redundant Array of Independent Disks)** presents multiple physical drives as one **logical** volume to the operating system. The OS sees Disk 3 or volume D: — not "four SATA devices doing a dance." A **RAID controller** (hardware HBA with a cache, or software RAID in the OS/motherboard firmware) owns the dance.

You care about four numbers for every level:

1. **Minimum disks**
2. **Usable capacity** (what the OS can store)
3. **Fault tolerance** (how many member disks can die before the array is lost)
4. **Performance tendency** (reads vs writes, sequential vs random) at A+ depth — not a storage-engineer thesis

**Redundancy** means the array can keep serving data after a disk failure, usually in a **degraded** state, until you replace the disk and **rebuild**. **Backup** means a point-in-time copy, preferably offline or immutable, that survives ransomware, "delete *", fire, and the technician who initialized the wrong array. RAID does not keep yesterday. RAID does not keep an offsite copy. RAID 1 is not "my backup." Say that out loud.

Hardware RAID with a battery- or flash-backed cache can acknowledge writes faster; if you steal the cache battery and lose power, you can corrupt the array. Software RAID is cheaper and portable. Either way, **hot spares** sit idle until a member dies, then the rebuild starts without a truck roll. Rebuilds are stressful: remaining disks work harder, and a second failure during a long RAID 5 rebuild is a well-known way to lose the array. That is one reason RAID 6 and RAID 10 exist.

In the diagram and lab, treat each rectangle as a physical disk and the big box as the logical volume. Then start failing disks.`,
      },
      {
        type: "video",
        id: "C1-D3-O4-L3-see1",
        assetId: "raid-stripe-mirror",
        title: "SEE: RAID 0 stripe versus RAID 1 copy, then FAIL",
        caption: "RAID is not a backup. Pair math for RAID 10 stays in the RAID lab.",
        transcript:
          "RAID 0 stripes A1 and A2 across two disks. Fail disk 2 and the volume is empty. RAID 1 copies A1 to both disks. Fail disk 2 and A1 is still on disk 1. That is redundancy, not a backup.",
      },
      {
        type: "diagram",
        id: "C1-D3-O4-L3-d1",
        component: "RaidArrayDiagram",
        title: "Four-drive array map",
        caption:
          "Same four disks; five personalities. Fail a drive in each personality and watch whether the logical volume survives.",
        notice:
          "Notice RAID 0 going black on one failure is not a cartoon. Every striped file is missing a stripe. Notice RAID 10 surviving a failure in one mirror pair while a second failure in the same pair would kill that stripe set.",
        alt: "RAID 0 striping, RAID 1 mirroring, RAID 5 distributed parity, RAID 6 dual parity, and RAID 10 striped mirrors on four disks.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc1",
        questionIds: ["C1-D3-O4-RAID0-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r2",
        title: "RAID 0 — striping, and the FAIL DRIVE button",
        markdown: `**RAID 0** stripes data across two or more disks. Block A goes to disk 1, block B to disk 2, block C to disk 1, and so on. Reads and writes can proceed in parallel, so sequential throughput often scales with the number of members. Usable capacity is the **sum** of the disks (limited by the smallest member if they differ). Minimum disks: **2**. Fault tolerance: **zero**.

Press FAIL DRIVE on any member in the lab. The logical volume is gone. Not degraded. Gone. Because every file is shredded across members, you cannot reconstruct a file from the survivor. RAID 0 is for scratch disks, video-capture buffers, and other data you can regenerate. It is a performance and capacity trick, not a safety net.

Do not describe RAID 0 as "always twice as fast." Random writes of tiny blocks, a slow member, or a CPU-bound software RAID stack can disappoint. Do describe it as "no redundancy." If a stem says the fastest array with no concern for a lost disk, RAID 0 is the intended level.

Watch the lab animation: block A on disk 1, block B on disk 2, block C on disk 1. That is striping. Fail disk 2 and block B is gone, so the file that needed A+B cannot be rebuilt. There is no parity to compute the missing stripe. Capacity is why people still propose RAID 0 for video scratch — four 4 TB disks look like 16 TB — but one click of death deletes the project. If the project is regenerable from source footage stored elsewhere, RAID 0 can be honest. If it is the only copy, RAID 0 is malpractice. Minimum disks: two. Fault tolerance: zero. Usable: n.`
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc2",
        questionIds: ["C1-D3-O4-RAID0-Q002"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r3",
        title: "RAID 1 — mirroring",
        markdown: `**RAID 1** writes every block to two (or more) members. Disk 2 is a live copy of disk 1. Minimum disks: **2**. Usable capacity: **size of one member** (the smallest). Fault tolerance: **one disk** in a two-member mirror (you can lose n−1 members in a multi-mirror, which is rare in A+ scenarios).

Press FAIL DRIVE on one member. The array stays **available**. Reads can come from either disk, so read performance can improve; writes must hit both, so write performance does not scale like RAID 0. Rebuild is a copy onto a replacement disk.

RAID 1 is the simple workstation and some two-bay NAS answer: survive one disk, easy to reason about, 50% capacity tax. It is still not a backup. Both mirrors sit in the same chassis, same fire, same cryptolocker.

In the lab, fail disk 1: the OS never notices except for a degraded LED. Fail disk 2 as well: now you have no copy, and the logical volume dies. That is the same as pulling both members of a two-disk mirror in production. Rebuild is a block-for-block copy onto a replacement of equal or larger size. Do not initialize. Do not "format to help the mirror." Identify the failed serial number on the controller, replace that bay, and start the rebuild. Reads can be served from either surviving member, which is why RAID 1 is not "always slow." Writes must land on every member. Two-bay NAS + "survive one disk" is almost always RAID 1 on this exam.`
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc3",
        questionIds: ["C1-D3-O4-RAID1-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r4",
        title: "RAID 5 — distributed parity, one-disk survival",
        markdown: `**RAID 5** stripes data **and parity** across three or more disks. Parity is a calculated extra that lets the controller reconstruct a missing disk's block from the surviving data plus parity. Parity rotates among disks so no single disk is "the parity drive" (that older idea was RAID 4). Minimum disks: **3**. Usable capacity: **n − 1** disks. Fault tolerance: **one** member.

Press FAIL DRIVE once. The array goes **degraded** but stays online. Reads/writes now compute missing data on the fly, so performance drops. Replace the disk and **rebuild**. During rebuild every remaining disk is read; a second failure during a multi-terabyte rebuild is how RAID 5 arrays die in real life. That operational risk is why many vendors pushed RAID 6 for larger disks.

Writes pay a parity penalty (read-modify-write on small random writes). Sequential and read-heavy work can still look excellent. If a stem gives three disks and "survive one failure with better capacity than a mirror," RAID 5 is the intended level.

Walk a four-disk RAID 5 in the lab. Usable capacity is three disks. Fail any one member: degraded, online. Fail a second member before the rebuild finishes: the array is lost, because one parity stripe cannot reconstruct two missing disks. That is the operational argument against huge SATA RAID 5 volumes. A hot spare can start the rebuild without you driving in, but the remaining disks still get a full read. Never pull a disk because the activity light "looks wrong" — ask the controller which serial failed. Pulling a healthy member of a degraded RAID 5 is how you turn a disk failure into a restore-from-backup night. And you still needed that backup, because RAID 5 is not one.`
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc4",
        questionIds: ["C1-D3-O4-RAID5-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r5",
        title: "RAID 6 — dual parity, two-disk survival",
        markdown: `**RAID 6** is striped data plus **two independent parity** calculations. Minimum disks: **4**. Usable capacity: **n − 2**. Fault tolerance: **two** members at once.

Press FAIL DRIVE twice. The array can remain available. A third failure loses it. The extra parity costs capacity and write penalty compared with RAID 5, and it buys you the right to survive a disk failure **during** a rebuild. Large, slow-to-rebuild SATA disks in a four-plus-bay NAS are the textbook RAID 6 home.

If a stem says "must survive two failed drives" with more than four disks and no mention of mirroring, RAID 6 is the level. Do not pick RAID 10 just because you like the number 10 — RAID 10's failure math is about **which** two disks die, not any two.

Fail-drive teaching: in a four-disk RAID 6, fail disk 1, then disk 2. The logical volume should remain available while the controller reconstructs from dual parity. Fail a third disk: gone. Capacity on 4 × 1 TB is about 2 TB — the same number as RAID 10 on those disks, bought with a different failure model. RAID 6 does not care which two members died. RAID 10 does. That sentence is worth a full exam item. Writes are heavier than RAID 5 because two parity values are maintained. Large, slow-to-rebuild disks in a NAS are the usual RAID 6 home. You still back up. Dual parity is not yesterday's files and is not an offsite copy. Minimum disks remain four; a three-disk RAID 6 is not a legal array on this exam.`
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc5",
        questionIds: ["C1-D3-O4-RAID6-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O4-L3-r6",
        title: "RAID 10 — striped mirrors",
        markdown: `**RAID 10** (also written RAID 1+0) **mirrors pairs, then stripes across the pairs**. Minimum disks: **4** (even counts). Usable capacity: **n / 2**. Fault tolerance: **at least one** disk, and more if the second failure is in a **different** mirror pair. If both disks of the same pair die, that stripe is gone and the array is lost.

In the lab, picture disks 1+2 as mirror A and disks 3+4 as mirror B. Stripe block 0 onto pair A and block 1 onto pair B. FAIL DRIVE on disk 1: pair A still has disk 2, array lives. FAIL DRIVE on disk 3 as well: each pair still has a member, array lives. FAIL DRIVE on disk 2 after disk 1: pair A is extinct, array dies.

Why people pay the 50% capacity tax: rebuilds are a simple mirror copy (often faster and less risky than RAID 5/6 parity rebuilds), random write performance is stronger than RAID 5, and you still get stripe read throughput. Databases and virtualization hosts often prefer RAID 10 when the disk count is even and the budget exists.

A four-drive company that wants **performance plus redundancy** and can live with half the raw capacity: RAID 10 is the usual BEST, not RAID 0 (no redundancy) and not RAID 5 (one-disk tolerance, parity write cost) unless the stem emphasizes capacity over rebuild behavior.

Lab the pair logic until it is boring. Disks 1+2 are pair A; 3+4 are pair B. Stripe even blocks to A and odd blocks to B. Fail 1: A still has 2. Fail 3 as well: B still has 4, array lives. Fail 1 then 2: pair A is extinct, array dies even though disks 3 and 4 are healthy. That is why "RAID 10 always survives two disks" is a trap — it survives two only when they are in different pairs. Rebuild of a single failed member is a mirror copy, typically faster and less risky than a RAID 5/6 parity rebuild of a huge volume. Databases and hypervisor datastores pay the 50% tax for that behavior. Four 1 TB disks → about 2 TB usable. Minimum four, even counts only.`
      },
      {
        type: "table",
        id: "C1-D3-O4-L3-t1",
        title: "RAID level comparison",
        headers: [
          "Level",
          "Min disks",
          "Usable capacity",
          "Survives",
          "Tendency",
          "Use when",
        ],
        rows: [
          ["0 stripe", "2", "n", "0 disks", "High throughput, no safety", "Scratch / regenerable"],
          ["1 mirror", "2", "1 disk", "1 disk (two-member)", "Simple reads, write to both", "Two-bay OS/data"],
          ["5 parity", "3", "n − 1", "1 disk", "Good reads; parity write cost", "Capacity + one-disk FT"],
          ["6 dual parity", "4", "n − 2", "2 disks", "More write cost; safer rebuild", "Larger arrays"],
          ["10 1+0", "4 even", "n / 2", "1 per pair (not both in a pair)", "Strong random writes", "Perf + redundancy"],
        ],
        caption: "Capacity examples with 4 × 1 TB: RAID 0 = 4 TB, RAID 5 = 3 TB, RAID 6 = 2 TB, RAID 10 = 2 TB. RAID 1 with only two of those disks = 1 TB.",
      },
      {
        type: "lab",
        id: "C1-D3-O4-L3-lab",
        labId: "C1-D3-O4-RAID-LAB",
        title: "RAID builder and failure lab",
        prompt:
          "Build each of RAID 0, 1, 5, 6, and 10. Fail one drive, then two. Watch availability and usable capacity. Leave the lab knowing RAID is not a backup.",
      },
      {
        type: "callout",
        id: "C1-D3-O4-L3-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling RAID 1 'the backup' or replacing a disk in a degraded array without confirming which disk the controller marked failed. Pulling the wrong member of a degraded RAID 5 is how you finish the outage.",
        },
      },
      {
        type: "callout",
        id: "C1-D3-O4-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Degraded array after Disk 3 failed: BEST next is usually identify the failed member, replace with a matching disk, and start the rebuild — not initialize, not restore from backup first unless the array is already lost. Backup is how you survive lost arrays and ransomware; it is not the first click on a still-online degraded volume.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O4-L3-kc6",
        questionIds: ["C1-D3-O4-RAID10-Q001", "C1-D3-O4-RAID5-Q002"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O4-L3-cp",
        questionIds: [
          "C1-D3-O4-HDD-Q003",
          "C1-D3-O4-NVME-Q002",
          "C1-D3-O4-RAID0-Q003",
          "C1-D3-O4-RAID1-Q002",
          "C1-D3-O4-RAID5-Q003",
          "C1-D3-O4-RAID6-Q002",
          "C1-D3-O4-RAID10-Q002",
          "C1-D3-O4-RAID1-Q003",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O4-L3-sum",
        bullets: [
          "RAID 0 stripes, full capacity, zero fault tolerance — fail one disk, lose the array.",
          "RAID 1 mirrors; survive one disk; half capacity on two members.",
          "RAID 5: n−1 capacity, survive one; RAID 6: n−2, survive two.",
          "RAID 10: striped mirrors, n/2 capacity, survive one per pair.",
          "Redundancy is not backup. Rebuilds are stressful. Do not pull the healthy member.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O5-L1",
    objectiveId: "C1-D3-O5",
    slug: "motherboard-form-factors-connectors",
    title: "Motherboards: form factors, sockets, and connectors",
    description:
      "Place ATX, microATX, and ITX, then identify PCIe, SATA, M.2, headers, and power connectors on the explorer.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D3-O5-ATX",
      "C1-D3-O5-PCIE",
      "C1-D3-O5-CPU",
    ],
    prerequisites: ["C1-D3-O4-L3"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "pcie-sig"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The motherboard is the map. If you cannot point at the 24-pin, the EPS CPU power, the top x16 slot, and the M.2 standoff, you will assemble a paperweight.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O5-L1-r1",
        title: "ATX, microATX, ITX, and the socket",
        markdown: `The **motherboard** is the printed circuit that interconnects CPU, RAM, storage, expansion, firmware, and power. **Form factor** decides case compatibility, slot count, and often VRM cooling space.

- **ATX (Advanced Technology eXtended)** — the full-size desktop standard (~305 × 244 mm). Most slots, most RAM slots, easiest service.
- **microATX** — shorter, typically four expansion slots, cheaper cases. Still uses the ATX rear I/O and standoff pattern for the overlapping holes.
- **ITX** family, especially **mini-ITX** (~170 × 170 mm) — one expansion slot, small cases, SFF offices and home theater. Watch CPU cooler height and GPU length.

Standoffs in the case must match the board's holes. A missing standoff can let a solder joint short to the tray. An extra standoff under a no-hole area can short the back of the board.

**CPU sockets** are vendor- and generation-specific. **Intel** and **AMD** packages are not interchangeable. Pin or pad orientation is marked; you do not force a chip. **Multisocket** boards (two or more CPU sockets) appear in servers: RAM is often local to a socket (NUMA). A+ expects you to know they exist and that empty sockets still need rules from the vendor (sometimes a terminator, sometimes leave empty only as documented).

The CPU goes in first in most ATX builds, then the cooler, then RAM in the channel pair, then storage, then GPU in the top full-length **PCIe** slot. Power: **24-pin ATX** to the board, **EPS/CPU** 4- or 8-pin near the socket, GPU PCIe power if the card needs it, SATA power to drives.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O5-L1-d1",
        component: "MotherboardDiagram",
        title: "ATX geography",
        caption:
          "Socket and cooler area, DIMM channels, 24-pin, EPS, PCIe x16, SATA, M.2, front-panel headers.",
        notice:
          "Notice the top x16 slot is the GPU's home because it usually has the CPU's lanes. A short x1 NIC belongs in a small slot, not stolen from the GPU.",
        alt: "Labeled ATX motherboard with CPU socket, RAM, PCIe, SATA, M.2, 24-pin, EPS, and headers.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L1-kc1",
        questionIds: ["C1-D3-O5-ATX-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O5-L1-r2",
        title: "PCIe, legacy PCI, headers, SATA, M.2",
        markdown: `**PCI Express (PCIe)** is the expansion bus. Slots are sized by physical length (x1, x4, x8, x16) and may be wired with fewer lanes than they look. A GPU wants an x16 mechanical slot with x8 or x16 electrical lanes. A capture card, sound card, or NIC can live in x1 or x4. Versions (PCIe 3.0, 4.0, 5.0) double bandwidth per lane; the slot and the card negotiate.

**PCI** (parallel, legacy) still appears on industrial boards. Do not confuse the short PCI slot with PCIe x1; the notch pattern differs.

**Headers** are pin blocks for front-panel power/reset/LEDs, USB, audio, RGB, and fan tach/PWM. The front-panel power switch is two pins — polarity usually does not matter for the switch, but LED polarity does. A "dead PC" after a build is often the power-switch header on the wrong pins.

**SATA** ports on the board edge take drive data cables. **eSATA** is uncommon on modern boards but is in the objectives as an external keyed SATA. **M.2** slots may share lanes with a SATA port or a PCIe slot; the manual's "when M.2_1 is occupied, SATA_2 is disabled" note is a real exam and bench trap.

Power connectors on the board: 24-pin ATX, CPU EPS, sometimes extra PCIe or 12V-2×6 for hungry boards. We will quantify rails in the PSU lesson. For now: if the CPU 8-pin is unplugged, many boards will not POST even with the 24-pin seated.

The explorer lab's Identify mode will hide labels and ask you to click the 24-pin, the EPS, the primary x16, an M.2 standoff, a SATA port, and the front-panel header. That is not trivia. A "dead build" is often the power-switch header on the wrong two pins, RAM in a single channel, or a GPU in a short slot that still physically fits at an angle. PCI (legacy parallel) still exists on industrial boards; its notch is not PCIe x1. If a card will not drop in without force, it is the wrong slot. Force is how you break retention clips and gold fingers.`
      },
      {
        type: "lab",
        id: "C1-D3-O5-L1-lab",
        labId: "C1-D3-O5-MOBO-LAB",
        title: "Motherboard explorer",
        prompt:
          "Run Learn, Labels, Identify, and Build. Seat the CPU oriented correctly, RAM in the channel pair, NVMe in M.2, GPU in the top x16, and both 24-pin and EPS power.",
      },
      {
        type: "callout",
        id: "C1-D3-O5-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "When M.2 shares lanes with a SATA port, plugging both is how a 'missing drive' ticket is born. Read the silkscreen and the manual before you assume the port is dead.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L1-kc2",
        questionIds: ["C1-D3-O5-PCIE-Q001"],
      },
      {
        type: "summary",
        id: "C1-D3-O5-L1-sum",
        bullets: [
          "ATX > microATX > mini-ITX in size and slot count; standoffs must match holes.",
          "Intel and AMD sockets do not mix; multisocket is a server pattern.",
          "GPU in the primary PCIe x16; 24-pin plus CPU EPS both required.",
          "M.2 can steal SATA lanes. Headers include the power switch that makes the build 'dead.'",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O5-L2",
    objectiveId: "C1-D3-O5",
    slug: "uefi-tpm-cpu-architecture",
    title: "UEFI, Secure Boot, TPM, HSM, and CPU architectures",
    description:
      "Configure firmware the A+ way: boot order, passwords, Secure Boot, TPM versus HSM, and x86/x64/ARM.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D3-O5-UEFI",
      "C1-D3-O5-TPM",
      "C1-D3-O5-HSM",
      "C1-D3-O5-ARM",
      "C1-D3-O5-CPU",
    ],
    prerequisites: ["C1-D3-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O5-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A PC that 'won't boot the USB' is often Secure Boot, a CSM leftover, or a boot-order list that still prefers the dead HDD. Firmware is part of install and part of security.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O5-L2-r1",
        title: "From BIOS to UEFI, and the settings you actually change",
        markdown: `**BIOS (Basic Input/Output System)** is the legacy firmware model: 16-bit, MBR disks, limited hardware. **UEFI (Unified Extensible Firmware Interface)** is the modern replacement: GUI setup, GPT disks, large drives, mouse, network stack, and a driver model. People still say "enter BIOS" meaning "enter firmware setup." On the exam, prefer **UEFI** when the stem is current hardware.

You will change:

- **Boot options / boot order** — USB installer versus NVMe versus network PXE. A "boot device not found" after an SSD swap is often order or a leftover RAID ROM.
- **USB permissions** — some firmware can disable USB ports or restrict storage devices for kiosks.
- **Secure Boot** — UEFI feature that only runs bootloaders signed by keys in firmware. Stops many unsigned bootkits. Can block unsigned Linux or older drivers until you enroll keys or (in a lab) disable it. Do not disable Secure Boot on a corporate Windows 11 box to "make a random USB work" without a change ticket.
- **Boot password** versus **firmware/BIOS password** — a boot password prompts before the OS; a setup password stops firmware changes. They are different. Losing the setup password may mean a jumper or vendor procedure, not a guess.
- **Fan and temperature monitoring** — curves, POST halt on missing CPU fan, readings you compare when a machine thermal-throttles.
- **Virtualization support** — Intel VT-x / AMD-V toggles. Required for many hypervisors. Off by default on some laptops.
- **USB / compatibility (CSM)** — enabling CSM to boot ancient MBR media can break Secure Boot. Prefer native UEFI.

Firmware lives on a chip; a bad flash or failed update can brick a board. Follow vendor instructions, keep power stable, and do not invent a "BIOS update" as a first step for a loose 24-pin.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O5-L2-d1",
        component: "MotherboardDiagram",
        title: "Firmware, TPM, and the boot path",
        caption:
          "UEFI on the SPI chip, TPM as a module or fused in the CPU/PCH, Secure Boot keys deciding whether the OS loader runs.",
        notice:
          "Notice TPM is a measured-boot and key-storage device on the PC. An HSM is typically a separate, often networked or PCIe, vault for an organization's keys. Do not treat them as synonyms.",
        alt: "Boot flow from UEFI Secure Boot through TPM-backed keys into the OS loader.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L2-kc1",
        questionIds: ["C1-D3-O5-UEFI-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O5-L2-r2",
        title: "TPM versus HSM, and x86/x64/ARM",
        markdown: `A **Trusted Platform Module (TPM)** is a hardware root of trust on the PC. It stores keys, measures boot components, and enables features such as BitLocker (Windows) and some Windows 11 baseline requirements. TPM 2.0 may be a discrete module, firmware TPM, or silicon in the CPU/chipset. Clearing the TPM without recovering keys can make encrypted volumes unreadable. Do not "clear TPM" as a casual fix.

A **hardware security module (HSM)** is a hardened appliance or card that generates and stores cryptographic keys for an organization — certificate authorities, payment systems, secrets managers. It is not "the laptop's TPM with a different sticker." If a stem says a bank must keep CA keys in tamper-resistant hardware used by many servers, that is an HSM.

**CPU architecture:**

- **x86** — 32-bit Intel-compatible. Legacy.
- **x64** (x86-64 / AMD64) — 64-bit Intel/AMD compatible. The Windows/Linux desktop and server default.
- **ARM (Advanced RISC Machine)** — RISC architecture in phones, many tablets, and a growing set of laptops and servers. You cannot run a typical x64 Windows driver package unmodified on ARM Windows. Instruction sets and installers differ.

**Cores** are independent processing units on one package. More cores help parallel work (VMs, compiles, many browser tabs). Clock speed helps lightly threaded work. Integrated GPUs, memory controllers, and NPUs may live on the same package; that does not make a discrete GPU unnecessary for CAD.

When a stem says "enable hardware virtualization" you are in UEFI. When it says "Windows 11 firmware requirement for measured boot," think TPM 2.0 plus UEFI Secure Boot. When it says "mobile SoC laptop," think ARM until the stem says otherwise.`,
      },
      {
        type: "table",
        id: "C1-D3-O5-L2-t1",
        title: "Firmware and crypto hardware",
        headers: ["Feature", "What it does", "A+ trap"],
        rows: [
          ["UEFI", "Modern firmware; GPT; GUI setup", "People still call it BIOS"],
          ["Secure Boot", "Only signed bootloaders", "Blocks unsigned USB OS by design"],
          ["TPM", "On-device key vault / measurements", "Clearing it can lose BitLocker keys"],
          ["HSM", "Organizational key appliance", "Not a synonym for TPM"],
          ["VT-x / AMD-V", "CPU virtualization extensions", "Hypervisor fails if left off"],
          ["x64 vs ARM", "Instruction-set families", "Wrong installer = 'app won't install'"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O5-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Setup (BIOS) password ≠ Windows password ≠ BitLocker PIN ≠ TPM. Secure Boot is UEFI, not an antivirus. HSM is enterprise key hardware; TPM is local.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L2-kc2",
        questionIds: ["C1-D3-O5-TPM-Q001"],
      },
      {
        type: "summary",
        id: "C1-D3-O5-L2-sum",
        bullets: [
          "UEFI is the current firmware; boot order, Secure Boot, virtualization, and passwords live there.",
          "Secure Boot enforces signed loaders; disable it only with a reason.",
          "TPM is on-device trust; HSM is organizational key hardware.",
          "x86/x64 versus ARM decides which OS and drivers you can run. Cores ≠ clock.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O5-L3",
    objectiveId: "C1-D3-O5",
    slug: "expansion-cooling-assembly",
    title: "Expansion cards, cooling, and a sane assembly order",
    description:
      "Install sound, video, capture, and NIC cards, then cool the CPU with paste, air, or liquid without wrecking the die.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D3-O5-COOLING",
      "C1-D3-O5-CPU",
      "C1-D3-O5-PCIE",
    ],
    prerequisites: ["C1-D3-O5-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O5-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A GPU in an x1 slot, a capture card without a driver, or a cooler seated on a plastic cap will all POST into a ticket. Assembly order is how you avoid three of those in one afternoon.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O5-L3-r1",
        title: "Add-on cards and the air that keeps silicon honest",
        markdown: `**Expansion cards** you must be able to place:

- **Video card (GPU)** — primary x16 slot, auxiliary PCIe power if required, display cables from the card not the motherboard I/O when a discrete GPU is installed.
- **Sound card** — when onboard audio is insufficient or broken; watch Windows exclusive-mode and default-device tickets.
- **Capture card** — HDMI/SDI in for streamers and lecture recording; needs bandwidth and a driver.
- **NIC** — extra Ethernet, fiber SFP, or a replacement when onboard dies. Server-class NICs may want x4.

Seat fully, screw the bracket, install the vendor driver, then test. A card that "isn't seen" is often not seated, lane-shared with M.2, or Secure Boot blocking an unsigned driver.

**Cooling** moves heat from the die to air or liquid.

- **Thermal paste or pads** couple the CPU (or GPU) **integrated heat spreader** to the **heat sink**. Too little paste leaves air gaps. Too much paste is an insulator and a mess. Pea or line per vendor; do not use toothpaste. Replace dried paste when you reseat a cooler.
- **Heat sink** plus **fans** (air cooling) is the default. Fan headers: CPU_FAN is often required to POST. Case fans are intake/exhaust; do not build a tornado that fights itself.
- **Liquid cooling** — AIO (all-in-one) closed loops are common: pump on the block, radiator on the case. Custom loops are out of A+ depth except "leaks are catastrophic" and "the pump still needs power and a header."

Overheating looks like throttling, random shutdowns, and burning smell if a fan failed. That troubleshooting lives in Domain 5; here you install so those tickets are rarer.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O5-L3-d1",
        component: "MotherboardDiagram",
        title: "Assembly path",
        caption:
          "CPU → paste → cooler → RAM in channel colors → M.2/SATA storage → GPU in top x16 → 24-pin + EPS + GPU power.",
        notice:
          "Notice the cooler goes on before the GPU on most ATX boards because the socket is otherwise boxed in. Notice you remove the plastic IHS cap before paste — leaving it on is a real bench joke that cooks CPUs.",
        alt: "Numbered install order on an ATX board from CPU through power cables.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L3-kc1",
        questionIds: ["C1-D3-O5-COOLING-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O5-L3-r2",
        title: "Build order you can defend on a PBQ",
        markdown: `A defensible desktop assembly sequence:

1. Prepare the case: standoffs for the form factor, I/O shield, front-panel cables identified.
2. CPU in the socket, retention closed, **no** bent pins (Intel LGA pads on the CPU; AMD depending on generation may put pins on the CPU — handle by edges).
3. Paste, then cooler, then CPU_FAN header.
4. RAM in the documented channel slots, clips closed.
5. Motherboard into the case, screws in a star pattern.
6. Storage: M.2 under the heatsink, SATA data + power.
7. GPU in the primary x16, bracket screwed, PCIe power.
8. 24-pin and EPS. Front-panel header. Drive power.
9. First boot: firmware, memory recognized, storage recognized, then OS.

Ground yourself (ESD strap to chassis). Do not work on carpet with a wool sweater and a $400 CPU. Do not spin up a PSU outside a load (bench testers exist; jumpering a 24-pin with a paperclip is a last-resort tech-school trick, not a best practice).

If the explorer lab's Troubleshoot mode shows no POST, check EPS power, RAM seating, and the cooler pretension before you replace the board.

ESD control is part of assembly, not an optional lecture. Wrist strap to unpainted chassis metal, handle cards by the edges, bag parts you are not installing. Do not assemble on a carpet in a fleece. The front-panel LED polarity can be wrong and the PC will still start — the switch is just a short. The CPU fan header is not optional on many boards: no tach, no POST. Case airflow should have a clear intake and exhaust so the GPU is not inhaling PSU exhaust. When the first boot works, enter UEFI and confirm CPU model, full RAM size, and the NVMe serial before you celebrate and close the side panel.`
      },
      {
        type: "lab",
        id: "C1-D3-O5-L3-lab",
        labId: "C1-D3-O5-MOBO-LAB",
        title: "Build and troubleshoot modes",
        prompt:
          "Complete Build, then Troubleshoot at least one 'no POST' scenario. Confirm 24-pin, EPS, RAM channel, and cooler presence before swapping parts.",
      },
      {
        type: "callout",
        id: "C1-D3-O5-L3-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Plugging the monitor into the motherboard HDMI while a discrete GPU is installed, then diagnosing a 'dead GPU.' Video flows from the card you meant to use.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O5-L3-kc2",
        questionIds: ["C1-D3-O5-CPU-Q001"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O5-L3-cp",
        questionIds: [
          "C1-D3-O5-ATX-Q002",
          "C1-D3-O5-PCIE-Q002",
          "C1-D3-O5-UEFI-Q002",
          "C1-D3-O5-TPM-Q002",
          "C1-D3-O5-HSM-Q001",
          "C1-D3-O5-ARM-Q001",
          "C1-D3-O5-COOLING-Q002",
          "C1-D3-O5-CPU-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O5-L3-sum",
        bullets: [
          "GPU, NIC, sound, and capture cards need the right slot, power, and driver.",
          "Paste is a thin thermal interface, not frosting. CPU_FAN often gates POST.",
          "Air vs AIO liquid: both need a powered pump or fan and a path for heat out of the case.",
          "Assembly order: CPU, cooler, RAM, board, storage, GPU, power. Monitor cable to the GPU.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O6-L1",
    objectiveId: "C1-D3-O6",
    slug: "psu-rails-wattage-modular",
    title: "Power supplies: rails, input voltage, and the 24-pin",
    description:
      "Select a PSU by region, wattage, efficiency, modularity, and rail, then match 24-pin, EPS, PCIe, and SATA cables.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D3-O6-VAC",
      "C1-D3-O6-RAILS",
      "C1-D3-O6-ATX24",
      "C1-D3-O6-MODULAR",
      "C1-D3-O6-WATTAGE",
    ],
    prerequisites: ["C1-D3-O5-L3"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Undersize a PSU and the GPU will hiccup at load. Ignore the input-voltage switch on a dual-voltage unit and you can let the smoke out. Open a PSU to 'see the rails' and you can let the rest of you out — capacitors hold charge.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O6-L1-r1",
        title: "AC in, DC rails out",
        markdown: `A **power supply unit (PSU)** converts building **alternating current (AC)** into the **direct current (DC)** the PC uses.

**Input:** North America and parts of the Americas commonly present **110–120 VAC**. Much of Europe, Asia, Africa, and Australia present **220–240 VAC**. Many modern PSUs are auto-switching. Some older or industrial units have a red **115/230** slider. The slider on 115 in a 230 V country is a classic way to destroy the PSU. Travel techs verify the switch and the IEC cord.

**Output rails** (nominal):

- **3.3 V** — motherboard logic, some older chipset/RAM duties
- **5 V** — legacy peripherals, some USB-derived needs, electronics
- **12 V** — the heavy rail: CPU (via VRM), GPU, fans, drives' motors, modern everything

Today's PCs are **12 V-heavy**. Wattage on the 12 V rail is the number that actually feeds a GPU. A label that promises 700 W with a weak 12 V rail is a paperweight. The exam will ask you to match a rail to a load: yellow wire 12 V, red 5 V, orange 3.3 V on ATX pinouts.

**20+4 pin** is the ATX motherboard connector: older boards used 20-pin; the extra 4 pins piggyback for 24-pin boards. Modern boards are 24-pin. **EPS** 4+4 or 8-pin near the CPU is mandatory on most current boards. **PCIe** 6-pin, 8-pin, or 12VHPWR/12V-2×6 feed GPUs. **SATA power** is 15-pin to drives. **Molex** 4-pin still appears on pumps and older devices.

Do not open the PSU chassis. There are no user-serviceable rails inside, and **high-voltage capacitors** can remain charged with the cord unplugged.`,
      },
      {
        type: "video",
        id: "C1-D3-O6-L1-see1",
        assetId: "atx-24-pin-eps",
        title: "SEE: 24-pin ATX then CPU EPS",
        caption: "HTML overlays: 24-pin and CPU / EPS. Missing mp4 is not an error.",
        transcript:
          "The 24-pin ATX connector powers the board. The 8-pin EPS connector near the CPU socket is required on modern boards. Both must fully seat.",
      },
      {
        type: "diagram",
        id: "C1-D3-O6-L1-d1",
        component: "PsuRailsDiagram",
        title: "ATX rails and cables",
        caption:
          "AC inlet and region, then 3.3/5/12 V DC out to 24-pin, EPS, PCIe, SATA, and Molex.",
        notice:
          "Notice 12 V is what a modern GPU and CPU actually binge on. A 'big wattage' PSU with anemic 12 V is the wrong unit. Notice redundant PSUs are a pair you can hot-swap in a server, not two desktop bricks taped together.",
        alt: "Power supply with AC input, 3.3V 5V 12V rails, and labeled 24-pin EPS PCIe SATA cables.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O6-L1-kc1",
        questionIds: ["C1-D3-O6-RAILS-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O6-L1-r2",
        title: "Wattage, efficiency, modular, redundant",
        markdown: `**Wattage rating** is the continuous power the PSU can deliver, not a peak sticker. Add CPU, GPU, drives, fans, and USB loads, then keep **headroom** (often 20–30%) so the unit is not pinned at 100% and so a GPU boost spike does not brown out. Vendor calculators are a start; still read the 12 V amperage.

**Energy efficiency** (80 PLUS Bronze/Silver/Gold/Platinum/Titanium) describes how much wall AC becomes DC at typical loads. A Gold unit wastes less heat than a no-badge unit at the same DC output. Efficiency is not "more watts to the GPU"; it is less heat and a smaller electric bill. A 500 W Gold unit does not outperform a quality 750 W Bronze if the PC needs 600 W.

**Modular** PSUs let you attach only the cables you need. **Semi-modular** keeps the 24-pin and EPS captive. **Non-modular** has every cable permanently attached and turns a small case into spaghetti. Modularity is serviceability and airflow, not extra power.

**Redundant power supplies** appear in servers and some network closets: two (or more) hot-swap modules, each able to run the chassis, often on separate PDUs. Lose one module or one circuit, the machine stays up. A desktop does not become redundant because you bought two cheap PSUs.

Symptoms of a dying PSU (Domain 5 will drill them): no power, random shutdowns under load, burning smell, coil whine extreme enough to worry, USB devices dropping. FIRST tests are outlet, power strip, and the PSU's own switch — not an immediate motherboard swap.`,
      },
      {
        type: "table",
        id: "C1-D3-O6-L1-t1",
        title: "Connector and rail map",
        headers: ["Cable", "Typical voltage / role", "Goes to"],
        rows: [
          ["IEC C14 inlet", "110–120 or 220–240 VAC", "Wall / PDU"],
          ["24-pin (20+4)", "Mixed 3.3/5/12 + standby 5 VSB", "Motherboard"],
          ["EPS 4/8-pin", "12 V", "CPU VRM"],
          ["PCIe 6/8-pin", "12 V", "GPU"],
          ["SATA 15-pin", "3.3/5/12 (drives use 5/12)", "SSD/HDD/optical"],
          ["Molex 4-pin", "5 V red, 12 V yellow", "Legacy devices, some pumps"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O6-L1-safety",
        callout: {
          kind: "safety",
          title: "Safety",
          body: "Never service the interior of a PSU. Unplug, wait, and treat it as a sealed unit. Verify dual-voltage switches before applying power in another region. Redundant server PSUs are hot-swappable only when the remaining module is confirmed healthy.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O6-L1-kc2",
        questionIds: ["C1-D3-O6-VAC-Q001"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O6-L1-cp",
        questionIds: [
          "C1-D3-O6-VAC-Q002",
          "C1-D3-O6-RAILS-Q002",
          "C1-D3-O6-ATX24-Q001",
          "C1-D3-O6-MODULAR-Q001",
          "C1-D3-O6-WATTAGE-Q001",
          "C1-D3-O6-RAILS-Q003",
          "C1-D3-O6-ATX24-Q002",
        ],
      },
      {
        type: "lab",
        id: "C1-D3-O6-L1-lab",
        labId: "C1-D3-O6-PSU-LAB",
        title: "PSU wattage, modular, 24-pin, and rails matching lab",
        prompt:
          "Match wattage, modular, ATX 24-pin, and 12V-rail fixes. Leave open-PSU and ignore-VAC unmatched.",
      },
      {
        type: "summary",
        id: "C1-D3-O6-L1-sum",
        bullets: [
          "Match input 110–120 vs 220–240 VAC; respect dual-voltage switches.",
          "3.3 V and 5 V exist; 12 V feeds CPU, GPU, and most modern load.",
          "24-pin to the board, EPS to the CPU, PCIe to the GPU, SATA power to drives.",
          "Size wattage with 12 V headroom. Modular is cable management. Redundant is hot-swap server modules.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O7-L1",
    objectiveId: "C1-D3-O7",
    slug: "printer-mfd-deployment",
    title: "Deploying printers and MFDs",
    description:
      "Unbox, place, pick PCL versus PostScript, connect, share, secure print, and point scans at email, SMB, or cloud.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D3-O7-PCL",
      "C1-D3-O7-PS",
      "C1-D3-O7-ADF",
      "C1-D3-O7-SECUREPRINT",
      "C1-D3-O7-PRINTSERVER",
    ],
    prerequisites: ["C1-D3-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O7-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A multifunction device is a networked computer that also eats paper. If you dump it on the floor without a driver, firmware, or a scan destination, you have deployed a 40 kg paperweight.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O7-L1-r1",
        title: "Unbox, place, drivers, firmware, connectivity",
        markdown: `**Unbox** with two people if the MFD is floor-standing. Remove every orange shipping lock, tape, and spacer from trays, toner path, and the **automatic document feeder (ADF)**. Power-on with a spacer still in the fuser is a support-call classic.

**Placement:** level surface, clearance for trays and exhaust, not in direct sun, not on carpet that chokes airflow, network drop and power within code. Toner is a fine particle — do not shake cartridges like a cocktail in an open office.

**Drivers** must match the operating system architecture (x64 vs ARM) and the **page description language** the queue should speak:

- **PCL (Printer Command Language)** — common in Windows offices, efficient for typical documents, vendor-flavored versions (PCL 5/6).
- **PostScript (PS)** — a full page-description language loved by design/print workflows and many macOS/Adobe pipelines. Better when the document is complex vector art; worse when you pick a PostScript driver for a PCL-only cheap laser.

A wrong language looks like **garbled print** (symbols, wrong fonts), which Domain 5 will treat as a driver/language issue, not a toner issue.

**Firmware** on the printer is its OS. Update from vendor files on a change window; random "update" mid-day can brick a queue. **Connectivity:** USB for a single local PC (simple, not a floor of users), **Ethernet** for managed offices, **wireless** for small offices that accept the extra failure mode. Prefer Ethernet for anything with an SLA.

Set IP statically or on a DHCP reservation so the queue does not hunt a new address on Monday.`,
      },
      {
        type: "diagram",
        id: "C1-D3-O7-L1-d1",
        component: "LaserPrinterDiagram",
        title: "MFD as a network endpoint",
        caption:
          "USB versus Ethernet versus wireless in; PCL or PostScript queue; ADF and flatbed; scan to email/SMB/cloud.",
        notice:
          "Notice a printer share is a PC sharing USB. A print server is a dedicated queue host (Windows Server, appliance, or the MFD's own spooler). They fail differently.",
        alt: "Office MFD with USB, Ethernet, wireless, ADF, flatbed, and scan destinations marked.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O7-L1-kc1",
        questionIds: ["C1-D3-O7-PCL-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O7-L1-r2",
        title: "Sharing, security, scan destinations, ADF versus flatbed",
        markdown: `**Printer share** — a workstation shares a locally attached printer. When that PC sleeps, the queue dies. Fine for two people, wrong for a department.

**Print server** — a central host (Windows Server, a dedicated appliance, or a capable MFD) that owns queues, drivers, and often accounting. Clients point at the server. This is the domain-joined office answer.

**Configuration settings** you will be asked to match: **duplex** (two-sided), **orientation** (portrait/landscape), **tray** (letter vs legal vs letterhead), **quality** (draft vs photo). Wrong tray is "letterhead on plain" not "the fuser is bad."

**Security:** **user authentication** (AD/LDAP, PIN, or username), **badging** (tap a card to release jobs), **audit logs** (who printed what), and **secured prints / pull print** (job sits until the owner authenticates at the device so PHI does not sit in the output bin). A medical office stem that wants to stop abandoned charts on the printer is secured print, not "move the printer."

**Network scan services:** **email** (scan-to-email via SMTP — needs a relay and often an app password), **SMB** (scan to a share — needs a service account and path), **cloud** (vendor connector to OneDrive/Google Drive, etc.). These fail on DNS, certificates, and credentials more than on the CIS lamp.

**ADF** feeds a stack for copy/scan; **flatbed** is the glass for books, passports, and fragile pages. A jam in the ADF does not mean the flatbed is dead. Duplex ADF units have more rollers to clean.

Deploy like a system: place, firmware, network, time/NTP, driver language, queue defaults, auth, scan destination, test page, test scan, document the IP and queue name in the ticket.`,
      },
      {
        type: "table",
        id: "C1-D3-O7-L1-t1",
        title: "Deployment choices",
        headers: ["Need", "Choose", "Avoid"],
        rows: [
          ["One PC, no server", "USB + local queue", "Wireless if the PC is stable USB"],
          ["Department queue", "Ethernet + print server", "A workstation share that sleeps"],
          ["Windows office docs", "PCL (when the device supports it)", "PS only because 'it sounds pro'"],
          ["Design/macOS vectors", "PostScript or vendor PS", "A generic PCL that garbles fonts"],
          ["PHI at the device", "Secure print + badge/PIN", "Open output tray in a hallway"],
          ["Stack of invoices", "ADF", "One-by-one flatbed unless damaged"],
          ["Bound book", "Flatbed", "Forcing it through the ADF"],
        ],
      },
      {
        type: "callout",
        id: "C1-D3-O7-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "A test page from the printer's own panel proves the engine. A test page from Windows proves the queue and driver. Scan to a share proves SMB. Test each layer; do not reinstall Windows because the ADF is empty.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O7-L1-kc2",
        questionIds: ["C1-D3-O7-SECUREPRINT-Q001"],
      },
      {
        type: "lab",
        id: "C1-D3-O7-L1-lab",
        labId: "C1-D3-O7-MFD-LAB",
        title: "Printer and MFD deployment matching lab",
        prompt:
          "Match ADF, secure print, print server, and PostScript. Leave flatbed-for-stacks and USB-share unmatched.",
      },
      {
        type: "checkpoint",
        id: "C1-D3-O7-L1-cp",
        questionIds: [
          "C1-D3-O7-PCL-Q002",
          "C1-D3-O7-PS-Q001",
          "C1-D3-O7-ADF-Q001",
          "C1-D3-O7-SECUREPRINT-Q002",
          "C1-D3-O7-PRINTSERVER-Q001",
          "C1-D3-O7-ADF-Q002",
          "C1-D3-O7-PRINTSERVER-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O7-L1-sum",
        bullets: [
          "Remove shipping locks, place with airflow and a network plan, then firmware.",
          "PCL vs PostScript is a queue-language choice; mismatch garbles output.",
          "Ethernet + print server beats a sleeping USB share for departments.",
          "Secure print, badges, and audit logs protect output; scan to email/SMB/cloud needs credentials.",
          "ADF is stacks; flatbed is books and fragile originals.",
        ],
      },
    ],
  },
  {
    id: "C1-D3-O8-L1",
    objectiveId: "C1-D3-O8",
    slug: "printer-maintenance-laser-process",
    title: "Printer maintenance and the laser process",
    description:
      "Walk the laser imaging process, then maintain inkjet, thermal, and impact printers with the right kit.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D3-O8-LASER",
      "C1-D3-O8-INKJET",
      "C1-D3-O8-THERMAL",
      "C1-D3-O8-IMPACT",
      "C1-D3-O8-FUSER",
      "C1-D3-O8-DRUM",
    ],
    prerequisites: ["C1-D3-O7-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D3-O8-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Faded laser is often toner or density. Repeating marks follow drum circumference. Garbled text is language/driver. If you 'just clean it' you will miss the subsystem the exam and the customer both care about.",
        },
      },
      {
        type: "reading",
        id: "C1-D3-O8-L1-r1",
        title: "The laser imaging process",
        markdown: `A **laser** printer is an electrophotographic engine. Know the process in order — CompTIA and every service manual expect it.

1. **Processing** — the controller rasterizes the page (from PCL, PostScript, or a vendor language) into a bitmap.
2. **Charging** — a charge roller (or older corona wire) puts a uniform negative charge on the **photosensitive drum**.
3. **Exposing** — the laser (or LED array) writes the image by discharging areas of the drum. Those areas become the latent image.
4. **Developing** — toner (fine charged plastic and pigment) is presented by the developer roller and sticks to the discharged areas.
5. **Transferring** — paper is charged so toner jumps from drum to paper. A transfer roller or belt does this work.
6. **Fusing** — the **fuser** applies heat and pressure to melt toner into the fibers. The page comes out warm. A failing fuser smears toner that rubs off, or wrinkles paper, or smells of hot failure.
7. **Cleaning** — a blade and recovery system remove residual toner from the drum before the next charge. Leftover toner here becomes ghosting or speckling.

Maintenance the objectives name: **replace toner**, **apply a maintenance kit** (fuser, rollers, transfer parts on a click count), **calibrate** (especially color registration), and **clean** (paper path, corona/charge roller per manual — no vacuum without a toner-rated filter).

Do not put a household vacuum on toner; it is fine powder that can pass a normal filter and become an airborne mess. Use a toner vac or damp wipe as the vendor says. The fuser is hot. Let it cool.`,
      },
      {
        type: "video",
        id: "C1-D3-O8-L1-see1",
        assetId: "inkjet-laser-slide",
        title: "SEE: inkjet cartridge versus laser toner seating",
        caption: "Seating only. The seven-step laser process stays on the still diagram.",
        transcript:
          "Inkjet uses liquid ink cartridges. Laser uses a toner cartridge of charged powder. This clip only shows seating. The seven-step laser imaging process stays on the still diagram.",
      },
      {
        type: "diagram",
        id: "C1-D3-O8-L1-d1",
        component: "LaserPrinterDiagram",
        title: "Laser paper path and process",
        caption:
          "Processing → charging → exposing → developing → transferring → fusing → cleaning.",
        notice:
          "Notice the fuser is after transfer: toner is powder until heat and pressure. Notice the drum is the clock of repeating marks — measure the spacing and you can often name the roller.",
        alt: "Cutaway of a laser printer showing drum, laser, toner, transfer, fuser, and paper path.",
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O8-L1-kc1",
        questionIds: ["C1-D3-O8-LASER-Q001"],
      },
      {
        type: "reading",
        id: "C1-D3-O8-L1-r2",
        title: "Inkjet, thermal, and impact — the right kit",
        markdown: `**Inkjet** sprays liquid ink from nozzles. Maintenance: **replace cartridges**, **clean printheads** (clogged nozzles = missing colors or streaks), **calibrate/align**, **rollers and feeders** (blank pages, skewed photos), and **clear jams** without tearing paper in the encoder strip. Leaving an inkjet unused for months clogs heads; a hardware printhead on some models is an expensive part, not a $15 cartridge.

**Thermal** printers (receipts, labels, some healthcare wristbands) form images by heating **special thermal paper** or by transferring from a ribbon (thermal transfer). Maintenance: **replace paper** (correct grade; cheap paper can coat the head), **clean the heating element** with the vendor swab, **remove debris**, and check the **feed assembly**. A faded receipt is often the wrong paper (non-thermal) or a dirty head — not "toner." There is no toner.

**Impact** (dot-matrix) strikes an inked **ribbon** through to paper. It still exists because **multipart (NCR) forms** need physical impact to mark carbonless copies, and because some industrial environments hate lasers' ozone and inkjets' clogs. Maintenance: **replace ribbon** (faded, even on new paper), **replace/clean printhead**, **replace paper**, and mind tractor-feed holes. Do not "upgrade them to laser" when the requirement is five-part forms.

Match the kit to the engine. A laser maintenance kit will not unclog an inkjet. Thermal paper in an impact printer is a waste of money. The printer lab will show output samples; Domain 5 will ask FIRST/NEXT on those samples. This objective is whether you brought the right part.

Keep the four engines in separate sentences on the exam. Laser: toner, drum, fuser, kit, calibrate, clean — and the seven-step process. Inkjet: liquid ink, heads, alignment, rollers. Thermal: coated paper or transfer ribbon, heating element, feed assembly, debris. Impact: ribbon, head, tractor, multipart forms. A faded sample is not one answer: faded laser is often toner, faded impact is often ribbon, faded thermal is often paper or a dirty element. Garbled text is still language/driver from 3.7, not a cleaning ritual. If you only remember "clean it," you will miss the item.`
      },
      {
        type: "table",
        id: "C1-D3-O8-L1-t1",
        title: "Maintenance by engine",
        headers: ["Engine", "Consumable", "Kit / action", "Do not"],
        rows: [
          ["Laser", "Toner", "Maintenance kit, calibrate, clean path", "Household vacuum on toner; touch hot fuser"],
          ["Inkjet", "Ink / head", "Clean heads, align, rollers, clear jams", "Let it sit dry for months"],
          ["Thermal", "Thermal paper", "Clean element, clear debris, feed assembly", "Load plain copy paper and blame the head"],
          ["Impact", "Ribbon", "Ribbon, head, tractor paper", "Expect laser-quality photos"],
        ],
      },
      {
        type: "lab",
        id: "C1-D3-O8-L1-lab",
        labId: "C1-D3-O8-PRINTER-LAB",
        title: "Printer output and maintenance lab",
        prompt:
          "Match faded, ghosted, and streaked samples to a subsystem. Pick toner, fuser/drum, inkjet head, thermal paper, or ribbon — not a generic clean.",
      },
      {
        type: "callout",
        id: "C1-D3-O8-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Warm smearing toner that rubs off = fuser. Repeating equal-spaced marks = drum or a roller of that circumference. Faded laser = toner/density. Faded impact = ribbon. Faded thermal = paper or dirty element. Garbled = driver/language, not paper.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D3-O8-L1-kc2",
        questionIds: ["C1-D3-O8-FUSER-Q001"],
      },
      {
        type: "checkpoint",
        id: "C1-D3-O8-L1-cp",
        questionIds: [
          "C1-D3-O8-LASER-Q002",
          "C1-D3-O8-INKJET-Q001",
          "C1-D3-O8-THERMAL-Q001",
          "C1-D3-O8-IMPACT-Q001",
          "C1-D3-O8-FUSER-Q002",
          "C1-D3-O8-DRUM-Q001",
          "C1-D3-O8-INKJET-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D3-O8-L1-sum",
        bullets: [
          "Laser order: processing, charging, exposing, developing, transferring, fusing, cleaning.",
          "Toner, maintenance kit, calibrate, clean — fuser is heat and pressure; drum holds the latent image.",
          "Inkjet: cartridges, heads, alignment, rollers. Thermal: special paper and a clean element. Impact: ribbon and multipart forms.",
          "Bring the kit that matches the engine. Output patterns name the subsystem.",
        ],
      },
    ],
  },
];
