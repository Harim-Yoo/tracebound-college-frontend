import React from 'react';
import { Plus, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { ChatSession, Subject } from '../types';

interface SessionManagerProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onCreateSession: (subject: Subject) => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const subjects: Subject[] = ['Linear Algebra', 'Real Analysis', 'Number Theory', 'Abstract Algebra'];

const subjectIcons = {
  'Linear Algebra': '📐',
  'Real Analysis': '📊',
  'Number Theory': '🔢',
  'Abstract Algebra': '🧮'
};

export function SessionManager({ 
  sessions, 
  currentSessionId, 
  onCreateSession, 
  onSelectSession, 
  onDeleteSession 
}: SessionManagerProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateTitle = (title: string, maxLength: number = 30) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sessions</h2>
        
        {/* New Session Buttons */}
        <div className="space-y-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => onCreateSession(subject)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-50 rounded-lg transition-colors border border-gray-200 hover:border-purple-300"
            >
              <div className="text-lg">{subjectIcons[subject]}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">New {subject}</div>
                <div className="text-xs text-gray-500">Start a new session</div>
              </div>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No sessions yet</p>
            <p className="text-xs">Create a new session to get started</p>
          </div>
        ) : (
          <div className="p-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors group ${
                  currentSessionId === session.id
                    ? 'bg-purple-100 border border-purple-300'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
                onClick={() => onSelectSession(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{subjectIcons[session.subject]}</span>
                      <span className="text-xs text-gray-500 font-medium">{session.subject}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      {truncateTitle(session.title)}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(session.updatedAt)}</span>
                      <span className="ml-2">
                        {session.messages.filter(m => m.type === 'user').length} problems
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}