/* ============================================================================
   data.js — ALL SITE CONTENT LIVES HERE.
   Edit this file to change text, projects, links, or photos.
   No other file needs to be touched for normal content updates.

   The site's job is to make someone want the PDF portfolio, not to be it.
   Keep each project to two sentences and one image — depth lives in the deck.
   ========================================================================= */

const PROFILE = {
  name: "Nirav Michelsen",
  role: "Electrical Engineering @ UCLA '28",
  location: "Los Angeles, CA",
  photo: "images/headshot.jpg",

  // The short "what I do" paragraph under the name.
  about:
    "I design hardware end to end — schematic, layout, firmware, and bring-up. Right now that means a drone flight controller built from scratch and the real-time telemetry system on Bruin Racing's Baja car. I'm looking for hardware internships in avionics, power electronics, and embedded systems.",

  email: "nirav.michelsen@gmail.com",
  linkedin: "https://linkedin.com/in/nirav-michelsen",
  github: "https://github.com/nirav1011",

  // The full deck. Replace this file when the deck changes.
  portfolio: {
    href: "Nirav-Michelsen-Portfolio.pdf",
    detail: "23 pages · schematics, power trees, build photos",
  },
};

/* ----------------------------------------------------------------------------
   PROJECTS — rendered in array order.
     id, title, period, status (optional), tags[], blurb (two sentences),
     image { src, alt, position? }, link { label, href } (optional)

   Every image is shown in the same 4:3 frame; image.position is a CSS
   object-position (e.g. "50% 30%") for tuning the crop.
-------------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "flight-controller",
    title: "Custom 5\" Drone + Flight Controller",
    period: "Aug 2026 — Present",
    status: "In progress · v1 boards on order",
    tags: ["Altium", "STM32F405", "4-layer PCB", "Power"],
    blurb:
      "Built and flew a 6S 5-inch quad on a commercial F405 board, then designed my own 4-layer flight controller in Altium to benchmark against it. STM32F405 with an ICM-42688-P IMU on SPI, four DShot outputs off a single timer, and a 22.2 V → 5 V → 3.3 V power tree with reverse-polarity protection.",
    image: {
      src: "images/flight-controller.jpg",
      alt: "3D render of the custom flight controller PCB",
    },
  },

  {
    id: "baja-telemetry",
    title: "Bruin Baja Telemetry System",
    period: "Dec 2025 — Present",
    status: "In progress · M26 dashboard PCB",
    tags: ["Embedded C", "GPS / IMU", "Raspberry Pi", "ESP32 · CAN"],
    blurb:
      "Wrote the GPS and IMU drivers and the wireless Raspberry Pi link that gave Bruin Racing's Baja car its first real-time telemetry — position and speed live at the base station instead of after the run. Now designing the ESP32 driver-dashboard PCB: CAN in, SPI display out, behind a load-dump-protected 12 V automotive front end.",
    image: {
      src: "images/baja-telemetry.jpg",
      alt: "Bruin Racing Baja car airborne on a desert course in Arizona",
      position: "50% 45%",
    },
    link: {
      label: "Code on GitHub",
      href: "https://github.com/nirav1011/M25baja-daq-telemetry",
    },
  },

  {
    id: "go-kart",
    title: "Drifting Go-Kart + Teaching",
    period: "Jan 2026 — Aug 2026",
    tags: ["SolidWorks", "Powertrain", "Fabrication", "Teaching"],
    blurb:
      "Designed and built a 36 V, 18 mph electric kart in ten weeks from existing parts, with Ackermann steering and a caster-wheel handbrake for drifting. Then wrote and co-taught a three-week curriculum where two cohorts of high schoolers with no experience built their own — every kart ran, top speed 23 mph.",
    image: {
      src: "images/go-kart.jpg",
      alt: "Nirav driving the custom electric go-kart",
      position: "50% 70%",
    },
  },

  {
    id: "fuel-cell",
    title: "Hydrogen Fuel Cell + Safety Board",
    period: "Sep 2025 — Jan 2026",
    tags: ["KiCad", "Safety interlock", "CAN", "SolidWorks"],
    blurb:
      "A custom PEM stack for Bruin Supermileage, meant to replace the car's commercial fuel cell with a lighter one built into the chassis (500 W cruise, 50–60 V). I designed its safety board: a hardware AND-gate interlock and hydrogen detection that cut the 55 V powertrain through a MOSFET-driven relay, with CAN telemetry out.",
    image: {
      src: "images/fuel-cell.jpg",
      alt: "SolidWorks model of the two-cell hydrogen fuel cell stack",
    },
  },

  {
    id: "carbon-capture",
    title: "Carbon Capture Prototype",
    tags: ["Electrolysis", "Sabatier reactor", "Prototyping"],
    blurb:
      "An attempt to make methane from atmospheric CO₂: an electrolyzer for hydrogen, calcined limestone for CO₂, and a nickel-catalyst Sabatier reactor to combine them. It didn't sustain methane production — the full portfolio covers the four reasons why and what I'd change.",
    image: {
      src: "images/carbon-capture.jpg",
      alt: "Homemade electrolyzer producing hydrogen",
      position: "50% 40%",
    },
  },
];
