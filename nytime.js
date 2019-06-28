$("#search").on("click", function() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey+q6j9wM5GmujWbu8FZWzFc6qANAByuytF";
        

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {

        var text = response.data.text_original_url;
        console.log(response);

    });
    });
