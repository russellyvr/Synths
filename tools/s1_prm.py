#!/usr/bin/env python3
"""Roland AIRA Compact S-1 .PRM pattern file: parse, serialise, round-trip check.

Format (observed on the 64 factory files, firmware 1.02 backup, 2026-10-25):
  - ASCII, LF line endings, no BOM, trailing LF on the last line.
  - 113 header lines   KEY<TAB>= <int>
  - 64 lines           STEP_NOTE n<TAB>= NOTE1=.. VELO1=.. LENG1=.. ... SUBSTEP=.. PROB=..
  - 512 lines          STEP_MOTION st<TAB>= M1=.. ... M8=.. PB=..
    where st is step*10 + tick, step 1..64, tick 1..8.

Usage:
  s1_prm.py roundtrip <dir|file>...   byte-identical parse->serialise check
  s1_prm.py dump <file>               print header as JSON
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

SEP = "\t= "


def parse(text: str) -> dict:
    """Return {"header": [(key, int)], "step_note": [(n, [(field, int)])],
    "step_motion": [(st, [(field, int)])]} preserving order."""
    header, notes, motions = [], [], []
    for ln in text.split("\n"):
        if ln == "":
            continue
        key, _, val = ln.partition(SEP)
        if key.startswith("STEP_NOTE "):
            notes.append((int(key[10:]), _fields(val)))
        elif key.startswith("STEP_MOTION "):
            motions.append((int(key[12:]), _fields(val)))
        else:
            header.append((key, int(val)))
    return {"header": header, "step_note": notes, "step_motion": motions}


def _fields(val: str) -> list[tuple[str, int]]:
    out = []
    for tok in val.split(" "):
        k, _, v = tok.partition("=")
        out.append((k, int(v)))
    return out


def serialise(doc: dict) -> str:
    lines = [f"{k}{SEP}{v}" for k, v in doc["header"]]
    lines += [f"STEP_NOTE {n}{SEP}" + " ".join(f"{k}={v}" for k, v in f)
              for n, f in doc["step_note"]]
    lines += [f"STEP_MOTION {n}{SEP}" + " ".join(f"{k}={v}" for k, v in f)
              for n, f in doc["step_motion"]]
    return "\n".join(lines) + "\n"


def roundtrip(path: Path) -> bool:
    raw = path.read_bytes()
    out = serialise(parse(raw.decode("ascii"))).encode("ascii")
    return raw == out


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 64
    cmd, args = argv[0], [Path(a) for a in argv[1:]]
    if cmd == "dump":
        doc = parse(args[0].read_text("ascii"))
        print(json.dumps(dict(doc["header"]), indent=1))
        return 0
    if cmd == "roundtrip":
        files = [p for a in args for p in (sorted(a.glob("*.PRM")) if a.is_dir() else [a])]
        bad = [p for p in files if not roundtrip(p)]
        print(f"{len(files) - len(bad)}/{len(files)} byte-identical")
        for p in bad:
            print("MISMATCH", p)
        return 1 if bad else 0
    print(__doc__)
    return 64


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
