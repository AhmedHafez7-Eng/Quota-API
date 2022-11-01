
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let date = document.getElementById('date');
let tag = document.getElementById('tag');
let btn = document.getElementById('btn');
const url = "https://api.quotable.io/random?tags=technology|love|happiness&minLength=50&maxLength=100";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let getQuote = () => {
    tag.innerHTML = "<span>tags: </span>";
    date.innerHTML = "<span>publish date: </span>";
    fetch(url)
        .then((data) => data.json())
        .then((item) => {
            quote.textContent = '" ' + item.content + ' "';
            author.textContent = item.author;
            let mydate = new Date(item.dateAdded);
            // date.innerHTML += "<span>" + mydate.toDateString() + " - " + mydate.toLocaleTimeString().slice(0, 4) + mydate.toLocaleTimeString().slice(7,) + "</span>";
            let hours = randomIntFromInterval(1, 24);
            let minutes = randomIntFromInterval(1, 59);
            date.innerHTML += "<span>" + mydate.toDateString() + " - " + hours.toString() + ":" + minutes.toString() + "</span>";

            item.tags.forEach(t => {
                tag.innerHTML += "<span>#" + t + "  </span>";
            });
        });
}
window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);