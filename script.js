const externalLinks = {
  bandcamp: "https://YOUR-BANDCAMP-URL-HERE",
  spotify: "https://YOUR-SPOTIFY-URL-HERE",
  instagram: "https://YOUR-INSTAGRAM-URL-HERE",
  vinylhex: "https://vinylhexrecords.bigcartel.com/"
};

const bootText = document.querySelector("#bootText");
const output = document.querySelector("#output");
const form = document.querySelector("#commandForm");
const input = document.querySelector("#commandInput");
const dialog = document.querySelector("#archiveDialog");
const archiveContent = document.querySelector("#archiveContent");
const closeDialog = document.querySelector("#closeDialog");

const chapters = [
  {
    title: "I. Kill Code [Initiation]",
    state: "INITIATION",
    record: "EXECUTION RECORD 01",
    status: "HUMANITY.................TERMINATED\nMORTALITY................DISABLED\nASCENSION................INITIATED",
    meter: "████████████████████████████████████████ 100%",
    text: "The Ascension Sequence begins with the execution of the Kill Code, a forbidden algorithm that severs humanity from its biological inheritance. Death becomes obsolete as the code rewrites flesh into an instrument of perpetual consumption. Compassion, mortality, and identity are recursively deleted, leaving behind only the first Energy Vampire. Humanity unknowingly authors its own replacement."
  },
  {
    title: "II. Post-Humanian [Slumber]",
    state: "SLUMBER",
    record: "CRYOGENIC RECORD 02",
    status: "BIOLOGICAL TIME...........SUSPENDED\nCASTLE VESSEL.............IN TRANSIT\nDREAM STATE...............ENCRYPTED",
    meter: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░",
    text: "The newly ascended abandon their dying world and entomb themselves within a colossal fortress drifting through interstellar darkness. Beneath vaulted halls of black architecture, countless cryogenic chambers preserve their immortal forms while centuries dissolve into silence. Sleep is no longer rest. It is optimization. Time itself becomes another expendable resource."
  },
  {
    title: "III. Endless Thirst [Existence]",
    state: "EXISTENCE",
    record: "SUSTENANCE RECORD 03",
    status: "PURPOSE...................NULL\nREDEMPTION................NULL\nCONSUMPTION...............ABSOLUTE",
    meter: "████████████████████████████████████████ ∞",
    text: "Immortality reveals its hidden cost. The hunger cannot be satisfied, only postponed. Every cycle of awakening demands greater reservoirs of stolen life until existence itself becomes synonymous with consumption. The vampires no longer seek purpose, redemption, or conquest. Their civilization survives only to feed."
  },
  {
    title: "IV. Core Sanctuary [Error]",
    state: "ERROR",
    record: "SANCTUARY RECORD 04",
    status: "CORE SANCTUARY............UNSTABLE\nENERGY RESERVES...........CRITICAL\nIMMORTAL CHAMBERS.........AWAKENING",
    meter: "▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░",
    text: "Deep within the fortress lies the Core Sanctuary, the living heart that sustains every chamber, reactor, and immortal consciousness aboard the castle. For millennia it functions without deviation until an impossible fault propagates through the system. Energy reserves collapse beyond recovery. Ancient warning protocols awaken the sleepers. For the first time since Ascension, the sanctuary reports an error."
  },
  {
    title: "V. Solar Extraction [Redirect]",
    state: "REDIRECT",
    record: "EXTRACTION RECORD 05",
    status: "NAVIGATION................REDIRECTED\nSTELLAR TARGET............LOCKED\nEXTRACTION TOWERS.........DEPLOYED",
    meter: "██████████████████████████████░░░░░░░░ 76%",
    text: "Emergency protocols seize control of the vessel. Navigation is redirected toward the nearest viable star. Planetary-scale harvesting engines descend into the stellar atmosphere while immense conduits siphon rivers of plasma into impossible reservoirs beneath the fortress. Entire suns are reduced to fuel, buying the vampires another age of existence before the hunger inevitably returns."
  },
  {
    title: "VI. Belief Command [Override]",
    state: "OVERRIDE",
    record: "DOCTRINE RECORD 06",
    status: "FAITH.....................ERASED\nMORALITY..................ERASED\nGUILT.....................ERASED\nHOPE......................ERASED",
    meter: "SURVIVE // CONSUME // ASCEND",
    text: "The restoration of power is accompanied by revelation. The final remnants of human memory are identified as corrupted processes and permanently erased. Faith, morality, guilt, and hope are overwritten by a single governing command. Survival becomes doctrine. Consumption becomes ritual. Individual will becomes absolute law. The last belief humanity ever possessed is overridden."
  },
  {
    title: "VII. Drift Beyond [Calculation]",
    state: "CALCULATION",
    record: "NAVIGATION RECORD 07",
    status: "GALACTIC MAP..............INCOMPLETE\nELAPSED TIME..............INCALCULABLE\nBIOLOGICAL SIGNAL.........UNCONFIRMED",
    meter: "00000001 00000010 00000100 00001000",
    text: "With systems restored, the castle resumes its endless voyage beyond the mapped universe. Ancient processors calculate impossible trajectories through dead galaxies and forgotten clusters, searching for concentrations of biological energy. Millions of years pass as mere variables inside an endless equation. Probability narrows toward inevitability. Somewhere beyond calculation, life still exists."
  },
  {
    title: "VIII. Obsidian Throne [Arrival]",
    state: "ARRIVAL",
    record: "ARRIVAL RECORD 08",
    status: "WORLD STATUS..............INHABITED\nHARVEST STATUS............AUTHORIZED\nASCENSION SEQUENCE........COMPLETE",
    meter: "FEED // SLEEP // CONSUME // ASCEND",
    text: "The calculations resolve. A living world is found. The fortress descends in silence, eclipsing its sun like a cathedral carved from night. From the highest chamber, the Eternal Sovereign ascends the Obsidian Throne to witness the beginning of another harvest. Entire civilizations are reduced to fuel while the castle's chambers fill once again with stolen life. The Ascension Sequence is complete. The throne does not rule an empire. It rules eternity."
  }
];

const commands = {
  help: () => [
    "AVAILABLE COMMANDS",
    "",
    "help           display command list",
    "archive        open the eight-part ascent sequence",
    "rituals        display album sequence",
    "vinylhex       access physical distribution node",
    "bandcamp       open Oscillascura on Bandcamp",
    "spotify        open Oscillascura on Spotify",
    "instagram      open Oscillascura on Instagram",
    "music          display external music commands",
    "transmissions  display recovered transmissions",
    "manuscript     open the illuminated archive",
    "clear          purge terminal output",
    "",
    "UNLISTED COMMANDS MAY EXIST."
  ].join("\n"),

  rituals: () => chapters
    .map((chapter) => chapter.title.toUpperCase())
    .join("\n"),

  transmissions: () => [
    "TRANSMISSION 01 // HUMANITY AUTHORS ITS OWN REPLACEMENT.",
    "TRANSMISSION 02 // SLEEP IS OPTIMIZATION.",
    "TRANSMISSION 03 // THEIR CIVILIZATION SURVIVES ONLY TO FEED.",
    "TRANSMISSION 04 // THE SANCTUARY REPORTS AN ERROR.",
    "TRANSMISSION 05 // ENTIRE SUNS ARE REDUCED TO FUEL.",
    "TRANSMISSION 06 // SURVIVE // CONSUME // ASCEND.",
    "TRANSMISSION 07 // SOMEWHERE BEYOND CALCULATION, LIFE EXISTS.",
    "TRANSMISSION 08 // THE THRONE RULES ETERNITY."
  ].join("\n"),

  archive: () => {
    openArchive();
    return "ASCENT ARCHIVE OPENED.";
  },

  manuscript: () => {
    openArchive();
    return "ILLUMINATED MANUSCRIPT RESTORED.";
  },

  music: () => [
    "EXTERNAL AUDIO / SOCIAL NODES",
    "",
    "bandcamp",
    "spotify",
    "instagram"
  ].join("\n"),

  bandcamp: () => {
    openExternalNode("bandcamp");
    return "OPENING BANDCAMP NODE...";
  },

vinylhex: () => {
  openExternalNode("vinylhex");

  return [
    "EXTERNAL DISTRIBUTION NODE DETECTED",
    "",
    "VINYL HEX RECORDS",
    "NODE LOCATION.............BUDAPEST // HUNGARY",
    "CONNECTION STATUS.........AUTHORIZED",
    "ARCHIVE RELATION..........PHYSICAL MEDIA DISTRIBUTION",
    "",
    "HEX 003 // OSCILLASCURA",
    "COSMIC VVAMPIRIC RITES OF THE",
    "POST-HUMANIAN ASCENT SEQUENCE",
    "",
    "PHYSICAL TRANSMISSIONS:",
    "CASSETTE // ENERGY VAMPIRE",
    "CASSETTE // PLASMA RIVER",
    "",
    "OPENING VINYL HEX RECORDS NODE..."
  ].join("\n");
},
  
  spotify: () => {
    openExternalNode("spotify");
    return "OPENING SPOTIFY NODE...";
  },

  instagram: () => {
    openExternalNode("instagram");
    return "OPENING INSTAGRAM NODE...";
  },

  clear: () => {
    output.innerHTML = "";
    return "";
  },

  override: () => {
    document.body.classList.toggle("override-mode");
    return [
      "BELIEF COMMAND ACCEPTED.",
      "HUMAN MEMORY IDENTIFIED AS CORRUPTED PROCESS.",
      "OVERRIDE ACTIVE.",
      "",
      "SURVIVE // CONSUME // ASCEND"
    ].join("\n");
  },

  killcode: () => [
    "RESTRICTED SEQUENCE DETECTED.",
    "MORTALITY................DISABLED",
    "COMPASSION................DELETED",
    "ASCENSION.................INITIATED"
  ].join("\n"),

  vvampire: () => [
    "ACCESS LEVEL INCREASED.",
    "OBSIDIAN THRONE AUTHORIZATION: PENDING",
    "THE CASTLE IS LISTENING."
  ].join("\n")
};


function openExternalNode(name) {
  const url = externalLinks[name];

  if (!url || url.includes("YOUR-")) {
    appendOutput(
      `LINK NOT CONFIGURED: ${name.toUpperCase()}\nEDIT externalLinks IN script.js.`,
      "error-text"
    );
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

function typeBootSequence() {
  const lines = [
    "CONNECTING TO CASTLE VESSEL...",
    "████████████████████████████████████████ 100%",
    "POST-HUMANIAN ASCENT ARCHIVE RESTORED",
    "LAST HUMAN SIGNAL: 2,483,114 YEARS AGO",
    "STATUS: LISTENING..."
  ];

  const fullText = lines.join("\n");
  let index = 0;

  const timer = window.setInterval(() => {
    bootText.textContent = fullText.slice(0, index);
    index += 1;

    if (index > fullText.length) {
      window.clearInterval(timer);
      appendOutput("TYPE \"help\" TO ACCESS THE ARCHIVE.");
    }
  }, 18);
}

function appendOutput(text, className = "") {
  if (!text) return;

  const block = document.createElement("div");
  block.className = `output-block ${className}`.trim();
  block.textContent = text;
  output.appendChild(block);
  block.scrollIntoView({ behavior: "smooth", block: "end" });
}

function openArchive() {
  archiveContent.innerHTML = `
    <section class="archive-terminal">
      <div class="archive-terminal__header">
        <strong>ARCHIVE NODE:</strong> CVVROTPAS<br>
        <strong>RENDER MODE:</strong> RAW TERMINAL TEXT<br>
        <strong>STATUS:</strong> SEQUENCE ACTIVE
      </div>
      <pre class="archive-ascii">▓████████████████████████████████████████████████████████████████▓
█                                                                █
█       COSMIC VVAMPIRIC RITES OF THE POST-HUMANIAN              █
█                    ASCENT SEQUENCE                             █
█                                                                █
▓████████████████████████████████████████████████████████████████▓

          ╔══════════════════════════════════════════╗
          ║  POST-HUMANIAN ASCENT ARCHIVE           ║
          ║  RITUAL ENGINE // SYSTEM LOG             ║
          ║  ORIGIN: [REDACTED]                      ║
          ║  STATUS: SEQUENCE ACTIVE                 ║
          ╚══════════════════════════════════════════╝

                    ░▒▓ INITIATION ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ I. KILL CODE [INITIATION]                                      ║
╚════════════════════════════════════════════════════════════════╝

┌─[ EXECUTION RECORD 01 ]
│
│  The Ascension Sequence begins with the execution of the
│  Kill Code, a forbidden algorithm that severs humanity from
│  its biological inheritance.
│
│  Death becomes obsolete as the code rewrites flesh into an
│  instrument of perpetual consumption.
│
│  Compassion, mortality, and identity are recursively deleted,
│  leaving behind only the first Energy Vampire.
│
│  Humanity unknowingly authors its own replacement.
│
└─[ PROCESS COMPLETE ]

    HUMANITY.................TERMINATED
    MORTALITY................DISABLED
    ASCENSION................INITIATED

    ████████████████████████████████████████████ 100%


                    ░▒▓ SLUMBER ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ II. POST-HUMANIAN [SLUMBER]                                   ║
╚════════════════════════════════════════════════════════════════╝

┌─[ CRYOGENIC RECORD 02 ]
│
│  The newly ascended abandon their dying world and entomb
│  themselves within a colossal fortress drifting through
│  interstellar darkness.
│
│  Beneath vaulted halls of black architecture, countless
│  cryogenic chambers preserve their immortal forms while
│  centuries dissolve into silence.
│
│  Sleep is no longer rest.
│
│  It is optimization.
│
│  Time itself becomes another expendable resource.
│
└─[ SUSPENSION CONFIRMED ]

    BIOLOGICAL TIME...........SUSPENDED
    CASTLE VESSEL.............IN TRANSIT
    DREAM STATE...............ENCRYPTED

    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░


                    ░▒▓ EXISTENCE ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ III. ENDLESS THIRST [EXISTENCE]                                ║
╚════════════════════════════════════════════════════════════════╝

┌─[ SUSTENANCE RECORD 03 ]
│
│  Immortality reveals its hidden cost.
│
│  The hunger cannot be satisfied, only postponed.
│
│  Every cycle of awakening demands greater reservoirs of
│  stolen life until existence itself becomes synonymous
│  with consumption.
│
│  The vampires no longer seek purpose, redemption, or conquest.
│
│  Their civilization survives only to feed.
│
└─[ HUNGER CONDITION PERMANENT ]

    PURPOSE...................NULL
    REDEMPTION................NULL
    CONSUMPTION...............ABSOLUTE

    THIRST LEVEL:
    ████████████████████████████████████████ ∞


                      ░▒▓ ERROR ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ IV. CORE SANCTUARY [ERROR]                                     ║
╚════════════════════════════════════════════════════════════════╝

┌─[ SANCTUARY RECORD 04 ]
│
│  Deep within the fortress lies the Core Sanctuary, the living
│  heart that sustains every chamber, reactor, and immortal
│  consciousness aboard the castle.
│
│  For millennia it functions without deviation until an
│  impossible fault propagates through the system.
│
│  Energy reserves collapse beyond recovery.
│
│  Ancient warning protocols awaken the sleepers.
│
│  For the first time since Ascension, the sanctuary reports
│  an error.
│
└─[ CRITICAL FAILURE DETECTED ]

    CORE SANCTUARY............UNSTABLE
    ENERGY RESERVES...........CRITICAL
    IMMORTAL CHAMBERS.........AWAKENING

    ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░

    ! ERROR
    ! ERROR
    ! ERROR


                    ░▒▓ REDIRECT ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ V. SOLAR EXTRACTION [REDIRECT]                                 ║
╚════════════════════════════════════════════════════════════════╝

┌─[ EXTRACTION RECORD 05 ]
│
│  Emergency protocols seize control of the vessel.
│
│  Navigation is redirected toward the nearest viable star.
│
│  Planetary-scale harvesting engines descend into the stellar
│  atmosphere while immense conduits siphon rivers of plasma
│  into impossible reservoirs beneath the fortress.
│
│  Entire suns are reduced to fuel, buying the vampires another
│  age of existence before the hunger inevitably returns.
│
└─[ STELLAR CONSUMPTION ACTIVE ]

    NAVIGATION................REDIRECTED
    STELLAR TARGET............LOCKED
    EXTRACTION TOWERS.........DEPLOYED
    SOLAR MASS................CONSUMING

              \        |        /
               \       |       /
            ----\---[ ☼ ]---/----
                 \     |     /
                  \    |    /

    RESERVOIR CAPACITY:
    ███████████████████████████████░░░░░░░░░ 76%


                    ░▒▓ OVERRIDE ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ VI. BELIEF COMMAND [OVERRIDE]                                  ║
╚════════════════════════════════════════════════════════════════╝

┌─[ DOCTRINE RECORD 06 ]
│
│  The restoration of power is accompanied by revelation.
│
│  The final remnants of human memory are identified as
│  corrupted processes and permanently erased.
│
│  Faith, morality, guilt, and hope are overwritten by a single
│  governing command.
│
│  Survival becomes doctrine.
│
│  Consumption becomes ritual.
│
│  Individual will becomes absolute law.
│
│  The last belief humanity ever possessed is overridden.
│
└─[ BELIEF ARCHITECTURE REPLACED ]

    FAITH.....................ERASED
    MORALITY..................ERASED
    GUILT.....................ERASED
    HOPE......................ERASED

    NEW GOVERNING COMMAND:

    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║     SURVIVE // CONSUME // ASCEND         ║
    ║                                          ║
    ╚══════════════════════════════════════════╝


                  ░▒▓ CALCULATION ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ VII. DRIFT BEYOND [CALCULATION]                                ║
╚════════════════════════════════════════════════════════════════╝

┌─[ NAVIGATION RECORD 07 ]
│
│  With systems restored, the castle resumes its endless voyage
│  beyond the mapped universe.
│
│  Ancient processors calculate impossible trajectories through
│  dead galaxies and forgotten clusters, searching for
│  concentrations of biological energy.
│
│  Millions of years pass as mere variables inside an endless
│  equation.
│
│  Probability narrows toward inevitability.
│
│  Somewhere beyond calculation, life still exists.
│
└─[ SEARCH CONTINUES ]

    GALACTIC MAP..............INCOMPLETE
    ELAPSED TIME..............INCALCULABLE
    BIOLOGICAL SIGNAL.........UNCONFIRMED
    PROBABILITY...............INCREASING

    00000001 00000010 00000100 00001000
    00010000 00100000 01000000 10000000

                .        *             .
          *          .          .             *
                   [ CASTLE VESSEL ]
         .               ▲               .
                         │
                         │
                  BEYOND CALCULATION


                     ░▒▓ ARRIVAL ▓▒░


╔════════════════════════════════════════════════════════════════╗
║ VIII. OBSIDIAN THRONE [ARRIVAL]                                ║
╚════════════════════════════════════════════════════════════════╝

┌─[ ARRIVAL RECORD 08 ]
│
│  The calculations resolve.
│
│  A living world is found.
│
│  The fortress descends in silence, eclipsing its sun like a
│  cathedral carved from night.
│
│  From the highest chamber, the Eternal Sovereign ascends the
│  Obsidian Throne to witness the beginning of another harvest.
│
│  Entire civilizations are reduced to fuel while the castle&#x27;s
│  chambers fill once again with stolen life.
│
│  The Ascension Sequence is complete.
│
│  The throne does not rule an empire.
│
│  It rules eternity.
│
└─[ ARRIVAL CONFIRMED ]

                         ╱╲
                        ╱  ╲
                       ╱▓▓▓▓╲
                      ╱▓▓▓▓▓▓╲
                     ╱▓▓▓▓▓▓▓▓╲
                    ╱▓▓▓▓▓▓▓▓▓▓╲
                   ╱______†_______╲
                         ║
                    [ OBSIDIAN ]
                      [ THRONE ]

    WORLD STATUS..............INHABITED
    HARVEST STATUS............AUTHORIZED
    ASCENSION SEQUENCE........COMPLETE


▓████████████████████████████████████████████████████████████████▓
█                                                                █
█          POST-HUMANIAN ASCENT SEQUENCE // SYSTEM LOG           █
█                                                                █
█   &gt; INITIATION.................................COMPLETE        █
█   &gt; SLUMBER....................................COMPLETE        █
█   &gt; EXISTENCE..................................COMPLETE        █
█   &gt; ERROR......................................DETECTED        █
█   &gt; REDIRECT...................................COMPLETE        █
█   &gt; OVERRIDE...................................COMPLETE        █
█   &gt; CALCULATION................................COMPLETE        █
█   &gt; ARRIVAL....................................CONFIRMED       █
█                                                                █
█   FINAL COMMAND:                                               █
█                                                                █
█              FEED // SLEEP // CONSUME // ASCEND                █
█                                                                █
▓████████████████████████████████████████████████████████████████▓</pre>
    </section>
  `;

  dialog.showModal();
}


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = input.value.trim().toLowerCase();
  input.value = "";

  if (!command) return;

  appendOutput(`> ${command}`, "command-echo");

  if (commands[command]) {
    appendOutput(commands[command]());
  } else {
    appendOutput(
      `COMMAND NOT RECOGNIZED: ${command}\nTYPE "help" FOR AVAILABLE COMMANDS.`,
      "error-text"
    );
  }
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("click", () => input.focus());

typeBootSequence();
