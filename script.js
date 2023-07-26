const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const inputWord = document.getElementById("inp-word");
const btn = document.getElementById("search-btn");
let audio = new Audio();


btn.addEventListener("click", () => {
    getResults(inputWord.value)
})

const setQuery = (evt) => {
    if(evt.keyCode == 13) {
        getResults(inputWord.value);
    }
}


const getResults = (word) => {
    let query = `${url}${word}`;
    fetch(query)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
        </div>

        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
        audio.setAttribute("src", `${data[0].phonetics[0].audio  ||  data[0].phonetics[1].audio}`);
        console.log(audio)
    })
    .catch( () => { 
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    })
}


inputWord.addEventListener('keypress', setQuery);


function playSound() {
    console.log("deneme")
    audio.play();
}