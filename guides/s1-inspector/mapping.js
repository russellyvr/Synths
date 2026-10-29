// Roland AIRA Compact S-1 .PRM key → panel mapping table.
// Edit this file during hardware calibration; the inspector page loads it as-is.
// Sources: Roland Owner's Manual v1.02 section ids (manual), MIDI chart 87294690 (cc),
// factory backup corpus, and the consensus in docs/PRM-FORMAT.md.
//
// Field reference
//   prm      PRM header key (exact)
//   sec      section shown in the inspector
//   label    short name as printed on the S-1 panel or MENU display
//   control  how you reach it on the hardware
//   cc       MIDI CC number from the chart, or null
//   type     knob | enum | int | scaled | bits16 | draw | raw
//   min/max  raw integer bounds (manual range where documented, else observed)
//   choices  enum display strings in index order (7-segment spelling from the manual)
//   scale    {div, add, unit, dp} display = (raw + add) / div, dp decimals
//   status   verified | inferred | uncalibrated | reserved
//            verified = Roland documents the control and range and the storage was confirmed
//            on hardware (2026-10-25) or by a hardware-tested prior-art source;
//            reserved = stored in every file but no S-1 control exists, kept as a raw number
//   manual   manual section id → ../guides/s1-manual.html#p<id>
//   hs       [cx, cy] knob/pad centre on img/s1-panel-clean.png (1536×1024) for the overlay
//   seg      7-segment text template for the display box
// eslint-disable-next-line no-unused-vars
const S1_MAPPING = {
  version: "2026-10-25",
  panel: { img: "img/s1-panel-clean.png", w: 1536, h: 1024 },
  lists: {
    lowcut: ["FLAt","20","25","31.5","40","50","63","80","100","125","160","200","250","315","400","500","630","800"],
    highcut: ["630","800","1k","1.25k","1.6k","2k","2.5k","3.15k","4k","5k","6.3k","8k","10k","12.5k","FLAt"],
    delayTempo: ["128","64t","128d","1_64","32t","64d","1_32","16t","32d","1_16","8t","16d","1_8","4t","8d","1_4"],
    lfoDiv: ["8_1","6_1","8_1t","4_1","3_1","4_1t","2_1","1d","2_1t","1_1","2d","1t","1_2","4d","2t","1_4","8d","4t","1_8","16d","8t","1_16","32d","16t","1_32","64d","32t","1_64","128d","64t","128"],
    delayMs: [[0,1],[11,14],[26,44],[55,103],[106,273],[174,500],[179,517],[245,737],[255,740]],
    dmDest: ["OFF","Nod","FrEq","rESo","P.bnd","PAn","EXP","d.LEv","r.LEv"]
  },
  keys: [
    // ---- Sequencer / pattern ----
    { prm:"LENG", sec:"Pattern", label:"LAST (length)", control:"SHIFT + pad 4", cc:null, type:"int", min:1, max:64, status:"verified", manual:"87295006" },
    { prm:"SCALE", sec:"Pattern", label:"P.SCL (scale)", control:"MENU P.SCL, or hold PATTERN + TEMPO/VALUE", cc:null, type:"enum", choices:["1_8","1_16","1_32","8t","16t","32t"], status:"verified", manual:"87294950" },
    { prm:"TRANSPOSE", sec:"Pattern", label:"trAn (transpose)", control:"SHIFT + STEP, or MENU trAn", cc:77, type:"int", min:-60, max:60, status:"verified", manual:"87294961" },
    { prm:"LEVEL", sec:"Pattern", label:"vOL (volume)", control:"MENU vOL", cc:null, type:"int", min:0, max:127, status:"verified", manual:"87294950" },
    { prm:"TEMPO", sec:"Pattern", label:"TEMPO", control:"TEMPO/VALUE knob (SHIFT = 0.1 steps)", cc:null, type:"scaled", min:4000, max:30000, scale:{div:100, unit:"BPM", dp:2}, status:"verified", manual:"87295014", hs:[230,440] },
    { prm:"SHUFFLE", sec:"Pattern", label:"SHUFFLE", control:"SHIFT + pad 3", cc:null, type:"int", min:-90, max:90, status:"verified", manual:"87294955", note:"Hardware-checked 2026-10-25: display 45 stored as 45." },
    { prm:"ARP_TYPE", sec:"Pattern", label:"ARPEGGIO TYPE", control:"SHIFT + pad 9", cc:null, type:"enum", choices:["UP","doľn","UP.dľ","UP.2","dľ.2","U.d.2","rand","rnd.2"], status:"verified", manual:"87294981" },
    { prm:"ARP_RATE", sec:"Pattern", label:"ARPEGGIO RATE", control:"SHIFT + pad 10", cc:null, type:"enum", choices:["1_4","1_8","1_16","1_32","8t","16t","32t"], status:"verified", manual:"87294981" },
    { prm:"MOTION_CC1", sec:"Motion lanes", label:"Lane 1 CC", control:"REC + knob (recorded automatically)", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC2", sec:"Motion lanes", label:"Lane 2 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC3", sec:"Motion lanes", label:"Lane 3 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC4", sec:"Motion lanes", label:"Lane 4 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC5", sec:"Motion lanes", label:"Lane 5 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC6", sec:"Motion lanes", label:"Lane 6 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC7", sec:"Motion lanes", label:"Lane 7 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    { prm:"MOTION_CC8", sec:"Motion lanes", label:"Lane 8 CC", control:"REC + knob", cc:null, type:"int", min:-1, max:127, status:"verified", manual:"87294952" },
    // ---- LFO ----
    { prm:"LFO_RATE", sec:"LFO", label:"RATE", control:"LFO RATE knob (index into note list when LFO_SYNC = On)", cc:3, type:"knob", min:0, max:255, status:"verified", manual:"87294803", hs:[445,312] },
    { prm:"LFO_WAVE_FORM", sec:"LFO", label:"WAVE FORM", control:"LFO WAVE FORM knob", cc:12, type:"enum", choices:["saw","inv-saw","tri","square","RND","NOISE"], status:"verified", manual:"87294803", hs:[445,421] },
    { prm:"LFO_MOD_DEPTH", sec:"LFO", label:"Nod.d (mod depth)", control:"MENU Nod.d", cc:17, type:"knob", min:0, max:255, status:"verified", manual:"87294950" },
    { prm:"LFO_MODE", sec:"LFO", label:"LFO.N (mode)", control:"MENU LFO.N, or SHIFT + LFO RATE", cc:79, type:"enum", choices:["norN","FASt"], status:"verified", manual:"87294950" },
    { prm:"LFO_KEY_TRIG", sec:"LFO", label:"LFO.K (key trigger)", control:"MENU LFO.K", cc:105, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294950" },
    { prm:"LFO_SYNC", sec:"LFO", label:"LFO.S (tempo sync)", control:"MENU LFO.S, or SHIFT + LFO WAVE FORM", cc:106, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294950" },
    // ---- Oscillator ----
    { prm:"VCO_RANGE", sec:"Oscillator", label:"RANGE", control:"OSCILLATOR RANGE knob", cc:14, type:"enum", choices:["64′","32′","16′","8′","4′","2′"], status:"verified", manual:"87294902", hs:[604,313] },
    { prm:"VCO_MOD_DEPTH", sec:"Oscillator", label:"LFO", control:"OSCILLATOR LFO knob", cc:13, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[605,422] },
    { prm:"VCO_PWM_LEVEL", sec:"Oscillator", label:"Square level", control:"OSCILLATOR square-wave knob", cc:19, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[765,312] },
    { prm:"VCO_SAW_LEVEL", sec:"Oscillator", label:"Saw level", control:"OSCILLATOR sawtooth knob", cc:20, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[921,312] },
    { prm:"VCO_SUB_LEVEL", sec:"Oscillator", label:"SUB", control:"OSCILLATOR SUB knob", cc:21, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[765,422] },
    { prm:"VCO_NOISE_LEVEL", sec:"Oscillator", label:"NOISE", control:"OSCILLATOR NOISE knob (riser control when Riser Mode is on)", cc:23, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[921,422] },
    { prm:"VCO_PULSE_WIDTH", sec:"Oscillator", label:"PWM DEPTH", control:"SHIFT + PWM DEPTH pad, or SHIFT + square knob", cc:15, type:"knob", min:0, max:255, status:"verified", manual:"87294902", hs:[508,640] },
    { prm:"VCO_PWM_SOURCE", sec:"Oscillator", label:"PWM SRC", control:"SHIFT + PWM SRC pad", cc:16, type:"enum", choices:["Env","NAn","LFO"], status:"verified", manual:"87294902", hs:[592,640] },
    { prm:"VCO_SUB_TYPE", sec:"Oscillator", label:"SUB OCT", control:"SHIFT + SUB OCT pad", cc:22, type:"enum", choices:["−2o.A","−2oc","−1oc"], status:"verified", manual:"87294902", hs:[677,640] },
    { prm:"NOISE_MODE", sec:"Oscillator", label:"nS.Nd (noise mode)", control:"MENU nS.Nd, or SHIFT + NOISE knob", cc:78, type:"enum", choices:["Pink","ľhit"], status:"verified", manual:"87294950" },
    { prm:"FINE_TUNE", sec:"Oscillator", label:"Fine tune", control:"SHIFT + RANGE knob", cc:76, type:"scaled", min:0, max:255, scale:{div:10.6667, add:-128, unit:"st", dp:1}, status:"verified", manual:"87294902", note:"128 = centre, 255 = +1 octave (hardware-checked 2026-10-25)." },
    { prm:"VCO_BEND_SENS", sec:"Oscillator", label:"bnd.o (bend sens)", control:"MENU bnd.o", cc:18, type:"scaled", min:0, max:240, scale:{div:10, unit:"st", dp:1}, status:"verified", manual:"87294950" },
    // ---- Filter ----
    { prm:"VCF_CUTOFF", sec:"Filter", label:"FREQ", control:"FILTER FREQ knob", cc:74, type:"knob", min:0, max:255, status:"verified", manual:"87294861", hs:[1079,312] },
    { prm:"VCF_RESONANCE", sec:"Filter", label:"RESO", control:"FILTER RESO knob", cc:71, type:"knob", min:0, max:255, status:"verified", manual:"87294861", hs:[1232,312] },
    { prm:"VCF_MOD_DEPTH", sec:"Filter", label:"LFO", control:"FILTER LFO knob", cc:25, type:"knob", min:0, max:255, status:"verified", manual:"87294861", hs:[1079,422] },
    { prm:"VCF_ENV_DEPTH", sec:"Filter", label:"ENV", control:"FILTER ENV knob", cc:24, type:"knob", min:0, max:255, status:"verified", manual:"87294861", hs:[1232,422] },
    { prm:"VCF_KEY_FOLLOW", sec:"Filter", label:"FILTER KYBD", control:"SHIFT + pad 7, or SHIFT + FILTER ENV knob", cc:26, type:"knob", min:0, max:255, status:"verified", manual:"87294861" },
    { prm:"VCF_BEND_SENS", sec:"Filter", label:"bnd.F (bend sens)", control:"MENU bnd.F", cc:27, type:"knob", min:0, max:255, status:"verified", manual:"87294950" },
    // ---- Envelope / amp ----
    { prm:"ENV_ATTACK", sec:"Envelope", label:"ATTACK", control:"ENV ATTACK knob", cc:73, type:"knob", min:0, max:255, status:"verified", manual:"87294693", hs:[765,538] },
    { prm:"ENV_DECAY", sec:"Envelope", label:"DECAY", control:"ENV DECAY knob", cc:75, type:"knob", min:0, max:255, status:"verified", manual:"87294693", hs:[921,538] },
    { prm:"ENV_SUSTAIN", sec:"Envelope", label:"SUSTAIN", control:"ENV SUSTAIN knob", cc:30, type:"knob", min:0, max:255, status:"verified", manual:"87294693", hs:[1079,538] },
    { prm:"ENV_RELEASE", sec:"Envelope", label:"RELEASE", control:"ENV RELEASE knob", cc:72, type:"knob", min:0, max:255, status:"verified", manual:"87294693", hs:[1232,538] },
    { prm:"ENV_TRG_MODE", sec:"Envelope", label:"ENV TRG", control:"SHIFT + ENV TRG pad", cc:29, type:"enum", choices:["LFO","GAtE","triG"], status:"verified", manual:"87294693", hs:[845,640] },
    { prm:"VCA_ENV_MODE", sec:"Envelope", label:"AMP", control:"SHIFT + AMP pad", cc:28, type:"enum", choices:["GAtE","Env"], status:"verified", manual:"87294781", hs:[929,640] },
    // ---- Voice ----
    { prm:"ASSIGN_MODE", sec:"Voice", label:"POLY", control:"SHIFT + POLY pad", cc:80, type:"enum", choices:["Nono","Uni","PoLy","Chd"], status:"verified", manual:"87294802", hs:[1098,640] },
    { prm:"CHORD_VOICE2_SW", sec:"Voice", label:"v2Sľ", control:"SHIFT + POLY → Chd → ENTER", cc:81, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294802" },
    { prm:"CHORD_VOICE3_SW", sec:"Voice", label:"v3Sľ", control:"SHIFT + POLY → Chd → ENTER", cc:82, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294802" },
    { prm:"CHORD_VOICE4_SW", sec:"Voice", label:"v4Sľ", control:"SHIFT + POLY → Chd → ENTER", cc:83, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294802" },
    { prm:"CHORD_VOICE2_KEY_SHIFT", sec:"Voice", label:"v2kS", control:"SHIFT + POLY → Chd → ENTER", cc:85, type:"int", min:-12, max:12, status:"verified", manual:"87294802" },
    { prm:"CHORD_VOICE3_KEY_SHIFT", sec:"Voice", label:"v3kS", control:"SHIFT + POLY → Chd → ENTER", cc:86, type:"int", min:-12, max:12, status:"verified", manual:"87294802" },
    { prm:"CHORD_VOICE4_KEY_SHIFT", sec:"Voice", label:"v4kS", control:"SHIFT + POLY → Chd → ENTER", cc:87, type:"int", min:-12, max:12, status:"verified", manual:"87294802" },
    { prm:"PORTAMENTO_MODE", sec:"Voice", label:"PORTA ON", control:"SHIFT + PORTA ON pad", cc:31, type:"enum", choices:["OFF","On","AUto"], status:"verified", manual:"87294802", note:"Hardware-checked 2026-10-25: 0 OFF, 1 On, 2 AUto (S1Utility order is wrong).", hs:[1182,640] },
    { prm:"PORTAMENTO_TIME", sec:"Voice", label:"PORTA TIME", control:"SHIFT + PORTA TIME pad", cc:5, type:"knob", min:0, max:255, status:"verified", manual:"87294802", hs:[1266,640] },
    // ---- Effects ----
    { prm:"CHORUS", sec:"Effects", label:"Cho (chorus)", control:"MENU Cho", cc:93, type:"enum", choices:["OFF","1","2","3","4"], status:"verified", manual:"87294859" },
    { prm:"DELAY_LEVEL", sec:"Effects", label:"DELAY", control:"EFX DELAY knob", cc:92, type:"knob", min:0, max:255, status:"verified", manual:"87294859", hs:[1389,312] },
    { prm:"TEMPO_SYNC", sec:"Effects", label:"d.Syn (delay sync)", control:"SHIFT + pad 13 → d.Syn", cc:null, type:"enum", choices:["OFF","On"], status:"verified", manual:"87294859" },
    { prm:"DELAY_TIME", sec:"Effects", label:"tiNE (sync off)", control:"SHIFT + DELAY knob, or pad 13 → tiNE", cc:90, type:"delayms", min:0, max:255, status:"verified", manual:"87294859", note:"Raw 0–255 maps to 1–740 ms; hardware-checked 2026-10-25: 500 ms stored as 174." },
    { prm:"DELAY_TEMPO", sec:"Effects", label:"tiNE (sync on)", control:"SHIFT + pad 13 → tiNE", cc:null, type:"enum", choices:"delayTempo", status:"verified", manual:"87294859" },
    { prm:"DELAY_FEEDBACK", sec:"Effects", label:"Fdbk", control:"SHIFT + pad 13 → Fdbk", cc:null, type:"knob", min:0, max:255, status:"verified", manual:"87294859" },
    { prm:"DELAY_LOW_CUT", sec:"Effects", label:"Lo.Ct (delay)", control:"SHIFT + pad 13 → Lo.Ct", cc:null, type:"enum", choices:"lowcut", status:"verified", manual:"87294859" },
    { prm:"DELAY_HIGH_CUT", sec:"Effects", label:"Hi.Ct (delay)", control:"SHIFT + pad 13 → Hi.Ct", cc:null, type:"enum", choices:"highcut", status:"verified", manual:"87294859" },
    { prm:"DELAY_SW", sec:"Effects", label:"DELAY_SW", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294859" },
    { prm:"REVERB_TYPE", sec:"Effects", label:"tyPE (reverb)", control:"SHIFT + pad 14 → tyPE", cc:null, type:"enum", choices:["ANb","RooN","hAL1","hAL2","PLAt","SPrn","Nod"], status:"verified", manual:"87294859" },
    { prm:"REVERB_TIME", sec:"Effects", label:"tiNE (reverb)", control:"SHIFT + REVERB knob, or pad 14 → tiNE", cc:89, type:"knob", min:0, max:255, status:"verified", manual:"87294859" },
    { prm:"REVERB_LEVEL", sec:"Effects", label:"REVERB", control:"EFX REVERB knob", cc:91, type:"knob", min:0, max:255, status:"verified", manual:"87294859", hs:[1389,422] },
    { prm:"REVERB_PRE_DELAY", sec:"Effects", label:"Pr.dL", control:"SHIFT + pad 14 → Pr.dL", cc:null, type:"scaled", min:0, max:100, scale:{div:1, unit:"ms", dp:0}, status:"verified", manual:"87294859" },
    { prm:"REVERB_LOW_CUT", sec:"Effects", label:"Lo.Ct (reverb)", control:"SHIFT + pad 14 → Lo.Ct", cc:null, type:"enum", choices:"lowcut", status:"verified", manual:"87294859" },
    { prm:"REVERB_HIGH_CUT", sec:"Effects", label:"Hi.Ct (reverb)", control:"SHIFT + pad 14 → Hi.Ct", cc:null, type:"enum", choices:"highcut", status:"verified", manual:"87294859" },
    { prm:"REVERB_DENSITY", sec:"Effects", label:"dEnS", control:"SHIFT + pad 14 → dEnS", cc:null, type:"int", min:0, max:10, status:"verified", manual:"87294859" },
    // ---- OSC Draw ----
    { prm:"OSC_DRAW_SW", sec:"OSC Draw", label:"Sľ (draw)", control:"SHIFT + pad 5 → Sľ, or SHIFT + saw knob", cc:107, type:"enum", choices:["OFF","StEP","SLPE"], status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_MULT", sec:"OSC Draw", label:"NULt (multiply)", control:"SHIFT + pad 5 → NULt, or SHIFT + square knob", cc:102, type:"scaled", min:7, max:255, scale:{div:8, add:1, unit:"×", dp:1}, status:"verified", manual:"87294805", note:"7 = 1.0, 255 = 32.0 (S1Utility anchors)." },
    { prm:"OSC_DRAW_P1", sec:"OSC Draw", label:"ForN points 1–2", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P2", sec:"OSC Draw", label:"ForN points 3–4", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P3", sec:"OSC Draw", label:"ForN points 5–6", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P4", sec:"OSC Draw", label:"ForN points 7–8", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P5", sec:"OSC Draw", label:"ForN points 9–10", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P6", sec:"OSC Draw", label:"ForN points 11–12", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P7", sec:"OSC Draw", label:"ForN points 13–14", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    { prm:"OSC_DRAW_P8", sec:"OSC Draw", label:"ForN points 15–16", control:"SHIFT + pad 5 → ForN", cc:null, type:"draw", status:"verified", manual:"87294805" },
    // ---- OSC Chop ----
    { prm:"OSC_CHOP_TYPE", sec:"OSC Chop", label:"OSC_CHOP_TYPE", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294783" },
    { prm:"OSC_CHOP_OVERTONE", sec:"OSC Chop", label:"ovtn (overtone)", control:"SHIFT + pad 6 → ovtn, or SHIFT + OSC LFO knob", cc:103, type:"int", min:0, max:200, status:"verified", manual:"87294783", note:"Hardware-checked 2026-10-25: o150 stored as 150. 0 = chop off." },
    { prm:"OSC_CHOP_COMB_TYPE", sec:"OSC Chop", label:"OSC_CHOP_COMB_TYPE", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294783" },
    { prm:"OSC_CHOP_COMB", sec:"OSC Chop", label:"CoNb (comb)", control:"SHIFT + pad 6 → CoNb, or SHIFT + SUB knob", cc:104, type:"scaled", min:7, max:255, scale:{div:8, add:1, unit:"×", dp:1}, status:"verified", manual:"87294783" },
    { prm:"OSC_CHOP_PWM", sec:"OSC Chop", label:"Sqr.P", control:"SHIFT + pad 6 → Sqr.P, pads 1–16", cc:null, type:"bits16", status:"verified", manual:"87294783" },
    { prm:"OSC_CHOP_SAW", sec:"OSC Chop", label:"SAľ.P", control:"SHIFT + pad 6 → SAľ.P, pads 1–16", cc:null, type:"bits16", status:"verified", manual:"87294783" },
    { prm:"OSC_CHOP_SUB", sec:"OSC Chop", label:"SUb.P", control:"SHIFT + pad 6 → SUb.P, pads 1–16", cc:null, type:"bits16", status:"verified", manual:"87294783" },
    { prm:"OSC_CHOP_NOISE", sec:"OSC Chop", label:"noi.P", control:"SHIFT + pad 6 → noi.P, pads 1–16", cc:null, type:"bits16", status:"verified", manual:"87294783" },
    // ---- Riser ----
    { prm:"RISER_MODE", sec:"Riser", label:"rS.Nd (riser mode)", control:"MENU rS.Nd, or SHIFT + pad 1 + pad 2", cc:null, type:"enum", choices:["OFF","SynC","qUiv","qvPn"], status:"verified", manual:"87294965" },
    { prm:"RISER_SW", sec:"Riser", label:"RISER_SW", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294965" },
    { prm:"RISER_CTRL", sec:"Riser", label:"RISER_CTRL", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294965" },
    { prm:"RISER_BEAT", sec:"Riser", label:"RISER_BEAT", control:"no documented control", cc:null, type:"raw", status:"reserved", manual:"87294965" },
    { prm:"RISER_RESO", sec:"Riser", label:"rS.rS (resonance)", control:"MENU rS.rS", cc:null, type:"int", min:0, max:100, status:"verified", manual:"87294965" },
    { prm:"RISER_LEVEL", sec:"Riser", label:"rS.Lv (level)", control:"MENU rS.Lv", cc:null, type:"int", min:0, max:100, status:"verified", manual:"87294965" },
    { prm:"RISER_SHAPE", sec:"Riser", label:"rS.Sh (shape)", control:"MENU rS.Sh", cc:null, type:"int", min:0, max:100, status:"verified", manual:"87294965" },
    // ---- D-Motion ----
    { prm:"DM_ASSIGN_X", sec:"D-Motion", label:"roLL destination (tilt left-right)", control:"SHIFT + D-MOTION", cc:null, type:"enum", choices:"dmDest", status:"verified", manual:"87294968", note:"Hardware-checked 2026-10-25: X = roLL." },
    { prm:"DM_ASSIGN_Y", sec:"D-Motion", label:"Ptch destination (tilt forward-back)", control:"SHIFT + D-MOTION", cc:null, type:"enum", choices:"dmDest", status:"verified", manual:"87294968" },
    { prm:"DM_ASSIGN_TAP", sec:"D-Motion", label:"DM_ASSIGN_TAP", control:"no S-1 control", cc:null, type:"raw", status:"reserved", manual:"87294968" },
    { prm:"DM_ASSIGN_FF", sec:"D-Motion", label:"DM_ASSIGN_FF", control:"no S-1 control", cc:null, type:"raw", status:"reserved", manual:"87294968" },
    { prm:"DM_SENS_X", sec:"D-Motion", label:"DM_SENS_X", control:"no S-1 control", cc:null, type:"raw", status:"reserved", manual:"87294968" },
    { prm:"DM_SENS_Y", sec:"D-Motion", label:"DM_SENS_Y", control:"no S-1 control", cc:null, type:"raw", status:"reserved", manual:"87294968" },
    // ---- Reserved ----
    { prm:"PRM1", sec:"Reserved", label:"PRM1", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM2", sec:"Reserved", label:"PRM2", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM3", sec:"Reserved", label:"PRM3", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM4", sec:"Reserved", label:"PRM4", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM5", sec:"Reserved", label:"PRM5", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM6", sec:"Reserved", label:"PRM6", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM7", sec:"Reserved", label:"PRM7", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM8", sec:"Reserved", label:"PRM8", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM9", sec:"Reserved", label:"PRM9", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM10", sec:"Reserved", label:"PRM10", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" },
    { prm:"PRM11", sec:"Reserved", label:"PRM11", control:"reserved", cc:null, type:"raw", status:"reserved", manual:"87294950" }
  ]
};
