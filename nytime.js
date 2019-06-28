// Define constants to hold NY Times API address and API key.
const apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const apiKey = "ALVr4fwE8asfGEipSTIuy4pJa88hg15Y";

// Performs an article search via the NY Times API using the provided
// arguments (search paramters).
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
        // Log response to console
        console.log(data);

        // Pull the returned articles out of the reponse
        var articles = data.response.docs;

        if (recordCt != "all") {
            // Only return the specified article count
            articles = articles.slice(0, recordCt);
        }

        // Output articles to screen
        printArticles(articles);
    });
}

// Formats and outputs the provided article array to screen.
function printArticles(articles) {
    $("#article-content").empty();

    articles.forEach(article => {
        var $card = getArticleCard(article);
        $("#article-content").append($card);
    });
}

// Contructs and returns a Bootstrap card with content from the provided article object.
function getArticleCard(article) {
    var $card = $("<div>")
        .addClass("card p-2 mb-4")
        .css({ "max-width": "45%", "min-width": "250px" });
    var $cardBody = $("<div>").addClass("card-body");
    var $title = $("<h4>")
        .addClass("card-title my-3")
        .text(article.headline.main);
    var $byline = $("<h5>")
        .addClass("card-subtitle my-3 text-muted")
        .text(`By: ${article.byline.original}`);
    var $paragraph = $("<p>")
        .addClass("card-text")
        .text(article.lead_paragraph);
    var $link = $("<a>")
        .attr({ href: article.web_url, target: "_blank" })
        .addClass("card-link")
        .text("Read More");
    var $image = $("<img>")
        .attr("src", `https://nyt.com/${article.multimedia[0].url}`)
        .css({ "object-fit": "cover", width: "100%", height: "30vh" });

    $cardBody.append($image, $title, $byline, $paragraph, $link);
    $card.append($cardBody);

    return $card;
}

// Attach event listeners once DOM content is loaded.
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
