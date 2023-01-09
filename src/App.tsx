import React from 'react';
import FinalScreen from './pages/FinalScreen/FinalScreen';
import GameScreen from './pages/GameScreen/GameScreen';
import InitialScreen from './pages/InitialScreen/InitialScreen';
import config from './constants/config.json';
import useGame from './hooks/useGame';

const App = () => {
  const {
    page,
    startGame,
    retry,
    chooseAnswer,
    prices,
    currentQuestion,
    totalAmount,
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
          <FinalScreen
            retry={retry}
            amount={totalAmount}
          />
        );
      default:
        return null;
    }
  };

  return renderPage(page);
};

export default App;
