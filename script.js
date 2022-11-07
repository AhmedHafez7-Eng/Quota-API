const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const dateAdded = document.querySelector(".date .dateAdded");
const quoteBtn = document.querySelector("#newQuote");
let tag = document.getElementById('tag');



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
window.addEventListener("load", randomQuote);
quoteBtn.addEventListener("click", randomQuote);