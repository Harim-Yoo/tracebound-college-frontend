import React from 'react';
import { BookOpen } from 'lucide-react';
import { Subject } from '../types';

interface SubjectSelectorProps {
  selectedSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

const subjects: Subject[] = ['Linear Algebra', 'Real Analysis', 'Number Theory', 'Abstract Algebra'];

const subjectIcons = {
  'Linear Algebra': '📐',
  'Real Analysis': '📊',
  'Number Theory': '🔢',
  'Abstract Algebra': '🧮'
};

export function SubjectSelector({ selectedSubject, onSubjectChange }: SubjectSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <BookOpen className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Select Your Subject</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSubjectChange(subject)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedSubject === subject
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{subjectIcons[subject]}</div>
              <div className={`text-sm font-medium ${
                selectedSubject === subject ? 'text-purple-700' : 'text-gray-700'
              }`}>
                {subject}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}