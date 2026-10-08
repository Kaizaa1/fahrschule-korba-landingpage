from __future__ import annotations

import argparse
import colorsys
from pathlib import Path

from PIL import Image


def recolor_warm_accents(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    recolored: list[tuple[int, int, int]] = []

    for index, (red, green, blue) in enumerate(image.get_flattened_data()):
        hue, saturation, value = colorsys.rgb_to_hsv(red / 255, green / 255, blue / 255)
        degrees = hue * 360
        x = index % image.width

        if x < 1050 and 18 <= degrees <= 62 and saturation >= 0.56 and value >= 0.64:
            target_hue = 220 / 360
            target_saturation = min(0.78, max(0.38, saturation * 1.05))
            new_red, new_green, new_blue = colorsys.hsv_to_rgb(target_hue, target_saturation, value)
            recolored.append(
                (round(new_red * 255), round(new_green * 255), round(new_blue * 255))
            )
        else:
            recolored.append((red, green, blue))

    image.putdata(recolored)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, "WEBP", quality=92, method=6)
    print(f"{output}: {image.width}x{image.height}, RGB")


def main() -> None:
    parser = argparse.ArgumentParser(description="Färbt warme App-Akzente in Korba-Markenblau um.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    recolor_warm_accents(args.source, args.output)


if __name__ == "__main__":
    main()
