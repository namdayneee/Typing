
import React from 'react';
import { VocabularyTopic } from '../types';

interface TopicSelectorProps {
  topics: VocabularyTopic[];
  onSelectTopic: (topic: VocabularyTopic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="w-full text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-2">Select a Topic</h2>
      <p className="text-slate-400 mb-10">Choose a vocabulary set to start practicing.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="bg-slate-800 p-4 rounded-lg shadow-lg hover:bg-slate-700 hover:ring-2 hover:ring-cyan-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <p className="font-bold text-lg text-white capitalize">{topic.title.toLowerCase()}</p>
            <p className="text-sm text-slate-400">{topic.vietnameseTitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;
