import { formatHex, lch } from "culori";

//https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch
interface LchColor {
  l:number;
  c:number;
  h: number;
}

interface LchColorMode extends LchColor {
  mode: string;
}


interface HueShiftPaletteOptions {
  base: LchColor,
  minLightness: number;
  maxLightness: number;
  hueStep: number;
  numberOfColor: number;
}

function adjustHue(value: number) : number {
  if (value < 0) value += Math.ceil(-value / 360) * 360;

  return value % 360;
}

type targetHueStepsType = "analogous"|"triadic"|"tetradic"|"complementary"|"splitComplementary";
const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210]
  };

export function createScientificPalettes(baseColor : LchColor, type: targetHueStepsType) : string[] {
  const palette = targetHueSteps[type].map((step) => (
    {
      l: baseColor.l,
      c: baseColor.c,
      h: adjustHue(baseColor.h + step),
      mode: "lch"
    })
  );
  // eslint-disable-next-line no-console
  return palette.map(color => formatHex(color) as string);
}

function map(n: number, start1:number, end1: number, start2: number, end2: number) : number {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export function createHueShiftPalette(options: HueShiftPaletteOptions) : string[] {
  const { base, minLightness, maxLightness, hueStep, numberOfColor } = options;

  const baseToColoriBase = {...base, mode: "lch"};
  let palette : LchColorMode[] = [];

  const numberOfLightColors = Math.floor(numberOfColor/2);
  //lighterColor
  for(let i = 1; i <= numberOfLightColors; i++) {
    const lightnessLight = map(i, 0, numberOfLightColors, base.l, maxLightness);
    const chroma = base.c;
    const hueLight = adjustHue(base.h + hueStep * i);

    palette = [
      {
        l: lightnessLight,
        c: chroma,
        h: hueLight,
        mode: "lch"
      },
      ...palette,
    ];
  }

  palette = [...palette, baseToColoriBase];

  //darkerColor
  const numberOfDarkColors = numberOfColor - palette.length;

  for(let i = 1; i <= numberOfDarkColors; i++) {
    const lightnessDark = map(i, 0, numberOfDarkColors, base.l, minLightness);
    const chroma = base.c;
    const hueDark = adjustHue(base.h - hueStep * i);

    palette = [
      ...palette,
      {
        l: lightnessDark,
        c: chroma,
        h: hueDark,
        mode: "lch"
      }
    ];
  }
  // eslint-disable-next-line
  const hexArray : string[] = palette.map(color => formatHex(color) as string);
  return hexArray;
}

export function fromHexToLCH(hex: string) {
  return lch(hex);
}