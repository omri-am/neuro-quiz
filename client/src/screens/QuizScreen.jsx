import React from "react";

const imagesPath = "../../../server/images";

const QuizScreen = ({
  currentImage,
  currentImageIndex,
  totalAmount,
  answer,
  handleAnswerChange,
  handleSubmit,
}) => {
  return (
    <div className="quiz-screen">
      <h1>Neuroanatomy Quiz</h1>
      <div className="quiz-content">
        <div className="quiz-status">
          Progress: {currentImageIndex + 1} / {totalAmount}
        </div>
        <div className="quiz-image">
          <img
            src={`/${imagesPath}/${currentImage.filename}`}
            alt={currentImage.name}
            style={{ maxWidth: "1200px", maxHeight: "400px" }}
          />
        </div>
        <form onSubmit={handleSubmit} className="quiz-form">
          <label htmlFor="answer">Enter the name of the image:</label>
          <input
            type="text"
            name="answer"
            id="answer"
            required
            autoComplete="off"
            value={answer}
            onChange={handleAnswerChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizScreen;
