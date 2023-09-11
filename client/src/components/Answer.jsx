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

const Answer = ({ image, answer, isAnswerCorrect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`answer-container ${isHovered ? "hovered-card" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`${imagesPath}/${image.filename}`}
        alt={image.name}
        style={{ maxWidth: "85%", maxHeight: "250px" }}
      />
      {
        <div>
          <p>
            <b>Expected: </b>
            {image.name}
          </p>
          <p>
            <b>Your answer:</b>{" "}
            <span>{highlightIncorrectLetters(answer, image.name)}</span>
          </p>
          <p>
            {isAnswerCorrect ? (
              <span className="correct-answer">✓</span>
            ) : (
              <span className="incorrect-answer">✕</span>
            )}
          </p>
        </div>
      }
    </div>
  );
};

export default Answer;
