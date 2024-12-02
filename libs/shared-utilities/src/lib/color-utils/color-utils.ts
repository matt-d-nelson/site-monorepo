export function HexToRGB(hex: string) {
  hex = hex.replace(/^#/, '')

  const bigInt = parseInt(hex, 16)
  return {
    r: (bigInt >> 16) & 255,
    g: (bigInt >> 8) & 255,
    b: bigInt & 255,
  }
}
