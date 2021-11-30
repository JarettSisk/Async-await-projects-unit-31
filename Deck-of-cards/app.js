//  1.
// Shuffle and draw a card
async function shuffleAndDraw() {
    try {
        const response = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        const card = response.data.cards[0]
        console.log(response)
        console.log(`${card.value} of ${card.suit}`)
    } catch (error) {
        // handle error
        console.log(error);
    }
}
shuffleAndDraw();

// 2.
// shuffle, draw a card, then draw one more card from the same deck
async function shuffleAndDrawTwo() {
    try {
        const response1 = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        card1 = response1.data.cards[0];
        const deckId = response1.data.deck_id;
        const response2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        card2 = response2.data.cards[0];
        console.log(`${card1.value} of ${card1.suit} and ${card2.value} of ${card2.suit}`)
    } catch (error) {
        console.error(error);
    }
    
}
shuffleAndDrawTwo();
// 3.
// Use the card button to draw cards from a single deck untill the deck is empty
// Use conditional logic to only shuffle the deck once
// Note - This could probobly be changed to work more efficiently by simply drawing the whole deck, and storing each image url in an array, and then simply cycling through the entire array each time the button is pressed. This way we would not have to make an API call for every single card.
const getCardBtn = document.querySelector('.get-card-btn');
const cardContainer = document.querySelector('.container');
const cardArr = [];
let deckId = 0;
getCardBtn.addEventListener("click", getCard);

async function getCard() {
    try {
        if(cardArr.length === 0) {
            const response = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
            card1 = response.data.cards[0];
            deckId = response.data.deck_id;
            // Append the first card to the carArr
            cardArr.push(`${card1.value} of ${card1.suit}`);
            generateCardDom(card1.image);
            console.log(cardArr);
        }
        else {
            const response = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            let nextCard = response.data.cards[0];
            cardArr.push(`${nextCard.value} of ${nextCard.suit}`);
            generateCardDom(nextCard.image);
            console.log(cardArr);
        }
    } catch (error) {
        console.error(error);
    }
} 

function generateCardDom(imageUrl) {
    const cardImageEl = document.createElement('img');
    cardImageEl.classList.add('card');
    cardImageEl.setAttribute('src', imageUrl);
    let randomDeg = (Math.random() < 0.5 ? (Math.random() * -20) : (Math.random() * 20));
    cardImageEl.style.transform = `rotate(${randomDeg}deg)`;
    cardContainer.appendChild(cardImageEl);
}