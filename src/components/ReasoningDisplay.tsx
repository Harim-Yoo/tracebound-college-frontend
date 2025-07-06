import React, { useEffect, useRef } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Brain, Search, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReasoningDisplayProps {
  reasoning: string;
  audit: string;
  isLoading: boolean;
}

const mathJaxConfig = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    packages: { "[+]": ["ams"] },
  },
};

export function ReasoningDisplay({ reasoning, audit, isLoading }: ReasoningDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 강제로 MathJax 렌더링 트리거
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise();
    }
  }, [reasoning, audit]);

  const renderInlineLatex = (text: string, index: number) => {
    const parts = text.split(/(\\\(.*?\\\))/g); // \( ... \) 구분

    return (
      <p key={index} className="text-gray-600 mb-3 leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith("\\(") && part.endsWith("\\)")) {
            const latex = part.slice(2, -2).trim();
            return <MathJax key={i}>{`\\(${latex}\\)`}</MathJax>;
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (trimmed === '') return <br key={index} />;

      if (trimmed.startsWith('\\[') && trimmed.endsWith('\\]')) {
        const latex = trimmed.slice(2, -2).trim();
        return (
          <div key={index} className="text-gray-600 mb-4 bg-gray-50 p-4 rounded text-center font-mono">
            <MathJax>{`\\[${latex}\\]`}</MathJax>
          </div>
        );
      }

      if (trimmed.includes('\\(') && trimmed.includes('\\)')) {
        return renderInlineLatex(trimmed, index);
      }

      if (trimmed.startsWith('Step ')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r">
            <h4 className="font-semibold text-blue-800 mb-2">{trimmed}</h4>
          </div>
        );
      }

      if (trimmed.startsWith('Intermediate Formal Check:')) {
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-400 p-3 mb-3 rounded-r ml-4">
            <p className="text-green-700 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              {trimmed.replace('Intermediate Formal Check:', '').trim()}
            </p>
          </div>
        );
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-xl text-gray-800 mt-6 mb-3 text-purple-700 flex items-center gap-2">
            {trimmed.slice(2, -2)}
          </h3>
        );
      }

      if (trimmed.startsWith('*') && trimmed.endsWith('*')) {
        return (
          <h4 key={index} className="font-semibold text-lg text-gray-700 mt-4 mb-2 flex items-center gap-2">
            {trimmed.slice(1, -1)}
          </h4>
        );
      }

      if (trimmed.startsWith('-')) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-disc leading-relaxed">
            {trimmed.slice(1).trim()}
          </li>
        );
      }

      if (/^\d+\./.test(trimmed)) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-decimal leading-relaxed">
            {trimmed.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }

      if (trimmed.includes('✅')) {
        return (
          <div key={index} className="bg-green-50 border border-green-200 p-3 mb-2 rounded flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">{trimmed}</span>
          </div>
        );
      }

      if (trimmed.includes('❌')) {
        return (
          <div key={index} className="bg-red-50 border border-red-200 p-3 mb-2 rounded flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{trimmed}</span>
          </div>
        );
      }

      return (
        <p key={index} className="text-gray-600 mb-3 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Generating Transparent Reasoning...</h3>
            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!reasoning && !audit) return null;

  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <div className="w-full max-w-4xl mx-auto space-y-8" ref={contentRef}>
        {reasoning && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Transparent Reasoning (AI)</h3>
            </div>
            <div className="prose max-w-none">{formatContent(reasoning)}</div>
          </div>
        )}

        {audit && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-800">Self-Audit Result</h3>
            </div>
            <div className="prose max-w-none">{formatContent(audit)}</div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
}
