const express = require("express");
const shuffle = require("shuffle-array");
const levenshtein = require("js-levenshtein");
const path = require("path");

const router = express.Router();
const images = require("./images.json");
let shuffledImages = shuffle(images.slice());
let answers = [];

function calculateScore(answer, correctAnswer) {
  const distance = levenshtein(answer, correctAnswer);
  const score = distance === 0 ? 1 : 0;
  return {
    score,
    highlightedAnswer: highlightIncorrectLetters(answer, correctAnswer),
  };
}

const highlightIncorrectLetters = (answer, correctAnswer) => {
  let highlighted = "";
  for (let i = 0; i < correctAnswer.length; i++) {
    if (answer[i] && answer[i] === correctAnswer[i]) {
      highlighted += answer[i];
    } else {
      highlighted += `<span class="incorrect-letter">${answer[i] || ""}</span>`;
    }
  }
  return highlighted;
};

router.get("/", (req, res) => {
  shuffledImages = shuffle(images.slice());
  answers = [];
  res.render("index", {
    image: shuffledImages[0],
    score: 0,
    highlightedAnswer: null,
  });
});

router.post("/", (req, res) => {
  const { answer } = req.body;
  const currentImage = shuffledImages.shift();
  const { score, highlightedAnswer } = calculateScore(
    answer.toLowerCase(),
    currentImage.name.toLowerCase()
  );
  answers.push({ image: currentImage, answer: highlightedAnswer });

  if (shuffledImages.length === 0) {
    const totalScore = answers.reduce((total, ans) => total + ans.score, 0);
    res.render("score", { score: totalScore, answers });
  } else {
    res.render("index", {
      image: shuffledImages[0],
      score: parseInt(req.body.score) + score,
      highlightedAnswer: null,
    });
  }
});

module.exports = router;
