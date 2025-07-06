import React from 'react';
import { History, Download, Clock, BookOpen } from 'lucide-react';
import { PracticeRecord } from '../types';

interface PracticeHistoryProps {
  records: PracticeRecord[];
  onDownload: () => void;
}

export function PracticeHistory({ records, onDownload }: PracticeHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  if (records.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-800">Today's Practice History</h2>
        </div>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download JSON
        </button>
      </div>

      <div className="space-y-4">
        {records.map((record, index) => (
          <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">{record.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{formatDate(record.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700 font-medium mb-1">Problem:</p>
              <p className="text-sm text-gray-600">{truncateText(record.problem, 150)}</p>
            </div>
            
            {record.audit && (
              <div className="mt-3 bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-700 font-medium mb-1">Audit Summary:</p>
                <p className="text-sm text-green-600">{truncateText(record.audit, 100)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}