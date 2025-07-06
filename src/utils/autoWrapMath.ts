export function autoWrapMath(text: string): string {
  if (!text) return '';

  let wrapped = text;

  // 이미 감싸진 수식은 제외
  if (wrapped.includes('\\(')) return wrapped;

  // 전체 표현 감싸기 패턴
  const patterns = [
    /(?<!\\)(p_\d+(?:\s*p_\d+)*\s*\\cdots\s*p_n\s*\+\s*1)/g,    // p_1 p_2 \cdots p_n + 1
    /(?<!\\)(N\s*>\s*p_i\s*for\s+all\s+i)/g,                     // N > p_i for all i
    /(?<!\\)(p_i\s*=\s*1,\s*2,\s*\\dots,\s*n)/g,                 // p_i = 1, 2, \dots, n
    /(?<!\\)(\\dots)/g,
    /(?<!\\)(\\cdot)/g,
    /(?<!\\)([a-zA-Z]+\^\d+)/g,
    /(?<!\\)(N\s*=\s*[^\\\n]+?\+1)/g
  ];

  for (const pattern of patterns) {
    wrapped = wrapped.replace(pattern, (_, expr) => `\\(${expr.trim()}\\)`);
  }

  return wrapped;
}
