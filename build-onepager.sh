#!/usr/bin/env bash
# Rebuild the one-page PDF summary from onepager.typ.
#
# Uses the Typst binary bundled inside the installed Rubric flatpak, so the PDF
# is produced by exactly the engine the apps ship with. Override with TYPST=...
set -euo pipefail
cd "$(dirname "$0")"

TYPST="${TYPST:-$HOME/.local/share/flatpak/app/io.github.calstfrancis.rubric/current/active/files/bin/typst}"
if [ ! -x "$TYPST" ]; then
  echo "typst not found at $TYPST — install the Rubric flatpak or set TYPST=/path/to/typst" >&2
  exit 1
fi

"$TYPST" compile onepager.typ cal-st-francis.pdf
echo "Wrote cal-st-francis.pdf ($(du -h cal-st-francis.pdf | cut -f1))"
