type RGB = [ number, number, number ]

const colorNumberToRgb = (color: number): RGB => {
  return [
    Math.floor(color / (256*256)),
    Math.floor(color / 256) % 256,
    color % 256
  ]
}

const generateContrastColor = (foregroundColor: RGB, backgroundColor: RGB): any => {
  const foregroundLuminance = luminance(foregroundColor)
  const backgroundLuminance = luminance(backgroundColor)
  return backgroundLuminance < foregroundLuminance
    ? ((backgroundLuminance + 0.05) / (foregroundLuminance + 0.05))
    : ((foregroundLuminance + 0.05) / (backgroundLuminance + 0.05))
}

const rgbPartToHex = (rgbPart: number): string => {
	const hexadecimal = rgbPart.toString(16)
	return hexadecimal.length === 1 ? `0${ hexadecimal }` : hexadecimal
}

const colorRgbToHex = (rgb: RGB) => {
	return `#${ rgbPartToHex(rgb[0]) }${ rgbPartToHex(rgb[1]) }${ rgbPartToHex(rgb[2]) }`
}

const luminance = (rgb: RGB): number => {
  const [ r, g, b ] = rgb.map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

const colorHexToRgb = (hex: string): RGB => {
  hex = hex.slice(1)
  const value = parseInt(hex, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return [ r, g, b ]
}
