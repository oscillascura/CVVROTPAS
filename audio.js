/*
  CVVROTPAS // RESTRICTED AUDIO ARCHIVE
  --------------------------------------
  Put preview MP3s inside /audio using the filenames below.

  Unindexed rehearsal transmissions live inside /transmissions.

  This file is intentionally separate from script.js so your existing
  social URLs and other terminal customizations remain untouched.
*/


/* ==============================================================
   RESTRICTED ALBUM AUDIO ARCHIVE
============================================================== */

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


/* ==============================================================
   UNINDEXED REHEARSAL TRANSMISSIONS
============================================================== */

const rehearsalArchive = {
  "01": {
    title: "ENHANCED CAPABILITIES ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-01-enhanced-capabilities.mp3"
  },
  "02": {
    title: "IMMORTAL FRAME ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-02-immortal-frame.mp3"
  },
  "03": {
    title: "POST-HUMANIAN [SLUMBER] ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-03-post-humanian-slumber.mp3"
  },
  "04": {
    title: "DRIFT BEYOND [CALCULATION] ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-04-drift-beyond-calculation.mp3"
  },
  "05": {
    title: "OBSIDIAN THRONE [ARRIVAL] ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-05-obsidian-throne-arrival.mp3"
  },
  "06": {
    title: "COGNITIVE TRANSFERENCE ::{LIVE REHEARSAL}",
    file: "transmissions/rehearsal-06-cognitive-transference.mp3"
  }
};


/* ==============================================================
   REHEARSAL ARCHIVE FRAGMENTS
============================================================== */

const rehearsalPackages = {
  "a": {
    label: "A // TRANSMISSIONS 01–02",
    file: "transmissions/Oscillascura-Rehearsal-Archive-A.zip"
  },
  "b": {
    label: "B // TRANSMISSIONS 03–04",
    file: "transmissions/Oscillascura-Rehearsal-Archive-B.zip"
  },
  "c": {
    label: "C // TRANSMISSIONS 05–06",
    file: "transmissions/Oscillascura-Rehearsal-Archive-C.zip"
  }
};


const AUDIO_ACCESS_KEY = "cvvrotpas_audio_access_level_ii";

let activeAudio = null;
let activeTrackId = null;


/* ==============================================================
   ACCESS STATE
============================================================== */

function audioAccessUnlocked() {
  return localStorage.getItem(AUDIO_ACCESS_KEY) === "true";
}

function unlockAudioArchive() {
  localStorage.setItem(AUDIO_ACCESS_KEY, "true");
}


/* ==============================================================
   AUDIO CONTROLS
============================================================== */

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


/* ==============================================================
   ALBUM ARCHIVE LISTING
============================================================== */

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


/* ==============================================================
   REHEARSAL ARCHIVE LISTING
============================================================== */

function buildRehearsalArchiveListing() {
  return [
    "UNINDEXED REHEARSAL ARCHIVE DETECTED",
    "",
    "████████████████████████████████████████",
    "",
    "SOURCE.....................OSCILLASCURA",
    "CAPTURE TYPE................LIVE REHEARSAL",
    "ARCHIVE STATUS..............UNRELEASED",
    "PUBLIC INDEX................NULL",
    "SECURITY CLASS..............UNINDEXED",
    "",
    "01  ENHANCED CAPABILITIES ::{LIVE REHEARSAL}",
    "02  IMMORTAL FRAME ::{LIVE REHEARSAL}",
    "03  POST-HUMANIAN [SLUMBER] ::{LIVE REHEARSAL}",
    "04  DRIFT BEYOND [CALCULATION] ::{LIVE REHEARSAL}",
    "05  OBSIDIAN THRONE [ARRIVAL] ::{LIVE REHEARSAL}",
    "06  COGNITIVE TRANSFERENCE ::{LIVE REHEARSAL}",
    "",
    "EXECUTE:",
    "rehearsal play 01",
    "rehearsal download 01",
    "rehearsal download all",
    "",
    "WARNING:",
    "THESE TRANSMISSIONS EXIST OUTSIDE",
    "THE AUTHORIZED DISCOGRAPHIC SEQUENCE."
  ].join("\n");
}


/* ==============================================================
   PLAY ALBUM TRACK
============================================================== */

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


/* ==============================================================
   PLAY REHEARSAL TRANSMISSION
============================================================== */

function playRehearsalTrack(id) {
  const track = rehearsalArchive[id];

  if (!audioAccessUnlocked()) {
    appendOutput(
      [
        "ACCESS DENIED.",
        "",
        "UNINDEXED ARCHIVE REQUIRES ACCESS LEVEL II."
      ].join("\n"),
      "error-text"
    );

    return;
  }

  if (!track) {
    appendOutput(
      `REHEARSAL TRANSMISSION NOT FOUND: ${id}`,
      "error-text"
    );

    return;
  }

  stopArchiveAudio();

  appendOutput(
    [
      "ACCESSING UNINDEXED TRANSMISSION...",
      "",
      "▓░▓░▓▓▓░▓░▓▓░▓░▓░▓▓▓░▓",
      "",
      `TRANSMISSION ${id} // ${track.title}`
    ].join("\n")
  );

  window.setTimeout(() => {
    appendOutput(
      [
        "VERIFYING SIGNAL...",
        "",
        "████████████████████████████████████████ 100%"
      ].join("\n")
    );
  }, 650);

  window.setTimeout(() => {
    activeAudio = new Audio(track.file);
    activeTrackId = `REHEARSAL ${id}`;
    activeAudio.preload = "auto";

    activeAudio.addEventListener("ended", () => {
      appendOutput(
        [
          `REHEARSAL TRANSMISSION ${id} COMPLETE.`,
          track.title,
          "",
          "UNINDEXED AUDIO NODE CLOSED."
        ].join("\n")
      );

      activeAudio = null;
      activeTrackId = null;
    });

    activeAudio.addEventListener("error", () => {
      appendOutput(
        [
          "TRANSMISSION FILE NOT FOUND.",
          "",
          `EXPECTED FILE: ${track.file}`,
          "",
          "VERIFY THE MP3 EXISTS IN THE /transmissions FOLDER."
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
            "UNINDEXED TRANSMISSION RESTORED.",
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
            "CLICK INSIDE THE TERMINAL AND ENTER THE COMMAND AGAIN."
          ].join("\n"),
          "error-text"
        );

        activeAudio = null;
        activeTrackId = null;
      });
  }, 1300);
}


/* ==============================================================
   DOWNLOAD REHEARSAL TRANSMISSION
============================================================== */

function downloadRehearsalTrack(id) {
  const track = rehearsalArchive[id];

  if (!audioAccessUnlocked()) {
    appendOutput(
      [
        "ACCESS DENIED.",
        "",
        "UNINDEXED ARCHIVE REQUIRES ACCESS LEVEL II."
      ].join("\n"),
      "error-text"
    );

    return;
  }

  if (!track) {
    appendOutput(
      `REHEARSAL TRANSMISSION NOT FOUND: ${id}`,
      "error-text"
    );

    return;
  }

  appendOutput(
    [
      "DECRYPTING UNINDEXED FILE...",
      "",
      "▓░▓░▓▓▓░▓░▓▓░▓░▓░▓▓▓░▓",
      "",
      `TRANSMISSION ${id} // ${track.title}`
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
    appendOutput(
      [
        "FILE RECOVERED.",
        "",
        "INITIATING DOWNLOAD...",
        "",
        track.title
      ].join("\n")
    );

    const link = document.createElement("a");

    link.href = track.file;
    link.download = track.file.split("/").pop();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 1300);
}


/* ==============================================================
   REHEARSAL ARCHIVE FRAGMENT MENU
============================================================== */

function listRehearsalPackages() {
  if (!audioAccessUnlocked()) {
    appendOutput(
      [
        "ACCESS DENIED.",
        "",
        "UNINDEXED ARCHIVE REQUIRES ACCESS LEVEL II."
      ].join("\n"),
      "error-text"
    );

    return;
  }

  appendOutput(
    [
      "ARCHIVE SIZE EXCEEDS SINGLE-NODE CAPACITY.",
      "",
      "FRAGMENTING DATA...",
      "",
      "▓░▓░▓▓▓░▓░▓▓░▓░▓░▓▓▓░▓"
    ].join("\n")
  );

  window.setTimeout(() => {
    appendOutput(
      [
        "████████████████████████████████████████ 100%",
        "",
        "ARCHIVE FRAGMENTS DETECTED:",
        "",
        "A // TRANSMISSIONS 01–02",
        "B // TRANSMISSIONS 03–04",
        "C // TRANSMISSIONS 05–06",
        "",
        "AUTOMATED RECOVERY SEQUENCE INITIATED..."
      ].join("\n")
    );
  }, 800);


  /* DOWNLOAD ARCHIVE A */

  window.setTimeout(() => {
    appendOutput(
      [
        "RECOVERING ARCHIVE FRAGMENT A...",
        "",
        "A // TRANSMISSIONS 01–02"
      ].join("\n")
    );

    triggerRehearsalPackageDownload("a");
  }, 1600);


  /* DOWNLOAD ARCHIVE B */

  window.setTimeout(() => {
    appendOutput(
      [
        "RECOVERING ARCHIVE FRAGMENT B...",
        "",
        "B // TRANSMISSIONS 03–04"
      ].join("\n")
    );

    triggerRehearsalPackageDownload("b");
  }, 3000);


  /* DOWNLOAD ARCHIVE C */

  window.setTimeout(() => {
    appendOutput(
      [
        "RECOVERING ARCHIVE FRAGMENT C...",
        "",
        "C // TRANSMISSIONS 05–06"
      ].join("\n")
    );

    triggerRehearsalPackageDownload("c");
  }, 4400);


  /* COMPLETE */

  window.setTimeout(() => {
    appendOutput(
      [
        "████████████████████████████████████████ 100%",
        "",
        "ARCHIVE RECOVERY COMPLETE.",
        "",
        "03 DATA FRAGMENTS TRANSMITTED.",
        "06 REHEARSAL RECORDS RECOVERED."
      ].join("\n")
    );
  }, 5200);
}

function triggerRehearsalPackageDownload(fragmentId) {
  const fragment = rehearsalPackages[fragmentId];

  if (!fragment) return;

  const link = document.createElement("a");

  link.href = fragment.file;
  link.download = fragment.file.split("/").pop();

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==============================================================
   DOWNLOAD REHEARSAL ARCHIVE FRAGMENT
============================================================== */

function downloadRehearsalPackage(fragmentId) {
  const fragment = rehearsalPackages[fragmentId];

  if (!audioAccessUnlocked()) {
    appendOutput(
      [
        "ACCESS DENIED.",
        "",
        "UNINDEXED ARCHIVE REQUIRES ACCESS LEVEL II."
      ].join("\n"),
      "error-text"
    );

    return;
  }

  if (!fragment) {
    appendOutput(
      `ARCHIVE FRAGMENT NOT FOUND: ${fragmentId.toUpperCase()}`,
      "error-text"
    );

    return;
  }

  appendOutput(
    [
      `ACCESSING ARCHIVE FRAGMENT ${fragmentId.toUpperCase()}...`,
      "",
      fragment.label,
      "",
      "▓░▓░▓▓▓░▓░▓▓░▓░▓░▓▓▓░▓"
    ].join("\n")
  );

  window.setTimeout(() => {
    appendOutput(
      [
        "VERIFYING ARCHIVE...",
        "",
        "████████████████████████████████████████ 100%"
      ].join("\n")
    );
  }, 650);

  window.setTimeout(() => {
    appendOutput(
      [
        "ARCHIVE FRAGMENT RECOVERED.",
        "",
        "INITIATING DOWNLOAD...",
        "",
        fragment.label
      ].join("\n")
    );

    const link = document.createElement("a");

    link.href = fragment.file;
    link.download = fragment.file.split("/").pop();

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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


/* ==============================================================
   VISIBLE ACCESS LEVEL II COMMANDS
============================================================== */

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


/* ==============================================================
   HIDDEN COMMAND

   Intentionally NOT included in help.
============================================================== */

commands.rehearsal = () => {
  if (!audioAccessUnlocked()) {
    return [
      "ACCESS DENIED.",
      "",
      "UNINDEXED ARCHIVE REQUIRES ACCESS LEVEL II."
    ].join("\n");
  }

  return buildRehearsalArchiveListing();
};


/* --------------------------------------------------------------
   ARGUMENT COMMAND INTERCEPTOR

   Supports:

   play 01
   rehearsal play 01
   rehearsal download 01
   rehearsal download all
   rehearsal download a
   rehearsal download b
   rehearsal download c
-------------------------------------------------------------- */

form.addEventListener(
  "submit",
  (event) => {
    const rawCommand = input.value.trim();
    const normalizedCommand = rawCommand.toLowerCase();


    /* ----------------------------------------------------------
       REHEARSAL DOWNLOAD ALL
    ---------------------------------------------------------- */

    if (normalizedCommand === "rehearsal download all") {
      event.preventDefault();
      event.stopImmediatePropagation();

      input.value = "";
      appendOutput(`> ${rawCommand}`, "command-echo");

      listRehearsalPackages();

      return;
    }


    /* ----------------------------------------------------------
       REHEARSAL ARCHIVE FRAGMENT DOWNLOAD
    ---------------------------------------------------------- */

    const rehearsalPackageMatch =
      normalizedCommand.match(/^rehearsal\s+download\s+([abc])$/);

    if (rehearsalPackageMatch) {
      event.preventDefault();
      event.stopImmediatePropagation();

      input.value = "";
      appendOutput(`> ${rawCommand}`, "command-echo");

      const fragmentId = rehearsalPackageMatch[1];

      downloadRehearsalPackage(fragmentId);

      return;
    }


    /* ----------------------------------------------------------
       REHEARSAL PLAY
    ---------------------------------------------------------- */

    const rehearsalPlayMatch =
      normalizedCommand.match(/^rehearsal\s+play\s+(\d{1,2})$/);

    if (rehearsalPlayMatch) {
      event.preventDefault();
      event.stopImmediatePropagation();

      input.value = "";
      appendOutput(`> ${rawCommand}`, "command-echo");

      const id = rehearsalPlayMatch[1].padStart(2, "0");

      playRehearsalTrack(id);

      return;
    }


    /* ----------------------------------------------------------
       REHEARSAL DOWNLOAD
    ---------------------------------------------------------- */

    const rehearsalDownloadMatch =
      normalizedCommand.match(/^rehearsal\s+download\s+(\d{1,2})$/);

    if (rehearsalDownloadMatch) {
      event.preventDefault();
      event.stopImmediatePropagation();

      input.value = "";
      appendOutput(`> ${rawCommand}`, "command-echo");

      const id = rehearsalDownloadMatch[1].padStart(2, "0");

      downloadRehearsalTrack(id);

      return;
    }


    /* ----------------------------------------------------------
       REGULAR ALBUM PLAY
    ---------------------------------------------------------- */

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
