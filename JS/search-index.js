// ==========================Submits ajax request for catolog items without search param==============================
// if (searchParam != null) {
//     searchString = searchParam.replace(/,|,\s/g, ",+");
// }

var searchString;
searchString = '';
var urlSearchString = window.location.href;
var url = new URL(urlSearchString);
var searchParam = url.searchParams.get("search");
var dMFlag = false;
var protocol = window.location.protocol,
    host = '//' + window.location.host,
    path = window.location.pathname,
    query = window.location.search;

if(searchParam === null){
    searchParam = "";
}

var newUrl = protocol + host + path + query + (query ? '&' : '?') + '?theme';
var baseURL = protocol + host + path + query + (query ? '&' : '?');
var paginationNumber = 1;
//selects top and bottom pagination
var paginationNumbers = document.getElementsByClassName("paginationNumber");
var themeString = window.location.href.toLowerCase().toString().split("?");
var string = themeString[2];
// console.log("outside if", string);
var searchButton = document.getElementById("searchSpringNavButton");

$("#main").toggleClass(localStorage.toggled);


function darkLight() {
    if (localStorage.toggled !== 'dark') {
        $('#main').toggleClass('dark');
        localStorage.toggled = "dark";
    } else {
        $('#main').toggleClass('dark', false);
        localStorage.toggled = "";
    }
}

if ($('main').hasClass('dark')) {
    $( '#checkBox' ).prop( "checked", true )
} else {
    $( '#checkBox' ).prop( "checked", false )
}

function onLoad() {
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber) + "/").done(function (data) {
        paginationNumber = 1;
        mediaQuery();
        // Create the cards
        var ShoppingCard = "";
        paginationUpdate();
        Disable(paginationNumber, data.pagination.totalPages);
        createCards(data.results, ShoppingCard);//data.results

    });
}
onLoad();

searchButton.addEventListener("click", onLoad);

// ==========================Submits ajax request for catolog items when Navbar clicked=================================

function clickHeader() {

    searchParam = "";
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1 + "/").done(function (data) {
        // console.log("ajax");
        paginationNumber = 1;
        mediaQuery();
        // Create the cards
        var ShoppingCard = "";
        paginationUpdate();
        Disable(paginationNumber, data.pagination.totalPages);
        createCards(data.results, ShoppingCard);//data.results
    });

}

var navHeader = document.getElementById("navHeader");
navHeader.addEventListener("click", clickHeader);


// ================================Loads the next page each time next button is clicked=================================

function next() {
    //==========updates pagination number/matching page loaded with pagination clicks
    paginationNumber = paginationNumber + 1;
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber) + "/").done(function (data) {

        mediaQuery();

        paginationUpdate();

        Disable(paginationNumber, data.pagination.totalPages);

        var ShoppingCard = "";

        createCards(data.results, ShoppingCard);//data.results

    })

}

// ================================Loads the previous page each time next button is clicked=================================

function previous() {
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
        card += '<div class="productCard shadow bg-white rounded">';
        card += '<img class="card-img-top img-fluid" src="' + results[i].thumbnailImageUrl + '" alt="Card image" />';
        card += '<div class="cardBody">';
        card += '<h4 class="textColor">' + results[i].title + '</h4>';
        card += '<div class="d-flex justify-content-center">';
        card += '<h4 class="textColor px-1">' + "$" + results[i].price + '</h4>'
        card += msrp;
        card += '</div>';
        card += '</div>';
        card += '</div>';
        card += '</div>';
    }

    $(".ShoppingCards").html(card);
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
