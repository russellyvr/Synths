# S-1 Patch Inspector

Offline, single-page editor for Roland AIRA Compact S-1 `.PRM` pattern backups. Built 2026-10-25.

## Files

| Path | Purpose |
|---|---|
| `guides/s1-inspector.html` | The page. Open it directly in Chrome or Safari (`file://`), no server. |
| `guides/s1-inspector/mapping.js` | The key → panel table the page loads. Edit this during calibration. |
| `guides/img/s1-panel-clean.png` | Panel photo used as the backdrop; knob caps are repainted with the file's positions. |
| `guides/assets/dashboard.css` | House stylesheet (verbatim copy of `Scheduled/_assets/dashboard.css`). |
| `tools/s1_prm.py` | Python parser/serialiser and the byte-identical round-trip check. |

## Use

1. On the S-1, make a backup (power on holding PLAY per the manual's Backup section) and
   copy a `S1_PTNb-nn.PRM` file to the Mac.
2. Open `s1-inspector.html`, then Open or drop the file. The page refuses any file it
   cannot reproduce byte-for-byte.
3. Edit on the panel (drag or arrow keys on knobs, click amber tags to cycle switches),
   in the Parameters tables (raw integer or choice list), in the step editor, the draw
   points or the chop grids. Undo is Cmd-Z, redo Shift-Cmd-Z, save Cmd-S.
4. Save. Chrome offers a save dialog (File System Access API); Safari downloads the file.
   Keep the original name and put it in a `RESTORE` folder on the S-1.

Motion lanes are shown but not editable on this page.

## Calibration

Every entry in `mapping.js` carries `status: verified | inferred | uncalibrated`.
`uncalibrated` means no source fixed the raw→display reading; `reserved` means the key has no S-1 control and stays a raw number; `inferred` means it follows
from the factory files or the manual's listing order but was not checked on the unit.

To calibrate an entry: set it on the S-1, WRITE the pattern, back up, open the file here,
compare the raw value with what the panel showed, then correct `choices`, `scale`, `min`,
`max` or the hotspot `hs` in `mapping.js` and set `status: "verified"`. The list in
`docs/PRM-FORMAT.md` §7 is the order to work through; the open
PORTAMENTO_MODE index order is first.

## Verification done at build time

- `tools/s1_prm.py roundtrip` over the 64 factory files: 64/64 byte-identical.
- The page's own JavaScript parser over the same 64 files: 64/64 byte-identical.
- Mapping covers exactly the 113 header keys, no duplicates, every enum resolves.

- Hardware calibration 2026-10-25 (MIDI capture plus three test backups of pattern 4-15): 92 keys verified, 21 reserved keys with no S-1 control.
