import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ChatSession, ChatMessage, Subject } from '../types';

export function useChatSessions() {
  const [sessions, setSessions] = useLocalStorage<ChatSession[]>('tracebound-sessions', []);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(
    sessions.length > 0 ? sessions[0].id : null
  );

  const createSession = useCallback((subject: Subject) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `New ${subject} Session`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      subject
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }, [setSessions]);

  const selectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    
    // If we deleted the current session, select another one
    if (currentSessionId === sessionId) {
      setSessions(prev => {
        const remaining = prev.filter(s => s.id !== sessionId);
        setCurrentSessionId(remaining.length > 0 ? remaining[0].id : null);
        return remaining;
      });
    }
  }, [setSessions, currentSessionId]);

  const addMessage = useCallback((message: ChatMessage) => {
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        const updatedMessages = [...session.messages, message];
        
        // Update session title based on first user message
        let title = session.title;
        if (message.type === 'user' && session.messages.filter(m => m.type === 'user').length === 0) {
          title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
        }
        
        return {
          ...session,
          title,
          messages: updatedMessages,
          updatedAt: Date.now()
        };
      }
      return session;
    }));
  }, [setSessions, currentSessionId]);

  const exportSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const exportData = {
      session: {
        title: session.title,
        subject: session.subject,
        createdAt: new Date(session.createdAt).toISOString(),
        updatedAt: new Date(session.updatedAt).toISOString()
      },
      messages: session.messages.map(msg => ({
        type: msg.type,
        content: msg.content,
        timestamp: new Date(msg.timestamp).toISOString(),
        subject: msg.subject,
        reasoning: msg.reasoning,
        audit: msg.audit,
        hallucinationScore: msg.hallucinationScore
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracebound-session-${session.title.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId) || null;

  return {
    sessions,
    currentSession,
    currentSessionId,
    createSession,
    selectSession,
    deleteSession,
    addMessage,
    exportSession
  };
}