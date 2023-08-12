import React from "react";

const imagesPath = "../../../server/images";

const highlightIncorrectLetters = (answer, correctAnswer) => {
  const submittedWords = answer.split(" ");
  const correctWords = correctAnswer.split(" ");
  const highlighted = [];

  for (let i = 0; i < correctWords.length; i++) {
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
  return (
    <div>
      <h1>Image Quiz App</h1>
      <div>
        <p>
          Quiz completed! Final Score: {score} out of {shuffledImages.length}
        </p>
        <button onClick={handleTryAgain}>Try again</button>
        <h2>Correct Answers</h2>
        <div className="results-grid">
          {answers
            .filter((answer) => answer.isAnswerCorrect)
            .sort((a, b) => a.answerDistance - b.answerDistance)
            .map((answer, index) => (
              <div key={`answer_${index}`} className="result-item">
                <img
                  src={`${imagesPath}/${answer.image.filename}`}
                  alt={answer.image.name}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <p>
                  <b>Expected: </b>
                  {answer.image.name}
                </p>
                <p>
                  <b>Your answer:</b>{" "}
                  <span>
                    {highlightIncorrectLetters(
                      answer.answer,
                      answer.image.name
                    )}
                  </span>
                </p>
                <p>
                  {answer.isAnswerCorrect !== null && (
                    <span
                      className={
                        answer.isAnswerCorrect
                          ? "correct-answer"
                          : "incorrect-answer"
                      }
                    >
                      {answer.isAnswerCorrect ? "✓" : "✕"}
                    </span>
                  )}
                </p>
              </div>
            ))}
        </div>
        <h2>Incorrect Answers</h2>
        <div className="results-grid">
          {answers
            .filter((answer) => !answer.isAnswerCorrect)
            .sort((a, b) => a.answerDistance - b.answerDistance)
            .map((answer, index) => (
              <div key={`answer_${index}`} className="result-item">
                <img
                  src={`${imagesPath}/${answer.image.filename}`}
                  alt={answer.image.name}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <p>
                  <b>Expected: </b>
                  {answer.image.name}
                </p>
                <p>
                  <b>Your answer:</b>{" "}
                  <span>
                    {highlightIncorrectLetters(
                      answer.answer,
                      answer.image.name
                    )}
                  </span>
                </p>
                <p>
                  {answer.isAnswerCorrect !== null && (
                    <span
                      className={
                        answer.isAnswerCorrect
                          ? "correct-answer"
                          : "incorrect-answer"
                      }
                    >
                      {answer.isAnswerCorrect ? "✓" : "✕"}
                    </span>
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScoresScreen;