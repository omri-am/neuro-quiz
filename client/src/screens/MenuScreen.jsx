import React from "react";
import images from "../../../server/images.json";

const MenuScreen = ({
  selectedSets,
  handleSetSelection,
  startQuiz,
  startTestSimulation,
}) => {
  const availableSets = Array.from(
    new Set(images.map((image) => image.filename.split("_")[0]))
  );

  const filteredSets = availableSets.filter((set) =>
    selectedSets.includes(set)
  );

  return (
    <div className="container">
      <div className="menu-screen">
        <h1>Neuroanatomy Quiz</h1>
        <h2>Select Dissection Labs</h2>
        <div className="sets-grid">
          {availableSets.map((set) => (
            <label key={set}>
              <input
                type="checkbox"
                value={set}
                checked={selectedSets.includes(set)}
                onChange={handleSetSelection}
              />{" "}
              Lab {set}
            </label>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              selectedSets.length === 0
                ? alert("Must select at least one lab!")
                : startQuiz();
            }}
          >
            Start Quiz
          </button>
          <button
            type="button"
            onClick={() => {
              selectedSets.length === 0
                ? alert("Must select at least one lab!")
                : startTestSimulation();
            }}
          >
            Start Test Simulation
          </button>
        </div>
      </div>
      <div className="author-info">
        © Sagol School of Neuroscience and Omri Amit
      </div>
    </div>
  );
};

export default MenuScreen;
