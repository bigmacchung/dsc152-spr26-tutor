#!/usr/bin/env bash
# build.sh — assemble modular source into single-file DSC152-companion.html
#
# Reads modular-src/index.html as the template and:
#   1. Replaces <link rel="stylesheet" href="X">   with <style>{contents of X}</style>
#   2. Replaces <script src="X"></script>          with <script>{contents of X}</script>
#   3. Replaces <!-- @include X -->                with the contents of X
#
# Output: ../DSC152-companion.html (single-file build artifact)
#
# Usage:
#   cd modular-src && bash build.sh
#
# No external deps — pure bash + python3 (which any modern macOS has).

set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SRC_DIR/.." && pwd)"
INDEX="$SRC_DIR/index.html"
OUT="$PROJECT_DIR/DSC152-companion.html"

if [ ! -f "$INDEX" ]; then
  echo "ERROR: $INDEX not found" >&2
  exit 1
fi

# Use python for the substitution — much safer than sed for multiline content
python3 - "$SRC_DIR" "$INDEX" "$OUT" << 'PYEOF'
import re
import sys
from pathlib import Path

src_dir = Path(sys.argv[1])
index_path = Path(sys.argv[2])
out_path = Path(sys.argv[3])

template = index_path.read_text(encoding="utf-8")

def read(rel_path):
    """Read a file relative to src_dir; raise on missing."""
    full = src_dir / rel_path
    if not full.exists():
        raise SystemExit(f"ERROR: referenced file not found: {full}")
    return full.read_text(encoding="utf-8").rstrip("\n")

def replace_stylesheets(html):
    pattern = re.compile(r'<link\s+rel=["\']stylesheet["\']\s+href=["\']([^"\']+)["\']\s*/?>')
    def sub(m):
        href = m.group(1)
        css = read(href)
        return f"<style>\n/* === inlined from {href} === */\n{css}\n</style>"
    return pattern.sub(sub, html)

def replace_scripts(html):
    # Only inline scripts that have src AND no inline body
    pattern = re.compile(r'<script\s+src=["\']([^"\']+)["\']\s*>\s*</script>')
    def sub(m):
        src = m.group(1)
        js = read(src)
        return f"<script>\n/* === inlined from {src} === */\n{js}\n</script>"
    return pattern.sub(sub, html)

def replace_includes(html):
    pattern = re.compile(r'<!--\s*@include\s+(\S+)\s*-->')
    def sub(m):
        path = m.group(1)
        content = read(path)
        return f"<!-- ==== begin {path} ==== -->\n{content}\n<!-- ==== end {path} ==== -->"
    return pattern.sub(sub, html)

# Order: includes first (so any links/scripts in fragments also get inlined),
# then scripts, then stylesheets.
out = replace_includes(template)
out = replace_scripts(out)
out = replace_stylesheets(out)

# Sanity: warn if any unresolved markers remain
remaining = re.findall(r'<!--\s*@include\s+\S+\s*-->', out)
if remaining:
    print("WARNING: unresolved @include markers:", remaining, file=sys.stderr)

out_path.write_text(out, encoding="utf-8")

src_size = sum(p.stat().st_size for p in src_dir.rglob("*") if p.is_file())
print(f"Built {out_path}")
print(f"  output size: {out_path.stat().st_size:,} bytes")
print(f"  source size: {src_size:,} bytes (modular-src/)")
print(f"  output lines: {len(out.splitlines()):,}")
PYEOF

echo "---"
echo "Done. Open ../DSC152-companion.html in a browser to verify."
