# S-1 `.PRM` format — field reference

Compiled 2026-10-25 from three independent analyses of the factory backup files, then
checked on the hardware. Labels: AGREE = all three analyses reach the same conclusion
from independent evidence; SPLIT = at least one differs; UNCALIBRATED = no source
establishes it, needs the hardware (section 8 resolves these). The round-trip harness
`tools/s1_prm.py` independently confirmed byte-identical parse→serialise on all 64
factory files.

## 1. File format — AGREE (all three, each by script)

| Fact | Status |
|---|---|
| 7-bit ASCII, no BOM, LF only, single trailing LF, no blank lines | AGREE, verified |
| 689 lines: 113 header `KEY\t= int`, 64 `STEP_NOTE n`, 512 `STEP_MOTION id` | AGREE, verified |
| Key order identical in all files; integers unpadded, optional minus | AGREE, verified |
| Banks 2-4 (48 files) are one byte-identical init pattern; 17 distinct files | AGREE, verified |
| `STEP_NOTE`: 14 tokens NOTE1..LENG4, SUBSTEP, PROB; all 64 rows present regardless of LENG | AGREE, verified |
| `STEP_MOTION id = step*10 + tick`, step 1-64, tick 1-8 (eight samples per step) | AGREE, verified |
| Lane `Mk` active iff `MOTION_CCk != -1`; lane values 0-127 (MIDI CC domain), -1 = no event | AGREE (inferred, 7/7 preset motions match manual 87294952) |
| `PB = -32768` = no pitch-bend event; active scaling unknown | AGREE / UNCALIBRATED |
| `TEMPO` = BPM × 100 | AGREE (inferred; j6reader and S1Utility corroborate) |
| `LENGk` = gate percent 1-100, 100 = tie; not 1/96 ticks | AGREE (contradicts S1Utility doc) |
| `PROB` in tens (10 = 100 %) | AGREE (inferred) |
| `SUBSTEP` encoding (only 0 and 9 observed) | UNCALIBRATED |
| `OSC_DRAW_P1..8`: two signed int8 per word, little-endian, -100..100, 16 points | AGREE (init decodes to a triangle; nullent.org corroborates) |
| `OSC_CHOP_*`: 16-bit masks, bit (n-1) = step n, 1 = audible | AGREE (bit order from S1Utility, author-verified) |
| Feature-off keeps subordinate values (Draw points, portamento time, chord shifts) | AGREE, verified |
| Writer rule: never truncate, never rescale through CC, preserve unknown keys literally | AGREE |

## 2. Key → panel control → CC — AGREE on every CC number (manual 87294690)

The knob/switch/MENU binding per key is INFERRED by all three (Roland never prints PRM
key names); CC numbers are VERIFIED. Full per-key table: `guides/s1-inspector/mapping.js`.

Keys with no documented control (AGREE, keep as raw integers, no invented label):
`DELAY_SW, OSC_CHOP_TYPE, OSC_CHOP_COMB_TYPE, RISER_SW, RISER_CTRL, RISER_BEAT,
DM_ASSIGN_TAP, DM_ASSIGN_FF, DM_SENS_X, DM_SENS_Y, PRM1..PRM11`.

Documented but not stored (AGREE): Arpeggio ON/OFF, Master Probability, every
system MENU item (CH, SYnC, tUnE, vELo, Cnt.I, Ntro...), octave shift, HOLD, D-Motion
on/off, live CC 1/10/11/64/65.

## 3. Enumerations — index order status

| Key | Choice list (manual order, 7-segment spelling) | Status |
|---|---|---|
| ARP_TYPE 0-7 | UP, doľn, UP.dľ, UP.2, dľ.2, U.d.2, rand, rnd.2 | AGREE, S1Utility hardware-verified |
| ARP_RATE 0-6 | 1_4, 1_8, 1_16, 1_32, 8t, 16t, 32t | AGREE, S1Utility hardware-verified |
| LFO_WAVE_FORM 0-5 | saw, inv-saw, tri, square, RND, NOISE | AGREE, UNCALIBRATED index |
| VCO_RANGE 0-5 | 64′, 32′, 16′, 8′, 4′, 2′ (init 2 = 16′) | AGREE, UNCALIBRATED index |
| VCO_PWM_SOURCE 0-2 | Env, NAn, LFO (init 2 = LFO) | AGREE, UNCALIBRATED index |
| VCO_SUB_TYPE 0-2 | −2o.A, −2oc, −1oc (init 2 = −1oc) | AGREE, UNCALIBRATED index |
| VCA_ENV_MODE 0-1 | GAtE, Env (init 1 = Env) | AGREE, UNCALIBRATED index |
| ENV_TRG_MODE 0-2 | LFO, GAtE, triG (init 2 = triG) | AGREE, UNCALIBRATED index |
| ASSIGN_MODE 0-3 | Nono, Uni, PoLy, Chd (init 2 = PoLy; 1-11 is the only Chd file) | AGREE, UNCALIBRATED index |
| PORTAMENTO_MODE 0-2 | OFF, On, AUto | RESOLVED on hardware 2026-10-25: manual order is right, S1Utility is wrong |
| NOISE_MODE 0-1 | Pink, ľhit | AGREE |
| LFO_MODE 0-1 | norN, FASt | AGREE |
| CHORUS 0-4 | OFF, 1, 2, 3, 4 | AGREE |
| OSC_DRAW_SW 0-2 | OFF, StEP, SLPE | AGREE, UNCALIBRATED index |
| SCALE | 1_8, 1_16, 1_32, 8t, 16t, 32t (init 1 = 1_16, so 0-based) | AGREE, UNCALIBRATED |
| REVERB_TYPE 0-6 | ANb, RooN, hAL1, hAL2, PLAt, SPrn, Nod | AGREE, UNCALIBRATED index |
| RISER_MODE 0-3 | OFF, SynC, qUiv, qvPn | AGREE, UNCALIBRATED index |
| DM_ASSIGN_X/Y 0-8 | OFF, Nod, FrEq, rESo, P.bnd, PAn, EXP, d.LEv, r.LEv; which axis is roll | AGREE list, UNCALIBRATED axis |
| DELAY_TEMPO 0-15 | 128, 64t, 128d, 1_64, 32t, 64d, 1_32, 16t, 32d, 1_16, 8t, 16d, 1_8, 4t, 8d, 1_4 (init 14 = 8d) | AGREE (S1Utility, matches manual reversed) |
| DELAY/REVERB_LOW_CUT 0-17 | FLAt, 20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800 | AGREE, UNCALIBRATED index |
| DELAY/REVERB_HIGH_CUT 0-14 | 630, 800, 1k, 1.25k, 1.6k, 2k, 2.5k, 3.15k, 4k, 5k, 6.3k, 8k, 10k, 12.5k, FLAt (init 14/13) | AGREE 15 entries; S1Utility has a duplicate FLAT off-by-one, do not copy |
| LFO_RATE when LFO_SYNC=1 | 1-based index into the 31-entry division list (8_1 … 128) | S1Utility; observed values 1 and 3; INFERRED |
| TEMPO_SYNC | Delay Sync d.Syn OFF/On | AGREE inferred |

## 4. Scaled values — AGREE

| Key | Raw → display | Status |
|---|---|---|
| TEMPO | raw / 100 BPM | AGREE |
| VCO_BEND_SENS 0-240 | raw / 10 semitones (120 = ±1 oct) | AGREE, manual 87294950 |
| OSC_DRAW_MULT, OSC_CHOP_COMB 7-255 | 1.0 + (raw−7)/248 × 31 → 1.0-32.0 | AGREE via S1Utility anchors (7 = 1.0, 255 = 32.0) |
| OSC_CHOP_OVERTONE 0-255 | manual shows 0-200 | AGREE display cap; raw→display UNCALIBRATED |
| DELAY_TIME 0-255 | 1-740 ms; S1Utility piecewise anchors (0,1)(11,14)(26,44)(55,103)(106,273)(179,517)(245,737)(255,740) | third-party, UNCALIBRATED |
| FINE_TUNE | 128 = centre; ±1 octave at the ends | AGREE inferred |
| CHORD_VOICEn_KEY_SHIFT | raw signed semitones −12..12 | AGREE |
| SHUFFLE | manual −90..90; raw 18 observed, scale UNCALIBRATED | AGREE unknown |
| Continuous knobs 0-255 (levels, cutoff, reso, env, LFO depth, times) | raw = knob position, MIN=0 MAX=255 | AGREE |

## 5. Prior art — AGREE

- S1Utility (denzlobin): GPL-3.0-or-later. Read-only PRM inspector; motion parser keeps
  64 of 512 rows; LENG documented as ticks (wrong); phantom keys (PAN, KBD_TRANSPOSE...);
  HIGH_CUT duplicate FLAT. CC table and ARP/DRAW/CHOP anchors are author-hardware-verified.
  Do not copy code; facts re-derived from the factory files above.
- Synth-X-Explorer (maxn76): MIT; its PRM reader is broken (halves every value).
- nullent.org s1-wave.js: no license; corroborates Draw packing only.
- aira_pattern_editor (natebosch, T-8): BSD-3; j6reader (sa48k, J-6): no license; both
  confirm the AIRA Compact family grammar and TEMPO/100.
- Momo editor, Sound Hoarder: closed.

## 6. HTML practice — AGREE on baseline, SPLIT on extras

- Baseline (AGREE): `<input type=file>` + drag-drop → `file.arrayBuffer()` →
  `TextDecoder(fatal)`; serialise → `TextEncoder` → `Blob([u8], {type:
  "application/octet-stream"})` → `<a download>`. Safari has no File System Access API.
- `showSaveFilePicker` on `file://`: analyses disagreed on whether the opaque origin
  rejects it → feature-detect and try, fall back silently.
- Script type: classic `<script>` (modules fail on `file://` in Chrome), not `type=module`.
- Line endings: preserve the opened file's EOL (S1Utility does the same); default LF.
- Knobs: SVG `<g role="slider" tabindex="0">` with aria-valuemin/max/now/valuetext,
  arrow/Home/End/PageUp/PageDown keys, `setPointerCapture` vertical drag, numeric input
  beside each knob for raw entry. Undo: past/present/future with gesture coalescing.
- Panel: the existing `guides/img/s1-panel.png` (Roland's manual drawing, 1631×922) with
  its hotspot coordinates from `s1-foundations.html` is used as the backdrop; knob
  pointers and switch states are drawn as an SVG overlay at those coordinates.

## 7. Calibration pass (hardware, after the build)

Each `mapping.json` entry carries `status`. Items to confirm on the S-1:
1. Every enum index order marked UNCALIBRATED above (PORTAMENTO_MODE first).
2. SHUFFLE raw scale; OSC_CHOP_OVERTONE raw→display; DELAY_TIME ms curve.
3. SUBSTEP values beyond 0/9; PB active range.
4. Whether RESTORE accepts an edited file at all (edit one knob, restore, check).

## 8. Hardware calibration results (2026-10-25)

Live MIDI capture from the S-1 (sending on channel 1) through the H4MIDI, recorded in
`calibration-cc.tsv`. All 18 main knobs send the CC number in Roland's chart; 16 sweep
0-127, LFO WAVE FORM (CC 12) and OSC RANGE (CC 14) send detent indexes 0-5, fully left = 0.
Spot-checked switches PORTA ON (CC 31), PWM SRC (CC 16) and POLY (CC 80) send indexes in
the manual's listing order. Decision: Roland's documented order is the source of truth for
every remaining SHIFT-pad and MENU enumeration.

Backup check, pattern 4-15 saved with known settings (2026-10-25):
- DM_ASSIGN_X = roLL (FrEq saved as 2), DM_ASSIGN_Y = Ptch (rESo saved as 3).
- DELAY_TEMPO: 16t saved as 7, so the S1Utility order (0 = 128 … 15 = 1_4) is right;
  live CC 90 sweep confirms 16 steps, fully left = 0.
- Cut filters: delay Lo.Ct 100 = 8, Hi.Ct 2k = 5; reverb Lo.Ct FLAt = 0, Hi.Ct 630 = 0,
  matching Roland's list order with FLAt first (low cut) and last (high cut).
- Knob scale: FREQ full = 255, RESO zero = 0, ATTACK at noon = 127, so file values are
  0-255 (about twice the 0-127 CC the knob sends).

Final pass, pattern 4-15 (2026-10-25): SHUFFLE stores the displayed value (45 = 45);
OSC_CHOP_OVERTONE stores the displayed value (o150 = 150, range 0-200); FINE_TUNE full
right = 255 with 128 centre (±1 octave); DELAY_TIME 500 ms stored as 174, which lands on
S1Utility's hardware-captured curve, so raw 0-255 maps to 1-740 ms through those anchors.
Result: 92 keys verified, 21 reserved (no S-1 control), none open.
