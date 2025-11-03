
import React from 'react';

interface HeaderProps {
  showBackButton: boolean;
  onChangeTopic: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onChangeTopic }) => {
  return (
    <header className="w-full max-w-4xl mb-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {showBackButton && (
          <button
            onClick={onChangeTopic}
            className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
            aria-label="Change topic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wider">
          TOEIC Typing Practice
        </h1>
      </div>
    </header>
  );
};

export default Header;
