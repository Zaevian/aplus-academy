# MASTER BUILD SPECIFICATION — COMPLETE INTERACTIVE COMPTIA A+ ACADEMY

You are not creating a prototype, outline, mock-up, proof of concept, landing page, study guide, flashcard app, or demo. You are acting simultaneously as a senior full-stack engineer, instructional designer, technical writer, CompTIA A+ curriculum architect, UI/UX designer, multimedia producer, QA engineer, and technical researcher.

Your task is to BUILD a complete, production-ready, deployable self-study web application that can take a learner from limited IT knowledge through comprehensive preparation for the current CompTIA A+ certification exams.

The finished deliverable must be a functional website that I can deploy to Vercel and immediately begin studying with.

DO NOT merely give me an implementation plan. Create the implementation plan internally, make a task list, research the material, build the application, author the curriculum, create the question banks, create the interactions, generate or implement the visual assets, test everything, fix failures, and leave me with a complete deployable project.

Do not stop after scaffolding. Do not leave TODOs. Do not say "add content later." Do not create placeholder lessons. Do not give me sample units and expect me to extrapolate. Do not create only one example interaction and say the others follow the same pattern. IMPLEMENT THE ENTIRE COURSE.

The educational goal is not merely to scrape past the certification. The learner should understand the material well enough to reason through unfamiliar troubleshooting scenarios and perform foundational IT support work.

No course can guarantee an exam pass, so do not claim a guaranteed result. The requirement instead is: comprehensively teach, reinforce, practice, and assess every current exam objective at sufficient depth that this application can function as the learner's PRIMARY study resource rather than merely a supplement.

## 1. CURRENT CERTIFICATION TARGET AND MANDATORY RESEARCH PHASE

Target the current CompTIA A+ V15 exams:
- Core 1: 220-1201
- Core 2: 220-1202

Before writing curriculum content, independently research the CURRENT official CompTIA A+ certification page and CURRENT official exam objective documents.

Do not trust your training-memory version of the objectives.

Verify:
- current exam codes
- current exam version
- latest revision of each exam-objectives document
- domain percentages
- exam duration
- maximum question count
- question formats
- current passing-score information
- every numbered objective
- every subobjective
- current acronym list
- technologies added or removed from the newest revision

If CompTIA has released a revision newer than what this specification assumes while retaining the same exam codes, follow the newest official objectives.

If CompTIA has replaced 220-1201/220-1202 entirely, STOP curriculum generation long enough to determine which exams are actually current, then update the application accordingly.

Create a machine-readable curriculum coverage file such as:

`src/content/objectives/coverage.json`

Every official objective and meaningful subtopic must have:
- objective ID
- Core 1/Core 2
- domain
- source/reference
- lesson IDs covering it
- interaction IDs covering it
- quiz-question IDs assessing it
- review-question IDs assessing it
- PBQ/lab IDs where applicable
- status: covered/verified
- lastVerified date

Create an automated coverage validation script. Production build must fail if any required objective has no instructional content or no assessment coverage.

Use authoritative references when researching technical facts:
1. Current CompTIA objectives for scope.
2. Microsoft Learn/Support for Windows concepts.
3. Apple documentation for macOS/iOS concepts.
4. Relevant hardware/vendor documentation.
5. NIST/CISA or similarly authoritative sources for security concepts.
6. Wi-Fi Alliance, USB-IF, PCI-SIG, Bluetooth SIG and relevant standards organizations where useful.
7. Cisco or other authoritative networking documentation where appropriate.
8. High-quality current A+ instructional sources such as Professor Messer only as a scope/cross-checking aid.
9. Community reports only to understand study/test experience, NEVER as the authority for technical facts.

Never use brain dumps or recalled/live exam questions.

Write original explanations and original practice questions.

## 2. PRODUCT PHILOSOPHY

This should feel like a combination of:
- an excellent technical textbook
- a university LMS
- an interactive laboratory
- CompTIA-style practice
- a troubleshooting simulator
- an adaptive mastery application
- a visual hardware explorer

It must NOT feel like:
"Here is a paragraph. Click next. Here is another paragraph."

The learning cycle should be:

LEARN → SEE → INTERACT → CHECK → LEARN → APPLY → CHECK → REVIEW → TEST → SPACED REVIEW → PRACTICE UNDER EXAM CONDITIONS.

Passive consumption should be the exception rather than the entire experience.

## 3. REQUIRED TECHNOLOGY STACK

Use the most appropriate current stable versions at implementation time. Favor:
- Next.js using App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- a high-quality accessible component system such as shadcn/ui
- Motion for React / Framer Motion where interaction and animation materially improve learning
- React Three Fiber / Three.js selectively for rotatable technical objects
- SVG/Canvas for deterministic diagrams
- Recharts or D3 where genuine graphs improve comprehension
- xterm.js or a controlled custom terminal simulator for CLI laboratories
- IndexedDB using Dexie or another reliable client-side persistence layer for instant local saving
- Supabase Auth + Postgres for optional/normal account-based cloud synchronization
- Supabase Storage or another appropriate persistent object store for generated media if needed
- Vercel deployment

Do not over-engineer merely to use every library. Use the simplest implementation that produces an excellent interaction.

The application must work without cloud login using local persistence. If Supabase environment variables are configured, automatically enable authenticated cross-device cloud sync.

Supabase cloud data must use proper Row Level Security. Each learner must only be able to access their own private progress data.

Never expose service-role secrets or the xAI API key in frontend JavaScript.

## 4. FIRST-RUN EXPERIENCE

On first launch show a minimal onboarding sequence:
1. Welcome.
2. Explain that A+ certification requires passing Core 1 and Core 2.
3. Briefly explain how this course works.
4. Explain that reading checkpoints and mastery quizzes are mandatory.
5. Ask experience level: New to IT / Some experience / Experienced.
6. Optional baseline diagnostic assessment.
7. Create local learner profile or optionally sign in.
8. Begin "Course Orientation & IT Foundations."

Do not use the diagnostic to skip required curriculum by default. Use it to identify likely strengths and weaknesses.

## 5. MAIN APPLICATION NAVIGATION

Desktop sidebar:
- Dashboard
- Course
- Core 1
- Core 2
- Labs
- Practice
- Review Queue
- Exam Simulator
- Glossary
- Progress
- Notes/Bookmarks
- Settings

Mobile: clean bottom/navigation drawer equivalent.

Dashboard should show:
- Continue Studying
- overall A+ completion
- Core 1 completion
- Core 2 completion
- current objective
- current domain
- mastery score
- reviews due
- weakest five concepts
- strongest concepts
- recent quiz results
- cumulative question accuracy
- PBQ/lab completion
- study time
- current streak
- objective coverage map
- exam-readiness indicator
- button to resume exactly where learner stopped

Progress must save automatically after meaningful actions.

## 6. COURSE HIERARCHY

Use:

A+ Academy
→ Orientation/Foundation
→ Core
→ Domain
→ Objective
→ Lesson
→ Learning Block
→ Required Knowledge Check
→ Objective Checkpoint
→ Domain Mastery Quiz
→ Domain Review
→ Core Review
→ Full Mock Exam

Example route structure:

`/course`
`/course/core-1`
`/course/core-1/domain-3`
`/course/core-1/domain-3/3-4-storage`
`/course/core-1/domain-3/3-4-storage/raid`
`/labs/raid-builder`
`/practice/core-1`
`/exam/core-1`
`/review`

Use human-readable slugs.

## 7. LESSON PAGE DESIGN

Every substantive instructional lesson page MUST contain a visual element.

Do not blindly copy the same template across every subject. Determine the appropriate educational representation for each concept.

A typical complex page may contain:
1. Objective/subobjective label.
2. Lesson title.
3. "Why this matters" introduction.
4. Extensive instructional block.
5. Generated contextual illustration OR deterministic technical diagram.
6. Explanation of exactly what the learner should notice in the image.
7. Required multiple-choice knowledge check.
8. Additional instructional block.
9. Comparison table.
10. Interactive model/simulator/diagram.
11. Required knowledge check.
12. Real-world technician scenario.
13. Short generated video or code-based animation where useful.
14. Required knowledge check.
15. Troubleshooting example.
16. "Exam Lens" callout.
17. "Real Technician Lens" callout.
18. Common mistakes.
19. Summary.
20. Objective checkpoint.

Do NOT make the instructional blocks tiny summaries.

Use roughly 250–700 words between meaningful interactions when substantial explanation is required. Complex objectives may ultimately contain 1,500–4,000+ words across their lessons. Simple objectives may need less.

Depth is determined by what is needed to genuinely understand the material, not an arbitrary word count.

## 8. WRITING STYLE

Write like an excellent technical textbook instructor speaking clearly to an intelligent beginner.

For each concept cover, where relevant:
- definition
- purpose
- how it works
- components
- what happens internally
- visual model
- terminology
- variants
- standards
- comparison with similar concepts
- when technicians use it
- what failures look like
- how to troubleshoot it
- common misconceptions
- exam-relevant distinctions
- realistic examples
- connections to previously learned concepts

Avoid filler.

Never assume the learner understands unexplained acronyms.

The first meaningful use of an acronym should expose its full form and allow hover/tap glossary access.

## 9. MANDATORY VISUAL SYSTEM

EVERY lesson page gets at least one relevant visual.

Use three classes of visuals.

### A. Deterministic technical diagrams
Preferred whenever correctness depends on:
- exact labels
- connector count
- component positioning
- data flow
- sequence
- standards
- network topology
- RAID structure
- IP addressing
- cabling pinout
- command output
- UI controls

Generate these with HTML/CSS/SVG/Canvas/Three.js rather than generative AI whenever practical.

### B. AI-generated illustrative images
Use xAI image generation for:
- contextual scenes
- help-desk environments
- server rooms
- conceptual illustrations
- realistic device contexts
- technician scenarios
- non-exact visual introductions

CRITICAL: Do not ask image models to generate important technical text labels. Render labels in application code on top of or beside the image.

### C. Interactive diagrams
Whenever manipulating the concept would improve learning.

Examples:
- rotate component
- zoom
- explode assembly
- click hotspot
- drag cable
- arrange components
- move packets
- adjust frequency
- fail a RAID disk
- move a slider
- configure virtual settings
- reorder troubleshooting steps

Every image must have alt text.
Every technical diagram must be mobile-responsive.
Every video must have transcript/captions.

## 10. VIDEO SYSTEM

Use current xAI video-generation capabilities for SIMPLE, LOW-HALLUCINATION MICRO-EXPLANATIONS.

Do not create talking AI professors attempting five-minute lectures.

Generate short conceptual clips approximately 5–15 seconds when motion genuinely clarifies a concept.

Excellent uses:
- RAID 0 data blocks spreading across disks
- RAID 1 blocks mirroring
- RAID 10 mirroring + striping
- airflow moving through a PC
- laser printer paper path
- packets traveling through router/switch/AP
- virtualization layers appearing
- Wi-Fi interference
- DHCP exchange visualization
- backup rotation
- heat buildup with failed cooling
- SSD versus HDD conceptual access
- TCP versus UDP conceptual delivery
- VLAN separation
- NAT conceptual translation

If an explanation requires more time:
- create a short sequence/storyboard of clips, OR
- use a deterministic code-driven animation, OR
- combine static diagram + narration.

Technical labels must normally remain code-rendered, not baked into generated video.

Media must not regenerate every time the learner loads a page.

Create a media manifest and persist generated assets.

Prefer build-time/pre-generation.

Implement graceful fallbacks if generation credentials are unavailable.

## 11. VOICE API SYSTEM

Use xAI Voice for realistic technician/customer scenarios.

Two modes:

### Mode 1: Pre-generated scenario audio
This is the normal course experience.

Examples:
- "My computer suddenly turns off when I open a game."
- "The printer keeps printing faded pages."
- "I can connect to Wi-Fi, but websites won't open."
- angry customer
- confused customer
- nontechnical customer
- manager reporting an outage
- employee reporting suspicious MFA prompts

Learner hears a short help-desk call, sees optional transcript, and answers MULTIPLE-CHOICE diagnostic/communication questions.

Provide replay, volume, transcript, captions, and text alternative.

### Mode 2: Optional realtime voice roleplay
Implement an optional advanced lab using xAI realtime Speech-to-Speech.

Never expose the server API key to the browser.

Use a server endpoint to issue secure ephemeral client tokens.

The voice agent should roleplay the customer while the learner verbally troubleshoots.

This feature must be OPTIONAL because API credentials/cost may not be available.

The ordinary course must remain fully usable without live voice.

## 12. REQUIRED KNOWLEDGE CHECK SYSTEM

I DO NOT WANT REQUIRED FREE-TEXT QUIZ ANSWERS.

All required academic checks should use:
- single-answer multiple choice
- multi-select where appropriate
- image-based multiple choice
- scenario-based multiple choice
- "What should the technician do FIRST?"
- "What should the technician do NEXT?"
- "Which explanation BEST fits?"
- "Which combination is MOST appropriate?"

Interactive PBQ laboratories may use dragging, connecting, configuring, ordering, clicking, terminal commands, etc.

After EVERY meaningful reading/learning block, require at least one knowledge check before unlocking the next instructional block.

A normal sequence:

READING
↓
QUESTION
↓
CORRECT?
YES → continue
NO → explanation + targeted remediation → retry

Wrong answers must NEVER simply say "Incorrect."

Show:
- why the chosen answer is wrong
- why the correct answer is correct
- why plausible distractors are wrong
- link/scroll back to the relevant concept
- optional "Explain this another way"
- retry

The learner MUST answer correctly before progressing past that checkpoint.

However, avoid trivial questions whose answer is copied verbatim from the sentence immediately above.

Questions should require actual understanding.

## 13. QUESTION QUALITY RULES

Each question must:
- map to a concept/objective ID
- have one defensible answer unless explicitly multi-select
- use realistic distractors
- avoid giveaway wording
- avoid nonsensical distractors
- explain every option
- distinguish similar technologies
- frequently use realistic technician scenarios
- test application in addition to recognition
- be independently authored
- never imitate stolen/recalled live exam content

Generate LARGE question banks.

Do not give the learner the same exact 15 questions every retry.

For every important objective, maintain enough variants that repeated testing cannot be passed merely through memorization.

Track question exposure history.

Prefer unseen questions when possible.

Randomize option order when technically appropriate.

## 14. MASTERY STRUCTURE

### Learning-block check
1–3 questions.
Must answer each correctly.

### Objective checkpoint
Approximately 5–10 questions after an individual objective such as 3.4.

Must demonstrate satisfactory understanding before marking objective complete.

### Domain Mastery Quiz
After all objectives inside a major domain, give a required 10–15 question fresh quiz.

Example:
Core 1
Domain 1
1.1
1.2
1.3
→ DOMAIN 1 MASTERY QUIZ

Requirement: 100% correct to unlock the next major domain.

If learner scores 12/15:
- identify the three missed concepts
- provide targeted review
- add them to Review Queue
- generate/select a new assessment attempt emphasizing those concepts
- require another successful attempt

Never delete prior scores.

### Domain review
After passing the mastery quiz, show:
- major ideas
- key terms
- comparisons
- common troubleshooting clues
- frequently confused concepts
- tables
- diagrams
- "things you should be able to explain"
- objective coverage checklist

### Core review exam
After finishing an entire core:
- 45–60 questions
- mixed domains
- scenario heavy
- unseen items prioritized
- PBQ-style labs included separately

### Final exam simulations
Implement Core 1 and Core 2 simulations modeled on the current published exam constraints.

Use up to 90 questions and a 90-minute timer if those remain the official current constraints after verification.

Include:
- traditional MCQ
- multiple response where appropriate
- PBQ-style interactions
- flag for review
- question navigator
- remaining time
- submit confirmation
- exam report

Do not attempt to translate CompTIA's scaled passing scores into an invented percentage.

For this application's own readiness measurement, use clearly labeled INTERNAL mastery/readiness percentages.

## 15. SPACED REVIEW ENGINE

Create an adaptive Review Queue.

Every assessed concept has mastery metadata.

Wrong or uncertain concepts return sooner.

Correctly answered concepts reappear at increasing intervals.

Example schedule may approximate:
- same session
- next day
- 3 days
- 7 days
- 14 days
- 30 days

Adapt based on performance rather than blindly following one schedule.

Interleave subjects so the learner must distinguish concepts instead of answering ten nearly identical questions consecutively.

A learner who mastered RAID last week may later receive RAID questions mixed with:
- backup types
- storage interfaces
- drive troubleshooting
- cloud redundancy

This is deliberate.

## 16. PROGRESS DATA MODEL

Persist at minimum:
- user ID
- current location
- completed learning blocks
- completed objectives
- completed domains
- unlock states
- question attempts
- selected answers
- correctness
- question exposure
- quiz attempts
- quiz scores
- mastery per concept
- mastery per objective
- mastery per domain
- review due dates
- lab completion
- PBQ performance
- bookmarks
- personal notes
- study sessions
- time studied
- final exam attempts
- settings
- media preferences
- streak information

Use versioned migrations.

If local data later connects to an account, merge rather than silently overwrite.

## 17. COURSE ORIENTATION / FOUNDATION MODULE

Before Core 1, create a compact foundation module covering:
- what CompTIA A+ is
- Core 1 versus Core 2
- exam objective structure
- how scenario questions work
- how PBQs differ from normal MCQ
- safe lab behavior
- how to use the application
- troubleshooting mindset
- CompTIA-style words such as BEST, FIRST, NEXT, MOST likely
- distinction between memorizing and understanding
- general troubleshooting methodology
- documentation mindset
- safety mindset
- binary/decimal basics needed later
- bits/bytes, KB/MB/GB/TB
- simple bandwidth units
- foundational vocabulary

Foundation Lab:
Show a desktop PC, laptop, network, printer, phone and cloud service. Let learner explore clickable hotspots so future subjects have context.

Then begin Core 1.

# ===================================================================
# SEMESTER I — CORE 1 / 220-1201
# ===================================================================

## DOMAIN 1 — MOBILE DEVICES

### 1.1 LAPTOP AND MOBILE HARDWARE
Teach deeply:
- laptop internal architecture
- batteries and battery safety
- keyboards
- RAM in portable devices
- storage
- wireless cards
- webcams/cameras
- microphones
- antennas
- biometrics and privacy/security hardware
- replaceable versus integrated components
- serviceability differences
- symptoms associated with failed components
- disassembly precautions

Required visuals/interactions:
- rotatable/exploded laptop model
- click-to-identify internal component exercise
- battery swelling visual
- DIMM vs SODIMM comparison
- replace-the-component drag activity
- "Which component would you replace?" scenarios

Video candidate:
Simple exploded laptop reveal.

### 1.2 MOBILE ACCESSORIES AND CONNECTIVITY
Teach:
- common USB families and connector forms
- USB-C concepts
- Lightning where relevant
- Bluetooth
- NFC
- tethering/hotspots
- docking stations
- port replicators
- touchpads/trackpads
- drawing pads
- pointing devices
- stylus
- headsets
- external speakers
- webcams
- accessory compatibility

Required interactions:
- rotatable connector gallery
- identify-a-port activity
- connect accessory to correct interface
- docking station versus port replicator comparison
- Bluetooth accessory pairing simulator

### 1.3 MOBILE NETWORKING, CONFIGURATION AND SYNCHRONIZATION
Teach:
- cellular generations relevant to objectives
- Wi-Fi
- cellular hotspot
- SIM/eSIM
- Bluetooth pairing
- location technologies
- GPS concepts
- synchronization
- mail/contact/calendar sync
- cloud storage
- data caps
- corporate mobile management
- MDM
- BYOD versus corporate-owned policies
- managed applications
- common mobile connectivity troubleshooting

Interactions:
- simulated smartphone Settings interface
- Bluetooth pairing sequence
- enable hotspot activity
- choose correct synchronization option
- apply an MDM profile to a sample device
- BYOD policy scenario

DOMAIN 1 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 1 REVIEW.

## DOMAIN 2 — NETWORKING

### 2.1 TCP/UDP, PORTS AND COMMON PROTOCOLS
Teach networking from first principles before requiring memorization.

Cover:
- what a network protocol is
- IP
- TCP
- UDP
- ports
- client/server conversations
- sockets at an intuitive level
- reliability versus overhead
- common A+ protocols and their current objective-listed ports
- FTP
- SSH
- Telnet
- SMTP
- DNS
- DHCP
- HTTP
- POP3
- NetBIOS
- IMAP
- LDAP
- HTTPS
- SMB/CIFS
- RDP
- any additional protocol/port appearing in newest objectives

Build the actual current port list dynamically from researched objectives rather than relying on memory.

Interactions:
- packet flow animation
- port/protocol matching
- TCP versus UDP decision visual
- virtual server with services listening on ports
- "Which service broke?" troubleshooting cases
- repeated adaptive port drill

### 2.2 WIRELESS NETWORKING TECHNOLOGIES
Teach:
- RF fundamentals at appropriate A+ depth
- 2.4 GHz
- 5 GHz
- 6 GHz
- channels
- channel widths
- interference
- range versus throughput
- relevant 802.11 Wi-Fi generations/standards from current objectives
- Bluetooth
- NFC
- RFID
- regulatory/channel considerations
- practical AP placement

Interactions:
- interactive spectrum display
- move two APs and observe overlap/interference
- channel selector
- walls/distance signal visualization
- Wi-Fi standard comparison tool
- choose frequency band for scenario

Graph:
Distance/interference versus expected signal quality concept graph, clearly marked conceptual rather than fabricated benchmark data.

### 2.3 NETWORK SERVICES AND NETWORKED HOSTS
Teach:
- DNS server
- DHCP server
- file server
- print server
- mail server
- web server
- authentication server
- syslog/log server
- database server
- NTP
- proxies
- security appliances
- load balancing
- embedded/industrial/IoT concepts appearing in objectives

Interaction:
Build a small business network by dragging services into the correct logical roles.

Scenario:
"Users can reach sites by IP but not by hostname." Diagnose which service is likely implicated.

### 2.4 NETWORK CONFIGURATION CONCEPTS
Teach:
- DNS records relevant to A+
- A
- AAAA
- CNAME
- MX
- TXT
- SPF
- DKIM
- DMARC
- DHCP scopes
- leases
- reservations
- exclusions
- VLAN basics
- VPN basics
- why each exists

Interactions:
- DNS zone-record builder
- email authentication flow visual
- DHCP pool simulator
- reserve an IP for a printer
- VLAN separation visualization
- VPN tunnel animation

### 2.5 NETWORK DEVICES
Teach:
- routers
- managed switches
- unmanaged switches
- access points
- firewalls
- patch panels
- PoE
- PoE injectors
- PoE switches
- modems
- ONTs
- NICs
- MAC addresses
- relevant physical device distinctions

Interaction:
Interactive network closet/rack.

Learner must connect:
ISP → modem/ONT → router/firewall → switch → AP/endpoints.

Make cable paths animate.

### 2.6 BASIC SOHO NETWORK CONFIGURATION
Teach:
- IPv4
- public/private addresses
- IPv6 conceptual basics
- APIPA/link-local concepts
- static versus dynamic addressing
- subnet masks at A+ scope
- default gateway
- DNS settings
- LAN addressing
- DHCP
- basic SOHO router configuration

Do not turn this into a CCNA subnetting course, but make the learner genuinely understand what these fields mean.

Interaction:
Functional fake router admin interface.

Learner configures:
- LAN IP
- DHCP pool
- Wi-Fi
- DNS
- gateway concepts
- guest network

Network visualization updates after settings change.

### 2.7 INTERNET CONNECTIONS AND NETWORK TYPES
Teach:
- fiber
- cable
- DSL
- satellite
- cellular
- fixed wireless/WISP if current objectives include it
- LAN
- WAN
- PAN
- MAN
- WLAN
- SAN where applicable
- performance, latency, geographic and deployment distinctions

Interaction:
Scenario-based connection recommender.

Example:
"Remote cabin with no cable/fiber/cellular."
Learner selects likely technology and receives explanation.

### 2.8 NETWORKING TOOLS
Teach each current objective-listed tool:
- crimper
- cable stripper
- punchdown tool
- cable tester
- toner/probe
- loopback plug
- Wi-Fi analyzer
- network tap
- other current listed tools

Interaction:
Virtual technician workbench.
Show a problem and require learner to pick the appropriate tool.

3D/rotatable tool models where beneficial.

DOMAIN 2 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 2 REVIEW.

## DOMAIN 3 — HARDWARE

### 3.1 DISPLAY TECHNOLOGIES
Teach:
- LCD fundamentals
- IPS
- TN
- VA
- OLED
- mini-LED if current objectives require it
- touchscreen
- digitizer
- inverter concepts where relevant
- resolution
- refresh rate
- pixel density
- color gamut
- viewing angles
- common display characteristics
- failures

Interactions:
- pixel zoom
- viewing-angle comparison
- refresh-rate conceptual animation
- touchscreen/digitizer layers
- display type comparison selector

### 3.2 CABLES AND CONNECTORS
Build one of the most visual modules in the course.

Teach:
- copper Ethernet
- categories currently in A+ scope
- UTP/STP
- plenum/direct-burial concepts where required
- T568A/T568B
- coax
- fiber
- single-mode/multimode
- USB generations/forms
- Thunderbolt
- HDMI
- DisplayPort
- DVI
- VGA
- USB-C
- SATA/eSATA where current
- RJ11
- RJ45
- F-type
- ST
- SC
- LC
- DB-style connectors where current
- Molex/power connectors where current
- mobile connectors
- adapters

Interactions:
- full rotatable connector museum
- zoom into contacts
- cable-to-device matching
- virtual punchdown
- T568A/T568B wire-order activity
- choose cable for distance/use-case
- fiber connector matching

Generated images should NOT be trusted for exact connector geometry. Prefer modeled/vector reference diagrams.

### 3.3 RAM
Teach:
- role of RAM
- volatile memory
- DIMM
- SODIMM
- current DDR generations relevant to objectives
- speed concepts
- capacity
- channels
- ECC versus non-ECC
- compatibility
- installation
- symptoms of insufficient/failing RAM

Interaction:
- motherboard memory slot simulator
- insert DIMMs
- enable correct channel arrangement
- compare laptop/desktop modules
- simulated memory pressure meter

### 3.4 STORAGE AND RAID
This must be an exceptionally strong module.

Teach:
- HDD mechanics
- spindle concepts
- form factors
- SSD
- SATA SSD
- NVMe
- PCIe
- M.2
- relevant additional current storage interfaces
- optical/removable storage where required
- flash storage
- drive performance concepts
- storage capacity
- redundancy versus backup
- RAID
- RAID 0
- RAID 1
- RAID 5
- RAID 6 if current objectives require it
- RAID 10
- minimum disks
- capacity implications
- redundancy implications
- performance implications
- drive-failure behavior
- why RAID is NOT a backup

Build a full RAID LAB.

For RAID 0:
visually split blocks A/B/C/D across disks.
Allow learner to fail one drive.
Show data loss.

For RAID 1:
show identical blocks copied to mirrored members.
Fail one member.
Show continued availability.

For RAID 5:
show distributed data/parity conceptually.
Fail a drive.
Show degraded-but-operational state.

For RAID 6:
show dual parity concept where current scope requires it.

For RAID 10:
show mirrored pairs with striping.
Visually demonstrate why it can provide performance AND redundancy.

Include a comparison table:
- minimum disks
- usable capacity concept
- redundancy
- failure tolerance
- performance tendencies
- common use cases

Do not oversimplify into "RAID 1 slow, RAID 0 fast."
Explain read/write implications accurately at appropriate A+ depth.

Add a RAID capacity calculator and disk-failure simulator.

### 3.5 MOTHERBOARDS, CPUs, FIRMWARE AND EXPANSION
This should be a centerpiece.

Teach:
- motherboard role
- ATX
- microATX
- mini-ITX
- CPU sockets
- Intel/AMD conceptually without unnecessary marketing trivia
- CPU architecture
- x86/x64
- ARM where required
- cores
- multicore
- integrated features
- PCIe
- expansion slots
- graphics cards
- sound cards
- NICs
- capture cards
- SATA
- M.2
- power connectors
- internal headers
- BIOS
- UEFI
- Secure Boot
- TPM
- firmware passwords
- hardware monitoring
- virtualization settings
- encryption-related firmware features
- fans
- heatsinks
- thermal paste
- liquid cooling basics

Build a rotatable interactive motherboard.

Every meaningful component should have a hotspot.

Modes:
- Learn
- Labels
- Hide Labels
- Identify
- Build
- Troubleshoot

PC assembly mini-lab:
CPU → thermal paste/cooler → RAM → storage → GPU → power.

### 3.6 POWER SUPPLIES
Teach:
- AC input
- common voltage-region considerations
- DC rails conceptually
- wattage
- efficiency
- modular/semi/non-modular concepts if relevant
- 20+4-pin ATX
- CPU/EPS connectors
- PCIe/GPU power
- SATA power
- peripheral power
- redundant power supplies
- symptoms of PSU problems
- safe handling

Interaction:
Build-a-PC PSU calculator using curated fictional component power requirements.
Require sensible headroom.
Cable-to-component connection activity.

### 3.7 PRINTER/MFD INSTALLATION AND CONFIGURATION
Teach:
- printer types in context
- deployment
- unboxing
- placement
- drivers
- firmware
- PCL/PostScript concepts if current
- USB
- Ethernet
- wireless
- print sharing
- print servers
- duplex
- orientation
- trays
- print quality
- authentication
- secure print
- auditing
- scan destinations
- scan-to-email
- SMB
- cloud destinations
- ADF
- flatbed

Interaction:
Simulated office printer control panel and print-server workflow.

### 3.8 PRINTER MAINTENANCE
Teach maintenance and operating principles for:
- laser
- inkjet
- thermal
- impact

Laser deserves a visual process animation.

Explain:
- toner
- drum/imaging concepts
- fuser
- rollers
- maintenance kits
- calibration
- cleaning

Inkjet:
- cartridges
- printheads
- alignment
- cleaning
- feed mechanisms

Thermal:
- media
- thermal elements
- cleaning

Impact:
- ribbon
- printhead
- tractor/feed/multipart paper concepts

Interaction:
Interactive printer cutaway and maintenance-order exercises.

DOMAIN 3 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 3 REVIEW.

## DOMAIN 4 — VIRTUALIZATION AND CLOUD COMPUTING

### 4.1 VIRTUALIZATION
Teach:
- why virtualization exists
- virtual machines
- host
- guest
- hypervisor
- Type 1
- Type 2
- VM resource allocation
- networking
- storage
- sandboxing
- testing
- legacy applications
- cross-platform use
- VDI/desktop virtualization
- containers
- containers versus VMs
- security considerations

Interactions:
- stack-builder
- allocate CPU/RAM/storage to VMs
- over-allocation demonstration
- container versus VM visual
- Type 1 versus Type 2 architecture animation

### 4.2 CLOUD CONCEPTS
Teach:
- cloud computing
- public/private/hybrid/community where current
- SaaS
- PaaS
- IaaS
- shared versus dedicated resources
- metered usage
- elasticity
- scalability
- availability
- file synchronization
- multitenancy
- ingress/egress concept where current
- cloud responsibility concepts at A+ depth

Interaction:
"Build the correct cloud solution" scenarios.
Move a utilization slider and watch elastic resources scale.

DOMAIN 4 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 4 REVIEW.

## DOMAIN 5 — HARDWARE AND NETWORK TROUBLESHOOTING

Every lesson in this domain should heavily emphasize scenarios and PBQ-style diagnosis.

### 5.1 MOTHERBOARD/RAM/CPU/POWER PROBLEMS
Teach symptoms including current objective-listed examples such as:
- POST/beep indications
- no power
- blank display
- crashes
- sluggish performance
- overheating
- random shutdown
- application crashes
- unusual noises
- burning smell
- damaged/swollen capacitors where applicable
- wrong date/time
- hardware instability

Build virtual help-desk tickets.

Learner chooses:
1. best interpretation
2. FIRST diagnostic step
3. appropriate test
4. likely resolution

### 5.2 STORAGE AND RAID PROBLEMS
Teach:
- SMART warnings
- clicking/grinding
- missing boot device
- corruption
- slow I/O
- missing array
- degraded/failing RAID
- alarms
- failed disk
- performance symptoms
- boot/storage differentiation

Interaction:
Virtual RAID/storage diagnostic console.

### 5.3 DISPLAY AND PROJECTOR PROBLEMS
Teach:
- incorrect source
- cables
- fuzzy image
- dead pixels
- burn-in
- flashing
- color issues
- dim image
- projector overheating/shutdown
- sizing/resolution problems
- audio-related display issues where applicable

Interaction:
Display fault simulator with toggles that visually recreate simplified symptoms.

### 5.4 MOBILE DEVICE PROBLEMS
Teach:
- swollen/dead batteries
- cracked screens
- charging problems
- connectivity
- liquid damage
- heat
- digitizer/touch problems
- failed ports
- malware symptoms
- app problems
- degraded performance
- stylus/touch calibration where current

Interaction:
Clickable phone/laptop diagnostic inspection.

### 5.5 NETWORK PROBLEMS
Teach:
- intermittent Wi-Fi
- low throughput
- latency
- jitter
- poor VoIP
- interference
- authentication issues
- intermittent internet
- port/switch issues
- limited connectivity
- incorrect configurations
- common physical versus logical symptoms

Build:
- ping/latency visualization
- jitter graph
- Wi-Fi analyzer
- cable/path diagnostic lab
- DNS-vs-connectivity scenario set

### 5.6 PRINTER PROBLEMS
Teach:
- faded output
- streaks/lines
- ghosting
- speckles
- jams
- multiple feeds
- queue issues
- garbled output
- orientation issues
- connectivity
- noises
- finishing/stapling issues where current
- tray detection
- printer-type-specific causes

Use images of SAMPLE OUTPUT PATTERNS plus deterministic overlays.
Learner matches symptom → likely subsystem → corrective action.

DOMAIN 5 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 5 REVIEW.

## CORE 1 CAPSTONE

Before unlocking the Core 1 final assessment, require several integrated laboratories:

LAB C1-A: Build a PC.
LAB C1-B: Diagnose a PC that will not POST.
LAB C1-C: Configure a SOHO network.
LAB C1-D: Diagnose DNS/connectivity failure.
LAB C1-E: Configure RAID and respond to disk failure.
LAB C1-F: Diagnose printer output.
LAB C1-G: Configure a mobile device.
LAB C1-H: Identify cables/connectors/tools.
LAB C1-I: Virtualization/cloud architecture.
LAB C1-J: Multi-ticket troubleshooting shift.

Then:
- comprehensive Core 1 review
- weak-area remediation
- 45–60 question review exam
- full Core 1 mock exam
- readiness report

# ===================================================================
# SEMESTER II — CORE 2 / 220-1202
# ===================================================================

## DOMAIN 1 — OPERATING SYSTEMS

### 1.1 OPERATING SYSTEM TYPES AND PURPOSES
Teach:
- Windows
- Linux
- macOS
- ChromeOS
- Android
- iOS/iPadOS
- desktop versus mobile
- workstation/server concepts where appropriate
- application compatibility
- vendor support/lifecycle
- end-of-life
- update limitations
- selecting the appropriate OS

Interaction:
OS decision matrix based on realistic user/company requirements.

### 1.2 OS INSTALLATION, PARTITIONS, FILESYSTEMS AND UPGRADES
Teach:
- clean install
- upgrade
- imaging
- remote/network install
- zero-touch concepts
- recovery/repair
- installation media
- bootable USB
- compatibility checks
- backups before upgrades
- partitions
- GPT
- MBR
- formatting
- NTFS
- ReFS where current
- FAT32
- exFAT
- ext4
- XFS
- APFS
- other current objective-listed filesystems
- drivers
- feature updates

Build an installation wizard simulator.
Partition a virtual disk.
Choose filesystem based on scenario.

### 1.3 WINDOWS EDITIONS
Research the exact Windows editions/features currently listed.

Teach feature differences relevant to A+, including:
- Home
- Pro
- Enterprise
- Workstation editions where current
- Windows 10 versus 11 distinctions that remain in scope
- domain joining
- Remote Desktop hosting
- BitLocker
- Group Policy
- RAM/hardware limits only where current and educationally useful
- upgrade paths
- TPM/UEFI requirements

Interaction:
Choose Windows edition from business requirement cards.

### 1.4 WINDOWS ADMINISTRATIVE TOOLS
Teach and SIMULATE current objective-listed tools such as:
- Task Manager
- Device Manager
- Event Viewer
- Disk Management
- Task Scheduler
- System Information
- Resource Monitor
- Performance Monitor
- Services/administrative tools
- Local Users and Groups
- Certificate tools
- Group Policy tools
- system configuration utilities

Create simplified replicas based on real workflows without infringing branding.

Give missions:
"Find the process consuming CPU."
"Disable the malfunctioning device."
"Find the critical system event."
"Create/inspect a partition."

### 1.5 WINDOWS COMMAND-LINE TOOLS
Research every current listed command.

Teach commands such as:
- cd
- dir
- mkdir/md
- rmdir
- copy/move concepts
- robocopy
- ipconfig
- ping
- tracert
- pathping
- netstat
- nslookup
- net use
- chkdsk
- diskpart
- format
- sfc
- gpupdate
- gpresult
- whoami
- hostname
- net user
- winver
- relevant help commands
- every additional current objective-listed command

Build a sandboxed fake command prompt.

It must NOT execute arbitrary commands on the host/server.

Model a controlled virtual filesystem/network environment.

Labs:
- discover IP
- test gateway
- resolve DNS
- trace destination
- inspect connections
- check disk
- manage fictional user
- copy files

### 1.6 WINDOWS SETTINGS AND CONFIGURATION
Research and cover all current settings/control utilities.

Teach:
- networking
- apps/programs
- devices
- sound
- power
- sleep/hibernate
- fast startup
- update/security
- firewall
- privacy
- accessibility
- accounts
- personalization
- indexing
- File Explorer options
- time/language
- relevant legacy Control Panel utilities

Build a Windows-settings simulator with task missions.

### 1.7 WINDOWS NETWORKING
Teach:
- workgroup
- domain
- resource sharing
- network profiles
- public/private
- VPN
- wireless
- wired
- WWAN where current
- firewall impact
- proxy
- static/dynamic addressing
- IP
- subnet mask
- gateway
- DNS
- UNC/network paths where current
- metered network

Interaction:
Repair a misconfigured workstation.

### 1.8 MACOS
Teach current A+ macOS objectives:
- application installation/removal
- DMG
- PKG
- App Store
- System Settings
- displays
- networks
- printers/scanners
- privacy
- accessibility
- Time Machine
- important directory structure
- Finder
- Dock
- Mission Control
- Spotlight
- Keychain
- iCloud
- Continuity concepts
- Apple account
- updates/security responses where current
- FileVault
- Disk Utility
- Terminal
- Force Quit
- backups

Build a simplified macOS interface simulator.

### 1.9 LINUX
Teach:
- filesystem structure
- root
- permissions
- users
- sudo
- packages
- services
- system basics
- text configuration
- networking

Research exact current commands and files.

Cover current objective items such as:
- ls
- pwd
- cd
- cp
- mv
- rm
- chmod
- chown
- grep
- find
- cat
- man
- top
- ps
- df
- du
- mount
- fsck
- apt
- dnf where current
- su
- sudo
- ip
- ping
- curl
- dig
- traceroute
- nano or relevant editor
- /etc/passwd
- /etc/shadow
- /etc/hosts
- /etc/fstab
- /etc/resolv.conf
- systemd
- kernel
- bootloader concepts

Build a virtual Linux terminal and filesystem.

### 1.10 APPLICATION INSTALLATION
Teach:
- minimum versus recommended requirements
- 32-bit/64-bit compatibility
- CPU
- RAM
- storage
- GPU
- VRAM
- dedicated/integrated GPU
- operating system support
- hardware tokens/dongles where current
- local installer
- image
- ISO
- download
- deployment
- business/network impact

Interaction:
Given five systems and an application spec, choose valid installation targets.

### 1.11 CLOUD-BASED PRODUCTIVITY
Teach current objective concepts:
- email
- file storage
- sync
- identity synchronization
- licensing
- collaboration
- word processing
- presentations
- spreadsheets
- video meetings
- instant messaging
- account/cloud troubleshooting

Interaction:
Configure a fictional employee's cloud productivity account and sync choices.

DOMAIN 1 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 1 REVIEW.

## DOMAIN 2 — SECURITY

### 2.1 SECURITY CONTROLS AND ACCESS
Teach:
- physical versus logical security
- bollards
- entry vestibules/mantraps concepts
- badges
- cameras
- alarms
- motion detection
- locks
- guards
- fences
- keys
- smart cards
- fobs
- mobile credentials
- biometrics
- least privilege
- ACLs
- zero trust basics
- MFA
- authentication factors
- SSO
- federation/SAML concepts where current
- privileged access/JIT concepts where current
- IAM
- directory services
- MDM
- DLP

Interaction:
Secure a fictional office floorplan by placing controls.

Then design account access for departments.

### 2.2 WINDOWS SECURITY
Teach:
- Microsoft Defender concepts
- firewall
- local accounts/groups
- permissions
- NTFS permissions
- share permissions
- inheritance
- UAC
- administrator context
- BitLocker
- BitLocker To Go
- EFS where current
- Active Directory basics
- joining a domain
- organizational units
- GPO
- login scripts
- security groups
- home folders/folder redirection where current

Build a permissions simulator.

Learner should see effective permissions change when group/NTFS/share settings change.

### 2.3 WIRELESS SECURITY
Teach:
- WPA2
- WPA3
- legacy concepts only where current
- AES
- TKIP if current
- personal/enterprise authentication
- RADIUS
- TACACS+ where current
- Kerberos
- MFA
- secure Wi-Fi configuration

Interaction:
Secure an intentionally insecure AP.

### 2.4 MALWARE
Teach:
- virus
- Trojan
- ransomware
- spyware
- rootkit
- keylogger
- boot-sector malware where current
- cryptominer
- stalkerware
- fileless malware
- adware
- PUP
- malware behavior
- detection
- endpoint protection
- EDR
- MDR
- XDR at A+ depth
- anti-malware
- email gateways
- firewalls
- recovery/safe environments
- reinstallation/reimaging

Interactive threat-identification cards and incident timelines.

### 2.5 SOCIAL ENGINEERING, ATTACKS AND VULNERABILITIES
Teach current scope including:
- phishing
- spear phishing
- whaling
- smishing
- vishing
- QR-based phishing
- impersonation
- shoulder surfing
- tailgating
- dumpster diving
- DoS
- DDoS
- evil twin
- spoofing
- on-path attacks
- brute force
- dictionary attacks
- insider threats
- zero-days
- SQL injection conceptually
- XSS conceptually
- business email compromise
- supply chain attack concepts
- unpatched systems
- unsupported/EOL software
- poorly protected devices
- BYOD risk

Interactions:
- fake email inbox
- identify phishing indicators
- suspicious QR scenario
- audio vishing call
- evil-twin Wi-Fi selection screen
- threat/vulnerability/countermeasure mapping

### 2.6 MALWARE REMOVAL PROCESS
Research the exact current CompTIA malware-removal sequence.

Teach WHY order matters.

Build a drag/reorder PBQ where learner restores the sequence.

Then run a full infection simulation:
- report
- investigate
- isolate/quarantine
- remediation steps
- update tools
- scan
- recovery/reimage decision
- restore-system protections
- educate user

Use wording aligned conceptually with current objectives while keeping the course explanation original.

### 2.7 MOBILE DEVICE SECURITY
Teach:
- encryption
- screen locks
- PIN
- biometrics
- pattern/swipe concepts where current
- patches
- endpoint protection
- locator
- remote wipe
- backups
- login restrictions
- MDM
- BYOD
- corporate profiles
- remote management

Interaction:
Harden a fictional phone.

### 2.8 DATA DESTRUCTION AND DISPOSAL
Teach:
- data sanitization versus destruction
- wiping
- formatting limitations
- physical destruction
- shredding
- drilling
- degaussing
- media-specific appropriateness
- outsourcing
- certificates of destruction
- environmental concerns
- legal/regulatory considerations

Interaction:
Choose disposal method for HDD, SSD, optical media, paper, mobile device, etc.

### 2.9 WORKSTATION HARDENING
Teach:
- data-at-rest protection
- password practices
- account permissions
- lockout
- expiration concepts
- screen timeout
- disabling unused/default accounts
- firmware passwords
- unnecessary services
- autorun-type risk where current
- patching
- least privilege
- endpoint protections

Interaction:
Start with a workstation scoring 25/100 security.
Learner changes settings and watches security posture improve.

### 2.10 SECURE SOHO NETWORK
Teach:
- change default credentials
- firmware updates
- Wi-Fi encryption
- guest networks
- SSID considerations
- router placement
- UPnP risk
- firewall
- unused ports
- port forwarding
- content/IP filtering
- secure management
- screened network/DMZ concepts where current

Build a complete router-security simulator.

### 2.11 BROWSER SECURITY
Teach:
- updates
- extensions
- trust
- downloads
- hashes where current
- password managers
- certificates
- certificate warnings
- pop-up control
- cache/history
- private browsing
- synchronization
- ad blocking
- proxies
- secure DNS where current
- privacy/security controls

Build a browser settings and certificate inspection simulator.

DOMAIN 2 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 2 REVIEW.

## DOMAIN 3 — SOFTWARE TROUBLESHOOTING

### 3.1 WINDOWS PROBLEMS
Teach current objective-listed symptoms:
- blue/crash screens
- degraded performance
- boot failures
- shutdown/reboot problems
- instability
- missing OS
- slow profiles
- time/date drift
- services not starting
- applications crashing
- insufficient memory
- USB/resource problems
- update-related failures
- other current symptoms

Build a simulated desktop with:
- Task Manager
- Event Viewer
- Device Manager
- Services
- command-line tools
- system information

Troubleshoot multi-step scenarios.

### 3.2 MOBILE OS/APPLICATION PROBLEMS
Teach:
- application launch failures
- crashes
- failed updates
- installation failure
- slow performance
- OS updates
- battery-related software symptoms
- Bluetooth/Wi-Fi/NFC failures
- auto-rotate and sensor-related problems where current
- app permissions
- cache/storage problems where relevant

Interaction:
Phone troubleshooting simulator.

### 3.3 MOBILE SECURITY SYMPTOMS
Teach:
- unofficial stores
- developer mode
- rooting/jailbreaking
- malicious/spoofed apps
- unexpected data usage
- degraded performance
- pop-ups/fake warnings
- unexpected behavior
- data leakage
- connectivity disruption
- signs of compromise

Interaction:
Inspect a fictional compromised phone and determine the most likely cause/action.

### 3.4 PC SECURITY SYMPTOMS
Teach:
- browser redirects
- popups
- certificate warnings
- false antivirus alerts
- changed/locked files
- missing files
- desktop changes
- degraded browser/system performance
- failed updates
- network loss
- unexpected notifications
- other current objective symptoms

Interaction:
"Compromised workstation" investigation.

DOMAIN 3 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 3 REVIEW.

## DOMAIN 4 — OPERATIONAL PROCEDURES

### 4.1 DOCUMENTATION AND TICKETING
Teach:
- ticket fields
- user/device data
- problem descriptions
- categories
- severity/priority
- escalation
- technician notes
- resolution
- knowledge bases
- SOP
- onboarding/offboarding
- SLAs
- asset inventories
- CMDB concepts
- asset tags
- procurement
- warranties
- licensing
- ownership/users

Build a full fictional help-desk ticket system simulator.

Bad ticket:
"PC broken."

Learner must transform the workflow into a useful documented case using structured choices and interactions.

### 4.2 CHANGE MANAGEMENT
Teach:
- change request
- purpose
- scope
- standard/normal/emergency distinctions where current
- scheduling
- maintenance windows
- change freezes
- affected systems
- risk
- approval
- peer review
- user acceptance
- implementation
- rollback
- backups
- sandbox/testing
- responsible personnel
- post-change documentation

Interaction:
Walk a production change through an approval pipeline.

### 4.3 BACKUPS AND RECOVERY
Teach:
- full backup
- incremental
- differential
- synthetic full where current
- restoration implications
- frequency
- testing
- onsite/offsite
- alternate locations
- overwrite
- grandfather-father-son
- 3-2-1 concept
- recovery thinking

Build:
- interactive backup timeline
- storage usage comparison
- restore-chain visualizer
- GFS calendar
- "Which backups are required to restore?" scenarios

### 4.4 SAFETY
Teach:
- ESD
- wrist straps
- mats
- grounding
- component handling
- antistatic bags
- cable management
- disconnecting power
- lifting
- PPE
- fire safety
- relevant regulations

Interaction:
Virtual repair bench where learner must make area safe before opening device.

### 4.5 ENVIRONMENTAL AND POWER CONCERNS
Teach:
- safety data sheets
- battery disposal
- toner disposal
- electronics disposal
- surge
- brownout
- blackout
- UPS
- surge protector
- temperature
- humidity
- ventilation
- dust
- equipment placement
- cleaning methods
- compressed air
- appropriate vacuum concepts

Interaction:
Manage a small server/IT room with temperature, humidity and power events.

### 4.6 PRIVACY, LICENSING, PROHIBITED CONTENT AND INCIDENT HANDLING
Teach:
- privacy
- regulated/sensitive information at appropriate scope
- PII
- payment information
- healthcare information where current
- government identifiers
- retention
- acceptable-use policies
- licenses
- EULA
- open-source concepts
- DRM
- NDA
- handling suspected prohibited content
- incident escalation
- preserving evidence
- chain of custody
- documentation
- management/law-enforcement involvement according to policy
- order-of-volatility concept where current

Interaction:
Evidence-handling timeline and policy-decision scenarios.

### 4.7 PROFESSIONAL COMMUNICATION
Do not make this boring.

Teach:
- professional appearance
- punctuality
- listening
- avoiding unnecessary jargon
- setting expectations
- cultural sensitivity
- confidentiality
- dealing with difficult customers
- clarifying
- restating
- asking useful questions
- presenting options
- timelines
- documenting work
- follow-up
- discretion

Use xAI Voice heavily here.

Create multiple customer calls:
- angry
- impatient
- nervous
- confused
- technically knowledgeable
- executive
- remote worker
- user who describes symptoms poorly

All required assessment responses remain multiple-choice.

Example:
Customer says:
"My stupid computer deleted everything! I need this fixed NOW."

Question:
Which technician response is BEST?

Give four believable responses, not one obviously professional answer and three absurd ones.

### 4.8 SCRIPTING BASICS
Teach current script/file types:
- batch
- PowerShell
- VBScript if current
- shell scripts
- JavaScript
- Python
- current objective-listed scripting concepts

Teach uses:
- automation
- restarting
- drive mapping
- installation
- backup
- gathering information
- updates

Teach risks:
- malware
- configuration changes
- resource exhaustion
- unintended execution

Include code viewers and safe simulated results.

Do not execute arbitrary learner-provided code server-side.

### 4.9 REMOTE ACCESS
Teach current tools/concepts:
- RDP
- VPN
- VNC
- SSH
- RMM
- SPICE if current
- WinRM
- third-party remote support
- screen sharing
- video
- file transfer
- remote desktop management
- security implications

Interaction:
Given task/security/environment, choose best remote-access method.

### 4.10 ARTIFICIAL INTELLIGENCE FUNDAMENTALS
THIS MUST NOT BE OMITTED.

Research the newest current A+ AI objective wording.

Teach at minimum as applicable:
- AI integration into applications/workflows
- appropriate-use policies
- public versus private AI tools
- sensitive/private data exposure
- source verification
- hallucinations
- accuracy limitations
- bias
- plagiarism/academic/workplace concerns
- data privacy
- responsible use
- why a technician must verify AI-generated technical instructions

Interaction:
Present five AI usage scenarios.

Examples:
- employee pastes customer PII into a public model
- technician gets an AI-generated command that could delete files
- help-desk bot confidently invents a nonexistent Windows setting
- employee uses AI to summarize public documentation
- internal approved model operates under organization policy

Learner decides what is appropriate and why through MCQ.

DOMAIN 4 MASTERY QUIZ: 10–15 questions, 100% gate.
DOMAIN 4 REVIEW.

## CORE 2 CAPSTONE

Require:
LAB C2-A: Windows administration mission.
LAB C2-B: Windows CLI troubleshooting.
LAB C2-C: Linux terminal mission.
LAB C2-D: macOS support mission.
LAB C2-E: Secure a workstation.
LAB C2-F: Secure a SOHO router.
LAB C2-G: Malware response.
LAB C2-H: Phishing/social-engineering investigation.
LAB C2-I: Backup-and-restore planning.
LAB C2-J: Ticket/change-management workflow.
LAB C2-K: Voice help-desk shift.
LAB C2-L: AI responsible-use incident.
LAB C2-M: Full software-troubleshooting shift.

Then:
- Core 2 comprehensive review
- weak-area remediation
- 45–60 question review assessment
- full mock exam
- readiness report

# ===================================================================
# INTERACTIVE LAB CENTER
# ===================================================================

Create a dedicated Labs section containing all labs independently after they are unlocked.

Required lab categories:

### Hardware Explorer
- motherboard
- CPU
- RAM
- GPU
- storage
- PSU
- laptop
- connectors
- printer

### PC Builder
Give requirements and budget.
Learner assembles a compatible fictional machine.

Validate:
- form factor
- socket/CPU compatibility
- RAM compatibility
- storage
- expansion
- PSU
- cooling

### Cable Lab
Rotate connectors.
Match them.
Connect devices.
Practice T568A/T568B.

### RAID Lab
Select RAID level.
Add drives.
Write data.
Fail drives.
Observe result.
Calculate simplified usable capacity.

### Network Builder
Router, switch, AP, endpoints, server, printer.
Connect and configure.

### Wi-Fi Lab
Move APs.
Adjust band/channel.
Observe interference.

### SOHO Router Simulator
Configure:
- credentials
- DHCP
- Wi-Fi security
- guest network
- DNS
- firewall
- port-forwarding scenarios

### Command Prompt Lab
Virtual environment only.

### Linux Terminal Lab
Virtual environment only.

### Windows Tools Lab
Simplified interactive admin tools.

### Printer Lab
Diagnose output and maintenance.

### Security Lab
Phishing, malware, account permissions, router hardening.

### Ticketing Lab
Prioritize, diagnose, document and close incidents.

### Voice Help-Desk Lab
Pre-recorded and optional live scenarios.

## 18. "PBQ" DESIGN PHILOSOPHY

Do not try to clone proprietary CompTIA PBQs.

Create ORIGINAL performance-based exercises that develop equivalent underlying skills.

Use:
- drag/drop
- matching
- configuration
- device selection
- network diagrams
- troubleshooting sequences
- virtual interfaces
- simulated terminal
- image hotspots
- ordered workflows
- table completion
- physical component placement

Every lab must explain the solution after completion.

## 19. VISUAL KNOWLEDGE TOOLS

Create global tools available from the course:

### Port & Protocol Explorer
Search protocol.
See port, transport, purpose, secure/insecure context.

### Connector Museum
High-quality representations of every A+ connector.

### Motherboard Explorer
Interactive component map.

### Acronym Glossary
Searchable.
Every current CompTIA objective acronym should be represented.

### Troubleshooting Symptom Atlas
Search a symptom such as:
"ghost printing"
"169.254 address"
"random shutdown"
"certificate warning"
and see relevant concepts already unlocked.

### Comparison Center
Provide polished comparison tables:
- TCP vs UDP
- 2.4 vs 5 vs 6 GHz
- HDD vs SATA SSD vs NVMe
- RAID levels
- DIMM vs SODIMM
- LCD technologies vs OLED
- cable categories
- fiber types
- hypervisor types
- VM vs container
- SaaS/PaaS/IaaS
- Windows editions
- filesystems
- backup types
- WPA2 vs WPA3
- malware categories
- remote-access technologies

## 20. NOTES AND BOOKMARKS

Allow learner to:
- bookmark lesson
- bookmark individual paragraph/callout
- add personal note
- mark "review this"
- search notes
- filter notes by Core/domain/objective

Save locally and cloud-sync when authenticated.

## 21. SEARCH

Create full-text course search.

Search:
"RAID"
"DHCP"
"169.254"
"BitLocker"
"ghost printing"

Results should include:
- lesson
- definition
- glossary
- related lab
- related previously unlocked topics

Do not reveal locked assessment answers through search.

## 22. ACCESSIBILITY

Meet strong accessibility expectations:
- keyboard navigation
- logical focus
- semantic HTML
- ARIA where necessary
- visible focus
- sufficient contrast
- captions
- transcripts
- image alt text
- reduced-motion support
- non-drag alternatives for critical drag actions
- scalable text
- touch targets suitable for mobile

If learner disables animation, retain all educational information.

## 23. RESPONSIVE DESIGN

Must work well on:
- desktop
- laptop
- tablet
- phone

Do not simply shrink the desktop interface.

3D/complex interactions may switch to simplified but equivalent mobile interactions.

## 24. DESIGN LANGUAGE

I want clean, minimalist, modern educational software.

Avoid:
- excessive gradients
- neon cyberpunk aesthetic
- giant marketing cards
- huge empty whitespace
- excessive rounded cards
- cheesy hacker visuals
- unnecessary animations
- childish gamification

Prefer:
- excellent typography
- dense but readable technical layout
- restrained surfaces
- strong hierarchy
- diagrams integrated directly into lessons
- modest progress indicators
- subtle transitions
- professional technical-laboratory feel

Think:
premium technical textbook + modern engineering training platform.

Allow dark/light/system theme.

## 25. CONTENT COMPONENT LIBRARY

Build reusable authoring components such as:
- `<LessonSection>`
- `<LearningBlock>`
- `<KnowledgeCheck>`
- `<TechnicalDiagram>`
- `<GeneratedIllustration>`
- `<MicroVideo>`
- `<VoiceScenario>`
- `<ComparisonTable>`
- `<Definition>`
- `<Acronym>`
- `<ExamLens>`
- `<TechnicianLens>`
- `<CommonMistake>`
- `<TroubleshootingCase>`
- `<InteractiveLab>`
- `<ObjectiveCheckpoint>`
- `<DomainQuiz>`
- `<DomainReview>`
- `<SourceReferences>`

Content should remain separate from presentation whenever possible.

Use structured MDX/JSON/TypeScript content rather than burying hundreds of lessons directly in component code.

## 26. CURRICULUM DATA MODEL

Each concept needs a stable ID.

Example conceptual format:

Core:
`C1`

Domain:
`C1-D3`

Objective:
`C1-D3-O4`

Concept:
`C1-D3-O4-RAID1`

Question:
`C1-D3-O4-RAID1-Q017`

Lab:
`C1-D3-O4-RAID-LAB`

Every question and interaction must map back to concepts.

This makes true mastery tracking possible.

## 27. QUESTION BANK SIZE

Do not create tiny banks.

Minimum target:
- at least 1,500 high-quality total question variants across full A+ curriculum
- heavily weighted toward important/complex objectives
- scenario questions
- misconception questions
- image questions
- troubleshooting questions
- terminology questions
- integration questions

Quality is more important than blindly hitting the count.

If 1,500 weak questions would be inferior to 1,200 excellent ones, prioritize correctness; however the final system must have enough variation that learners cannot pass simply by memorizing the same small bank.

Automated test:
No objective should lack multiple assessment items.

## 28. QUESTION GENERATION QUALITY CONTROL

Do not permit an LLM to generate a question at runtime and immediately present it as authoritative.

Questions used for required course progression should be pre-authored and validated.

For each question, store:
- objective
- concept IDs
- difficulty
- question
- choices
- correct choice(s)
- explanation
- rationale per distractor
- source basis
- validation status

Create validation scripts that detect:
- zero correct answers
- multiple correct answers where single-choice expected
- duplicate choice text
- duplicate questions
- missing rationale
- missing concept mapping
- malformed media references

Where technically feasible, run a second independent review pass over authored questions.

## 29. SOURCE AND FACT VERIFICATION

Create a source manifest.

Every lesson should know which authoritative sources informed it.

Do not clutter every paragraph with academic citations in the learning UI, but provide a "Sources & Further Reading" drawer.

Technical content-generation workflow:
1. Identify official objective.
2. Research authoritative current sources.
3. Draft original lesson.
4. Validate statements.
5. Validate numerical facts/standards.
6. Create diagrams from verified data.
7. Create assessment.
8. Independently check assessment against source material.
9. Mark content verified.
10. Only then include in production curriculum.

For fast-changing information, record verification date.

## 30. IMAGE HALLUCINATION CONTROL

This is mandatory.

Never rely on generated imagery for exact technical facts if code can render them deterministically.

BAD:
"Generate a motherboard with every port perfectly labeled."

GOOD:
Generate/code a simplified accurate motherboard diagram from researched geometry and render controlled labels.

BAD:
"Generate an image showing T568B wire order with words."

GOOD:
Render eight wire positions in SVG using verified order.

BAD:
"Generate a screenshot of exact Windows settings."

GOOD:
Create a simplified educational UI replica in HTML using verified menu concepts.

AI imagery is for context and conceptual understanding, not authoritative labeling.

## 31. VIDEO HALLUCINATION CONTROL

Keep generative video simple.

One primary motion/concept per clip.

Examples:
- duplicate data block
- stripe blocks
- airflow
- packet movement
- disk arm movement
- wireless wave interference

Never use generated video as the only source explaining exact pin assignments, command syntax, IP values or configuration menus.

Put precise information in deterministic overlays.

## 32. EXAM READINESS SYSTEM

Readiness should combine:
- objective mastery
- recent unseen-question performance
- spaced-review retention
- domain assessments
- PBQ/lab performance
- full mock performance
- consistency over time

Show:
"Internal Readiness: 82%"

Do NOT imply this corresponds to CompTIA's 100–900 scale.

Provide domain breakdown.

Example:
Mobile Devices 92%
Networking 84%
Hardware 89%
Virtualization/Cloud 95%
Troubleshooting 73%

Highlight troubleshooting for remediation.

## 33. ERROR-BASED REMEDIATION

When learner misses a question:
- determine concept
- increment weakness data
- show explanation
- queue related reading
- queue related lab if appropriate
- schedule future variant
- avoid immediately showing identical question

Create a "Why I Missed This" classification internally where possible:
- factual confusion
- terminology confusion
- mixed-up technologies
- troubleshooting order
- overlooked clue
- security principle
- command/tool confusion

## 34. PERFORMANCE AND COST

Course pages should feel immediate.

Lazy-load:
- videos
- 3D models
- complex diagrams

Do not load entire course at startup.

Compress images/videos appropriately.

Do not invoke paid xAI generation every time a lesson opens.

Pre-generate and cache stable media.

Optional realtime voice should clearly be the only feature that may incur continuous API usage.

## 35. XAI SERVER ARCHITECTURE

Server-only xAI integration.

Environment variable:
`XAI_API_KEY`

Implement appropriate server-side utility modules for:
- image generation
- video generation
- voice token creation
- optional TTS/pre-generated audio

Create scripts such as:
`pnpm generate:images`
`pnpm generate:videos`
`pnpm generate:audio`
`pnpm verify:media`

Maintain:
`media-manifest.json`

Each generated asset records:
- asset ID
- prompt
- associated concept
- model
- generation date
- path/URL
- human/automated verification
- fallback asset

If using xAI-hosted persistent URLs, store them deliberately.
If copying assets locally or to Supabase Storage is preferable, do that.

## 36. OFFLINE/NO-API FALLBACKS

The core educational application must NEVER become unusable merely because an API key is missing.

If no xAI key:
- deterministic diagrams remain
- prepackaged course content remains
- quizzes remain
- labs remain
- progress remains
- static fallback visual remains
- transcripts remain
- live voice is disabled with explanation

Do not show broken image boxes.

## 37. AUTHENTICATION AND SYNC

Guest:
local profile + IndexedDB.

Signed-in:
cloud backup/sync.

Implement:
- sign up
- sign in
- sign out
- password-reset flow if chosen auth supports it
- sync indicator
- merge local progress after login
- conflict handling
- account deletion/data clearing

Do not make an account mandatory to study.

## 38. DATABASE SECURITY

For Supabase:
- migrations committed
- RLS enabled
- least privilege
- user-owned rows only
- no exposed service-role key
- storage policies if private assets/data used
- tests for access-control policies

Progress from user A must not be readable/writable by user B.

## 39. TEST SUITE

Implement automated tests.

At minimum:
- TypeScript typecheck
- lint
- unit tests
- curriculum schema validation
- question bank validation
- objective coverage validation
- progress-save tests
- mastery calculation tests
- quiz-locking tests
- spaced-review scheduling tests
- local/cloud merge tests
- media manifest tests
- route tests
- accessibility sanity tests
- Playwright E2E

E2E flows:
1. new user begins lesson
2. wrong check answer blocks progress
3. correct answer unlocks next block
4. reload preserves state
5. finish objective
6. finish domain
7. fail domain mastery quiz
8. remediation appears
9. retry
10. 100% unlocks next domain
11. logout/login restores cloud progress where configured
12. final mock functions
13. mobile navigation functions

## 40. CONTENT QA SCRIPTS

Create build-time checks for:
- TODO
- FIXME
- lorem ipsum
- placeholder lesson
- empty lesson
- missing image
- missing alt text
- missing question
- missing rationale
- broken internal link
- duplicate question
- missing objective mapping
- missing source mapping
- missing domain review
- missing quiz
- missing required interaction
- inaccessible media transcript
- curriculum objective not covered

A production build should fail on critical missing curriculum assets.

## 41. DEVELOPMENT WORKFLOW

Work in phases internally, but do not stop after any phase.

Suggested sequence:
PHASE 1 — research newest objectives
PHASE 2 — create complete objective coverage matrix
PHASE 3 — architecture/data schema
PHASE 4 — shell/navigation/auth/persistence
PHASE 5 — reusable educational components
PHASE 6 — quiz/mastery engine
PHASE 7 — lab engine
PHASE 8 — Core 1 authoring
PHASE 9 — Core 2 authoring
PHASE 10 — media generation
PHASE 11 — exam simulator
PHASE 12 — review engine
PHASE 13 — accessibility/performance
PHASE 14 — test/QA
PHASE 15 — production build
PHASE 16 — Vercel deployment documentation

Use subagents/worktrees if available to parallelize:
- objective research
- Core 1 content
- Core 2 content
- interactions
- question bank
- media
- QA

But one coordinating agent must enforce common schemas and factual consistency.

## 42. NEVER FAKE COMPLETION

Do not create files such as:
`core1-content-placeholder.json`
or comments such as:
`// TODO add remaining lessons`

Do not create a domain containing only titles.

A lesson counts as implemented ONLY if it has actual instructional content and assessment.

An interaction counts as implemented ONLY if it functions.

A video counts as implemented ONLY if it loads or has a functional deterministic fallback.

A quiz counts as implemented ONLY if it contains validated questions and scoring works.

## 43. COURSE COMPLETION CRITERIA

Course completion requires:
- all required learning blocks completed
- all required objective checkpoints completed
- every domain mastery quiz passed at 100%
- required capstone labs completed
- Core review completed

Certification readiness is separate from course completion.

After course completion, encourage continued fresh mock exams and spaced review until performance is consistently strong.

## 44. SAMPLE LESSON QUALITY TARGET — RAID

Use this as a QUALITY REFERENCE, not as the only detailed lesson.

Lesson title:
"Understanding RAID: Performance, Redundancy and Failure"

Opening:
Explain why organizations combine disks and distinguish redundancy from backup.

Visual 1:
Four-drive SVG array.

Reading:
Explain logical array versus physical drives.

Required MCQ.

RAID 0:
Animate Block A → Disk 1, Block B → Disk 2, Block C → Disk 1, etc.
Explain striping, performance tendencies, usable capacity and lack of fault tolerance.
"FAIL DRIVE" button visually destroys accessibility of array.
Required MCQ.

RAID 1:
Mirror every block.
Fail one disk.
Array remains available.
Explain benefits/tradeoffs.
Required MCQ.

RAID 5:
Show distributed parity conceptually.
Allow one-drive failure.
Explain rebuild risk/performance concept at A+ depth.
Required MCQ.

RAID 6 if current objective requires:
Show dual-parity concept.
Explain increased fault tolerance and capacity cost.
Required MCQ.

RAID 10:
Two mirrored pairs + striping across pairs.
Animate data.
Explain why it combines performance characteristics and redundancy.
Failure simulator.
Required MCQ.

Comparison table.

Interactive challenge:
"Company has four drives and needs performance plus redundancy. Which level best fits?"
MCQ with meaningful distractors.

Troubleshooting ticket:
"RAID controller reports degraded array after Disk 3 failure."
Ask BEST next action.

Summary.

Objective checkpoint.

THAT is approximately the level of richness expected throughout this course.

## 45. SAMPLE LESSON QUALITY TARGET — DNS VS CONNECTIVITY

Start with:
"What actually happens when you type a website name?"

Diagram:
PC → DNS → returned IP → destination.

Animate.

Explain:
- hostname
- IP
- resolver
- query at appropriate depth
- why pinging IP successfully while hostname fails points toward name-resolution problems

Required MCQ.

Interactive:
Toggle DNS server OFF.
`ping 1.1.1.1` or another fictional/example IP path succeeds.
hostname resolution fails.

Ask learner to diagnose.

Then compare:
- DNS issue
- gateway issue
- Wi-Fi issue
- DHCP issue

Finish with scenario checkpoint.

## 46. SAMPLE LESSON QUALITY TARGET — PRINTER TROUBLESHOOTING

Show multiple deterministic sample page outputs:
- faded
- streaked
- ghosted
- repeated marks
- blank
- garbled

Click each page to inspect.

Explain likely mechanisms rather than merely giving one-word mappings.

Have learner identify:
symptom → printer technology → likely subsystem → first corrective step.

## 47. SAMPLE LESSON QUALITY TARGET — PROFESSIONALISM

Play a voice customer scenario.

Customer:
"My monitor stopped working after you people updated everything yesterday and I have a meeting in ten minutes."

Ask:
"What is the BEST opening response?"

Use four believable choices.

After correct response, continue audio scenario.

Learner makes another choice.

Branch scenario based on selected action.

Build multiple branches but keep factual resolution deterministic.

## 48. GAMIFICATION — RESTRAINED

Allowed:
- progress %
- streak
- mastery
- badges for domain completion
- lab completion
- tasteful achievement notifications

Avoid:
- fake coins
- loot boxes
- excessive confetti
- childish mascots
- meaningless XP grinding

Mastery itself should be rewarding.

## 49. STUDY SESSION MODE

Add optional:
15 min
30 min
45 min
60 min

Session builder pulls:
- due reviews
- current lesson
- weak concepts
- one interaction/lab

At end:
"Today you strengthened..."
and show objective progress.

## 50. CRAM/EXAM WEEK MODE

Create a review mode that does NOT replace normal learning.

Functions:
- weak areas
- objective checklist
- ports
- acronyms
- connector visual drill
- commands
- printer symptoms
- troubleshooting
- security threats
- rapidly mixed questions

Make clear this is final review, not foundational instruction.

## 51. FULL PRACTICE MODE

Filters:
- Core 1/Core 2
- domain
- objective
- difficulty
- unseen only
- incorrect previously
- scenario questions
- visual questions
- random
- timed/untimed

Provide explanations after answer in practice mode.

Full mock mode can defer explanations until completion.

## 52. STATISTICS

Show meaningful metrics:
- accuracy by objective
- accuracy over time
- first-attempt accuracy
- review retention
- question exposure
- mock history
- lab completion
- study time

Graphs must be genuinely useful, not decorative.

Example:
line chart of fresh-question Core 1 accuracy over previous 30 days.

## 53. PERFORMANCE-BASED "TROUBLE TICKET SHIFT"

Create a major recurring game-like lab.

Learner begins a virtual help-desk shift with 5–10 tickets.

Examples:
- printer faded
- no DNS
- laptop battery swelling
- user's display blank
- suspicious popups
- account permission failure
- Wi-Fi interference
- low disk space
- application crash
- incorrect router security

Each ticket requires multiple diagnostic decisions.

At the end show:
- correctly solved
- unnecessary actions
- missed clues
- escalation quality
- documentation quality
- concept remediation

Use different randomized scenario parameters.

## 54. EXAM OBJECTIVE VIEW

Create `/objectives`.

Show every current official objective in a paraphrased internal course map.

For each:
- completion
- mastery
- related lessons
- related labs
- latest assessment
- reviews due

Do not reproduce copyrighted proprietary study material.

## 55. REFERENCES PAGE

Create `/references`.

Group authoritative sources by:
- certification
- Windows
- macOS
- Linux
- networking
- hardware
- security
- standards

Include verification date.

## 56. README AND DEPLOYMENT

Create a genuinely useful README containing:
- what project is
- stack
- local run
- Node/package-manager requirements
- install command
- environment variables
- local-only mode
- Supabase setup
- SQL migrations
- xAI key setup
- optional media generation
- optional voice
- build
- tests
- Vercel deploy
- database backup considerations
- how to update objective version later
- how to regenerate media safely
- how to extend question bank

Provide `.env.example`.

Never commit secrets.

## 57. VERCEL READINESS

Before declaring complete run:
- install
- lint
- typecheck
- tests
- production build

Fix every blocking error.

Ensure server-only APIs are compatible with intended Vercel runtime.

Do not declare success based only on local dev server.

## 58. FINAL ACCEPTANCE CHECKLIST

Do not finish until all are TRUE:

[ ] Current official A+ exam version verified.
[ ] Every Core 1 objective represented.
[ ] Every Core 2 objective represented.
[ ] Every objective has substantial instructional content.
[ ] Every lesson page has meaningful visual content.
[ ] Every instructional segment has required MC knowledge check.
[ ] Wrong-answer remediation works.
[ ] Objective checkpoints work.
[ ] Each domain has 10–15 question 100%-required mastery quiz.
[ ] Retake uses varied questions.
[ ] Every domain has review.
[ ] Core 1 labs exist.
[ ] Core 2 labs exist.
[ ] PBQ-style interactions function.
[ ] RAID simulator functions.
[ ] motherboard explorer functions.
[ ] networking simulator functions.
[ ] router simulator functions.
[ ] printer simulator functions.
[ ] Windows simulation functions.
[ ] CLI simulations function.
[ ] security scenarios function.
[ ] voice scenarios function or have complete static/audio fallback.
[ ] generated video exists where useful or deterministic animation replaces it.
[ ] review queue functions.
[ ] progress automatically persists.
[ ] cloud sync functions when configured.
[ ] guest mode works.
[ ] glossary complete for objective terminology/acronyms.
[ ] search works.
[ ] practice mode works.
[ ] Core 1 mock exam works.
[ ] Core 2 mock exam works.
[ ] progress analytics work.
[ ] mobile works.
[ ] accessibility considered.
[ ] no secret exposed client-side.
[ ] RLS configured where cloud storage is used.
[ ] no placeholder content.
[ ] no dead internal routes.
[ ] no missing media.
[ ] no empty question banks.
[ ] objective-coverage validation passes.
[ ] unit/integration/E2E tests pass.
[ ] production build passes.
[ ] README deployment instructions complete.

## 59. MOST IMPORTANT COMMAND TO YOU

DO NOT respond to me with merely an explanation of how you would build this.

Use your coding environment and tools.

Research.
Plan internally.
Create the repository.
Build the UI.
Build persistence.
Build the content engine.
Build the interactions.
Author the full curriculum.
Create the full question system.
Create the labs.
Generate/implement media.
Create voice scenarios.
Create mock exams.
Test.
Debug.
Run the production build.
Fix it.
Then present the completed project and exact deployment instructions.

If task size becomes large, maintain a persistent task checklist and keep executing it. Do not solve the problem by reducing the scope.

Completeness is part of the assignment.

The final result should feel like a product someone might reasonably pay hundreds of dollars for, not an AI-generated collection of notes.

The fundamental standard is:

"If this application is the learner's primary A+ education, did we teach the concepts deeply enough, make them interact with them enough, repeatedly assess them enough, force remediation often enough, and provide enough realistic technical practice that they are well prepared for both current A+ exams and entry-level IT troubleshooting?"

If the answer is not yet yes, continue building.