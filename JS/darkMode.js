//BONUS ==Above and below the results show pagination with next and previous buttons. You could also display some pages before/after the current page as applicable.
//color clicker
//right spot of page when search is submitted and jumbotron is active
//nav items?
//on sale or seasonal items
//search on type
// =====================================================================================================================

//BONUS ==Above and below the results show pagination with next and previous buttons. You could also display some pages before/after the current page as applicable.

// =======================================start of dynamic pagination===============================================

// var pagination = "";
// pagination += '<li class="page-item disabled previous">' + '<a class="page-link paginationNumberPrevious" href="#" tabindex="-1" aria-disabled="true">Previous</a>\n' + ' </li>'
//
// for(let i =0; i < 5; i++ ){
//     pagination += '<li class="page-item apiCallNum"><a class="page-link paginationNumber" href="#">'+ (i + 1) +'</a></li>';
// }
// pagination += '<li class="page-item next">' + '<a class="page-link paginationNumberNext" href="#">Next</a>' + '</li>';
// console.log(pagination);

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