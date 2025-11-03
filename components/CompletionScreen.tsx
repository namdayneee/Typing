
import React from 'react';
import { VocabularyTopic } from '../types';

interface CompletionScreenProps {
  topic: VocabularyTopic;
  onRestart: () => void;
  onChangeTopic: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ topic, onRestart, onChangeTopic }) => {
  return (
    <div className="text-center bg-slate-800 p-8 rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-400 mb-2">Topic Complete!</h2>
      <p className="text-xl text-slate-300 mb-6">
        You've practiced all words in <span className="font-semibold text-cyan-400 capitalize">{topic.title.toLowerCase()}</span>.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors duration-200 transform hover:scale-105"
        >
          Practice Again
        </button>
        <button
          onClick={onChangeTopic}
          className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-200"
        >
          Choose Another Topic
        </button>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default CompletionScreen;
