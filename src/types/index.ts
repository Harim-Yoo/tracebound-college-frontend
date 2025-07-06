export type Subject = 'Linear Algebra' | 'Real Analysis' | 'Number Theory' | 'Abstract Algebra';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  subject?: Subject;
  reasoning?: string;
  audit?: string;
  hallucinationScore?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  subject: Subject;
}