import React, { useState } from "react";

const imagesPath = "../../../server/images";

const highlightIncorrectLetters = (answer, correctAnswer) => {
  const submittedWords = answer.split(" ");
  const correctWords = correctAnswer.split(" ");
  const highlighted = [];

  for (
    let i = 0;
    i < Math.max(correctWords.length, submittedWords.length);
    i++
  ) {
    const correctWord = correctWords[i] || "";
    const submittedWord = submittedWords[i] || "";

    for (
      let j = 0;
      j < Math.max(correctWord.length, submittedWord.length);
      j++
    ) {
      const correctLetter = correctWord[j] || "";
      const userLetter = submittedWord[j] || "";

      if (userLetter === correctLetter) {
        highlighted.push(userLetter);
      } else {
        highlighted.push(
          <span key={`${i}_${j}`} className="incorrect-letter">
            {userLetter}
          </span>
        );
      }
    }
    highlighted.push(" ");
  }

  return highlighted;
};

const ScoresScreen = ({ score, shuffledImages, answers, handleTryAgain }) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [sortOption, setSortOption] = useState("alphabetical");

  const resultsGrid = (answers, correct) => {
    return answers
      .filter((answer) =>
        correct ? answer.isAnswerCorrect : !answer.isAnswerCorrect
      )
      .sort((a, b) =>
        sortOption === "accuracy"
          ? a.answerDistance - b.answerDistance
          : a.image.name.localeCompare(b.image.name)
      )
      .map((answer, index) => (
        <div
          key={`answer_${index}`}
          className={`result-item ${
            index === hoveredCardIndex ? "hovered-card" : ""
          }`}
          onMouseEnter={() => setHoveredCardIndex(index)}
          onMouseLeave={() => setHoveredCardIndex(null)}
        >
          <img
            src={`${imagesPath}/${answer.image.filename}`}
            alt={answer.image.name}
            style={{ maxWidth: "85%", maxHeight: "250px" }}
          />
          <p>
            <b>Expected: </b>
            {answer.image.name}
          </p>
          <p>
            <b>Your answer:</b>{" "}
            <span>
              {highlightIncorrectLetters(answer.answer, answer.image.name)}
            </span>
          </p>
          <p>
            {answer.isAnswerCorrect !== null && (
              <span
                className={
                  answer.isAnswerCorrect ? "correct-answer" : "incorrect-answer"
                }
              >
                {answer.isAnswerCorrect ? "✓" : "✕"}
              </span>
            )}
          </p>
        </div>
      ));
  };

  return (
    <div>
      <h1>Neuroanatomy Quiz</h1>
      <div>
        <p>
          Quiz completed! Final Score: {score} out of {shuffledImages.length}
        </p>
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
