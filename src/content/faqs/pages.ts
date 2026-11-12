import type { FaqEntry } from '@/lib/schema';

export type PageFaq = {
  heading: string;
  items: FaqEntry[];
};

/**
 * Client FAQ Rev03, keyed by the page that already ranks for that URL.
 * Reconciliation against the published page (keep unless noted):
 * Align: high-pressure families are four (ALFAMIX, ECO MIX, RIM MIX, ULTRAMIX), not three.
 * Align: bulk tanks are 6,000-gallon with additional sizes, not a 6,000-20,000 range.
 * Align: mastic dispensing on structural panels is severe-duty piston pumps, not progressive cavity.
 * Align: continuous lines use a double-belt press and produce PU, PIR, and composite sandwich panels.
 * Align: continuous-line support is modernization, retrofit, diagnostics, and maintenance under NDA.
 * Align: direct glazing answers the vehicle-window and panel-glazing study, not the separate aluminum-and-glass reshoring cell.
 * Align: potting experience on this page is close to 30 years with dispensing systems.
 * Align: transformer resins are epoxy and polyurethane, and both components are evacuated before mixing.
 * Align: marine answers stay with bonding, encapsulation, and flotation on that study.
 * Drop: gelcoat versus in-mold coating is not part of the marine fendering page.
 * Every other question is kept. No question is repeated verbatim on another URL.
 */
const pages: Record<string, PageFaq> = {
  "/equipment-options/polyurethane-processing-equipment": {
    "heading": "Polyurethane Processing Equipment FAQs",
    "items": [
      {
        "question": "What does polyurethane processing equipment do?",
        "answer": "Polyurethane processing equipment handles, meters, mixes and dispenses two-component polyurethane materials, including rigid insulating foams, structural polymers, flexible elastomers and sealants. Kirkco systems hold the mix ratio, material temperature and output steady so every part or panel cures the same way."
      },
      {
        "question": "Should I choose high-pressure or low-pressure polyurethane metering?",
        "answer": "High-pressure systems use piston pumps and impingement mixing heads and suit high-throughput, continuous foam production. Low-pressure systems use gear or pump-based metering and suit lower outputs, smaller shots and a wider mix of parts. Kirkco selects the approach based on chemistry, output rate and production configuration."
      },
      {
        "question": "Can Kirkco supply equipment for both continuous and discontinuous production?",
        "answer": "Yes. Kirkco engineers polyurethane systems for small-batch discontinuous molding and press-based panel production, as well as fully automated, high-pressure continuous lines such as double-belt sandwich panel lines."
      },
      {
        "question": "Which products are made with Kirkco polyurethane foam systems?",
        "answer": "Typical products include PU and PIR insulated panels, structural sandwich panels, molded foam parts, structural composite foam cores and insulated panels for walk-in coolers, refrigerators, and refrigerated vehicles."
      },
      {
        "question": "Do you offer pentane-capable polyurethane foam equipment?",
        "answer": "Yes. Kirkco supplies pentane-capable metering machines along with pentane storage and blending systems. These include tanks, transfer pumps, metering and mixing ahead of the mix head, and safety systems with pentane sensors, leak detection and controls."
      },
      {
        "question": "How is polyurethane foam quality controlled and validated?",
        "answer": "PLC-based controls manage material temperatures, metering ratios, output rates and safety interlocks. Validation confirms foam density consistency, cell structure, adhesion performance and repeatable behavior across shifts and product variants."
      },
      {
        "question": "Can polyurethane foam scrap be recycled?",
        "answer": "Yes. Kirkco engineers polyurethane foam recycling and reprocessing systems that turn production scrap and post-process foam waste into reusable material streams, reducing raw material use and disposal costs."
      },
      {
        "question": "How is raw chemical supplied to the metering machine?",
        "answer": "Kirkco designs the upstream infrastructure as well: bulk polyol and isocyanate storage, tanker and tote unloading, temperature conditioning, day tanks and plant loop piping that feed the metering unit without interruption."
      },
      {
        "question": "Can the system grow with our production?",
        "answer": "Yes. The architecture scales from pilot lines to full production and supports formulation changes, added automation and higher throughput without redesigning the core system."
      },
      {
        "question": "Can Kirkco repair or rebuild polyurethane mix heads and metering machines?",
        "answer": "Yes. Kirkco repairs and rebuilds polyurethane metering and mixing equipment from most major brands, including mix heads and mix guns. Rebuilds use genuine factory parts, and price and timing are quoted before work begins."
      }
    ]
  },
  "/equipment-options/polyurethane-processing-equipment/high-pressure-metering": {
    "heading": "High-Pressure Polyurethane Metering FAQs",
    "items": [
      {
        "question": "What is high-pressure polyurethane metering?",
        "answer": "High-pressure metering is the industrial standard for delivering, ratio-controlling and mixing two-component polyurethane. High-pressure piston pumps meter the polyol and isocyanate at an exact stoichiometric ratio, and an impingement mixing head blends them completely before discharge."
      },
      {
        "question": "How does an impingement mixing head work?",
        "answer": "The two components are injected at high pressure into a small mixing chamber, where the streams collide and mix. The mixed material is discharged immediately, which gives homogeneous mixing for fast-reacting polyurethane systems."
      },
      {
        "question": "What products are made with high-pressure polyurethane metering?",
        "answer": "Common applications include rigid structural foams, insulated and sandwich panels, continuous elastomers and microcellular components used for NVH (noise, vibration and harshness) dampening."
      },
      {
        "question": "How does Kirkco keep the mix ratio and shot size accurate?",
        "answer": "Kirkco systems pair high-pressure piston pumps with closed-loop VFD or servo controls. The result is accurate stoichiometric ratios and repeatable shot sizes across long production runs."
      },
      {
        "question": "When is high-pressure metering a better choice than low-pressure metering?",
        "answer": "Choose high-pressure metering when you need high output, continuous or high-volume production and fast-reacting chemistry. Low-pressure metering is often a better fit for smaller shots, lower outputs and a high mix of parts."
      },
      {
        "question": "Does Kirkco offer more than one high-pressure machine platform?",
        "answer": "Yes. Kirkco offers the ALFAMIX, ECO MIX, RIM MIX, and ULTRAMIX high-pressure families, sized for different output ranges and applications, and engineers the full system around your chemistry and production rate."
      },
      {
        "question": "What results can a high-pressure metering system deliver?",
        "answer": "By removing ratio and mixing variability as failure modes, Kirkco high-pressure systems improve foam quality consistency, stabilize production throughput and reduce scrap."
      },
      {
        "question": "Can a high-pressure machine be fed from bulk chemical storage?",
        "answer": "Yes. Kirkco integrates high-pressure metering units with bulk storage tanks, day tanks, temperature conditioning and plant loop piping for uninterrupted material supply."
      },
      {
        "question": "Can Kirkco rebuild or repair a high-pressure mix head?",
        "answer": "Yes. Kirkco repairs and rebuilds high-pressure mix heads, mix guns and metering machines from most major brands. Each rebuild starts with an inspection, replaces all seals, gaskets and O-rings, replaces worn or out-of-tolerance hard parts with genuine factory parts, and finishes with assembly and diagnostic testing."
      },
      {
        "question": "When should a mix head be rebuilt instead of replaced?",
        "answer": "Signs of wear include ratio drift, leaking seals, sluggish or incomplete cleanout, and poor mixing such as streaks or soft spots in the foam. Kirkco inspects the unit and quotes a repair, a full rebuild or a replacement based on its condition."
      }
    ]
  },
  "/bulk-chemical-storage": {
    "heading": "Bulk Chemical Storage FAQs",
    "items": [
      {
        "question": "What is included in a standard polyurethane bulk storage system?",
        "answer": "Kirkco's standard dual tank system includes unloading boxes with hose connections, valves, gauges and controls; pressure unloading for polyol and isocyanate; one 6,000-gallon ASME steel tank for each chemical; a transfer pump for each; a touch-screen control panel; plant loop distribution piping; check-out and start-up; and manuals and drawings."
      },
      {
        "question": "What tank sizes are available?",
        "answer": "The standard system uses 6,000-gallon ASME steel tanks, and other tank sizes and additional tanks are available. Tank sizing and redundancy are engineered to match your production throughput."
      },
      {
        "question": "How do you protect polyol and isocyanate from moisture and contamination?",
        "answer": "Systems use closed-loop unloading and transfer, nitrogen inert gas blanketing, double-wall tank construction, secondary containment and inline filtration. Together these keep moisture out, minimize vapor emissions and prevent contamination."
      },
      {
        "question": "How are bulk chemicals unloaded from tankers, railcars or IBC totes?",
        "answer": "Dedicated unloading stations use positive-displacement transfer pumps, Coriolis mass-flow monitoring, inline filtration, metered unloading valves, automatic pressure relief and bypass protection, and hose connection stations with safety interlocks."
      },
      {
        "question": "How is chemical temperature controlled?",
        "answer": "Insulated and heated tanks can be heated by steam, electric trace or glycol loops. Heat exchangers, tempered water units and chillers, run by PID-controlled loops, hold viscosity and reactivity stable from storage to the metering machine."
      },
      {
        "question": "Can the system blend additives into the polyol?",
        "answer": "Yes. Blending systems use load cells or metering pumps to add liquid or powder additives to the main polyol stream, with static or dynamic mixers and optional gas loading units."
      },
      {
        "question": "Can you store and handle pentane safely?",
        "answer": "Yes. Kirkco supplies pentane storage and blending systems with tanks, transfer pumps, metering and mixing before the mix head, and safety systems including pentane sensors, leak detection and controls, designed to comply with national, international and local regulations."
      },
      {
        "question": "What are day tanks and why are they used?",
        "answer": "Day tanks are intermediate, pressure-rated tanks that feed the metering system continuously. They can include vacuum degassing, automatic refill logic, nitrogen pressurization, agitation and dual-tank redundancy."
      },
      {
        "question": "Does Kirkco install and start up the system?",
        "answer": "Check-out and start-up are included in the standard system, and installation is available as an option. Kirkco engineers work with you to fit storage and blending equipment to your building and production requirements."
      },
      {
        "question": "Is bulk storage only for polyurethane?",
        "answer": "No. The same infrastructure supports adhesives, coatings, composite and marine resin processing, lubrication systems and high-volume panel lines."
      }
    ]
  },
  "/industry/construction/structural-panels": {
    "heading": "Structural Panel Manufacturing FAQs",
    "items": [
      {
        "question": "What is a structural insulated panel (SIP)?",
        "answer": "A SIP is a sandwich of two structural boards, usually OSB, around an insulating core of EPS, XPS or polyurethane foam. The core acts like the web of an I-beam and the skins act like the flanges, so one panel can replace studs, joists, insulation and vapor and air barriers in walls, roofs, floors and foundations."
      },
      {
        "question": "What equipment is used to bond SIPs?",
        "answer": "Two-component meter-mix-dispense machines apply multiple polyurethane adhesive beads across the full length of each plywood/foam/plywood sandwich. Materials are drawn from level-controlled pressure vessels fed directly from 55-gallon drums, and volumetric metering holds the selected mix ratio."
      },
      {
        "question": "Can Kirkco equipment bond honeycomb sandwich panels?",
        "answer": "Yes. Kirkco supplies two-component equipment that sprays, roll coats or bead-dispenses adhesive between skins and honeycomb cores. Skins can be aluminum, fiberglass or carbon fiber, and cores can be aluminum or non-metallic. The same systems can seal edges and bond inserts and panel joints."
      },
      {
        "question": "How do you dispense abrasive, highly thixotropic mastics?",
        "answer": "Severe-duty piston pumps with specially treated wetted parts handle these materials. They feed from standard 200-liter drums, use separate hydraulic drives for each component, and set ratio and flow rate from a touch-screen controller."
      },
      {
        "question": "Can thixotropic epoxy adhesives be heated and metered accurately?",
        "answer": "Yes. Variable-ratio piston pump machines with ram-mounted drum pumps proportion and meter the two components, while an onboard heating system keeps materials at a constant temperature and wear-treated parts resist abrasive fillers."
      },
      {
        "question": "Can adhesive be applied robotically along long panel joints?",
        "answer": "Yes. A compact gear-pump system mounted on a robotic carriage can travel the length of a joint while dispensing accurately proportioned two-component polyurethane at constant temperature, pressure and flow rate."
      },
      {
        "question": "Does Kirkco supply complete continuous panel production lines?",
        "answer": "Yes. As a systems integrator, Kirkco delivers continuous PU, PIR and composite sandwich panel lines, including facing unwind, precision metering and mixing, multi-zone laydown, double-belt press, servo thickness control, flying saw cutting, and cooling, stacking and handling."
      },
      {
        "question": "Which panel products can a Kirkco line produce?",
        "answer": "PU and PIR insulation panels, structural sandwich panels, architectural and industrial wall systems, roofing panels, cold-storage panels and specialty composite panels."
      },
      {
        "question": "Can a panel line be expanded later?",
        "answer": "Yes. Kirkco panel lines are modular, so manufacturers can start with a right-sized configuration and add capacity later without re-engineering the core line."
      },
      {
        "question": "Does Kirkco supply discontinuous panel systems?",
        "answer": "Yes. Kirkco engineers press-based discontinuous panel systems for small-batch production, using the same precision metering and mixing as its continuous lines. Discontinuous systems suit lower volumes, a wider range of panel sizes and products, constrained floor space and lower capital budgets."
      }
    ]
  },
  "/equipment-options/polyurethane-processing-equipment/applications/continuous-panel-line-systems": {
    "heading": "Continuous Panel Line FAQs",
    "items": [
      {
        "question": "What is a continuous polyurethane panel line?",
        "answer": "A continuous panel line is a fully integrated production platform for PU, PIR and composite sandwich panels. It combines bulk material storage, high-pressure metering, mixing heads, continuous laydown, a double-belt press, curing zones and synchronized cutting into one coordinated line."
      },
      {
        "question": "What panels can a continuous line produce?",
        "answer": "PU, PIR, and composite sandwich panels, where bond integrity, density consistency, and line uptime are critical."
      },
      {
        "question": "When should we choose a continuous line over a discontinuous panel system?",
        "answer": "Continuous lines suit high, predictable output and long production runs with less labor. Discontinuous systems suit lower volumes, more product variation, constrained floor space and lower capital budgets."
      },
      {
        "question": "How does the line hold consistent density and thickness?",
        "answer": "Polyurethane or PIR chemistry is metered at tightly controlled ratios and temperatures. PLC logic synchronizes metering output, conveyor speed and laydown geometry, while servo-driven thickness and pressure regulation holds panel dimensions."
      },
      {
        "question": "How fast can a line change between panel formats?",
        "answer": "Recipe management in the PLC enables rapid changeover between panel formats and thicknesses without retooling the core line."
      },
      {
        "question": "How is panel quality verified?",
        "answer": "Inline monitoring checks material ratios, flow rates and temperature profiles. The architecture supports factory acceptance testing (FAT), site acceptance testing (SAT) and repeatable validation across shifts and facilities."
      },
      {
        "question": "Can the line be expanded after installation?",
        "answer": "Yes. Lines are designed for staged expansion, such as adding metering heads, wider panel formats or higher line speed, without replacing core assets."
      },
      {
        "question": "Does Kirkco support greenfield projects and line modernization?",
        "answer": "Yes. Kirkco supports line modernization and retrofit under NDA, along with lifecycle support that includes remote diagnostics, preventive maintenance, and control upgrades."
      }
    ]
  },
  "/equipment-options/adhesives-sealants/two-component": {
    "heading": "Two-Component (2K) Meter Mix Dispensing FAQs",
    "items": [
      {
        "question": "What is a two-component (2K) meter mix dispense system?",
        "answer": "A 2K system meters two reactive components at a set ratio, mixes them and dispenses the mixed material. Kirkco systems handle continuous beads, discrete shots, potting, encapsulation, coating and molding applications."
      },
      {
        "question": "Which materials can a 2K system process?",
        "answer": "Epoxies, polyurethanes, silicones, methacrylates (MMA), liquid silicone rubber (LSR) and filled or spacer-loaded structural adhesives."
      },
      {
        "question": "What is the difference between static, dynamic-static and dynamic mixers?",
        "answer": "Static mixers use a disposable tube with fixed elements. Dynamic-static mixers add a motor that spins the mixing element for extra shear and need no flushing with disposable mixers. True dynamic mixers use a rotor in a mixing chamber for very short pot lives, very different viscosities and wide mix ratios, and can be heated or cooled."
      },
      {
        "question": "Which metering technology is right for my adhesive?",
        "answer": "Gear metering suits continuous flow, piston metering suits precise volumetric delivery, shot metering suits discrete measured doses, and progressive cavity metering suits abrasive, highly filled or encapsulation materials. Kirkco selects the technology based on viscosity, fillers, ratio and output."
      },
      {
        "question": "How do you handle high-viscosity or filled structural adhesives?",
        "answer": "High-viscosity gear pump metering and progressive cavity metering provide stable flow and repeatable volumetric output for filled and unfilled chemistries, replacing the flow variation of cartridge or pressure-pot dispensing."
      },
      {
        "question": "Can a 2K system be built into an automated robotic cell?",
        "answer": "Yes. For example, Kirkco built a robotic polyurethane bonding cell for aluminum and glass assemblies that dispenses up to about 300 ml per minute and helped the manufacturer reach cost parity with offshore production."
      },
      {
        "question": "What applications use Kirkco 2K equipment?",
        "answer": "Applications include water tank epoxy bonding, elevator panel bonding, filter encapsulation, LED driver potting, sensor and connector encapsulation, automotive electronics encapsulation and transformer potting under vacuum."
      },
      {
        "question": "How do I choose the right 2K system?",
        "answer": "Start with the material's ratio, viscosity, pot life and fillers, plus your required output, shot size and level of automation. Kirkco engineers match the system architecture to that material behavior and production requirement."
      }
    ]
  },
  "/equipment-options/adhesives-sealants/applications/automated-bonding-fipg": {
    "heading": "Automated Bonding & FIPG FAQs",
    "items": [
      {
        "question": "What is form-in-place gasketing (FIPG)?",
        "answer": "Form-in-place gasketing dispenses a liquid gasket bead, such as polyurethane foam or silicone, directly onto a part, where it cures in place. It replaces manual placement of pre-cut gaskets for environmental sealing."
      },
      {
        "question": "Why automate bonding and gasketing?",
        "answer": "Manual gasketing causes inconsistent bead diameter and bond-line thickness, material waste, no ratio verification, long cycle times and limited traceability. Automated, closed-loop dispensing removes those failure modes."
      },
      {
        "question": "How does Kirkco verify mix ratio during dispensing?",
        "answer": "Closed-loop metering monitors ratio, pressure and flow in real time, so material delivery stays repeatable under changing production conditions."
      },
      {
        "question": "Which materials can be dispensed for FIPG and bonding?",
        "answer": "Polyurethane foams and elastomers, silicone elastomers and foams, epoxy resins, plastisols, polyamides, hot-melt and PUR/UV-cure adhesives, and greases and lubricants."
      },
      {
        "question": "Which motion platforms are available?",
        "answer": "3-axis XYZ gantries for flat parts, 6-axis robots for complex 3D geometry, adjustable-width conveyors for high-mix production and programmable recipes for fast changeover."
      },
      {
        "question": "What cycle times are typical?",
        "answer": "Typical cycle targets are 5 to 10 seconds, depending on the application."
      },
      {
        "question": "Can the system run without stopping for material changes?",
        "answer": "Yes. Tandem supply with automatic switchover and automatic tank level monitoring and refill keep material flowing."
      },
      {
        "question": "What optional process modules are available?",
        "answer": "Options include plasma surface treatment, UV curing, ovens and thermal cure modules, interchangeable mix heads, vacuum dispensing chambers, and laminating and roll-coating integration."
      },
      {
        "question": "How are final tolerances and throughput confirmed?",
        "answer": "A ROM proposal establishes feasibility. Final tolerance bands, throughput and material compatibility are then confirmed through engineering trials and production simulation."
      },
      {
        "question": "Which industries use automated FIPG systems?",
        "answer": "Energy infrastructure components, electrical enclosures, filter assemblies and industrial equipment subassemblies."
      }
    ]
  },
  "/equipment-options/adhesives-sealants/applications/automated-direct-glazing": {
    "heading": "Automated Direct Glazing FAQs",
    "items": [
      {
        "question": "What is direct glazing?",
        "answer": "Direct glazing bonds glass or transparent panels directly to a frame or body opening with an adhesive bead instead of a mechanical gasket. It is the standard method for installing vehicle windshields and is used across transportation and industrial products."
      },
      {
        "question": "What does an automated direct glazing system do?",
        "answer": "It applies the adhesive or sealant bead with consistent geometry and precise placement, giving predictable cure behavior from part to part."
      },
      {
        "question": "Which industries use automated direct glazing?",
        "answer": "Transportation and industrial manufacturers that bond and seal glass and transparent components."
      },
      {
        "question": "Why automate glass bonding instead of applying adhesive by hand?",
        "answer": "Automation removes manual variability. That improves cosmetic consistency, reduces scrap and increases throughput by stabilizing the glazing operation."
      },
      {
        "question": "Which adhesives can be used for glass bonding?",
        "answer": "Kirkco configures single- and two-component metering for polyurethane and silicone adhesives and sealants, matched to the material your glazing specification calls for."
      },
      {
        "question": "Can the glazing system work in a robotic cell?",
        "answer": "Yes. The architecture is built for automated and robotic production workflows."
      },
      {
        "question": "Can Kirkco bond aluminum-and-glass assemblies?",
        "answer": "Yes. Automated vehicle window systems place a precision adhesive bead on the glass before robotic installation into the body, and the same architecture supports panel glazing and transparent enclosure sealing."
      }
    ]
  },
  "/industry/electrical/potting-and-transformers": {
    "heading": "Potting & Encapsulation Equipment FAQs",
    "items": [
      {
        "question": "What is electronic potting and encapsulation?",
        "answer": "Potting fills a housing, or coats part of a component, with a two-component resin to protect PCBs, sensors, LEDs, connectors, coils and transformers from moisture, dust, shock and contamination."
      },
      {
        "question": "Which resins does Kirkco equipment dispense for potting?",
        "answer": "Epoxies, polyurethanes, silicones and other specialty adhesives and casting resins."
      },
      {
        "question": "Why pot under vacuum?",
        "answer": "Air inclusions, voids and bubbles weaken the mechanical and electrical properties of the potted part. Vacuum casting gives an even, void-free structure and fills narrow gaps, small holes and angular shapes quickly."
      },
      {
        "question": "Which components are typically vacuum potted?",
        "answer": "Ignition coils, transformers, computer chips, sensors and other electrical devices, especially parts used in hazardous areas or underwater."
      },
      {
        "question": "Can Kirkco systems dispense beads, shots and pours?",
        "answer": "Yes. Kirkco builds custom turnkey systems for precise beads or measured shots and for high- or low-volume pours, with or without vacuum."
      },
      {
        "question": "Do you offer manual and fully automated potting systems?",
        "answer": "Yes. Systems range from simple manual applications to fully automated robot cells that include pretreatment and process monitoring."
      },
      {
        "question": "How is potting quality kept consistent?",
        "answer": "The material must be metered in the right quantity, at the right position and at the right time. Kirkco systems control mix ratio and material temperature, store recipes and interlock the process so off-ratio material is never dispensed."
      },
      {
        "question": "Is the same equipment used for filter element sealing?",
        "answer": "Yes. Sealing filter elements uses essentially the same metering, mixing and casting process as electronics potting."
      },
      {
        "question": "How much experience does Kirkco have with potting systems?",
        "answer": "Kirkco brings close to 30 years of experience with dispensing systems for potting and encapsulation."
      }
    ]
  },
  "/equipment-options/adhesives-sealants/applications/transformer-potting-under-vacuum": {
    "heading": "Transformer Vacuum Potting FAQs",
    "items": [
      {
        "question": "When does a transformer need to be potted under vacuum?",
        "answer": "Vacuum potting is needed when atmospheric or gravity filling cannot fully impregnate the part. Common causes are complex winding geometry, trapped air volumes and high dielectric performance requirements."
      },
      {
        "question": "What are the benefits of vacuum potting transformers and coils?",
        "answer": "Consistent impregnation depth across transformer variants, reduced void content, improved dielectric performance, predictable production outcomes and less dependence on operator skill."
      },
      {
        "question": "Why do voids matter in transformer potting?",
        "answer": "A void next to a conductor weakens the insulation and can become a point of electrical failure, so void-free impregnation is central to insulation integrity and long-term reliability."
      },
      {
        "question": "Which resins are used for transformer potting?",
        "answer": "Two-component epoxies and polyurethanes are used, selected for impregnation viscosity, cured dielectric strength, and thermal performance."
      },
      {
        "question": "How is the resin prepared before it reaches the part?",
        "answer": "Both components are metered at a controlled ratio, kept at a stable temperature, and evacuated before they are mixed so the fill does not reintroduce air."
      },
      {
        "question": "Can one system handle several transformer designs?",
        "answer": "Yes. The architecture is built to deliver consistent results across transformer variants and to scale for production volumes."
      },
      {
        "question": "Can Kirkco work on our transformer program under NDA?",
        "answer": "Yes. This application architecture is NDA-safe, and Kirkco supports confidential engineering engagements for customer-specific programs."
      }
    ]
  },
  "/equipment-options/lubrication": {
    "heading": "Grease Metering & Lubrication System FAQs",
    "items": [
      {
        "question": "What is a grease metering system?",
        "answer": "A grease metering system stores, pumps, doses and delivers grease or oil to the point of use in an exact volume. Kirkco systems are built on four elements: supply, metering, distribution and control, and cover single-component grease and oil applications."
      },
      {
        "question": "What determines lubrication accuracy, the pump or the metering valve?",
        "answer": "The metering valve. It defines delivered volume, repeatability and consistency at the point of use. The pump supplies material and generates pressure but does not set dosing accuracy."
      },
      {
        "question": "How do grease and oil metering differ?",
        "answer": "Grease metering prioritizes volumetric repeatability at high viscosity. Oil metering prioritizes consistent flow and clean delivery."
      },
      {
        "question": "What is impulse dosing?",
        "answer": "An impulse dosing valve delivers a defined volumetric shot of grease or oil with each actuation, independent of line length, pressure fluctuation or cycle variation. It works in centralized or decentralized lubrication systems."
      },
      {
        "question": "How do I know every lubrication point was actually lubricated?",
        "answer": "Dosing inspection confirms that each shot occurred, validates pressure and flow, detects blocked lines or missed doses, and reports alarms and logs to the PLC or HMI. Combined with impulse dosing, this creates closed-loop, verified lubrication."
      },
      {
        "question": "What information do you need to design a lubrication system?",
        "answer": "Lubricant type, viscosity and rheology, filler or additive loading, container format, lubrication frequency, supply distance and elevation, and the required shot size or volume."
      },
      {
        "question": "Why does grease need degassing?",
        "answer": "Air in grease makes dosing inaccurate. Degassing removes the air before the grease reaches the metering valve."
      },
      {
        "question": "When is time-pressure metering acceptable?",
        "answer": "Time-pressure metering is reserved for applications with low sensitivity to volume. Volumetric impulse dosing is used where a deterministic shot size and verification are required."
      },
      {
        "question": "Where are Kirkco lubrication systems used?",
        "answer": "Robotic and linear rail lubrication, automation bearings and rotating elements, precision oiling for servo axes, bearing assembly and automated grease dispensing for linear actuators."
      },
      {
        "question": "Does Kirkco provide spare parts and application support?",
        "answer": "Yes. Kirkco provides spare parts, accessories and U.S. application support for its lubrication metering, supply and dispensing products."
      }
    ]
  },
  "/equipment-options/lubrication/applications/precision-bearing-grease-metering": {
    "heading": "Bearing Grease Metering FAQs",
    "items": [
      {
        "question": "Why meter grease precisely during bearing assembly?",
        "answer": "Too little or too much grease leads to premature wear, unplanned downtime and warranty exposure. Precise, clean grease application gives every bearing the specified fill."
      },
      {
        "question": "What results did this bearing grease metering system deliver?",
        "answer": "The Kirkco-supplied grease metering system increased productivity by 30%."
      },
      {
        "question": "How is the grease shot size kept consistent?",
        "answer": "Volumetric metering valves define the delivered volume at the point of use, and impulse dosing delivers the same shot regardless of line length or pressure fluctuation."
      },
      {
        "question": "Can the system confirm each bearing received grease?",
        "answer": "Yes. Dosing inspection confirms each lubrication event and detects missed doses or blocked lines, with alarms and logging through the PLC or HMI."
      },
      {
        "question": "How do you keep grease clean during application?",
        "answer": "Clean material handling, short delivery paths and controlled dispense logic minimize contamination and waste."
      },
      {
        "question": "Can grease metering be integrated into an automated assembly line?",
        "answer": "Yes. PLC-based controls manage lubrication timing, volume and sequence, so dosing runs as part of the assembly cycle."
      },
      {
        "question": "Can the system grow from one lubrication point to many?",
        "answer": "Yes. The architecture scales from single-point lubrication to multi-zone systems and adapts to new lubricant formulations."
      }
    ]
  },
  "/equipment-options/composites/applications/rtm-resin-infusion-systems": {
    "heading": "RTM & Resin Infusion System FAQs",
    "items": [
      {
        "question": "What is resin transfer molding (RTM)?",
        "answer": "RTM injects liquid resin into dry fiber reinforcement held in a closed mold, then cures it into a composite part. Vacuum-assisted RTM (VARTM) and closed-mold resin infusion use vacuum to draw resin through the reinforcement."
      },
      {
        "question": "What does Kirkco supply for RTM and infusion?",
        "answer": "Precision resin metering and mixing, controlled injection or infusion delivery, vacuum management and integration with application-specific tooling, all engineered as one process system."
      },
      {
        "question": "Which resins can be processed?",
        "answer": "Epoxy, polyurethane, vinyl ester and polyester chemistries."
      },
      {
        "question": "Which metering technologies are used for composite resins?",
        "answer": "Precision gear metering pumps, servo-driven piston metering, progressive cavity pumps for filled resins, Coriolis mass-flow monitoring where applicable, heated hoses, recirculation loops and static or dynamic mixing heads."
      },
      {
        "question": "Which process variables have to be controlled?",
        "answer": "Resin viscosity stability, fiber impregnation, vacuum integrity, cure kinetics and gel profile, exotherm temperature, air void reduction and bond-line integrity."
      },
      {
        "question": "How is laminate quality validated?",
        "answer": "PLC-based controls manage resin flow rate, injection pressure, vacuum level and cure timing. Validation confirms fiber impregnation quality, void content and structural repeatability."
      },
      {
        "question": "Which industries use Kirkco RTM and infusion systems?",
        "answer": "Industrial, transportation and marine composite manufacturers."
      },
      {
        "question": "Can the system scale from prototype to production?",
        "answer": "Yes. The architecture scales from prototype and pilot production to full manufacturing and accommodates changes in resin chemistry, fiber architecture and automation level."
      },
      {
        "question": "What results can RTM process control deliver?",
        "answer": "Better laminate quality, less scrap and consistent production outcomes across different part sizes and resin systems."
      }
    ]
  },
  "/equipment-options/composites/applications/marine-fendering-mooring-monitoring-buoys": {
    "heading": "Marine Fendering, Mooring & Buoy FAQs",
    "items": [
      {
        "question": "Which composite processes are used to make marine fenders, mooring components and buoys?",
        "answer": "Marine fenders, mooring components, and buoys are built as composite or elastomeric structures. Kirkco architectures cover bonded structural interfaces, encapsulation of electronics and metallic parts, and structural foam or composite flotation bodies."
      },
      {
        "question": "What performance do marine composite structures need?",
        "answer": "Impact resistance, fatigue durability, corrosion resistance and long-term stability under cyclic loading, saltwater, UV exposure and mechanical impact."
      },
      {
        "question": "How do composite fenders absorb energy?",
        "answer": "Fendering systems are engineered for predictable energy absorption and load transfer, and can combine structural composites with elastomeric materials to dampen dynamic loads."
      },
      {
        "question": "How is resin supplied for large marine composite parts?",
        "answer": "Dispensing and bonding for these parts focus on repeatable material ratios, high-viscosity handling, air-free delivery, and controlled fill volumes for structural adhesives, sealants, and potting compounds."
      },
      {
        "question": "How are marine composite parts validated?",
        "answer": "Validation confirms structural integrity, seal performance, fill consistency, and repeatability against marine performance requirements."
      },
      {
        "question": "Are Kirkco marine systems tied to a specific manufacturer?",
        "answer": "No. Kirkco marine composite architectures are manufacturer-neutral and are engineered around the application rather than a proprietary product."
      },
      {
        "question": "Does Kirkco also seal and encapsulate marine composite assemblies?",
        "answer": "Yes. Kirkco engineers marine-grade sealing and encapsulation for composite assemblies exposed to continuous moisture, salt spray and cyclic loading."
      }
    ]
  },
  "/rebuild-repair": {
    "heading": "Equipment Rebuild & Repair FAQs",
    "items": [
      {
        "question": "What equipment does Kirkco rebuild and repair?",
        "answer": "Kirkco rebuilds and repairs metering and mixing equipment from most major brands, including meter-mix machines, mix heads and mix guns, pumps, adhesive tanks, hoppers and pressure vessels."
      },
      {
        "question": "How does the repair evaluation work?",
        "answer": "Standard components carry a one-hour evaluation fee and full systems a two-hour fee. If the item is repairable, the evaluation fee is credited toward the repair."
      },
      {
        "question": "Will I know the cost before work starts?",
        "answer": "Yes. Repairs are billed on time and materials against a written estimate, and no work begins until you authorize it. Rebuild time and price are quoted before work begins."
      },
      {
        "question": "What is included in a rebuild?",
        "answer": "A full technical inspection; disassembly, cleaning and inspection against specifications; complete flushing of tanks, hoppers, pumps and pressure vessels; replacement of worn or out-of-spec parts; and assembly and diagnostic testing by qualified technicians."
      },
      {
        "question": "Which parts are always replaced during a rebuild?",
        "answer": "Soft parts such as seals, gaskets, O-rings and V-packings are always replaced. Sensors, heaters and hoses are replaced as needed, and hard components outside current standards or tolerances are replaced."
      },
      {
        "question": "What is a Certified Rebuild to OEM standards?",
        "answer": "The machine is stripped to the frame and rebuilt with new parts, including all product updates, plus the latest control system and user interface. The result is a like-new machine with a like-new warranty and a new serial number."
      },
      {
        "question": "Do you use genuine parts?",
        "answer": "Yes. Kirkco rebuilds use genuine factory parts only."
      },
      {
        "question": "Can older equipment be upgraded during a rebuild?",
        "answer": "Yes. Optional factory upgrades to the latest designs are available, with pricing agreed before work begins."
      },
      {
        "question": "What documentation comes back with repaired equipment?",
        "answer": "A written service report is returned with the equipment and the invoice."
      },
      {
        "question": "Is repair a cost-effective alternative to buying new?",
        "answer": "Often, yes. Repaired or replacement components perform the same as new parts at a lower cost, and a rebuild returns equipment to service with less downtime than a new purchase."
      }
    ]
  }
};

export function faqsFor(href: string) {
  return pages[href];
}
