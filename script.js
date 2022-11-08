const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    dateAdded = document.querySelector(".date .dateAdded"),
    quoteBtn = document.querySelector("#newQuote"),
    tag = document.getElementById('tag'),
    // translateBtn = document.querySelector(".translate"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter");



const url = "https://api.quotable.io/random?tags=technology|love|happiness|history|science&minLength=50&maxLength=100";

function randomQuote() {

    tag.innerHTML = "Tags:&ThickSpace;";
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";


    // Fetching random quotes from the API and parsing them into a javascript object
    fetch(url)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            let mydate = new Date(result.dateAdded);
            quoteText.innerHTML = result.content;
            authorName.innerHTML = result.author;
            dateAdded.innerHTML = mydate.toDateString();
            result.tags.forEach(t => {
                tag.innerHTML += "<span>#" + t + "  </span>";
            });
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove("loading");
        });
}

soundBtn.addEventListener("click", () => {

    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let msg = new SpeechSynthesisUtterance(`${quoteText.innerText}. Author: ${authorName.innerText}`);
    soundBtn.classList.add("loading");
    speechSynthesis.speak(msg); // Speak mehtod of speechSynthesis that speak the msg

    msg.addEventListener('end', (evt) => {
        const { charIndex, utterance } = evt;

        if (charIndex + 1 === utterance.text.length) {
            // End fired when utterance finished
            console.log("Text not Finished");
        } else {
            // console.log("Text is Finished");
            soundBtn.classList.remove("loading");
        }
    });
});


window.addEventListener("load", randomQuote);
quoteBtn.addEventListener("click", randomQuote);