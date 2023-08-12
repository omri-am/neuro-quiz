const Answer = ({ image, answer, answerDistance, isAnswerCorrect }) => {
  return (
    <div>
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
  );
};

export default Answer;
