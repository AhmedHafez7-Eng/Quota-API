
let container = document.getElementById('container');
let quote = document.getElementById('quote');
let author = document.getElementById('author');
let date = document.getElementById('date');
let tag = document.getElementById('tag');
let btn = document.getElementById('btn');
let htmlEle = document.documentElement;
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
            quote.innerHTML = '&ldquo; ' + item.content + ' &rdquo;';
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


// ======= Translations =================================================================
let language = "";
let myInterval;
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');

    myInterval = setInterval(function () {
        if (myInterval) {
            language = htmlEle.lang;
            console.log(language);
            if (htmlEle.lang == "ar") {
                container.style.cssText = "direction: rtl;";
                tag.style.cssText = "text-align: right;direction: rtl;";
                date.style.cssText = "text-align: right;direction: rtl;";
                document.getElementById("hint").style.cssText = "text-align: right;direction: rtl;";
            } else {
                container.style.cssText = "direction: ltr;";
                tag.style.cssText = "text-align: left;direction: ltr;";
                date.style.cssText = "text-align: left;direction: ltr;";
                document.getElementById("hint").style.cssText = "text-align: left;direction: ltr;";
            }
            clearInterval(myInterval);
        }
    }, 1000);
}



// (function () {
//     // if (htmlEle.getAttribute("lang") === 'ar') {
//     //     container.style.cssText = "direction: rtl;";
//     //     tag.style.cssText = "text-align: right;";
//     //     date.style.cssText = "text-align: right;";
//     // }

// })();

// myTimeout = setTimeout(function () {
//     language = htmlEle.lang;
// }, 100);

// setInterval(function () {
//     language = htmlEle.lang;
// }, 1000);