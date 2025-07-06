import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface UsageTrackerProps {
  usedAttempts: number;
  maxAttempts: number;
}

export function UsageTracker({ usedAttempts, maxAttempts }: UsageTrackerProps) {
  const remainingAttempts = maxAttempts - usedAttempts;
  const percentage = (usedAttempts / maxAttempts) * 100;

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">Today's Usage</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Remaining Attempts</span>
            <span className="text-sm font-semibold text-gray-800">{remainingAttempts}/{maxAttempts}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                percentage > 80 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {remainingAttempts <= 2 && (
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span>You're running low on attempts for today!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}