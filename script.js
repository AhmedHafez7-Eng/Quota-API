const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    dateAdded = document.querySelector(".date .dateAdded"),
    quoteBtn = document.querySelector("#newQuote"),
    tag = document.getElementById('tag'),
    // translateBtn = document.querySelector(".translate"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    translateBtn = document.querySelector(".translate"),
    htmlEle = document.getElementById("google_translate_element");

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

//======= Sound Feature Implementation ===============================
soundBtn.addEventListener("click", () => {

    document.getElementById("alert").innerText = "Speaking...";
    document.getElementById("alert").style.display = "block";
    setTimeout(() => {
        document.getElementById("alert").innerText = "";
        document.getElementById("alert").style.display = "none";
    }, 2500);

    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let msg = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
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

//====== Copy Feature Implementation ==================================
copyBtn.addEventListener("click", () => {
    document.getElementById("alert").innerText = "Copied to clipboard!";
    document.getElementById("alert").style.display = "block";
    setTimeout(() => {
        document.getElementById("alert").innerText = "";
        document.getElementById("alert").style.display = "none";
    }, 2500);
    // Copy the quote's text to clipboard
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText);
});

//======== Twitter Feature Implementation =================================
twitterBtn.addEventListener("click", () => {
    let twitterUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText},${authorName.innerText}`;
    window.open(twitterUrl, '_blank'); // open a new twitter window with passing quote in the url
});


// ======= Translations Implementation ===================================

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
}

window.addEventListener("load", randomQuote);
quoteBtn.addEventListener("click", randomQuote);






















// =================================================== Notes for coming updates =================================


// Facebook Feature Implementation
// facebookBtn.addEventListener("click", () => {
//     FB.ui(
//         {
//             method: 'feed',
//             caption: 'Caption like which appear as title of the dialog box',
//             description: 'Small description of the post',
//             message: 'Hello World!'
//         }
//     );
//     // window.open(twitterUrl, '_blank'); // open a new twitter window with passing quote in the url
// });




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