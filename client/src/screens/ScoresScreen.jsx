import React, { useState } from "react";
import Answer from "../components/Answer";

const ScoresScreen = ({ score, shuffledImages, answers, handleTryAgain }) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const resultsGrid = (answers, correct) => {
    const [sortOption, setSortOption] = useState("alphabetical");

    const filteredAnswers = answers
      .filter((answer) =>
        correct ? answer.isAnswerCorrect : !answer.isAnswerCorrect
      )
      .sort((a, b) =>
        sortOption === "alphabetical"
          ? a.image.name.localeCompare(b.image.name)
          : a.answerDistance - b.answerDistance
      );

    return (
      <div>
        <div>
          <label htmlFor="sortOption">Sort answers by: </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="alphabetical">Alphabetical Order</option>
            <option value="accuracy">Answers' Accuracy</option>
          </select>
        </div>
        <p> </p>
        {filteredAnswers.map((answer, index) => (
          <Answer
            key={`answer_${index}`}
            image={answer.image}
            answer={answer.answer}
            isAnswerCorrect={answer.isAnswerCorrect}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Neuroanatomy Quiz</h1>
      <div>
        <p>
          Quiz completed! Final Score: {score} out of {shuffledImages.length}
        </p>
        <p>
          <button onClick={handleTryAgain}>Try again</button>
        </p>
        <h2>Correct Answers</h2>
        <div className="results-grid"> {resultsGrid(answers, true)}</div>
        <h2>Incorrect Answers</h2>
        <div className="results-grid">{resultsGrid(answers, false)}</div>
      </div>
    </div>
  );
};

export default ScoresScreen;
