// src/utils/autoWrapMath.ts

export function autoWrapMath(text: string): string {
  if (!text) return '';

  let wrapped = text
    .replace(/(?<!\\)\b(p_\d+)\b/g, '\\($1\\)')
    .replace(/\\dots/g, '\\(\\dots\\)')
    .replace(/\\cdot/g, '\\(\\cdot\\)')
    .replace(/(?<!\\)\b[a-zA-Z]+\^\d+\b/g, (match) => `\\(${match}\\)`)
    .replace(/(?<!\\)N\s*=\s*[^\\\n]+?\+1/g, (match) => `\\(${match}\\)`);

  return wrapped;
}
