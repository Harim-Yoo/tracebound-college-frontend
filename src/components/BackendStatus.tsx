import React, { useState, useEffect } from 'react';
import { Server, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export function BackendStatus() {
  const [status] = useState<'online'>('online'); // Always online for frontend-only
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    setLastCheck(new Date());
  }, []);

  return (
    <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-700 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4" />
          <CheckCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Frontend Demo Mode</span>
        </div>
        <RefreshCw className="w-3 h-3" />
      </div>
      <p className="text-xs mt-1">Using mock API responses for demonstration</p>
      {lastCheck && (
        <p className="text-xs text-blue-500 mt-1">
          Status: {lastCheck.toLocaleTimeString()}
        </p>
      )}
      
      <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
        <p className="font-medium text-blue-800">🎭 Demo Mode Active</p>
        <p className="text-blue-700">
          This frontend shows pre-written mathematical solutions. Connect a real backend for AI-powered reasoning!
        </p>
      </div>
    </div>
  );
}