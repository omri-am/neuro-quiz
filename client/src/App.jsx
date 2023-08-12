import React, { useState, useEffect } from "react";
import shuffle from "shuffle-array";
import images from "../../server/images.json";
import levenshtein from "js-levenshtein";
import Answer from "./components/Answer";
import MenuScreen from "./screens/MenuScreen";
import QuizScreen from "./screens/QuizScreen";
import ScoresScreen from "./screens/ScoresScreen";

const App = () => {
  const [selectedSets, setSelectedSets] = useState([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const filteredImages = images.filter((image) =>
      selectedSets.includes(image.filename.split("_")[0])
    );
    setShuffledImages(shuffle(filteredImages));
  }, [selectedSets]);

  const handleSetSelection = (event) => {
    const { value, checked } = event.target;
    setSelectedSets((prevSelectedSets) =>
      checked
        ? [...prevSelectedSets, value]
        : prevSelectedSets.filter((set) => set !== value)
    );
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const ignoreCommentLeven = (submittedAnswer, correctAnswer) => {
    const blacklist = [
      ["ventral", "dorsal"],
      ["median", "medial"],
    ];

    const hasBlacklistedPair = blacklist.some(
      ([word1, word2]) =>
        (submittedAnswer.includes(word1) && correctAnswer.includes(word2)) ||
        (submittedAnswer.includes(word2) && correctAnswer.includes(word1))
    );
    if (hasBlacklistedPair) {
      return 9999;
    }
    const correctFinal = correctAnswer.replace(/ \(.+\)/g, "");
    return levenshtein(submittedAnswer, correctFinal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentImage = shuffledImages[currentImageIndex];
    const correctAnswer = currentImage.name.toLowerCase();
    const submittedAnswer = answer.toLowerCase();
    const maxDistance = Math.floor(correctAnswer.length / 3);
    const distance = ignoreCommentLeven(submittedAnswer, correctAnswer);
    const isAnswerCorrect = distance <= maxDistance;
    const answerScore = isAnswerCorrect ? 1 : 0;

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        image: currentImage,
        answer: submittedAnswer,
        isAnswerCorrect,
        answerDistance: distance,
      },
    ]);
    setScore((prevScore) => prevScore + answerScore);
    setAnswer("");

    if (currentImageIndex < shuffledImages.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const startTestSimulation = () => {
    const filteredImages = images.filter((image) =>
      selectedSets.includes(image.filename.split("_")[0])
    );
    setShuffledImages(shuffle(filteredImages).slice(0, 70));
    setQuizStarted(true);
  };

  const handleTryAgain = () => {
    setSelectedSets([]);
    setAnswer("");
    setScore(0);
    setCurrentImageIndex(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setAnswers([]);
    setShuffledImages([]);
  };

  let screenToShow;
  if (!quizStarted) {
    screenToShow = (
      <MenuScreen
        selectedSets={selectedSets}
        handleSetSelection={handleSetSelection}
        startQuiz={() => setQuizStarted(true)}
        startTestSimulation={() => startTestSimulation()}
      />
    );
  } else if (quizCompleted) {
    screenToShow = (
      <ScoresScreen
        score={score}
        shuffledImages={shuffledImages}
        answers={answers}
        handleTryAgain={handleTryAgain}
      />
    );
  } else {
    const currentImage = shuffledImages[currentImageIndex];
    screenToShow = (
      <QuizScreen
        currentImage={currentImage}
        currentImageIndex={currentImageIndex}
        totalAmount={shuffledImages.length}
        answer={answer}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      >
        {answers.map((answer, index) => (
          <Answer
            key={index}
            image={answer.image}
            answer={answer.answer}
            answerDistance={answer.answer.length - answer.answerDistance}
            isAnswerCorrect={answer.isAnswerCorrect}
          />
        ))}
      </QuizScreen>
    );
  }

  return screenToShow;
};

export default App;
