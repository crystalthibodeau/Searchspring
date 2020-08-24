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
        card += '<h4>' + results[i].title + '</h4>';
        card += '<div class="d-flex justify-content-center">';
        card += '<h4 class="px-1">' + "$" + results[i].price + '</h4>'
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
    var searchString;
    searchString = '';
    var urlSearchString = window.location.href;
    var url = new URL(urlSearchString);
    var searchParam = url.searchParams.get("search");
    if (searchParam != null) {
        searchString = searchParam.replace(/,|,\s/g, ",+");
    }
//==================Submits ajax request for catolog items when search strinig is empty====================================

    if (searchString === "") {
        $('#demoForm').submit();
    }

// ==========================Submits ajax request for catolog items when Navbar clicked=================================

    function notEmptyLanding() {
        $('#demoForm').submit();
    }

    var navHeader = document.getElementById("navHeader");
    navHeader.addEventListener("click", notEmptyLanding);

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

    // =============================================Start of first page load============================================

    function Disable(a, b) {

        for (let i = 0; i < document.getElementsByClassName("previous").length; i++) {

            if (a === 1) {
                if (!document.getElementsByClassName("previous")[i].classList.contains("disabled")) {
                    document.getElementsByClassName("next")[i].classList.remove("disabled")
                    document.getElementsByClassName("previous")[i].classList.add("disabled")
                }
            }

            if (a > 1) {
                document.getElementsByClassName("previous")[i].classList.remove("disabled")
                document.getElementsByClassName("next")[i].classList.remove("disabled")
            }

            if (a === b) {
                document.getElementsByClassName("previous")[i].classList.remove("disabled")
                document.getElementsByClassName("next")[i].classList.add("disabled")
            }

        }

    }


    // ============================================= // ============================================= // =============================================


    var firstRun = "http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + 1;
    $.ajax(firstRun).done(function (data) {
        mediaQuery();
        // console.log(data)
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
        // $("#pagLi").html(pagination);

    });
}


// ================================Loads the next page each time next button is clicked=================================

function next() {


    //==========updates pagination number/matching page loaded with pagination clicks
    paginationNumber = paginationNumber + 1;
    $.ajax("http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber)).done(function (data) {

        // console.log(data.results)

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

    $.ajax("http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (paginationNumber)).done(function (data) {

        paginationUpdate();

        Disable(paginationNumber, data.pagination.totalPages);

        var ShoppingCard = "";

        createCards(data.results, ShoppingCard);


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
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function () {      // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});


//BONUS ==Above and below the results show pagination with next and previous buttons. You could also display some pages before/after the current page as applicable.
//color clicker
//right spot of page when search is submitted and jumbotron is active
//nav items?
//on sale or seasonal items
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

$("#darkMode").click(function () {

    var nav = document.getElementById("searchSpringNav");
    var navButton = document.getElementById("searchSpringNavButton");

    // ==========================first click/ to turn dark mode on
    if(nav.classList.contains("searchSpringNav") && navButton.classList.contains("searchSpringNav")){

        nav.classList.remove("searchSpringNav")
        nav.classList.add("dMBackgroundColor");
        navButton.classList.remove("searchSpringNav")
        navButton.classList.add("dMBackgroundColor");

    // ==========================second click/ to turn dark mode off
    }else{

        nav.classList.remove("dMBackgroundColor")
        nav.classList.add("searchSpringNav");
        navButton.classList.remove("dMBackgroundColor")
        navButton.classList.add("searchSpringNav");

    }


});

