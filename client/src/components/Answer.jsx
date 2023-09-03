import React, { useState } from "react";

const Answer = ({ image, answer, answerDistance, isAnswerCorrect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="answer-container">
      <img
        src={image.filename}
        alt={image.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovered && (
        <div className="answer-card">
          <img src={image.filename} alt={image.name} />
          <p>
            <b>Expected: </b>
            {image.name}
          </p>
          <p>
            <b>Your answer:</b> <span>{answer}</span>
          </p>
          <p>
            {isAnswerCorrect ? (
              <span className="correct-answer">✓</span>
            ) : (
              <span className="incorrect-answer">✕</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Answer;
