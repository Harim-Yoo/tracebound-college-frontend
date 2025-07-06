import React from 'react';
import { MathJax } from 'better-react-mathjax';
import { Brain, Search, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { autoWrapMath } from '../utils/autoWrapMath';

interface ReasoningDisplayProps {
  reasoning: string;
  audit: string;
  isLoading: boolean;
}

export function ReasoningDisplay({ reasoning, audit, isLoading }: ReasoningDisplayProps) {
  const renderInlineLatex = (text: string, index: number) => {
    const parts = text.split(/(\\\(.*?\\\))/g);
    return (
      <p key={index} className="text-gray-600 mb-3 leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith("\\(") && part.endsWith("\\)")) {
            return <MathJax key={i} inline>{part}</MathJax>;
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      const wrapped = autoWrapMath(trimmed);

      if (wrapped === '') return <br key={index} />;

      if (wrapped.startsWith('\\[') && wrapped.endsWith('\\]')) {
        return (
          <div key={index} className="text-gray-600 mb-4 bg-gray-50 p-4 rounded text-center font-mono">
            <MathJax>{wrapped}</MathJax>
          </div>
        );
      }

      if (wrapped.includes('\\(') && wrapped.includes('\\)')) {
        return renderInlineLatex(wrapped, index);
      }

      if (wrapped.startsWith('Step ')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r">
            <h4 className="font-semibold text-blue-800 mb-2">{wrapped}</h4>
          </div>
        );
      }

      if (wrapped.startsWith('Intermediate Formal Check:')) {
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-400 p-3 mb-3 rounded-r ml-4">
            <p className="text-green-700 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              {wrapped.replace('Intermediate Formal Check:', '').trim()}
            </p>
          </div>
        );
      }

      if (wrapped.startsWith('**') && wrapped.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-xl text-gray-800 mt-6 mb-3 text-purple-700 flex items-center gap-2">
            {wrapped.slice(2, -2)}
          </h3>
        );
      }

      if (wrapped.startsWith('*') && wrapped.endsWith('*')) {
        return (
          <h4 key={index} className="font-semibold text-lg text-gray-700 mt-4 mb-2 flex items-center gap-2">
            {wrapped.slice(1, -1)}
          </h4>
        );
      }

      if (wrapped.startsWith('-')) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-disc leading-relaxed">
            {wrapped.slice(1).trim()}
          </li>
        );
      }

      if (/^\d+\./.test(wrapped)) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-decimal leading-relaxed">
            {wrapped.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }

      if (wrapped.includes('✅')) {
        return (
          <div key={index} className="bg-green-50 border border-green-200 p-3 mb-2 rounded flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">{wrapped}</span>
          </div>
        );
      }

      if (wrapped.includes('❌')) {
        return (
          <div key={index} className="bg-red-50 border border-red-200 p-3 mb-2 rounded flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{wrapped}</span>
          </div>
        );
      }

      return (
        <p key={index} className="text-gray-600 mb-3 leading-relaxed">
          {wrapped}
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {reasoning && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Transparent Reasoning (AI)</h3>
          </div>
          <div>{formatContent(reasoning)}</div>
        </div>
      )}

      {audit && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-800">Self-Audit Result</h3>
          </div>
          <div>{formatContent(audit)}</div>
        </div>
      )}
    </div>
  );
}
