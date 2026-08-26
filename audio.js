/*
  CVVROTPAS // RESTRICTED AUDIO ARCHIVE
  --------------------------------------
  Put preview MP3s inside /audio using the filenames below.

  This file is intentionally separate from script.js so your existing
  social URLs and other terminal customizations remain untouched.
*/

const audioArchive = {
  "01": {
    title: "KILL CODE [INITIATION]",
    file: "audio/01-kill-code-preview.mp3"
  },
  "02": {
    title: "POST-HUMANIAN [SLUMBER]",
    file: "audio/02-post-humanian-preview.mp3"
  },
  "03": {
    title: "ENDLESS THIRST [EXISTENCE]",
    file: "audio/03-endless-thirst-preview.mp3"
  },
  "04": {
    title: "CORE SANCTUARY [ERROR]",
    file: "audio/04-core-sanctuary-preview.mp3"
  },
  "05": {
    title: "SOLAR EXTRACTION [REDIRECT]",
    file: "audio/05-solar-extraction-preview.mp3"
  },
  "06": {
    title: "BELIEF COMMAND [OVERRIDE]",
    file: "audio/06-belief-command-preview.mp3"
  },
  "07": {
    title: "DRIFT BEYOND [CALCULATION]",
    file: "audio/07-drift-beyond-preview.mp3"
  },
  "08": {
    title: "OBSIDIAN THRONE [ARRIVAL]",
    file: "audio/08-obsidian-throne-preview.mp3"
  }
};

const AUDIO_ACCESS_KEY = "cvvrotpas_audio_access_level_ii";

let activeAudio = null;
let activeTrackId = null;

function audioAccessUnlocked() {
  return localStorage.getItem(AUDIO_ACCESS_KEY) === "true";
}

function unlockAudioArchive() {
  localStorage.setItem(AUDIO_ACCESS_KEY, "true");
}

function stopArchiveAudio() {
  if (!activeAudio) return false;

  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
  activeTrackId = null;
  return true;
}

function pauseArchiveAudio() {
  if (!activeAudio || activeAudio.paused) return false;
  activeAudio.pause();
  return true;
}

function resumeArchiveAudio() {
  if (!activeAudio || !activeAudio.paused) return false;

  activeAudio.play().catch(() => {
    appendOutput(
      "AUDIO EXECUTION BLOCKED.\nCLICK INSIDE THE TERMINAL AND TRY AGAIN.",
      "error-text"
    );
  });

  return true;
}

function buildAudioArchiveListing() {
  return [
    "RESTRICTED AUDIO ARCHIVE",
    "",
    "████████████████████████████████████████",
    "",
    "01  KILL CODE [INITIATION]",
    "02  POST-HUMANIAN [SLUMBER]",
    "03  ENDLESS THIRST [EXISTENCE]",
    "04  CORE SANCTUARY [ERROR]",
    "05  SOLAR EXTRACTION [REDIRECT]",
    "06  BELIEF COMMAND [OVERRIDE]",
    "07  DRIFT BEYOND [CALCULATION]",
    "08  OBSIDIAN THRONE [ARRIVAL]",
    "",
    "EXECUTE:",
    "play 01",
    "",
    "AUDIO CONTROL:",
    "pause",
    "resume",
    "stop"
  ].join("\n");
}

function playArchiveTrack(id) {
  const track = audioArchive[id];

  if (!audioAccessUnlocked()) {
    appendOutput(
      [
        "ACCESS DENIED.",
        "",
        "AUDIO ARCHIVE REQUIRES ACCESS LEVEL II."
      ].join("\n"),
      "error-text"
    );
    return;
  }

  if (!track) {
    appendOutput(
      `AUDIO RECORD NOT FOUND: ${id}`,
      "error-text"
    );
    return;
  }

  stopArchiveAudio();

  appendOutput(
    [
      "DECRYPTING AUDIO...",
      "",
      "▓░▓░▓▓▓░▓░▓▓░▓░▓░▓▓▓░▓",
      "",
      `RECORD ${id} // ${track.title}`
    ].join("\n")
  );

  window.setTimeout(() => {
    appendOutput(
      [
        "VERIFYING CHECKSUM...",
        "",
        "████████████████████████████████████████ 100%"
      ].join("\n")
    );
  }, 650);

  window.setTimeout(() => {
    activeAudio = new Audio(track.file);
    activeTrackId = id;
    activeAudio.preload = "auto";

    activeAudio.addEventListener("ended", () => {
      appendOutput(
        [
          `TRANSMISSION ${id} COMPLETE.`,
          track.title,
          "",
          "AUDIO NODE CLOSED."
        ].join("\n")
      );

      activeAudio = null;
      activeTrackId = null;
    });

    activeAudio.addEventListener("error", () => {
      appendOutput(
        [
          "AUDIO FILE NOT FOUND.",
          "",
          `EXPECTED FILE: ${track.file}`,
          "",
          "VERIFY THE MP3 EXISTS IN THE /audio FOLDER."
        ].join("\n"),
        "error-text"
      );

      activeAudio = null;
      activeTrackId = null;
    });

    activeAudio.play()
      .then(() => {
        appendOutput(
          [
            "TRANSMISSION RESTORED.",
            "",
            "████████████████████████████████████████",
            "",
            "TRANSMISSION ACTIVE",
            "",
            `${id} // ${track.title}`
          ].join("\n")
        );
      })
      .catch(() => {
        appendOutput(
          [
            "AUDIO EXECUTION BLOCKED.",
            "",
            "CLICK INSIDE THE TERMINAL AND ENTER THE PLAY COMMAND AGAIN."
          ].join("\n"),
          "error-text"
        );

        activeAudio = null;
        activeTrackId = null;
      });
  }, 1300);
}


/* --------------------------------------------------------------
   ACCESS LEVEL II
   Typing "override" unlocks the audio archive and changes help.
-------------------------------------------------------------- */

const originalOverrideCommand = commands.override;

commands.override = () => {
  const originalResponse = originalOverrideCommand();
  const wasUnlocked = audioAccessUnlocked();

  unlockAudioArchive();

  return [
    originalResponse,
    "",
    wasUnlocked
      ? "ACCESS LEVEL II.............ACTIVE"
      : "ACCESS LEVEL II.............UNLOCKED",
    "RESTRICTED AUDIO NODE.........AVAILABLE",
    "",
    'TYPE "help" FOR UPDATED COMMANDS.'
  ].join("\n");
};


const originalHelpCommand = commands.help;

commands.help = () => {
  const originalHelp = originalHelpCommand();

  if (!audioAccessUnlocked()) {
    return originalHelp;
  }

  return [
    originalHelp,
    "",
    "ACCESS LEVEL II",
    "",
    "audio          access restricted audio archive",
    "pause          suspend active transmission",
    "resume         resume suspended transmission",
    "stop           terminate active transmission"
  ].join("\n");
};


commands.audio = () => {
  if (!audioAccessUnlocked()) {
    return [
      "ACCESS DENIED.",
      "",
      "AUDIO ARCHIVE REQUIRES ACCESS LEVEL II."
    ].join("\n");
  }

  return buildAudioArchiveListing();
};


commands.pause = () => {
  if (pauseArchiveAudio()) {
    return [
      "TRANSMISSION SUSPENDED.",
      activeTrackId ? `RECORD ${activeTrackId}` : ""
    ].filter(Boolean).join("\n");
  }

  return "NO ACTIVE TRANSMISSION TO SUSPEND.";
};


commands.resume = () => {
  if (resumeArchiveAudio()) {
    return [
      "TRANSMISSION RESUMED.",
      activeTrackId ? `RECORD ${activeTrackId}` : ""
    ].filter(Boolean).join("\n");
  }

  return "NO SUSPENDED TRANSMISSION DETECTED.";
};


commands.stop = () => {
  if (stopArchiveAudio()) {
    return "AUDIO TRANSMISSION TERMINATED.";
  }

  return "NO ACTIVE TRANSMISSION DETECTED.";
};


/* --------------------------------------------------------------
   "play 01" uses an argument, so intercept it before the original
   command handler treats it as an unknown exact command.
-------------------------------------------------------------- */

form.addEventListener(
  "submit",
  (event) => {
    const rawCommand = input.value.trim();
    const normalizedCommand = rawCommand.toLowerCase();
    const match = normalizedCommand.match(/^play\s+(\d{1,2})$/);

    if (!match) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    input.value = "";
    appendOutput(`> ${rawCommand}`, "command-echo");

    const id = match[1].padStart(2, "0");
    playArchiveTrack(id);
  },
  true
);
