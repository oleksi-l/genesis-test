import React from 'react';
import FallbackComponent from '../components/FallbackComponent/FallbackComponent';
import useGame from '../hooks/useGame';
import FinalScreen from '../pages/FinalScreen/FinalScreen';
import GameScreen from '../pages/GameScreen/GameScreen';
import InitialScreen from '../pages/InitialScreen/InitialScreen';
import { GameConfig } from '../types/game';

interface AppContainerProps {
  config: GameConfig;
}

const AppContainer = ({ config }: AppContainerProps) => {
  const {
    page,
    startGame,
    retry,
    chooseAnswer,
    prices,
    currentQuestion,
    totalAmount,
    error,
  } = useGame(config);

  const renderPage = (pageId: number) => {
    switch (pageId) {
      case 0:
        return <InitialScreen handlePageChange={startGame} />;
      case 1:
        return !currentQuestion || !prices ? null : (
          <GameScreen
            prices={prices}
            question={currentQuestion}
            chooseAnswer={chooseAnswer}
          />
        );
      case 2:
        return !currentQuestion ? null : (
          <FinalScreen retry={retry} amount={totalAmount} />
        );
      default:
        return null;
    }
  };

  return !error ? renderPage(page) : <FallbackComponent error={error} />;
};

export default AppContainer;
