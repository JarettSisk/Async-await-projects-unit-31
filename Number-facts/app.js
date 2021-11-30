
// Get the form
const numberFactsForm = document.querySelector('.number-facts-form');
const factsList = document.querySelector('.facts-list');

// 1.
async function getFact() {
    try {
        const res = await axios.get(`http://numbersapi.com/3?json`);
        console.log(res.data.text) 
    } catch (error) {
        console.error(error)
    }
}
getFact();

// 2
async function getFavNumberFacts() {
    try {
        const res = await axios.get(`http://numbersapi.com/${favNumbers}?json`);
        console.log(res.data)
    } catch (error) {
        console.log(error);
    }
}
getFavNumberFacts();

// 3.
// Add the event listener
numberFactsForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Clear the list
    factsList.innerHTML = '';

    try {
        for(let i = 0; i < 4; i++) {
            const res = await axios.get(`http://numbersapi.com/${e.target.number.value}?json`)
            // Append the new fact
            let factLi = document.createElement('li');
            factLi.innerText = res.data.text;
            factsList.appendChild(factLi);
        }
    } catch (error) {
        // handle error
        console.log(error);
    }
})