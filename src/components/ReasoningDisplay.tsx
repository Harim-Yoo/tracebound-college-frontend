import React from 'react';
import { Brain, Search, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReasoningDisplayProps {
  reasoning: string;
  audit: string;
  isLoading: boolean;
}

export function ReasoningDisplay({ reasoning, audit, isLoading }: ReasoningDisplayProps) {
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Handle LaTeX math expressions
      if (line.includes('\\(') && line.includes('\\)')) {
        return (
          <p key={index} className="text-gray-600 mb-3 leading-relaxed font-mono bg-gray-50 p-2 rounded">
            {line}
          </p>
        );
      }
      
      if (line.includes('\\[') && line.includes('\\]')) {
        return (
          <div key={index} className="text-gray-600 mb-4 leading-relaxed font-mono bg-gray-50 p-4 rounded text-center">
            {line}
          </div>
        );
      }
      
      // Handle step formatting
      if (line.startsWith('Step ')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r">
            <h4 className="font-semibold text-blue-800 mb-2">{line}</h4>
          </div>
        );
      }
      
      if (line.startsWith('Intermediate Formal Check:')) {
        return (
          <div key={index} className="bg-green-50 border-l-4 border-green-400 p-3 mb-3 rounded-r ml-4">
            <p className="text-green-700 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              {line.replace('Intermediate Formal Check:', '').trim()}
            </p>
          </div>
        );
      }
      
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-xl text-gray-800 mt-6 mb-3 text-purple-700 flex items-center gap-2">
            {line.slice(2, -2)}
          </h3>
        );
      }
      
      if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <h4 key={index} className="font-semibold text-lg text-gray-700 mt-4 mb-2 flex items-center gap-2">
            {line.slice(1, -1)}
          </h4>
        );
      }
      
      if (line.trim().startsWith('-')) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-disc leading-relaxed">
            {line.trim().slice(1).trim()}
          </li>
        );
      }
      
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="ml-6 text-gray-600 mb-2 list-decimal leading-relaxed">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      
      // Handle special audit indicators
      if (line.includes('✅')) {
        return (
          <div key={index} className="bg-green-50 border border-green-200 p-3 mb-2 rounded flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700">{line}</span>
          </div>
        );
      }
      
      if (line.includes('❌')) {
        return (
          <div key={index} className="bg-red-50 border border-red-200 p-3 mb-2 rounded flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{line}</span>
          </div>
        );
      }
      
      return (
        <p key={index} className="text-gray-600 mb-3 leading-relaxed">
          {line}
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

  if (!reasoning && !audit) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {reasoning && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Transparent Reasoning (AI)</h3>
          </div>
          <div className="prose max-w-none">
            {formatContent(reasoning)}
          </div>
        </div>
      )}

      {audit && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-800">Self-Audit Result</h3>
          </div>
          <div className="prose max-w-none">
            {formatContent(audit)}
          </div>
        </div>
      )}
    </div>
  );
}