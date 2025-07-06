import React from 'react';
import { GraduationCap, Sparkles, LogOut } from 'lucide-react';
import { MathJaxContext } from 'better-react-mathjax';

import { AuthScreen } from './components/AuthScreen';
import { ChatInterface } from './components/ChatInterface';
import { SessionManager } from './components/SessionManager';
import { useChatSessions } from './hooks/useChatSessions';
import { useAuth } from './hooks/useAuth';

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
};

function App() {
  const { isAuthenticated, authenticate, logout } = useAuth();
  const {
    sessions,
    currentSession,
    currentSessionId,
    createSession,
    selectSession,
    deleteSession,
    addMessage,
    exportSession
  } = useChatSessions();

  const handleExportSession = () => {
    if (currentSessionId) {
      exportSession(currentSessionId);
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={authenticate} />;
  }

  return (
    <MathJaxContext version={3} config={mathJaxConfig}>
      <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tracebound
              </h1>
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-600 mt-2 font-medium">College</p>
            <p className="text-sm text-gray-500 mt-1">
              Transparent Mathematical Reasoning for University-Level Mathematics
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Session Sidebar */}
          <SessionManager
            sessions={sessions}
            currentSessionId={currentSessionId}
            onCreateSession={createSession}
            onSelectSession={selectSession}
            onDeleteSession={deleteSession}
          />

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            {currentSession ? (
              <ChatInterface
                subject={currentSession.subject}
                messages={currentSession.messages}
                onAddMessage={addMessage}
                onExportSession={handleExportSession}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to Tracebound College</h2>
                  <p className="text-gray-500 mb-6">
                    Create a new session to start solving university-level mathematics problems with transparent, axiomatic reasoning.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Linear Algebra', 'Real Analysis', 'Number Theory', 'Abstract Algebra'].map((subject) => (
                      <button
                        key={subject}
                        onClick={() => createSession(subject as any)}
                        className="p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-sm font-medium text-gray-700"
                      >
                        Start {subject}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default App;
