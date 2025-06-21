import './Gallery.css';
import { cardList } from './data.js'
import { useState } from 'react';

const Gallery = () => {

  const [currentCard, setCurrentCard] = useState(0);
  let card = cardList[currentCard];
  const [currentSide, setCurrentSideCard] = useState(true);
  const [atFrontEnd, setAtFrontEnd] = useState(true);
  const [atBackEnd, setAtBackEnd] = useState(false);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  function handlePreviousClick() {
    if(0 < currentCard){
      setCurrentCard(currentCard - 1);
      setAtBackEnd(false);
      if(currentCard == 1){
        setAtFrontEnd(true);
      }else{
        setAtFrontEnd(false);
      }
      setCurrentSideCard(true);
    }
    setGuess("");
    setCorrect("");
  }

  function handleNextClick() {
    if(cardList.length - 1 > currentCard){
      setAtFrontEnd(false);
      setCurrentCard(currentCard + 1);
      console.log(currentCard);
      if(currentCard == cardList.length - 2){
        setAtBackEnd(true);
      }else{
        setAtBackEnd(false);
      }
      setCurrentSideCard(true);
    }
    setGuess("");
    setCorrect("");
  }

  function handleShuffle() {
      let value = currentCard;
      do{
        value = Math.floor(Math.random() * (cardList.length));
        console.log(value)
      } while(value == currentCard)
      setCurrentCard(value);
      setCurrentSideCard(true);

      if(value== cardList.length - 1){
        setAtBackEnd(true);
      }else{
        setAtBackEnd(false);
      }

      if(value == 0){
        setAtFrontEnd(true);
      }else{
        setAtFrontEnd(false);
      }
      setGuess("");
      setCorrect("");
  }

  function handleCardClick(){
    if(currentSide){
      setCurrentSideCard(false);
    } else {
      setCurrentSideCard(true);
    }
  }

  function handleFormUpdate(e){
    const {value} = e.target;
    setGuess(value);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(currentSide == true){
      if (guess.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ") == cardList[currentCard].name.toLowerCase()){
      setCorrect("Correct!");
      setCurrentStreak(currentStreak + 1);
      if(currentStreak + 1 > highestStreak){
        setHighestStreak(currentStreak + 1);
      }
    } else{
      setCorrect("Wrong!");
      setCurrentStreak(0);
    }
    }
  }

  return (
    <div className="gallery">
      <h2>Number of cards: {cardList.length}</h2>
      <h2>Current Streak: {currentStreak}</h2>
      <h2>Longest Streak: {highestStreak}</h2>
      {currentSide ? 
      <div onClick={handleCardClick}>
        <fieldset className={card.class}>
          <legend>{card.description}</legend>
          <h2>Question {currentCard + 1}</h2>
          <p>{card.question}</p>
          <h2>Who was this mathematician?</h2>
        </fieldset>
        
      </div> : 
      <div  onClick={handleCardClick}>
        <fieldset className={card.class}>
          <legend>{card.description}</legend>
          <h2>Answer</h2>
          <p>{card.name}</p>
          <img src={card.url} alt={card.alt}></img> 
        </fieldset>
      </div>}
      <br>
      </br>
      <div id="formDiv">
        <form onSubmit={handleSubmit}>
        <div>
          Guess: <div id={correct == "Correct!"? "correctVal" : "incorrectVal"}>{correct}</div>
          <br/>
          <input
            type="text"
            name="guess"
            value={guess}
            onChange={handleFormUpdate}/>
        </div>
        <br></br>
        <input id="submitBtn" type="submit" />
      </form>
      </div>
      <br>
      </br>
      <button onClick={handlePreviousClick} className={atFrontEnd? "end" : "notEnd"}>
        Previous
      </button> 
      <button onClick={handleNextClick} className={atBackEnd? "end" : "notEnd"}>
        Next
      </button> 
      <button onClick={handleShuffle} className="notEnd">
        Shuffle
      </button> 
    </div>
  )
}

export default Gallery
