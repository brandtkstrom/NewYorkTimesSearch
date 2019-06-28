var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var apiKey = "ALVr4fwE8asfGEipSTIuy4pJa88hg15Y";

function getArticles(searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
        // No search term provided -> return early
        return;
    }

    var queryURL = `${apiUrl}?q=${searchTerm}&api-key=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        console.log(data);
        var articles = data.response.docs;
        printArticles(articles);
    });
}

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
    $("#search").on("click", function() {
        var searchTerm = $("#term").val();
        getArticles(searchTerm);
    });

    $("#clear").on("click", function() {
        $("#article-content").empty();
    });
});
