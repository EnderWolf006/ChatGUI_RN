/**
 * Color conversion utility functions
 */

/**
 * Parse color string and return RGB values
 * @param color - Color string (supports hex, rgb, rgba formats)
 * @returns RGB object { r, g, b, a? }
 */
const parseColor = (color: string): { r: number; g: number; b: number; a?: number } => {
  // Remove whitespace
  color = color.trim();

  // HEX format (#RRGGBB or #RGB)
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      // #RGB -> #RRGGBB
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b };
    } else if (hex.length === 6) {
      // #RRGGBB
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }
  }

  // RGB or RGBA format
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const values = rgbMatch[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length >= 3) {
      const [r, g, b, a] = values;
      return a !== undefined ? { r, g, b, a } : { r, g, b };
    }
  }

  throw new Error(`Cannot parse color format: ${color}`);
};

/**
 * Convert any color format to RGBA format
 * @param color - Color string
 * @param alpha - Opacity (0-1), if not provided, uses original opacity or defaults to 1
 * @returns RGBA format string
 */
export const toRgba = (color: string, alpha?: number): string => {
  const parsed = parseColor(color);
  const a = alpha !== undefined ? alpha : (parsed.a !== undefined ? parsed.a : 1);
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${a})`;
};

/**
 * Convert any color format to HEX format
 * @param color - Color string
 * @returns HEX format string (#RRGGBB)
 */
export const toHex = (color: string): string => {
  const parsed = parseColor(color);
  const toHexComponent = (value: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, value))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHexComponent(parsed.r)}${toHexComponent(parsed.g)}${toHexComponent(parsed.b)}`;
};
