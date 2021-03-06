// ==========================Submits ajax request for catolog items without search param==============================
//dropdown sorting option
//data.sorting.options values
// <option value="volvo">Volvo</option>
//     <option value="saab">Saab</option>
//     <option value="mercedes">Mercedes</option>
//     <option value="audi">Audi</option>

var searchString;
searchString = '';
var urlSearchString = window.location.href;
var url = new URL(urlSearchString);
var searchParam = url.searchParams.get("search");
var protocol = window.location.protocol,
    host = '//' + window.location.host,
    path = window.location.pathname,
    query = window.location.search;

if (searchParam === null) {
    searchParam = "";
}


var paginationNumber = 1;
//selects top and bottom pagination
var paginationNumbers = document.getElementsByClassName("paginationNumber");
// var themeString = window.location.href.toLowerCase().toString().split("?");
// var string = themeString[2];
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
    $('#checkBox').prop("checked", true)
} else {
    $('#checkBox').prop("checked", false)
}

// ==========================Create sort options=================================
function createOptions(options){
    var option = ""
    for(let i =0; i < options.length; i++){
        console.log(options);
        option += '<option value="sort.' + options[i].field + '=' +options[i].direction+'" ' + (options[i].active ? 'selected': "") +'>';
        option += options[i].label;
        option +='</option>';
    }
    var selectMenu = document.getElementById("options");
    selectMenu.innerHTML = option;
    console.log(option);
    console.log(selectMenu);

}
// ==========================call sort options=================================

function callOption(){
    var dropDownVal = document.getElementById("options").value;

    // sort.price =
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (1) + "&" + dropDownVal ).done(function (data) {
        paginationNumber = 1;
        mediaQuery();
        // Create the cards
        var ShoppingCard = "";
        paginationUpdate();
        Disable(paginationNumber, data.pagination.totalPages);
        createCards(data, ShoppingCard);//data.results

    });


}

var selectForm = document.getElementById("options");
selectForm.addEventListener("change", callOption);

function onLoad() {
    // searchButton.scrollIntoView();
    $.ajax("https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=" + searchParam + "&resultsFormat=native&page=" + (1) + "/").done(function (data) {
        paginationNumber = 1;
        mediaQuery();
        // Create the cards
        var ShoppingCard = "";
        paginationUpdate();
        Disable(paginationNumber, data.pagination.totalPages);
        createCards(data, ShoppingCard);//data.results
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
        createCards(data, ShoppingCard);//data.results
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

        createCards(data, ShoppingCard);//data.results

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

        createCards(data, ShoppingCard);
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
function modal(results) { //data.results

    var modal = "";
    for (let i = 0; i < results.length; i++) {
        // console.log(results[i])
        var msrp = "";
        //var modal = "";
            // product has an “msrp” field
        if (results[i].msrp != null || results[i].msrp !== undefined || results[i].msrp !== "") {

            var msrpNum = parseFloat(results[i].msrp);
            var priceNum = parseFloat(results[i].price);
            //console.log("msrp", msrpNum + " vs " + priceNum)

            if (msrpNum > priceNum) {
                msrp = '<h4 class="px-1 strike text-muted">' + "$" + results[i].msrp + '</h4>';
            }

        }
        modal +=
            '<div class=\"modal fade\" id=\"ApiModalLong' +i+'\" tabindex=\"-1\" role=\"dialog\"\n' +
            " aria-labelledby=\"ModalLongTitle\" aria-hidden=\"true\">\n" +
            "\n" + "<div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
            "<div class=\"modalContent\">\n" +
            "<div class=\"modalHeader\">\n" +
            "<h5 class=\"textColor api-modal-title\" id=\"ApiModalLongTitle\">" + results[i].title +"</h5>\n" +
            "<button type=\"button\" class=\"closed\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
            "<span aria-hidden=\"true\">&times;</span>\n" +
            "</button>\n" +
            "</div>\n" +
            "<div class=\"api-modal-image mx-auto\">\n" +
            '<img class="card-img-top img-fluid pt-4" src="' + results[i].thumbnailImageUrl + '" alt="Card image" />' +
            "\n" +
            "</div>\n" +
            "<div class=\"modal-body text-center\">\n" +
            '<div class="d-flex justify-content-center">' +
            '<h4 class="textColor px-1">' + "$" + results[i].price + '</h4>' +
            msrp +
            '</div>' +
            '<h3 class="textColor text-center">' + results[i].title + '</h3>' +
            '<p class="textColor">' + results[i].description + "</p>\n" +
            "</div>\n" +
            "<div class=\"modalFooter\">\n" +
            "<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n" +
            "</div>\n" +
            "</div>\n" +
            "</div>\n" +
            "</div>";

    }
    $(".modals").html(modal);
}

function createCards(data, card) { //data.results

    card = "";
    for (let i = 0; i < data.results.length; i++) {

        var msrp = "";
        // product has an “msrp” field
        if (data.results[i].msrp != null || data.results[i].msrp !== undefined || data.results[i].msrp !== "") {

            var msrpNum = parseFloat(data.results[i].msrp);
            var priceNum = parseFloat(data.results[i].price);
            //console.log("msrp", msrpNum + " vs " + priceNum)

            if (msrpNum > priceNum) {
                msrp = '<h4 class="px-1 strike text-muted">' + "$" + data.results[i].msrp + '</h4>';
            }

        }

        card += '<div class="mb-4 col-12 col-sm-6 col-md-4 col-lg-4">';
        card += '<div class="productCard shadow bg-white rounded">';
        card += '<img class="card-img-top img-fluid" src="' + data.results[i].thumbnailImageUrl + '" alt="Card image" />';
        card += '<div class="cardBody">';
        card += '<h4 class="textColor">' + data.results[i].title + '</h4>';
        card += '<div class="d-flex justify-content-center">';
        card += '<h4 class="textColor px-1">' + "$" + data.results[i].price + '</h4>'
        card += msrp;
        card += '</div>';
        card += '<small class="text-muted d-flex justify-content-center align-items-center">';
        card += '<button class="preview px-3" data-toggle="modal" data-target="#ApiModalLong'+i+'" id="' + data.results[i] + '\">\n' + 'Preview\n' + '</button>';
        card += '</small>';
        card += '</div>';
        card += '</div>';
        card += '</div>';
    }
    modal(data.results);

    createOptions(data.sorting.options);

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
    if ($(window).width() < 652) {
        $("#return-to-top").hide();
    } else {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    }
});
$('#return-to-top').click(function (e) {
    e.preventDefault();
    // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
    }, 500);
});
