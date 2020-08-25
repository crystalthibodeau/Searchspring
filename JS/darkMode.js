// $("#darkMode").click(function () {
//     // e.preventDefault();
//
//     var nav = document.getElementById("searchSpringNav");
//     var navButton = document.getElementById("searchSpringNavButton");
//     var body = document.getElementById("body");
//     var container = document.getElementById("mainContainer");
//     var cards = document.getElementsByClassName("card-body");
//     var search = document.getElementById("search");
//     var submit = document.getElementById("icon");
//     var pagLis = document.getElementById("pagLi");
//     var pagLis2 = document.getElementById("pagLi2");
//     var toTop = document.getElementById("return-to-top");
//     var text = document.getElementsByClassName("text");
//
//
//     // ==========================first click/ to turn dark mode on
//     if (nav.classList.contains("searchSpringNav") && navButton.classList.contains("searchSpringNav")) {
//
//         for (let i = 0; i < cards.length; i++) {
//             cards[i].classList.add("dmCardColor");
//         }
//         for (let i = 0; i < text.length; i++) {
//             text[i].classList.add("dmText");
//         }
//
//         toTop.classList.add("return-to-topDM");
//         toTop.classList.remove("return-to-top");
//         submit.classList.add("dmIcon");
//         submit.classList.remove("icon");
//         body.classList.add("dmBodyColor");
//         container.classList.add("dmBodyColor");
//         nav.classList.remove("searchSpringNav")
//         nav.classList.add("dMBackgroundColor");
//         navButton.classList.remove("searchSpringNav")
//         navButton.classList.add("dMBackgroundColor");
//         search.classList.add("dmSearch");
//         pagLis.classList.add("test");
//         pagLis2.classList.add("test");
//
//         // ==========================second click/ to turn dark mode off
//     } else {
//
//         for (let i = 0; i < cards.length; i++) {
//             cards[i].classList.remove("dmCardColor");
//         }
//         for (let i = 0; i < text.length; i++) {
//             text[i].classList.remove("dmText");
//         }
//         pagLis.classList.remove("test");
//         pagLis2.classList.remove("test");
//         toTop.classList.remove("return-to-topDM");
//         submit.classList.add("icon");
//         submit.classList.remove("dmIcon");
//         container.classList.remove("dmBodyColor");
//         body.classList.remove("dmBodyColor");
//         nav.classList.remove("dMBackgroundColor");
//         nav.classList.add("searchSpringNav");
//         navButton.classList.remove("dMBackgroundColor");
//         navButton.classList.add("searchSpringNav");
//         search.classList.remove("dmSearch");
//
//
//     }
//
//
// });