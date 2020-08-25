// var protocol = window.location.protocol,
//     host = '//' + window.location.host,
//     path = window.location.pathname,
//     query = window.location.search;
//
// var newUrl = protocol + host + path + query + (query ? '&' : '?') + '?theme';
//
// var dMFlag = false;
// var clicks = 0;
// console.log("outside clicks:", clicks)
//
//
// function dMClick(){ // cliciks % 2 === 0 === number is even
//     clicks = clicks + 1;
//
//     if(clicks % 2 === 0){
//         dMFlag = false;
//         darkMode(dMFlag);
//         // return dMFlag;
//     }else{
//         // console.log(clicks % 2 === 0)
//         dMFlag = true;
//         console.log(dMFlag)
//         darkMode(dMFlag);
//         // return dMFlag;
//     }
// }
//
// function darkMode(flag) {
//     // e.preventDefault();
//     // var testThis = window.history.pushState({path:newUrl}, '' , newUrl);
//     dMURL(flag);
//
//     if(flag){
//         // console.log(window.location.href)
//         var nav = document.getElementById("searchSpringNav");
//         var navButton = document.getElementById("searchSpringNavButton");
//         var body = document.getElementById("body");
//         var container = document.getElementById("mainContainer");
//         var cards = document.getElementsByClassName("card-body");
//         var search = document.getElementById("search");
//         var submit = document.getElementById("icon");
//         var pagLis = document.getElementById("pagLi");
//         var pagLis2 = document.getElementById("pagLi2");
//         var toTop = document.getElementById("return-to-top");
//         var text = document.getElementsByClassName("text");
//
//
//         // ==========================first click/ to turn dark mode on
//         if (nav.classList.contains("searchSpringNav") && navButton.classList.contains("searchSpringNav")) {
//
//             for (let i = 0; i < cards.length; i++) {
//                 cards[i].classList.add("dmCardColor");
//             }
//             for (let i = 0; i < text.length; i++) {
//                 text[i].classList.add("dmText");
//             }
//
//             toTop.classList.add("return-to-topDM");
//             toTop.classList.remove("return-to-top");
//             submit.classList.add("dmIcon");
//             submit.classList.remove("icon");
//             body.classList.add("dmBodyColor");
//             container.classList.add("dmBodyColor");
//             nav.classList.remove("searchSpringNav")
//             nav.classList.add("dMBackgroundColor");
//             navButton.classList.remove("searchSpringNav")
//             navButton.classList.add("dMBackgroundColor");
//             search.classList.add("dmSearch");
//             pagLis.classList.add("test");
//             pagLis2.classList.add("test");
//
//             // ==========================second click/ to turn dark mode off
//         } else {
//
//             for (let i = 0; i < cards.length; i++) {
//                 cards[i].classList.remove("dmCardColor");
//             }
//             for (let i = 0; i < text.length; i++) {
//                 text[i].classList.remove("dmText");
//             }
//             pagLis.classList.remove("test");
//             pagLis2.classList.remove("test");
//             toTop.classList.remove("return-to-topDM");
//             submit.classList.add("icon");
//             submit.classList.remove("dmIcon");
//             container.classList.remove("dmBodyColor");
//             body.classList.remove("dmBodyColor");
//             nav.classList.remove("dMBackgroundColor");
//             nav.classList.add("searchSpringNav");
//             navButton.classList.remove("dMBackgroundColor");
//             navButton.classList.add("searchSpringNav");
//             search.classList.remove("dmSearch");
//
//
//         }
//
//
//     }
//
// }
//
// function dMURL(flag){
//     // console.log(flag)
//     // switch(flag) {
//     //     case flag = false:
//     //         window.history.pushState({path:protocol + host + path + query + (query ? '&' : '?')}, '');
//     //         break;
//     //     default:
//     //         console.log(flag)
//     //         window.history.pushState({path:newUrl}, '' , newUrl);
//     //         break;
//     // }
//     if(flag === true){
//         for(let i = 0; i < 1; i++){
//             // console.log(flag)
//             window.history.pushState({path:newUrl}, '' , newUrl);
//             break;
//         }
//     }else if(flag === false){
//         window.history.pushState({path:protocol + host + path + query + (query ? '&' : '?')}, '');
//     }
//
// }
//
// $("#darkMode").on("click", dMClick)