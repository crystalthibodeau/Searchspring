var searchString;
searchString = '';
var urlSearchString = window.location.href;
var url = new URL(urlSearchString);
var searchParam = url.searchParams.get("search");
// console.log("first", searchParam);
var dMFlag = false;
var protocol = window.location.protocol,
    host = '//' + window.location.host,
    path = window.location.pathname,
    query = window.location.search;

var newUrl = protocol + host + path + query + (query ? '&' : '?') + '?theme';

// window.history.pushState({path:newUrl}, '' , newUrl);
// var theme;
// theme = "standard";
// urlSearchString = urlSearchString + "?"+ theme;

// var protocol = window.location.protocol,
//     host = '//' + window.location.host,
//     path = window.location.pathname,
//     query = window.location.search;

// var newUrl = protocol + host + path + query + (query ? '&' : '?') + 'theme=1';

// =================================Checks media query for nav view in mobile===========================================

function mediaQuery() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        document.getElementById("demoForm").classList.remove("form-inline")
    } else {
        document.getElementById("demoForm").classList.add("form-inline")
    }
}

mediaQuery();
// ====================================sets pagination number to 1 on load==========================================

var paginationNumber = 1;

//selects top and bottom pagination
var paginationNumbers = document.getElementsByClassName("paginationNumber");

function paginationUpdate() {
    for (let i = 0; i < paginationNumbers.length; i++) {
        document.getElementsByClassName("paginationNumber")[i].innerHTML = paginationNumber;
    }
}

paginationUpdate();

// =============================================Disable Pagination==================================================

function Disable(pagNumber, set) {

    for (let i = 0; i < document.getElementsByClassName("previous").length; i++) {

        if (pagNumber === 1) {
            if (!document.getElementsByClassName("previous")[i].classList.contains("disabled")) {
                // console.log("!previous.contains(disabled)")
                document.getElementsByClassName("next")[i].classList.remove("disabled")
                document.getElementsByClassName("previous")[i].classList.add("disabled")
            }
        }

        if (pagNumber > 1 && pagNumber !== set) {
            // console.log("page greater than one ")
            document.getElementsByClassName("previous")[i].classList.remove("disabled")
            document.getElementsByClassName("next")[i].classList.remove("disabled")
        }

        if (pagNumber === set) {
            // console.log("page === set")
            document.getElementsByClassName("previous")[i].classList.remove("disabled")
            document.getElementsByClassName("next")[i].classList.add("disabled")
        }

    }

}

// ===============================================Creates Cards==========================================================

function createCards(results, card) { //data.results

    card = "";
    for (let i = 0; i < results.length; i++) {

        var msrp = "";
        // product has an “msrp” field
        if (results[i].msrp != null || results[i].msrp !== undefined || results[i].msrp !== "") {

            var msrpNum = parseFloat(results[i].msrp);
            var priceNum = parseFloat(results[i].price);
            //console.log("msrp", msrpNum + " vs " + priceNum)

            if (msrpNum > priceNum) {
                msrp = '<h4 class="px-1 strike text-muted">' + "$" + results[i].msrp + '</h4>';
            }

        }

        card += '<div class="mb-4 col-12 col-sm-6 col-md-4 col-lg-4">';
        card += '<div class="card shadow bg-white rounded">';
        card += '<img class="card-img-top img-fluid" src="' + results[i].thumbnailImageUrl + '" alt="Card image" />';
        card += '<div class="card-body">';
        card += '<h4 class="text">' + results[i].title + '</h4>';
        card += '<div class="d-flex justify-content-center">';
        card += '<h4 class="text px-1">' + "$" + results[i].price + '</h4>'
        card += msrp;
        card += '</div>';
        card += '</div>';
        card += '</div>';
        card += '</div>';
    }

    $(".ShoppingCards").html(card);
}


// ==========================Submits ajax request for catolog items without search param==============================

if (document.getElementById("search") == null) {
    console.log("oops, null");
} else {
    if (searchParam != null) {
        searchString = searchParam.replace(/,|,\s/g, ",+");
    }

//==================Submits ajax request for catolog items when search string is empty on load==========================

    if (searchString === "") {
        $('#demoForm').submit();
    }

// ==========================Submits ajax request for catolog items when Navbar clicked=================================


    function notEmptyLanding() {
        //e

        // e.preventDefault();
        var themeString = window.location.href.toLowerCase().toString().split("?");
        var string = themeString[2];

        console.log("outside if", string);
        if(string === "theme" || string === "theme#"){
            console.log("inside if 1", string);
            dMFlag = true;
            darkMode(dMFlag);
            // window.history.pushState({path:newUrl}, '' , newUrl);
        }
        // $('#demoForm').submit();

        $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1 + "/").done(function (data) {
            console.log("ajax");
            paginationNumber = 1;
            // console.log(window.location.href)

            mediaQuery();

            // Create the cards
            var ShoppingCard = "";

            paginationUpdate();
            Disable(paginationNumber, data.pagination.totalPages);

            createCards(data.results, ShoppingCard);//data.results
            //
        });

        if(string === "theme" || string === "theme#"){
            console.log("inside if 2", string);
            dMFlag = true;
            darkMode(dMFlag);
        }

    }

    var navHeader = document.getElementById("navHeader");
    navHeader.addEventListener("click", notEmptyLanding);


    // $("#navHeader").click(function () {
    //     searchParam = "";
    //
    //
    //
    //     $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1 + "/").done(function (data) {
    //         paginationNumber = 1;
    //
    //         mediaQuery();
    //
    //         // Create the cards
    //         var ShoppingCard = "";
    //
    //         paginationUpdate();
    //         Disable(paginationNumber, data.pagination.totalPages);
    //
    //         createCards(data.results, ShoppingCard);//data.results
    //
    //     });
    //
    //
    // });

    $("#searchSpringNavButton").click(function () {

        $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1 + "/").done(function (data) {
            paginationNumber = 1;
            // console.log("after", searchParam);

            mediaQuery();

            // Create the cards
            var ShoppingCard = "";

            paginationUpdate();
            Disable(paginationNumber, data.pagination.totalPages);

            createCards(data.results, ShoppingCard);//data.results
            // console.log(data.pagination.totalPages);

        });
    });

    // =============================================Start of first page=================================================


    var firstRun = "https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1 + "/";
    $.ajax(firstRun).done(function (data) {
        mediaQuery();
        // Create the cards
        var ShoppingCard = "";

        // =======================================start of dynamic pagination===============================================

        // var pagination = "";
        // pagination += '<li class="page-item disabled previous">' + '<a class="page-link paginationNumberPrevious" href="#" tabindex="-1" aria-disabled="true">Previous</a>\n' + ' </li>'
        //
        // for(let i =0; i < 5; i++ ){
        //     pagination += '<li class="page-item apiCallNum"><a class="page-link paginationNumber" href="#">'+ (i + 1) +'</a></li>';
        // }
        // pagination += '<li class="page-item next">' + '<a class="page-link paginationNumberNext" href="#">Next</a>' + '</li>';
        // console.log(pagination);

        createCards(data.results, ShoppingCard);//data.results
        // console.log(data.pagination.totalPages);

        // $("#pagLi").html(pagination);

    });
}


// ================================Loads the next page each time next button is clicked=================================

function next() {
    // e.preventDefault();
    // console.log("next")

    //==========updates pagination number/matching page loaded with pagination clicks
    paginationNumber = paginationNumber + 1;
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber) + "/").done(function (data) {
        // console.log("next", searchParam);

        mediaQuery();

        paginationUpdate();

        Disable(paginationNumber, data.pagination.totalPages);

        var ShoppingCard = "";

        createCards(data.results, ShoppingCard);//data.results
        // console.log(data.pagination.totalPages);


    })

}

// ================================Loads the previous page each time next button is clicked=================================

function previous() {
    // e.preventDefault();

    paginationNumber = paginationNumber - 1;

    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber) + "/").done(function (data) {
        // console.log("previous", searchParam);

        paginationUpdate();

        Disable(paginationNumber, data.pagination.totalPages);

        var ShoppingCard = "";

        createCards(data.results, ShoppingCard);
        // console.log(data.pagination.totalPages);


    })

}

// ================================Dynamically add event listener "click" for paginations===============================
var bothNext = document.getElementsByClassName("paginationNumberNext");
var bothPrevious = document.getElementsByClassName("paginationNumberPrevious");

for (let i = 0; i < bothNext.length; i++) {
    bothNext[i].addEventListener("click", next);
}
for (let i = 0; i < bothNext.length; i++) {
    bothPrevious[i].addEventListener("click", previous);
}
//======================########################===== Scroll to Top ====########################========================
$(window).scroll(function (e) {
    e.preventDefault();
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function (e) {
    e.preventDefault();
    // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});


//BONUS ==Above and below the results show pagination with next and previous buttons. You could also display some pages before/after the current page as applicable.
//color clicker
//right spot of page when search is submitted and jumbotron is active
//nav items?
//on sale or seasonal items
//search on type
// =====================================================================================================================

//BONUS ==Above and below the results show pagination with next and previous buttons. You could also display some pages before/after the current page as applicable.

// function apiCallNum(){
//     $.ajax("http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (this.innerHTML)).done(function (data) {
//         var ShoppingCard = "";
//         for (let i = 0; i < data.results.length; i++) {
//             var msrp = "";
//
//             // product has an “msrp” field
//             if (data.results[i].msrp != null || data.results[i].msrp !== undefined || data.results[i].msrp !== "") {
//                 // and it’s less than “price” field
//                 // console.log(data.results[i].msrp < data.results[i].price)
//                 var msrpNum = parseFloat(data.results[i].msrp);
//                 var priceNum = parseFloat(data.results[i].price);
//                 //console.log("msrp", msrpNum + " vs " + priceNum)
//
//                 if (msrpNum > priceNum) {
//                     msrp = '<h4 class="px-3 strike text-muted">' + "$" + data.results[i].msrp + '</h4>';
//                     console.log(msrp)
//                     // console.log(data.results[i].msrp)
//                 }
//
//             }
//
//             ShoppingCard += '<div class="mb-4 col-12 col-sm-6 col-md-4 col-lg-4">';
//             ShoppingCard += '<div class="card shadow bg-white rounded">';
//             ShoppingCard += '<img class="card-img-top img-fluid" src="' + data.results[i].thumbnailImageUrl + '" alt="Card image" />';
//             ShoppingCard += '<div class="card-body">';
//             ShoppingCard += '<h4>' + data.results[i].title + '</h4>';
//             ShoppingCard += '<div class="d-flex justify-content-center">';
//             ShoppingCard += '<h4 class="px-1">' + "$" + data.results[i].price + '</h4>'
//             ShoppingCard += msrp;
//             ShoppingCard += '</div>';
//             ShoppingCard += '</div>';
//             ShoppingCard += '</div>';
//             ShoppingCard += '</div>';
//         }
//
//         $(".ShoppingCards").html(ShoppingCard);
//     });
// }
//
// var apiCallNums = document.getElementsByClassName("apiCallNum")
// for (let i = 0; i < apiCallNums.length; i++) {
//     apiCallNums[i].addEventListener("click", apiCallNum);
// }

function dMClick(){ // clicks % 2 === 0 === number is even
    dMFlag = !dMFlag;
    darkMode(dMFlag);
}

function darkMode(flag) {
    // e.preventDefault();
    // var testThis = window.history.pushState({path:newUrl}, '' , newUrl);
    console.log("inside darkmode")
    if(flag){
        // console.log(window.location.href)
        var nav = document.getElementById("searchSpringNav");
        var navButton = document.getElementById("searchSpringNavButton");
        var body = document.getElementById("body");
        var container = document.getElementById("mainContainer");
        var cards = document.getElementsByClassName("card-body");
        var search = document.getElementById("search");
        var submit = document.getElementById("icon");
        var pagLis = document.getElementById("pagLi");
        var pagLis2 = document.getElementById("pagLi2");
        var toTop = document.getElementById("return-to-top");
        var text = document.getElementsByClassName("text");


        // ==========================first click/ to turn dark mode on
        if (nav.classList.contains("searchSpringNav") && navButton.classList.contains("searchSpringNav")) {

            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.add("dmCardColor");
            }
            for (let i = 0; i < text.length; i++) {
                text[i].classList.add("dmText");
            }

            toTop.classList.add("return-to-topDM");
            toTop.classList.remove("return-to-top");
            submit.classList.add("dmIcon");
            submit.classList.remove("icon");
            body.classList.add("dmBodyColor");
            container.classList.add("dmBodyColor");
            nav.classList.remove("searchSpringNav")
            nav.classList.add("dMBackgroundColor");
            navButton.classList.remove("searchSpringNav")
            navButton.classList.add("dMBackgroundColor");
            search.classList.add("dmSearch");
            pagLis.classList.add("test");
            pagLis2.classList.add("test");

            // ==========================second click/ to turn dark mode off
        } else {

            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove("dmCardColor");
            }
            for (let i = 0; i < text.length; i++) {
                text[i].classList.remove("dmText");
            }
            pagLis.classList.remove("test");
            pagLis2.classList.remove("test");
            toTop.classList.remove("return-to-topDM");
            submit.classList.add("icon");
            submit.classList.remove("dmIcon");
            container.classList.remove("dmBodyColor");
            body.classList.remove("dmBodyColor");
            nav.classList.remove("dMBackgroundColor");
            nav.classList.add("searchSpringNav");
            navButton.classList.remove("dMBackgroundColor");
            navButton.classList.add("searchSpringNav");
            search.classList.remove("dmSearch");


        }


    }
    dMURL(flag);
}

function dMURL(flag){

    if(flag === true){
        for(let i = 0; i < 1; i++){
            // console.log(flag)
            window.history.pushState({path:newUrl}, '' , newUrl);
            break;
        }
    }else if(flag === false){
        window.history.pushState({path:protocol + host + path + query + (query ? '&' : '?')}, '');
    }

}

$("#darkMode").on("click", dMClick)


