import './Gallery.css';
import { cardList } from './data.js'
import { useState } from 'react';

const Gallery = () => {

  const [currentCard, setCurrentCard] = useState(0);
  let card = cardList[currentCard];
  const [currentSide, setCurrentSideCard] = useState(true);

  // function handlePreviousClick() {
  //   if(0 < currentCard){
  //     setCurrentCard(currentCard - 1);
  //     setCurrentSideCard(true);
  //   }
  // }

  // function handleNextClick() {
  //   if(cardList.length - 1 > currentCard){
  //     setCurrentCard(currentCard + 1);
  //     setCurrentSideCard(true);
  //   }
  // }

  function handleNextClick() {
      let value = currentCard;
      do{
        value = Math.floor(Math.random() * (cardList.length));
        console.log(value)
      } while(value == currentCard)
      setCurrentCard(value);
      setCurrentSideCard(true);
  }

  function handleCardClick(){
    if(currentSide){
      setCurrentSideCard(false);
    } else {
      setCurrentSideCard(true);
    }
  }

  return (
    <div className="gallery">
      <h2>Number of cards: {cardList.length}</h2>
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
      {/* <button onClick={handlePreviousClick}>
        Previous
      </button> */}
      <button onClick={handleNextClick}>
        Next
      </button>
    </div>
  )
}

export default Gallery
