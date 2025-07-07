import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  content: string;
}

export function MathRenderer({ content }: MathRendererProps) {
  const renderMathContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    
    // Handle display math first: \[ ... \] or $$ ... $$
    let processedText = text;
    
    // Replace display math with placeholders
    const displayMathMatches: { placeholder: string; content: string }[] = [];
    let displayIndex = 0;
    
    // Handle \[ ... \]
    processedText = processedText.replace(/\\\[(.*?)\\\]/gs, (match, mathContent) => {
      const placeholder = `__DISPLAY_MATH_${displayIndex}__`;
      displayMathMatches.push({ placeholder, content: mathContent.trim() });
      displayIndex++;
      return placeholder;
    });
    
    // Handle $$ ... $$
    processedText = processedText.replace(/\$\$(.*?)\$\$/gs, (match, mathContent) => {
      const placeholder = `__DISPLAY_MATH_${displayIndex}__`;
      displayMathMatches.push({ placeholder, content: mathContent.trim() });
      displayIndex++;
      return placeholder;
    });
    
    // Now handle inline math: \( ... \) or $ ... $
    const inlineMathMatches: { placeholder: string; content: string }[] = [];
    let inlineIndex = 0;
    
    // Handle \( ... \)
    processedText = processedText.replace(/\\\((.*?)\\\)/gs, (match, mathContent) => {
      const placeholder = `__INLINE_MATH_${inlineIndex}__`;
      inlineMathMatches.push({ placeholder, content: mathContent.trim() });
      inlineIndex++;
      return placeholder;
    });
    
    // Handle single $ ... $ (but not $$)
    processedText = processedText.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (match, mathContent) => {
      const placeholder = `__INLINE_MATH_${inlineIndex}__`;
      inlineMathMatches.push({ placeholder, content: mathContent.trim() });
      inlineIndex++;
      return placeholder;
    });
    
    // Split by display math placeholders first
    const displayParts = processedText.split(/(__DISPLAY_MATH_\d+__)/);
    
    displayParts.forEach((part, idx) => {
      const displayMatch = displayMathMatches.find(m => m.placeholder === part);
      if (displayMatch) {
        // This is a display math block
        parts.push(
          <div key={`display-${idx}`} className="math-display my-4">
            <BlockMath math={displayMatch.content} />
          </div>
        );
      } else {
        // This might contain inline math, process it
        const inlineParts = part.split(/(__INLINE_MATH_\d+__)/);
        
        inlineParts.forEach((inlinePart, inlineIdx) => {
          const inlineMatch = inlineMathMatches.find(m => m.placeholder === inlinePart);
          if (inlineMatch) {
            // This is inline math
            parts.push(
              <span key={`inline-${idx}-${inlineIdx}`} className="math-inline">
                <InlineMath math={inlineMatch.content} />
              </span>
            );
          } else if (inlinePart.trim()) {
            // Regular text
            parts.push(<span key={`text-${idx}-${inlineIdx}`}>{inlinePart}</span>);
          }
        });
      }
    });
    
    return parts.length > 0 ? parts : [<span key="fallback">{text}</span>];
  };

  return <div className="math-content">{renderMathContent(content)}</div>;
}