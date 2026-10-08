from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images"


def _crop_with_padding(image: Image.Image, bbox: tuple[int, int, int, int], padding: int) -> Image.Image:
    left, top, right, bottom = bbox
    return image.crop(
        (
            max(0, left - padding),
            max(0, top - padding),
            min(image.width, right + padding),
            min(image.height, bottom + padding),
        )
    )


def _remove_light_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = []

    for red, green, blue, _ in rgba.get_flattened_data():
        darkest = min(red, green, blue)
        spread = max(red, green, blue) - darkest
        if darkest >= 248 and spread < 20:
            alpha = 0
        elif darkest <= 238 or spread >= 20:
            alpha = 255
        else:
            alpha = round((248 - darkest) * 255 / 10)
        if alpha < 64:
            alpha = 0
        pixels.append((red, green, blue, alpha))

    rgba.putdata(pixels)
    return rgba


def _save_logo_assets(source: Path) -> tuple[Path, Path]:
    logo = _remove_light_background(Image.open(source))
    full_bbox = logo.getchannel("A").getbbox()
    if full_bbox is None:
        raise ValueError("Logo enthält nach der Freistellung keine sichtbaren Pixel.")

    full = _crop_with_padding(logo, full_bbox, 28)
    full_path = OUTPUT_DIR / "korba-logo-full.png"
    full.save(full_path, optimize=True)

    # Das Signet ist der oberste, durch Weißraum klar getrennte Bereich des 1:1-Logos.
    mark_region = logo.crop((0, 0, logo.width, min(710, logo.height)))
    mark_bbox = mark_region.getchannel("A").getbbox()
    if mark_bbox is None:
        raise ValueError("Im Logo wurde kein FK-Signet gefunden.")

    mark = _crop_with_padding(mark_region, mark_bbox, 24)
    mark_path = OUTPUT_DIR / "korba-logo-mark.png"
    mark.save(mark_path, optimize=True)
    return full_path, mark_path


def _save_car_asset(source: Path, filename: str) -> Path:
    car = Image.open(source).convert("RGBA")
    bbox = car.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError(f"{source.name} enthält keine sichtbaren Pixel.")

    trimmed = _crop_with_padding(car, bbox, 16)
    output = OUTPUT_DIR / filename
    trimmed.save(output, optimize=True)
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description="Bereitet die freigegebenen Korba-Markenassets auf.")
    parser.add_argument("--logo", required=True, type=Path)
    parser.add_argument("--hero-car", required=True, type=Path)
    parser.add_argument("--team-car", required=True, type=Path)
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    outputs = [
        *_save_logo_assets(args.logo),
        _save_car_asset(args.hero_car, "korba-touareg-hero.png"),
        _save_car_asset(args.team_car, "korba-touareg-team.png"),
    ]

    for output in outputs:
        image = Image.open(output)
        alpha = image.getchannel("A").getextrema()
        print(f"{output.name}: {image.width}x{image.height}, {image.mode}, alpha={alpha}")


if __name__ == "__main__":
    main()
