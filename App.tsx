
import React, { useState, useCallback, useMemo } from 'react';
import { VOCABULARY_TOPICS } from './data/vocabulary';
import { VocabularyTopic } from './types';
import TopicSelector from './components/TopicSelector';
import TypingPractice from './components/TypingPractice';
import CompletionScreen from './components/CompletionScreen';
import Header from './components/Header';

type GameState = 'selecting' | 'practicing' | 'finished';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('selecting');
  const [selectedTopic, setSelectedTopic] = useState<VocabularyTopic | null>(null);

  const handleSelectTopic = useCallback((topic: VocabularyTopic) => {
    setSelectedTopic(topic);
    setGameState('practicing');
  }, []);

  const handleFinish = useCallback(() => {
    setGameState('finished');
  }, []);
  
  const handleRestart = useCallback(() => {
    setGameState('practicing');
  }, []);
  
  const handleChangeTopic = useCallback(() => {
    setSelectedTopic(null);
    setGameState('selecting');
  }, []);

  const headerElement = useMemo(() => (
    <Header 
      showBackButton={gameState !== 'selecting'} 
      onChangeTopic={handleChangeTopic} 
    />
  ), [gameState, handleChangeTopic]);

  const renderContent = () => {
    switch (gameState) {
      case 'practicing':
        return selectedTopic && <TypingPractice topic={selectedTopic} onFinish={handleFinish} />;
      case 'finished':
        return selectedTopic && <CompletionScreen topic={selectedTopic} onRestart={handleRestart} onChangeTopic={handleChangeTopic} />;
      case 'selecting':
      default:
        return <TopicSelector topics={VOCABULARY_TOPICS} onSelectTopic={handleSelectTopic} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      {headerElement}
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
