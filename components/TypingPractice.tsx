import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { VocabularyTopic, VocabularyWord } from '../types';

interface TypingPracticeProps {
  topic: VocabularyTopic;
  onFinish: () => void;
}

// Fisher-Yates shuffle algorithm to randomize words
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};


const Word = React.memo(({ word, isTyped, isActive, userInput }: { word: VocabularyWord; isTyped: boolean; isActive: boolean; userInput: string; }) => {
  if (isActive) {
    const characters = word.english.split('');
    return (
      <span className="relative">
        {characters.map((char, index) => {
          let charClass = 'text-slate-500'; // Untyped
          if (index < userInput.length) {
            charClass = userInput[index] === char ? 'text-slate-100' : 'text-red-500';
          }
          return <span key={index} className={charClass}>{char}</span>;
        })}
        {/* Blinking Caret */}
        <span 
          className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 animate-blink"
          style={{ left: `${userInput.length}ch` }}
        />
      </span>
    );
  }

  return (
    <span className={isTyped ? 'text-slate-400' : 'text-slate-500'}>
      {word.english}
    </span>
  );
});


const TypingPractice: React.FC<TypingPracticeProps> = ({ topic, onFinish }) => {
  const [words] = useState(() => shuffleArray(topic.words));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [lastTranslation, setLastTranslation] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const currentWord = useMemo(() => words[currentWordIndex] || null, [words, currentWordIndex]);
  const progress = useMemo(() => (currentWordIndex / words.length) * 100, [currentWordIndex, words.length]);

  // Focus the main container to capture key events
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!currentWord) return;

    // Prevent default browser actions for keys we handle
    if (e.key === ' ' || e.key === 'Backspace') {
      e.preventDefault();
    }
    
    if (e.key.length === 1 && e.key !== ' ') { // Regular character input
      setInputValue(prev => prev + e.key);
    } else if (e.key === 'Backspace') { // Handle backspace
      setInputValue(prev => prev.slice(0, -1));
    } else if (e.key === ' ') { // Handle spacebar
      // Case 1: The typed word is correct, and space is for submission.
      if (inputValue === currentWord.english) {
        setLastTranslation(currentWord.vietnamese);
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
          setInputValue('');
        } else {
          onFinish();
        }
      // Case 2: The space is part of the multi-word phrase.
      } else if (currentWord.english.startsWith(inputValue + ' ')) {
        setInputValue(prev => prev + ' ');
      }
      // Case 3: Incorrect word + space. Do nothing.
    }
  }, [currentWord, inputValue, currentWordIndex, words.length, onFinish]);

  useEffect(() => {
    const ref = containerRef.current;
    ref?.addEventListener('keydown', handleKeyDown);
    return () => {
      ref?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <div className="w-full max-w-3xl text-center flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
      </div>
      <p className="text-slate-400 mb-6">{currentWordIndex} / {words.length}</p>
      
      {/* Words Container */}
      <div
        ref={containerRef}
        tabIndex={0} // Makes the div focusable
        className="w-full text-2xl md:text-3xl leading-relaxed font-mono tracking-wide text-left p-6 bg-slate-800 rounded-lg h-48 overflow-y-auto mb-6 cursor-text outline-none focus:ring-2 focus:ring-cyan-600"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {words.map((word, index) => (
            <Word
              key={`${word.english}-${index}`}
              word={word}
              isTyped={index < currentWordIndex}
              isActive={index === currentWordIndex}
              userInput={inputValue}
            />
          ))}
        </div>
      </div>

      {/* Translation Display */}
      <div className="h-10 mb-6 flex items-center justify-center">
        {lastTranslation && (
          <p className="text-xl text-emerald-400 animate-fade-in" lang="vi">
            {lastTranslation}
          </p>
        )}
      </div>

      {/* Helper text */}
      <p className="text-slate-500">Click on the text box and start typing.</p>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blink {
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { background-color: transparent; }
          50% { background-color: #22d3ee; } /* cyan-400 */
        }
      `}</style>
    </div>
  );
};

export default TypingPractice;