import { Cpu, ShieldCheck, Languages, Network, BookOpen } from "lucide-react";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain?: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  quiz?: QuizQuestion[];
  practice?: { kind: "writing" | "flashcards" | "spot-errors"; prompt?: string; cards?: { term: string; def: string; example: string }[]; text?: string };
};

export type Module = {
  id: string;
  slug: string;
  number: number;
  title: string;
  short: string;
  priority: 1 | 2 | 3 | 4;
  priorityLabel: string;
  icon: typeof Cpu;
  badge: { tier: "bronze" | "silver" | "gold"; name: string };
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    id: "m1",
    slug: "centum-vp",
    number: 1,
    title: "Yokogawa DCS / CENTUM VP",
    short: "CENTUM VP",
    priority: 1,
    priorityLabel: "Priority 1",
    icon: Cpu,
    badge: { tier: "bronze", name: "CENTUM VP Trainee" },
    lessons: [
      {
        id: "m1l1",
        title: "Introduction to CENTUM VP",
        summary: "What CENTUM VP is, how it differs from Wonderware & GE iFIX, and core architecture.",
        sections: [
          {
            heading: "What is CENTUM VP?",
            body:
              "CENTUM VP is Yokogawa's flagship Distributed Control System (DCS) designed for large continuous and batch process plants. Unlike SCADA platforms such as Wonderware InTouch or GE iFIX, which sit on top of PLCs, CENTUM VP is a tightly-integrated control + HMI ecosystem built around dedicated controllers (FCS) and engineering/operator stations.",
          },
          {
            heading: "Architecture overview",
            body: "CENTUM VP is composed of three core station types working over the Vnet/IP control network:",
            bullets: [
              "FCS (Field Control Station) — the redundant controller running tags, blocks and PID logic.",
              "HIS (Human Interface Station) — the operator console with graphics and faceplates.",
              "ENG (Engineering Station) — used for configuration via System View, Builder, and Graphics Builder.",
            ],
          },
          {
            heading: "Key terminology",
            body: "Get fluent with the everyday vocabulary:",
            bullets: [
              "Tag — the named instance of a function block (e.g. FIC-101).",
              "Block — the function (PID, AI, AO, calc) executed by the FCS.",
              "Faceplate — the standard pop-up HMI control for a tag.",
              "Graphics Builder — tool for designing operator displays.",
            ],
          },
        ],
        quiz: [
          { q: "What does FCS stand for in CENTUM VP?", options: ["Field Control Station", "Fast Controller System", "Functional Control Server", "Field Communication Switch"], answer: 0 },
          { q: "Which station hosts the operator graphics and faceplates?", options: ["FCS", "HIS", "ENG", "Vnet/IP"], answer: 1 },
          { q: "What is a 'tag' in CENTUM VP?", options: ["A network cable label", "A named instance of a function block", "An alarm priority", "A backup file"], answer: 1 },
          { q: "Vnet/IP is primarily used for…", options: ["Internet access", "The real-time control network between FCS and HIS", "Connecting to ERP", "Wireless HART"], answer: 1 },
          { q: "Compared to Wonderware InTouch, CENTUM VP is best described as…", options: ["A pure SCADA layer over PLCs", "A tightly-integrated DCS with its own controllers", "A historian only", "A spreadsheet tool"], answer: 1 },
        ],
      },
      {
        id: "m1l2",
        title: "Tag Configuration",
        summary: "AI/AO/DI/DO blocks and how to configure a PID block in CENTUM VP.",
        sections: [
          {
            heading: "What is a tag?",
            body: "A tag is a uniquely-named instance of a function block running in the FCS. It binds a physical I/O point or calculation to a name like FIC-101 (Flow Indicating Controller).",
          },
          {
            heading: "Block types you must know",
            body: "",
            bullets: [
              "AI — Analog Input (4-20 mA, RTD, HART)",
              "AO — Analog Output (control valves, VFD setpoints)",
              "DI — Digital Input (limit switches, ESD signals)",
              "DO — Digital Output (solenoids, motor start)",
              "PID — Proportional-Integral-Derivative regulatory control",
            ],
          },
          {
            heading: "Configuring a PID block — step by step",
            body: "",
            bullets: [
              "1. In System View, open the FCS → Function_Block folder.",
              "2. Insert a PID block and assign tag name (e.g. FIC-101).",
              "3. Link PV input to the AI tag, MV output to the AO tag.",
              "4. Set engineering range (SH/SL) and units.",
              "5. Tune P, I, D — start conservative (P=100%, I=20s, D=0).",
              "6. Build, download to FCS, then test in MAN before AUTO.",
            ],
          },
        ],
        quiz: [
          { q: "Which block type would you use for a 4-20 mA pressure transmitter?", options: ["AO", "AI", "DO", "PID"], answer: 1 },
          { q: "MV in a PID block stands for…", options: ["Mean Value", "Manipulated Variable", "Maximum Voltage", "Module Version"], answer: 1 },
          { q: "Before placing a loop in AUTO you should test it in…", options: ["CAS", "MAN", "RCAS", "Off"], answer: 1 },
          { q: "Engineering range is defined by…", options: ["P and I", "SH and SL", "MV and PV", "FCS and HIS"], answer: 1 },
          { q: "A solenoid valve open command is best driven by…", options: ["AI", "AO", "DI", "DO"], answer: 3 },
        ],
      },
      {
        id: "m1l3",
        title: "Graphics & Faceplate Design",
        summary: "Faceplates, graphics differences vs InTouch, alarm display best practices.",
        sections: [
          { heading: "What is a faceplate?", body: "A faceplate is the standardised pop-up window that lets the operator interact with a single tag — change SP, switch MAN/AUTO, acknowledge alarms. CENTUM VP ships standard faceplates, you only customise when justified." },
          { heading: "CENTUM VP graphics vs Wonderware InTouch", body: "Where InTouch gives you a blank canvas with tag-linked animations, CENTUM VP graphics are tightly coupled to the tag database — call up a faceplate by clicking any element bound to a tag. Less freedom, far more consistency." },
          { heading: "Alarm display best practices", body: "Follow ISA-18.2 / EEMUA 191 principles:", bullets: [
            "One alarm = one operator action.",
            "Priority by colour: red = critical, yellow = high, cyan = low.",
            "Avoid alarm flooding — rationalise before commissioning.",
            "Group alarms by unit on the overview, not by signal type.",
          ] },
        ],
        quiz: [
          { q: "A faceplate primarily lets the operator…", options: ["Edit logic", "Interact with a single tag (SP, MAN/AUTO, ack)", "Change network IPs", "Build graphics"], answer: 1 },
          { q: "Which standard guides alarm management?", options: ["ISA-95", "ISA-88", "ISA-18.2 / EEMUA 191", "IEC 61131"], answer: 2 },
          { q: "Compared to InTouch, CENTUM VP graphics are…", options: ["More free-form", "More tightly coupled to the tag database", "Web-only", "Read-only"], answer: 1 },
          { q: "A critical alarm is typically displayed in…", options: ["Green", "Cyan", "Red", "White"], answer: 2 },
          { q: "Best rule for alarms is…", options: ["More is safer", "One alarm = one operator action", "Alarms by signal type", "Audible only"], answer: 1 },
        ],
      },
      {
        id: "m1l4",
        title: "FAST/TOOLS — Yokogawa SCADA",
        summary: "Yokogawa's SCADA platform and how it integrates with CENTUM VP.",
        sections: [
          { heading: "What is FAST/TOOLS?", body: "FAST/TOOLS is Yokogawa's enterprise SCADA — used for pipelines, upstream oil & gas, and geographically dispersed assets where a full DCS is overkill. It scales from one site to millions of tags." },
          { heading: "Integration with CENTUM VP", body: "FAST/TOOLS reads CENTUM VP data via OPC UA or Modbus TCP, presenting a unified operator view across plants. Common pattern: CENTUM VP runs the unit, FAST/TOOLS aggregates corporate-wide visibility." },
          { heading: "Comparison table", body: "FAST/TOOLS vs Wonderware vs GE iFIX:", bullets: [
            "FAST/TOOLS — Yokogawa-native, web-enabled, huge tag scaling, strong O&G fit.",
            "Wonderware InTouch / System Platform — most common in PH FMCG, easy to learn.",
            "GE iFIX / CIMPLICITY — strong in power and discrete; tight Proficy integration.",
          ] },
        ],
        quiz: [
          { q: "FAST/TOOLS is best classified as a…", options: ["DCS", "PLC", "SCADA", "Historian only"], answer: 2 },
          { q: "Most common protocol used to bridge CENTUM VP to FAST/TOOLS:", options: ["DNP3", "OPC UA", "BACnet", "EtherCAT"], answer: 1 },
          { q: "Wonderware InTouch is most commonly seen in PH in which sector?", options: ["Upstream pipelines", "FMCG / bottling", "Nuclear", "Aviation"], answer: 1 },
          { q: "FAST/TOOLS strength is…", options: ["Tiny embedded HMI", "Massive distributed-asset SCADA", "PLC programming", "Lab software"], answer: 1 },
          { q: "GE iFIX traditionally fits…", options: ["O&G upstream", "Power and discrete", "Brewing only", "Marine"], answer: 1 },
        ],
      },
      {
        id: "m1l5",
        title: "ProSafe-RS Basics",
        summary: "Yokogawa's TÜV-certified safety system and its integration with CENTUM VP.",
        sections: [
          { heading: "What is ProSafe-RS?", body: "ProSafe-RS is Yokogawa's IEC 61508 / 61511-certified Safety Instrumented System (SIS), TÜV-rated up to SIL 3. It runs on dedicated SCS (Safety Control Station) hardware — physically separate from the BPCS." },
          { heading: "Integrated architecture with CENTUM VP", body: "Engineering, alarming and operation can be done from the same HIS/ENG using SENG software — but the safety logic execution is fully isolated from process control, satisfying IEC 61511 separation requirements." },
          { heading: "ESD logic basics", body: "Emergency Shutdown logic in ProSafe-RS is built using FBD/LD function blocks with cause & effect matrices. Inputs (PSH, gas detectors) drive outputs (trip valves, motor stop) through voted logic such as 2oo3." },
        ],
        quiz: [
          { q: "ProSafe-RS is certified up to which SIL?", options: ["SIL 1", "SIL 2", "SIL 3", "SIL 4"], answer: 2 },
          { q: "Safety logic in ProSafe-RS runs on…", options: ["The FCS", "A separate SCS", "The HIS", "The historian"], answer: 1 },
          { q: "2oo3 voting means…", options: ["2 of 3 must agree to trip", "All 3 must agree", "Any 1 trips", "None of the above"], answer: 0 },
          { q: "Integrated CENTUM VP + ProSafe-RS engineering uses…", options: ["SENG", "SCADA Pro", "iFIX", "Excel"], answer: 0 },
          { q: "ProSafe-RS conforms primarily to…", options: ["ISA-88", "IEC 61508 / 61511", "ISA-95", "IEC 61131"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "m2",
    slug: "sis",
    number: 2,
    title: "Safety Instrumented Systems (SIS)",
    short: "SIS",
    priority: 2,
    priorityLabel: "Priority 2",
    icon: ShieldCheck,
    badge: { tier: "silver", name: "SIS Engineer" },
    lessons: [
      {
        id: "m2l1",
        title: "IEC 61511 Standard Overview",
        summary: "Process-industry functional safety lifecycle and who needs it.",
        sections: [
          { heading: "What is IEC 61511?", body: "IEC 61511 is the international standard for functional safety of Safety Instrumented Systems (SIS) in the process industry. It tells you how to design, install, operate and maintain a SIS so that it actually reduces risk." },
          { heading: "Lifecycle phases (12)", body: "", bullets: [
            "1. Hazard & risk assessment",
            "2. SIS allocation of safety functions",
            "3. Safety Requirements Specification (SRS)",
            "4. SIS design & engineering",
            "5. Installation, commissioning & validation",
            "6. Operation & maintenance",
            "7. Modification",
            "8. Decommissioning",
            "9. Verification (across the lifecycle)",
            "10. Functional Safety Assessment (FSA)",
            "11. Functional Safety Audit",
            "12. Management of Functional Safety",
          ] },
          { heading: "Who needs IEC 61511?", body: "Oil & Gas (upstream/midstream/downstream), petrochemicals, LNG, power, pharma — anywhere a SIS protects people, environment or assets." },
        ],
        quiz: [
          { q: "IEC 61511 applies primarily to…", options: ["Discrete manufacturing", "Process industry SIS", "Avionics", "Medical devices"], answer: 1 },
          { q: "The first phase of the lifecycle is…", options: ["SRS", "Hazard & risk assessment", "Installation", "Decommissioning"], answer: 1 },
          { q: "SRS stands for…", options: ["Safety Review System", "Safety Requirements Specification", "Standard Risk Score", "Site Reference Sheet"], answer: 1 },
          { q: "FSA stands for…", options: ["Functional Safety Assessment", "Final Safety Approval", "Field Service Agreement", "Functional System Audit"], answer: 0 },
          { q: "Which industry is NOT a typical IEC 61511 user?", options: ["Refining", "LNG", "Toy manufacturing", "Petrochemical"], answer: 2 },
        ],
      },
      {
        id: "m2l2",
        title: "IEC 61508 vs IEC 61511",
        summary: "Generic vs process-industry standards and how they relate.",
        sections: [
          { heading: "The relationship", body: "IEC 61508 is the generic 'mother' standard for functional safety of E/E/PE systems — used by manufacturers (Yokogawa, Siemens, HIMA) to certify products. IEC 61511 is the daughter standard for end users / system integrators in the process industry." },
          { heading: "When each applies", body: "", bullets: [
            "Manufacturer designing a logic solver → IEC 61508",
            "EPC integrating that logic solver into a refinery SIS → IEC 61511",
            "If 61511 doesn't cover something (e.g. novel device), fall back to 61508.",
          ] },
        ],
        quiz: [
          { q: "IEC 61508 is the…", options: ["Process-industry application standard", "Generic functional safety standard", "Cybersecurity standard", "Wireless standard"], answer: 1 },
          { q: "An EPC building a SIS for a refinery follows…", options: ["IEC 61508", "IEC 61511", "ISA-88", "ISA-95"], answer: 1 },
          { q: "A logic-solver vendor certifies its product to…", options: ["IEC 61511", "IEC 61508", "ISO 9001", "IEC 62443"], answer: 1 },
          { q: "When 61511 is silent on a topic, you reference…", options: ["IEC 61508", "ISA-95", "IEC 61131", "IEC 60870"], answer: 0 },
          { q: "Both standards focus on…", options: ["Quality", "Functional safety", "Cybersecurity", "Energy efficiency"], answer: 1 },
        ],
      },
      {
        id: "m2l3",
        title: "SIL — Safety Integrity Level",
        summary: "SIL 1–4, risk matrix, PFD and a worked example.",
        sections: [
          { heading: "What SIL means", body: "Safety Integrity Level (SIL) quantifies the required risk reduction of a Safety Instrumented Function (SIF). SIL 1 = lowest, SIL 4 = highest. In the process industry, SIL 4 is virtually never required." },
          { heading: "PFD ranges (low demand mode)", body: "", bullets: [
            "SIL 1: PFD 10⁻¹ to 10⁻² → Risk reduction 10–100",
            "SIL 2: PFD 10⁻² to 10⁻³ → Risk reduction 100–1,000",
            "SIL 3: PFD 10⁻³ to 10⁻⁴ → Risk reduction 1,000–10,000",
            "SIL 4: PFD 10⁻⁴ to 10⁻⁵ → Risk reduction 10,000–100,000",
          ] },
          { heading: "Quick worked example", body: "A SIF needs to reduce risk by a factor of 500. 500 falls between 100 and 1,000 → SIL 2 is required. Designer must select instruments and architecture (e.g. 1oo2 transmitters) such that calculated PFDavg ≤ 1×10⁻². " },
        ],
        quiz: [
          { q: "PFD stands for…", options: ["Probability of Failure on Demand", "Process Flow Diagram", "Plant Failure Data", "Pre-Functional Design"], answer: 0 },
          { q: "A risk reduction of 2,000 corresponds to which SIL?", options: ["SIL 1", "SIL 2", "SIL 3", "SIL 4"], answer: 2 },
          { q: "Highest SIL practically used in process industry:", options: ["SIL 1", "SIL 2", "SIL 3", "SIL 4"], answer: 2 },
          { q: "SIL 1 PFD range is…", options: ["10⁻¹–10⁻²", "10⁻²–10⁻³", "10⁻³–10⁻⁴", "10⁻⁴–10⁻⁵"], answer: 0 },
          { q: "1oo2 voting on transmitters typically…", options: ["Reduces availability", "Improves safety (any one trips)", "Has no effect", "Removes the need for proof testing"], answer: 1 },
        ],
      },
      {
        id: "m2l4",
        title: "HAZOP Study",
        summary: "Hazard and Operability study with guide words and an example.",
        sections: [
          { heading: "What HAZOP is", body: "HAZOP — Hazard and Operability study — is a structured team-based review of a P&ID. The team applies guide words to each node to find deviations from design intent and decide if existing safeguards are sufficient." },
          { heading: "Guide words", body: "", bullets: [
            "NO / NONE — flow stops",
            "MORE — higher than design (more flow, more pressure)",
            "LESS — lower than design",
            "REVERSE — opposite direction",
            "OTHER THAN — wrong material / contamination",
            "AS WELL AS — extra phase or component",
            "PART OF — incomplete composition",
          ] },
          { heading: "Example HAZOP table — pump P-101", body: "Node: discharge line of P-101. Parameter: Flow.", bullets: [
            "Deviation: NO flow → Cause: suction valve closed → Consequence: pump deadheads, overheats → Safeguard: PSH-101 trips pump → Action: verify PSH set point.",
            "Deviation: MORE flow → Cause: downstream control valve fails open → Consequence: receiving tank overflow → Safeguard: LAH-201 → Action: assess if SIF needed.",
            "Deviation: REVERSE flow → Cause: pump trip with open downstream → Safeguard: check valve CV-101.",
          ] },
        ],
        quiz: [
          { q: "HAZOP stands for…", options: ["Hazard and Operability", "Hazardous Operation", "Hazard Analysis Procedure", "Hazard Operating Plan"], answer: 0 },
          { q: "Which is NOT a HAZOP guide word?", options: ["MORE", "LESS", "MAYBE", "REVERSE"], answer: 2 },
          { q: "HAZOP is performed on…", options: ["Bills of materials", "P&IDs / nodes", "Gantt charts", "Org charts"], answer: 1 },
          { q: "REVERSE flow on a pump discharge is mitigated by…", options: ["PSH", "Check valve", "Faceplate", "Bypass"], answer: 1 },
          { q: "HAZOP is best done…", options: ["Solo", "By a multidisciplinary team", "Only by the contractor", "After commissioning"], answer: 1 },
        ],
      },
      {
        id: "m2l5",
        title: "LOPA — Layer of Protection Analysis",
        summary: "Semi-quantitative method to determine SIL after HAZOP.",
        sections: [
          { heading: "What LOPA is", body: "LOPA is performed after HAZOP for scenarios where the team cannot easily judge if existing protection is enough. It assigns numerical values to initiating events and Independent Protection Layers (IPLs) to compute the required risk reduction." },
          { heading: "Independent Protection Layers", body: "An IPL must be Independent, Effective and Auditable. Examples:", bullets: [
            "BPCS control loop (credit ≤ 10x)",
            "Operator response to alarm (credit ≤ 10x with adequate time)",
            "Relief valve / rupture disc",
            "SIS / SIF (credit per SIL achieved)",
            "Dike, fireproofing (passive IPLs)",
          ] },
          { heading: "From LOPA to SIL", body: "Required PFD = Tolerable frequency / (Initiating frequency × ∏ IPL PFDs). The SIL bracket of the resulting PFD is what the SIF must achieve." },
        ],
        quiz: [
          { q: "LOPA is normally performed…", options: ["Before HAZOP", "After HAZOP", "Instead of HAZOP", "After commissioning"], answer: 1 },
          { q: "Maximum credit for a BPCS loop as an IPL:", options: ["100x", "10x", "1000x", "Unlimited"], answer: 1 },
          { q: "An IPL must be…", options: ["Cheap, fast, smart", "Independent, Effective, Auditable", "Manual, electronic, written", "Online, offline, hybrid"], answer: 1 },
          { q: "A relief valve is which kind of IPL?", options: ["Active mechanical", "Passive", "Procedural", "Inherent"], answer: 0 },
          { q: "LOPA outputs…", options: ["A P&ID", "A required SIL for a SIF", "A PFD diagram", "A control narrative"], answer: 1 },
        ],
      },
      {
        id: "m2l6",
        title: "SIS Lifecycle — Design to Proof Testing",
        summary: "Concept through decommissioning, with proof testing detail.",
        sections: [
          { heading: "Lifecycle stages", body: "", bullets: [
            "Concept & SRS",
            "Detailed design (logic solver, sensors, final elements)",
            "Installation & loop checking",
            "Commissioning & SAT",
            "Operation, with periodic proof testing",
            "Modification (MOC)",
            "Decommissioning",
          ] },
          { heading: "What is proof testing?", body: "Proof testing is a periodic end-to-end test of the SIF that detects dangerous undetected (DU) failures. The test interval (TI) is chosen to keep PFDavg within the SIL bracket — typically 1–5 years for SIL 2." },
        ],
        quiz: [
          { q: "Proof testing primarily detects…", options: ["Safe failures", "Dangerous undetected failures", "Calibration drift only", "Operator errors"], answer: 1 },
          { q: "The proof test interval is chosen to…", options: ["Match maintenance cost", "Keep PFDavg within the SIL bracket", "Match shift schedules", "Reduce alarms"], answer: 1 },
          { q: "MOC stands for…", options: ["Method of Calculation", "Management of Change", "Maintenance of Components", "Manual Operation Control"], answer: 1 },
          { q: "SAT stands for…", options: ["Safety Action Team", "Site Acceptance Test", "Standard Audit Test", "System Application Tool"], answer: 1 },
          { q: "Loop checking happens during…", options: ["Concept", "Installation / pre-commissioning", "Decommissioning", "HAZOP"], answer: 1 },
        ],
      },
      {
        id: "m2l7",
        title: "CFSE & TÜV Certification Guide",
        summary: "Resource page — what these certifications test and where to study.",
        sections: [
          { heading: "ISA CFSE / CFSP", body: "Certified Functional Safety Expert (CFSE) and Practitioner (CFSP) are administered by ISA / exida. The exam covers IEC 61508/61511, SIL determination, verification, lifecycle management, and case studies." },
          { heading: "TÜV FSEng", body: "TÜV Rheinland / SÜD Functional Safety Engineer certification requires attending a 4-day course followed by an exam. Specialisations include Process Industry, Machinery, and SIS Operations & Maintenance." },
          { heading: "Recommended study resources", body: "", bullets: [
            "exida — Safety Instrumented Systems Verification (Goble & Cheddie)",
            "ISA — Safety Instrumented Systems: Design, Analysis, and Justification (Gruhn & Cheddie)",
            "IEC 61511 Parts 1–3 (read at least Part 1)",
            "TÜV Rheinland FS Engineer course materials",
            "exida CFSE study guide & sample questions",
          ] },
        ],
      },
    ],
  },
  {
    id: "m3",
    slug: "english",
    number: 3,
    title: "English Communication for Engineers",
    short: "English",
    priority: 3,
    priorityLabel: "Priority 3",
    icon: Languages,
    badge: { tier: "silver", name: "Technical Communicator" },
    lessons: [
      {
        id: "m3l1",
        title: "Technical Report Writing",
        summary: "Structure of an engineering report and a FAT writing exercise.",
        sections: [
          { heading: "Standard structure", body: "", bullets: [
            "Title — clear, scoped, dated",
            "Scope — what was/was not covered",
            "Findings — facts, data, observations",
            "Recommendations — actions, owners, deadlines",
          ] },
          { heading: "Common Filipino engineer pitfalls", body: "", bullets: [
            "Overusing 'kindly' — say 'please' once or omit.",
            "Mixing tenses — keep findings in past tense.",
            "Long compound sentences — split into two.",
            "'Revert back' / 'discuss about' — drop the redundant word.",
            "Vague subjects — 'The team did X', not 'It was done'.",
          ] },
          { heading: "Report template", body: "Title: ___\nScope: ___\nFindings: ___\nRecommendations: ___\nPrepared by: ___" },
        ],
        practice: { kind: "writing", prompt: "Write a 5–8 sentence FAT (Factory Acceptance Test) summary report for a CENTUM VP cabinet. Include scope, findings (1 minor punch item), and a recommendation." },
      },
      {
        id: "m3l2",
        title: "Engineering Email Writing",
        summary: "Format, samples, and a spot-the-error exercise.",
        sections: [
          { heading: "Email anatomy", body: "", bullets: [
            "Subject — specific (e.g. 'RFI-014: Spare I/O on FCS-2')",
            "Greeting — 'Hi <name>,' is fine in industry",
            "Body — context → ask → deadline",
            "Call to action — explicit verb + date",
            "Sign-off — name, role, contact",
          ] },
          { heading: "Sample — RFI", body: "Subject: RFI-014 — Spare I/O on FCS-2\n\nHi Hiroshi,\n\nDuring panel inspection we noted only 4 spare AI on FCS-2 vs the 8 specified in DOC-204. Could you confirm whether the SOR was revised, or if additional cards are required?\n\nWe need your reply by Fri 9 May to keep panel release on track.\n\nThanks,\nChristian / I&C Engineer" },
        ],
        practice: { kind: "spot-errors", text: "Hi sir,\n\nKindly please be inform that the loop check for FIC101 is already done yesterday. We will revert back to you regarding the result of testings.\n\nThanks and regards,\nThe team" },
      },
      {
        id: "m3l3",
        title: "P&ID & SIS Vocabulary Drill",
        summary: "30 essential terms — flip the cards.",
        sections: [],
        practice: {
          kind: "flashcards",
          cards: [
            { term: "Pressure Safety Valve (PSV)", def: "Mechanical relief device that opens at a set pressure to protect equipment.", example: "PSV-101 lifts at 10 barg to protect the separator." },
            { term: "Solenoid Valve (SOV)", def: "Electrically actuated on/off valve, often pilot to a larger actuator.", example: "The SOV vents the actuator on ESD demand." },
            { term: "Interlock", def: "Logic that prevents an unsafe action unless conditions are met.", example: "Pump start is interlocked with suction valve open." },
            { term: "Bypass", def: "Authorised temporary disabling of a safety function.", example: "The PSH bypass is logged and time-limited." },
            { term: "ESD", def: "Emergency Shutdown — bringing the plant to a safe state.", example: "ESD-1 isolates the entire process train." },
            { term: "BMS", def: "Burner Management System — safety logic for fired equipment.", example: "The BMS purges the furnace before ignition." },
            { term: "F&G", def: "Fire & Gas detection and mitigation system.", example: "The F&G panel votes 2oo3 detectors before deluge." },
            { term: "Loop Check", def: "End-to-end verification from field device to HMI.", example: "Loop check FIC-101 — AI scaled correctly on HIS." },
            { term: "Snubber", def: "Hydraulic/pneumatic damper that suppresses pressure spikes.", example: "A snubber protects the gauge from pump pulsation." },
            { term: "Manifold", def: "Block of valves used to isolate/equalise instruments.", example: "5-valve manifold for the DP transmitter." },
            { term: "PSH / PSL", def: "Pressure Switch High / Low.", example: "PSH-201 trips the compressor at 12 barg." },
            { term: "LSH / LSL", def: "Level Switch High / Low.", example: "LSH-301 stops the feed pump." },
            { term: "Trip", def: "Automatic action driving the process to safe state.", example: "Compressor trip on high discharge temp." },
            { term: "Permissive", def: "Condition that must be true before an action is allowed.", example: "Lube oil pressure permissive before motor start." },
            { term: "Voting (1oo2, 2oo3)", def: "Logic for combining redundant inputs.", example: "2oo3 transmitters trip on high pressure." },
            { term: "MTBF", def: "Mean Time Between Failures.", example: "MTBF informs spare-part stocking." },
            { term: "MTTR", def: "Mean Time To Repair.", example: "Lower MTTR raises availability." },
            { term: "PFDavg", def: "Average Probability of Failure on Demand.", example: "PFDavg ≤ 1e-2 satisfies SIL 2." },
            { term: "FAT", def: "Factory Acceptance Test.", example: "FAT held at the panel shop in Singapore." },
            { term: "SAT", def: "Site Acceptance Test.", example: "SAT confirmed all loops on site." },
            { term: "Punch List", def: "List of outstanding minor items.", example: "Cable tray label missing — added to punch list." },
            { term: "Hot Cutover", def: "Switching to new system without stopping the plant.", example: "DCS migration done via hot cutover." },
            { term: "Marshalling Cabinet", def: "Cabinet that organises field cables before I/O cards.", example: "Field cable lands on the marshalling terminal." },
            { term: "Junction Box", def: "Field enclosure aggregating instrument cables.", example: "JB-12 collects 16 transmitters." },
            { term: "MCT", def: "Multi Cable Transit — fire-rated cable penetration.", example: "MCT seals the bulkhead penetration." },
            { term: "Hart", def: "Highway Addressable Remote Transducer protocol over 4-20 mA.", example: "We poll diagnostics via HART." },
            { term: "Fieldbus", def: "Digital multi-drop instrument protocol (FF, Profibus PA).", example: "Foundation Fieldbus segment with 12 devices." },
            { term: "Vnet/IP", def: "Yokogawa's real-time control network.", example: "Vnet/IP links FCS and HIS." },
            { term: "SCS", def: "Safety Control Station — ProSafe-RS controller.", example: "SCS executes ESD logic." },
            { term: "Cause & Effect Matrix", def: "Tabular spec mapping inputs to safety actions.", example: "C&E shows PSH-201 trips PMV-201." },
          ],
        },
      },
      {
        id: "m3l4",
        title: "Job Interview Preparation",
        summary: "Yokogawa-style questions, sample answers, addressing the career gap.",
        sections: [
          { heading: "Q1 — Walk me through your SCADA experience", body: "Frame it chronologically: platforms (InTouch, iFIX), industries (FMCG, beverage), and one concrete project (e.g. syrup-room SCADA upgrade) — then bridge to Yokogawa: 'I'm now extending that into FAST/TOOLS and CENTUM VP.'" },
          { heading: "Q2 — Explain a complex project you handled", body: "Use STAR — Situation, Task, Action, Result. Keep numbers in the result (uptime %, days saved, $ saved)." },
          { heading: "Q3 — How do you handle overseas deployment?", body: "Show willingness, family alignment, prior travel, cultural awareness (especially Japanese reporting style — be early, be precise, follow up in writing)." },
          { heading: "Q4 — Difference between SIS and DCS", body: "DCS (BPCS) handles regulatory and supervisory control; SIS handles safety. They are physically separated per IEC 61511 and have independent power and IO. SIS only acts on demand to bring the process to safe state." },
          { heading: "Addressing the 2023–2025 career gap", body: "Be honest, brief and forward-looking: '2023 to 2025 I focused on family/health responsibilities, and used part of that time to upskill in CENTUM VP and IEC 61511. I'm fully ready to return at full pace.' Don't over-explain — pivot to what you've been studying." },
        ],
      },
    ],
  },
  {
    id: "m4",
    slug: "adjacent",
    number: 4,
    title: "Yokogawa-Adjacent Technical Skills",
    short: "Adjacent",
    priority: 4,
    priorityLabel: "Priority 4",
    icon: Network,
    badge: { tier: "silver", name: "Integration Engineer" },
    lessons: [
      {
        id: "m4l1",
        title: "OPC UA & OPC DA",
        summary: "Open Platform Communications — classic vs modern, and Yokogawa usage.",
        sections: [
          { heading: "What OPC is", body: "OPC — Open Platform Communications — is the de-facto standard for moving data between industrial systems regardless of vendor." },
          { heading: "OPC DA vs OPC UA", body: "", bullets: [
            "OPC DA (Data Access) — classic, Windows / DCOM only, painful firewalls, no built-in security.",
            "OPC UA (Unified Architecture) — modern, cross-platform, built-in encryption & authentication, information modelling.",
          ] },
          { heading: "Yokogawa & OPC UA", body: "CENTUM VP exposes data to MES/SCADA via OPC UA Server (Exaopc). Pattern: CENTUM VP → Exaopc UA Server → MES/Historian/FAST/TOOLS." },
        ],
        quiz: [
          { q: "OPC stands for…", options: ["Open Process Connection", "Open Platform Communications", "Operator Procedure Code", "Optical Plant Comms"], answer: 1 },
          { q: "Which OPC variant is cross-platform and secure?", options: ["OPC DA", "OPC UA", "OPC HDA", "OPC AE"], answer: 1 },
          { q: "OPC DA depends on…", options: ["MQTT", "DCOM/Windows", "REST", "OPC UA Pub/Sub"], answer: 1 },
          { q: "Yokogawa's OPC server product is…", options: ["Exaopc", "Exaquantum", "Exaplog", "Exarisk"], answer: 0 },
          { q: "A modern MES typically connects to CENTUM VP via…", options: ["OPC DA", "OPC UA", "Modbus RTU", "DH+"], answer: 1 },
        ],
      },
      {
        id: "m4l2",
        title: "ISA-88 Batch Control",
        summary: "Physical/procedural models and recipes — relevant for syrup batch.",
        sections: [
          { heading: "What ISA-88 is", body: "ISA-88 standardises the design of batch control. It separates the physical equipment from the procedural recipe so the same plant can run many products." },
          { heading: "Physical vs Procedural model", body: "", bullets: [
            "Physical: Enterprise → Site → Area → Process Cell → Unit → Equipment Module → Control Module",
            "Procedural: Procedure → Unit Procedure → Operation → Phase",
          ] },
          { heading: "Recipe management", body: "A master recipe is product-specific and equipment-independent; it becomes a control recipe when bound to a process cell at execution time." },
          { heading: "Example — Coca-Cola syrup batch", body: "Phases like Charge Water, Add Sugar, Heat, Add Concentrate, Mix, Transfer map cleanly to ISA-88 phases — the same recipe template can run across multiple syrup rooms." },
        ],
        quiz: [
          { q: "ISA-88 separates…", options: ["IT and OT", "Physical equipment from procedural recipes", "DCS from SCADA", "Safety from control"], answer: 1 },
          { q: "Lowest level of the procedural model is…", options: ["Procedure", "Unit Procedure", "Operation", "Phase"], answer: 3 },
          { q: "A control recipe is…", options: ["Equipment-independent", "A master recipe bound to a cell", "A historian export", "A maintenance schedule"], answer: 1 },
          { q: "Process Cell sits between…", options: ["Area and Unit", "Site and Area", "Unit and Module", "Enterprise and Site"], answer: 0 },
          { q: "ISA-88 is most useful for…", options: ["Continuous refining", "Batch industries (food, pharma)", "Discrete car assembly", "Power generation"], answer: 1 },
        ],
      },
      {
        id: "m4l3",
        title: "ISA-95 Enterprise Integration",
        summary: "The Purdue Model and how Yokogawa fits into Levels 2–3.",
        sections: [
          { heading: "What ISA-95 is", body: "ISA-95 defines the integration between enterprise (ERP) and control (DCS/PLC). It's the basis for MES design." },
          { heading: "Purdue Model — 5 levels", body: "", bullets: [
            "Level 0 — Field devices (sensors, valves)",
            "Level 1 — Basic control (PLC/DCS controllers, FCS)",
            "Level 2 — Supervisory control (HIS, SCADA)",
            "Level 3 — MES / site operations management",
            "Level 4 — ERP / business planning",
          ] },
          { heading: "Where Yokogawa fits", body: "CENTUM VP HIS sits at Level 2; Exaquantum (PIMS) and Exapilot bridge into Level 3. OPC UA / B2MML are the typical L2-L3 interfaces." },
        ],
        quiz: [
          { q: "ISA-95 is concerned with…", options: ["Functional safety", "Enterprise–control integration", "Batch recipes", "Cybersecurity"], answer: 1 },
          { q: "ERP sits at Purdue level…", options: ["1", "2", "3", "4"], answer: 3 },
          { q: "Field instruments are at level…", options: ["0", "1", "2", "3"], answer: 0 },
          { q: "MES sits at level…", options: ["1", "2", "3", "4"], answer: 2 },
          { q: "Exaquantum is best classified as…", options: ["L1 controller", "L2 HMI", "L3 historian/PIMS", "L4 ERP"], answer: 2 },
        ],
      },
      {
        id: "m4l4",
        title: "Network Fundamentals",
        summary: "TCP/IP, VLANs, firewalls, and OT/IT separation.",
        sections: [
          { heading: "TCP/IP basics", body: "An IP address (e.g. 192.168.10.25) identifies a host; the subnet mask (e.g. 255.255.255.0 / /24) defines the network; the default gateway is the router used for traffic outside the subnet." },
          { heading: "VLANs", body: "A VLAN logically segments a switch into multiple broadcast domains. Plants use VLANs to separate control, safety, business and CCTV traffic on shared infrastructure." },
          { heading: "Firewalls and the DMZ", body: "An industrial DMZ sits between OT (Levels 0–3) and IT (Level 4). Historians, patch servers and AV repositories live in the DMZ — direct OT↔IT flows are forbidden." },
          { heading: "Common devices", body: "", bullets: [
            "Managed switch (VLANs, port mirroring)",
            "Industrial firewall (Tofino, Palo Alto, Fortinet)",
            "Historian (Exaquantum, PI)",
            "Domain controller (in OT or DMZ)",
          ] },
        ],
        quiz: [
          { q: "/24 subnet mask in dotted decimal is…", options: ["255.255.0.0", "255.255.255.0", "255.255.255.255", "255.0.0.0"], answer: 1 },
          { q: "VLANs primarily provide…", options: ["Higher bandwidth", "Logical segmentation", "Encryption", "Compression"], answer: 1 },
          { q: "An industrial DMZ separates…", options: ["L0 from L1", "OT from IT", "Safety from control", "Wired from wireless"], answer: 1 },
          { q: "A managed switch can do all EXCEPT…", options: ["VLAN tagging", "Port mirroring", "Routing OSPF", "Direct welding"], answer: 3 },
          { q: "Default gateway is used to reach…", options: ["The same subnet", "Another subnet", "The same VLAN only", "The historian only"], answer: 1 },
        ],
      },
      {
        id: "m4l5",
        title: "Instrument Calibration Documentation",
        summary: "As-found / as-left, certificates, loop check procedure.",
        sections: [
          { heading: "What's in a calibration record", body: "", bullets: [
            "Tag, range (LRV/URV), units, accuracy class",
            "Reference standard used (with cert number, traceable to NIST/PTB)",
            "As-found readings at 0/25/50/75/100% (up & down)",
            "As-left readings after adjustment",
            "Tolerance & pass/fail",
            "Technician, date, environmental conditions",
          ] },
          { heading: "Loop check procedure", body: "", bullets: [
            "1. Confirm DCS in maintenance / loop bypassed",
            "2. Inject simulated signal at field device",
            "3. Verify reading at marshalling, I/O card and HIS",
            "4. Stroke final element from HIS, verify field travel",
            "5. Sign off the loop folder",
          ] },
          { heading: "Sample calibration form layout", body: "Tag: ____ | Range: ____ | Units: ____ | Std: ____\n0% as-found ____ as-left ____ | 50% ____/____  | 100% ____/____\nTolerance ±____ | Pass/Fail ____ | Tech ____ Date ____" },
        ],
        quiz: [
          { q: "'As-found' means readings…", options: ["After adjustment", "Before any adjustment", "From the data sheet", "Predicted"], answer: 1 },
          { q: "Calibration must be traceable to…", options: ["The vendor catalogue", "A national standard (NIST/PTB)", "The plant historian", "The P&ID"], answer: 1 },
          { q: "Loop check verifies…", options: ["Only the transmitter", "End-to-end field-to-HMI", "Only the wiring", "The HAZOP"], answer: 1 },
          { q: "URV stands for…", options: ["Upper Range Value", "Useful Reading Value", "Uniform Range Variable", "Universal Read Voltage"], answer: 0 },
          { q: "Before stroking a valve from HIS you should…", options: ["Skip permits", "Confirm the loop is in maintenance/bypass", "Power off the FCS", "Remove the marshalling card"], answer: 1 },
        ],
      },
    ],
  },
];

export const allLessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));
export const totalLessons = allLessonIds.length;

export const monthPlan: { month: string; title: string; goals: string[]; lessonIds: string[] }[] = [
  {
    month: "Month 1",
    title: "Foundations",
    goals: ["Complete CENTUM VP e-learning", "Master OPC UA basics"],
    lessonIds: ["m1l1", "m1l2", "m1l3", "m4l1"],
  },
  {
    month: "Month 2",
    title: "Safety & Communication",
    goals: ["IEC 61511 deep dive", "Daily English writing practice"],
    lessonIds: ["m2l1", "m2l2", "m2l3", "m3l1", "m3l2"],
  },
  {
    month: "Month 3",
    title: "ProSafe-RS & CFSE Prep",
    goals: ["ProSafe-RS architecture", "Begin CFSE study"],
    lessonIds: ["m1l5", "m2l4", "m2l5", "m2l6", "m2l7"],
  },
  {
    month: "Month 4+",
    title: "Apply & Certify",
    goals: ["Apply to Yokogawa Philippines", "Pursue TÜV / CFSE", "Mock interviews"],
    lessonIds: ["m1l4", "m3l3", "m3l4", "m4l2", "m4l3", "m4l4", "m4l5"],
  },
];

export const moduleIcon = { BookOpen };
