var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var apiKey = "ALVr4fwE8asfGEipSTIuy4pJa88hg15Y";

function getArticles(searchTerm, recordCt, startYear, endYear) {
    if (!searchTerm || searchTerm.trim() === "") {
        // No search term provided -> return early
        return;
    }

    var urlParams = [`q=${searchTerm}`];

    // Verify valid start/end years (if supplied)
    if (parseInt(startYear)) {
        urlParams.push(`begin_date=${startYear}0101`);
    }
    if (parseInt(endYear)) {
        urlParams.push(`end_date=${endYear}0101`);
    }

    urlParams.push(`api-key=${apiKey}`);

    // Construct API request URL
    var queryURL = `${apiUrl}?q=${searchTerm}&${urlParams.join("&")}`;

    // Perform Ajax GET request to API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        // Pull the returned articles out of the reponse and output to screen
        var articles = data.response.docs;

        if (recordCt != "all") {
            // Only return the specified article count
            articles = articles.slice(0, recordCt);
        }
        printArticles(articles);
    });
}

// TODO - modify to print each article with correct formatting and content
function printArticles(articles) {
    $("#article-content").empty();
    articles.forEach(article => {
        var $headline = $("<p>").text(article.headline.main);
        var $byline = $("<p>").text(`By: ${article.byline.original}`);
        var $image = $("<img>").attr(
            "src",
            `http://nyt.com/${article.multimedia[0].url}`
        );

        var $article = $("<div>").append($headline, $byline, $image);

        $("#article-content").append($article);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Click handler for search button
    $("#search").on("click", function() {
        // Retreive search parameters from input fields
        var searchTerm = $("#term").val();
        var recordCt = $("#record-ct").val();
        var startYear = $("#start-year").val();
        var endYear = $("#end-year").val();

        // Pass search params to function that will perform the API request
        getArticles(searchTerm, recordCt, startYear, endYear);
    });

    // Click handler for clear button
    $("#clear").on("click", function() {
        $("#article-content").empty();
    });
});
