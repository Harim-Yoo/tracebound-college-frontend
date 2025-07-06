import React from 'react';
import { Edit3 } from 'lucide-react';

interface ProblemInputProps {
  problem: string;
  onProblemChange: (problem: string) => void;
}

export function ProblemInput({ problem, onProblemChange }: ProblemInputProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <Edit3 className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Problem Input</h2>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        <textarea
          value={problem}
          onChange={(e) => onProblemChange(e.target.value)}
          placeholder="Enter your university-level mathematics problem here...

Example:
- Find the basis for the vector space spanned by vectors v₁ = (1, 2, 3), v₂ = (4, 5, 6)
- Prove that the sequence aₙ = (n² + 1)/(2n² - 1) converges to 1/2
- Using Euclidean algorithm, find gcd(1071, 462)"
          className="w-full h-64 p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white/50 backdrop-blur-sm"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
        />
        
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <p className="text-sm text-green-700">
            <span className="font-semibold">💡 Tip:</span> Be specific about what you want to prove, solve, or analyze. Include all relevant conditions and constraints for the best results.
          </p>
        </div>
      </div>
    </div>
  );
}