/* ============================================================================
   data.js — ALL SITE CONTENT LIVES HERE.
   Edit this file to change text, projects, links, or photos.
   No other file needs to be touched for normal content updates.
   ========================================================================= */

const PROFILE = {
  name: "Nirav Michelsen",
  role: "Electrical Engineering @ UCLA '28",
  tagline:
    "I design hardware end to end — schematic, layout, firmware, bring-up, and the debug session at 2 a.m. when the rail sags under load.",
  location: "Los Angeles, CA",
  email: "nirav.michelsen@gmail.com",
  linkedin: "https://linkedin.com/in/nirav-michelsen",
  // TODO: replace YOUR_GITHUB_USERNAME with your actual GitHub handle
  github: "https://github.com/YOUR_GITHUB_USERNAME",
  resume: "resume.pdf", // drop your resume PDF in the repo root, or set to null to hide the button

  about: [
    "Most of what I know came from boards I chose to build. I'm a sophomore EE at UCLA, and the work I care about sits where a schematic becomes a physical thing that has to survive current, heat, vibration, and a customer who isn't reading the manual.",
    "Right now that means a custom 5-inch drone flight controller — STM32F405, ICM-42688-P IMU on SPI, four ESC outputs, an ELRS receiver, and a full power tree off a 6S pack. It took several schematic and layout revisions to close DRC. It flies on a quadcopter I built, and I benchmark it against a commercial F405 board.",
    "On Bruin Racing's Baja SAE team I write GPS and IMU sensor drivers for the car's data acquisition system and built the wireless link that gave the team its first real-time telemetry. With Bruin Supermileage I designed a safety PCB that ties hydrogen leak sensors and dual E-stops to MOSFETs that cut the fuel cell's power circuit.",
    "I also like teaching this. I run a tutoring business I built to 10 weekly clients, and I've taught cohorts of 20 high schoolers with no prior experience to design and build working electric go-karts in three weeks.",
  ],

  seeking:
    "Seeking hardware engineering internships and co-ops — avionics, power electronics, and embedded systems, especially in aerospace and defense.",

  skills: [
    {
      group: "Electronics & PCB",
      items: [
        "Altium Designer",
        "Schematic capture",
        "Multi-layer PCB layout",
        "DRC / DFM",
        "Power electronics",
        "Switching regulators & LDOs",
        "MOSFET power switching",
        "Signal integrity",
        "Bench bring-up & debug",
        "Soldering & rework",
        "Oscilloscope",
      ],
    },
    {
      group: "Embedded & Firmware",
      items: [
        "STM32",
        "Embedded C / C++",
        "SPI · UART · I²C",
        "Sensor drivers",
        "Wireless telemetry",
        "Fault detection & E-stop",
        "Raspberry Pi / Linux",
      ],
    },
    {
      group: "Software",
      items: ["C", "C++", "Python", "Java", "Git"],
    },
    {
      group: "Mechanical & Fabrication",
      items: [
        "SolidWorks",
        "FEA",
        "CNC milling",
        "Waterjet cutting",
        "3D printing",
      ],
    },
  ],
};

/* ----------------------------------------------------------------------------
   PROJECTS
   Each project supports:
     title, subtitle, period, tags[], summary, bullets[], images[], links[]

   IMAGES: put files in the  images/  folder and list them here as
     { src: "images/your-file.jpg", caption: "What this shows" }
   Any image that isn't there yet renders as a labelled placeholder frame,
   so the site never looks broken while you're still collecting photos.
-------------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "flight-controller",
    title: "Custom Drone Flight Controller",
    subtitle: "PCB + Firmware · Personal Project",
    period: "Aug 2026 — Present",
    featured: true,
    tags: [
      "Altium",
      "STM32F405",
      "Power Electronics",
      "SPI",
      "Embedded C",
      "PCB Layout",
    ],
    summary:
      "A flight controller designed from scratch and flown on a quadcopter I built.",
    bullets: [
      "Multi-layer PCB designed in Altium around an STM32F405 MCU and an ICM-42688-P IMU on SPI, integrating USB Type-C serial, an SWD debug header, a UART ELRS receiver, four DShot ESC outputs, and LED and buzzer drivers.",
      "Engineered the full power tree from a 6S 22.2 V pack — TPS5430 buck to 5 V, MIC5504 LDO to 3.3 V — with reverse-polarity protection, Schottky OR-ing between USB VBUS and the buck rail, and catch and decoupling networks sized to keep the MCU stable through motor transients.",
      "Carried the board through multiple schematic and layout revisions to clean DRC, then bench-tested and flight-validated it on a self-built 6S 5-inch quadcopter (1750 KV 2207 motors, 60 A 4-in-1 ESC, ELRS link), benchmarking against a commercial F405 controller.",
    ],
    images: [
      { src: "images/fc-board.jpg", caption: "Assembled flight controller" },
      { src: "images/fc-layout.jpg", caption: "Altium layout — routed" },
      { src: "images/fc-schematic.jpg", caption: "Power tree schematic" },
      { src: "images/fc-quad.jpg", caption: "6S 5-inch quad, board installed" },
    ],
    links: [
      // { label: "GitHub — design files & firmware", href: "https://github.com/..." },
    ],
  },

  {
    id: "baja-telemetry",
    title: "DAQ, Telemetry & Driver Dashboard",
    subtitle: "Bruin Racing Baja SAE · Electronics Hardware Project Engineer",
    period: "Dec 2025 — Present",
    featured: true,
    tags: ["Sensor Drivers", "Telemetry", "Raspberry Pi", "GPS", "IMU", "PCB"],
    summary:
      "The electronics subsystem for UCLA's Baja SAE off-road racing car — data acquisition, a live radio link, and the driver's dashboard.",
    bullets: [
      "Wrote GPS and IMU sensor drivers and integrated them into the car's data acquisition system to log real-time position, orientation, and acceleration.",
      "Built a wireless antenna and Raspberry Pi link streaming live GPS and IMU data to a base station — the team's first real-time telemetry capability for monitoring vehicle position and speed during testing.",
      "Designed a custom dashboard PCB and wiring harness to display live velocity, acceleration, and GPS data to the driver during competition runs.",
    ],
    images: [
      { src: "images/baja-car.jpg", caption: "The car during testing" },
      { src: "images/baja-daq.jpg", caption: "DAQ enclosure and wiring" },
      { src: "images/baja-dash.jpg", caption: "Driver dashboard PCB" },
    ],
    links: [],
  },

  {
    id: "fuel-cell",
    title: "Hydrogen Fuel Cell Prototype & Safety PCB",
    subtitle: "Bruin Supermileage",
    period: "Sep 2025 — Jan 2026",
    featured: false,
    tags: ["Safety-Critical", "STM32", "MOSFET Switching", "FEA", "CNC"],
    summary:
      "A safety board that cuts power to a hydrogen fuel cell stack the moment something goes wrong — plus the stack hardware around it.",
    bullets: [
      "Designed and routed a custom 2-layer safety PCB around an STM32 MCU to manage fault detection and emergency shutdown for a hydrogen fuel cell system.",
      "Interfaced the board with hydrogen leak sensors and dual E-stop circuits, programming the MCU to drive high-power MOSFETs that instantly cut the fuel cell's power circuit.",
      "Machined copper current collectors and aluminum bipolar plates, and used FEA to optimize 3D-printed end plates, integrating the hardware with a commercial PEM stack.",
    ],
    images: [
      { src: "images/fuelcell-pcb.jpg", caption: "Safety PCB" },
      { src: "images/fuelcell-stack.jpg", caption: "Assembled PEM stack" },
    ],
    links: [],
  },

  {
    id: "go-kart",
    title: "Electric Drifting Go-Kart",
    subtitle: "Design, Build & Instruction · Personal Project",
    period: "Jan 2026 — Aug 2026",
    featured: false,
    tags: ["SolidWorks", "Powertrain", "Vehicle Dynamics", "Teaching"],
    summary:
      "A battery-powered drifting kart — and a three-week curriculum that taught high schoolers to build one.",
    bullets: [
      "Designed an 18 mph battery-powered, dual-rear-drive powertrain in SolidWorks with Ackermann steering geometry, 3D-printed brakes, and a caster-wheel drifting system.",
      "Taught multiple cohorts of 20 high school students with no prior experience in 3-week, 6-hour-per-day sessions covering steering, brakes, and electronics fundamentals; top-level vehicle assembly design in SolidWorks; and manufacturing.",
      "100% cohort completion rate, with student builds reaching top speeds up to 23 mph.",
    ],
    images: [
      { src: "images/kart-build.jpg", caption: "Finished kart" },
      { src: "images/kart-cad.jpg", caption: "SolidWorks assembly" },
      { src: "images/kart-cohort.jpg", caption: "Student cohort build day" },
    ],
    links: [],
  },

  {
    id: "electrochem-research",
    title: "Electrochemical Catalyst Research",
    subtitle: "UC Irvine School of Engineering · Research Intern",
    period: "Mar 2024 — Nov 2024",
    featured: false,
    tags: ["Research", "Cyclic Voltammetry", "Materials", "Data Analysis"],
    summary:
      "Reducing the platinum load in hydrogen fuel cell catalysts, working alongside graduate researchers.",
    bullets: [
      "Researched cost-reduction methods for platinum-alloy catalysts in green hydrogen fuel cells.",
      "Ran and analyzed cyclic voltammetry scans of nanoparticle alloys to characterize catalyst efficiency and durability.",
    ],
    images: [],
    links: [],
  },
];

/* Timeline shown in the About section */
const TIMELINE = [
  { period: "2025 — 2028", title: "B.S. Electrical Engineering, UCLA", detail: "GPA 3.82" },
  { period: "Dec 2025 — Present", title: "Electronics Hardware Project Engineer", detail: "Bruin Racing Baja SAE" },
  { period: "Sep 2025 — Jan 2026", title: "Hydrogen Fuel Cell Engineer", detail: "Bruin Supermileage" },
  { period: "Jan 2025 — Present", title: "Founder & Lead Tutor", detail: "Peak Performance Tutoring" },
  { period: "Mar 2024 — Nov 2024", title: "Research Intern, Electrochemical Engineering", detail: "UC Irvine" },
];
