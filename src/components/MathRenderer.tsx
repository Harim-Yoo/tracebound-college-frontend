import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
}

export function MathRenderer({ content }: MathRendererProps) {
  const renderMathContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Handle display math \\[ ... \\]
    const displayMathRegex = /\\?\\\[(.*?)\\?\\\]/gs;
    let match;
    
    // First pass: handle display math
    const textAfterDisplay = text.replace(displayMathRegex, (match, mathContent) => {
      return `__DISPLAY_MATH_${mathContent}__`;
    });
    
    // Second pass: handle inline math \\( ... \\)
    const inlineMathRegex = /\\?\\\((.*?)\\?\\\)/gs;
    const segments = textAfterDisplay.split(inlineMathRegex);
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      
      if (i % 2 === 0) {
        // Regular text or display math placeholders
        if (segment.includes('__DISPLAY_MATH_')) {
          const displayParts = segment.split(/(__DISPLAY_MATH_.*?__)/);
          displayParts.forEach((part, idx) => {
            if (part.startsWith('__DISPLAY_MATH_') && part.endsWith('__')) {
              const mathContent = part.replace('__DISPLAY_MATH_', '').replace('__', '');
              parts.push(
                <div key={`display-${i}-${idx}`} className="math-display my-4">
                  <BlockMath math={mathContent.trim()} />
                </div>
              );
            } else if (part.trim()) {
              parts.push(<span key={`text-${i}-${idx}`}>{part}</span>);
            }
          });
        } else if (segment.trim()) {
          parts.push(<span key={`text-${i}`}>{segment}</span>);
        }
      } else {
        // Inline math content
        parts.push(
          <span key={`inline-${i}`} className="math-inline">
            <InlineMath math={segment.trim()} />
          </span>
        );
      }
    }
    
    return parts;
  };

  return <div className="math-content">{renderMathContent(content)}</div>;
}