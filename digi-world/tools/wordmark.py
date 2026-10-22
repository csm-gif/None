"""Generate the Digi World wordmark as SVG paths from IBM Plex Sans (wght 600).
Usage: python3 tools/wordmark.py src/assets/fonts/ibm-plex-sans-latin-wght-normal.woff2 > src/partials/wordmark-paths.json
The two i-dots are replaced by square "signal points" drawn separately in the accent colour."""
import sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

font = instantiateVariableFont(TTFont(sys.argv[1]), {"wght": 600})
cmap, gs, hmtx = font.getBestCmap(), font.getGlyphSet(), font["hmtx"]
upm = font["head"].unitsPerEm
text = "Digi World"
x, parts, dots, kern = 0, [], [], -6
dotless_i = cmap.get(0x0131)
i_glyph = cmap[ord("i")]
for ch in text:
    if ch == " ":
        x += hmtx[cmap[32]][0] * 0.9
        continue
    gname = dotless_i if ch == "i" else cmap[ord(ch)]
    pen = SVGPathPen(gs)
    gs[gname].draw(pen)
    parts.append((x, pen.getCommands()))
    if ch == "i":
        bp = BoundsPen(gs); gs[gname].draw(bp)
        xmin, ymin, xmax, ymax = bp.bounds
        w = xmax - xmin
        dots.append({"x": x + xmin, "y": ymax + 70, "s": w})
    x += hmtx[gname][0] + kern
asc = 760  # cap/dot height area
desc = 40
path = " ".join(f'<path transform="translate({px:.0f} 0)" d="{d}"/>' for px, d in parts)
print(json.dumps({"width": round(x), "upm": upm, "top": asc + 120, "bottom": desc, "paths": path, "dots": dots}))
