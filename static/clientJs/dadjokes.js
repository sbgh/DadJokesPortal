$(document).ready(function() {

    //Highlight buttons and adjust nav bar on scroll
    window.onscroll = function() {scrollFunction()};

    //highlight nav buttons depending on scrollTop position
    function scrollFunction() {
        var scrollTop = $(document).scrollTop();
        var anchors = $('body').find('.anchor');
        var buttons = $('.navbar-right').find('li');

        for (var i = 0; i < anchors.length; i++){
            if (scrollTop > ($(anchors[i]).offset().top - $("#myNavbar").height() - 60)  && scrollTop < ($(anchors[i]).offset().top - $("#myNavbar").height() - 60) + $(anchors[i]).height() ) {
                $(buttons[i]).addClass('active');
            } else {
                $(buttons[i]).removeClass('active');
            }
        }

        //grow or shrink nav bar
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $("#myNavbar").addClass("navbar-shrink");
        } else {
            $("#myNavbar").removeClass("navbar-shrink");
        }
    }

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('.page-scroll a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Floating label headings for the form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    //prevent default browser actions like page reload on button clicks.
    $('#sendForm').on('submit', function(e){ e.preventDefault()});

    //Search button click event
    $("#sendBtn").click(function(event){
        var mydata = {};
        mydata.page='1';
        submitRequest(mydata)
    });

    //first page click event
    $("#firstPage").click(function(event){
        event.preventDefault();
        var mydata = {};
        mydata.page='1';
        submitRequest(mydata)
    });

    //previous page click event
    $("#prevPage").click(function(event){
        event.preventDefault();
        var mydata = {};
        mydata.page=resultJson.previous_page;
        submitRequest(mydata)
    });

    //next page click event
    $("#nextPage").click(function(event){
        event.preventDefault();
        var mydata = {};
        mydata.page=resultJson.next_page;
        submitRequest(mydata)
    });

    //last page click event
    $("#lastPage").click(function(event){
        event.preventDefault();
        var mydata = {};
        mydata.page=resultJson.total_pages;
        submitRequest(mydata)
    });

    //handles adding form to mydata and ajax post
    function submitRequest(mydata){
        $('#sendForm input, #sendForm textarea').each(
            function(){
                var input = $(this);
                mydata[input.attr('id')] = input.val();
            }
        );

        //attempt post request to local /dadjokes service.
        //mydata to include {term:the-search-terms, page:the-page-number} obj
        $.ajax({
            type: 'POST',
            data: JSON.stringify(mydata),
            dataType : "text",
            headers: {
                "content-type": "application/json"
            },
            url: '/dadjokes',
            success : function(result) {

                //attempt to parse json
                resultJson = JSON.parse(result);

                //if status is not 200 show error and dump results to console
                if(resultJson.status !== 200){
                    $("#resultsStatus").html("<b>Error retriving dad jokes</b>");
                    //clear list of jokes
                    $("#resultsText").html("");
                    console.log("Error retriving dad jokes")
                    console.log(result)
                }else{
                    //populate statusHtml div
                    var total_jokes = resultJson.total_jokes;
                    var current_page = resultJson.current_page;
                    var total_pages = resultJson.total_pages;
                    var previous_page = resultJson.previous_page;

                    var statusHtml = "<b>Total Jokes:</b> " + total_jokes;
                    statusHtml += " <b>Total Pages:</b> " + total_pages;
                    statusHtml += " <b>Current Page:</b> " + current_page;

                    //show paginationButtons if there are more then one pages
                    if(total_pages == "1"){
                        $(".paginationButtons").hide()
                    }else{
                        $(".paginationButtons").show()
                    }

                    //insert status html into status div
                    $("#resultsStatus").html(statusHtml);

                    //clear list of jokes just in time
                    $("#resultsText").html("");

                    //populate list of jokes
                    resultJson.results.forEach(function(jokeJson){
                        $("#resultsText").append("<p id="+ jokeJson.id +"></p>" ) ;
                        $("#"+ jokeJson.id  ).text(jokeJson.joke);
                    })
                }

            },
            error : function(error) { //server returned error
                //clear list of jokes
                $("#resultsText").html("");
                $(".paginationButtons").hide();
                $("#resultsText").text("Error connecting to dadjokes api");
                console.log(error);
                console.log("Error retriving dad jokes")
            }
        });
    }

    //hide paginationButtons on page load
    $(".paginationButtons").hide()
});

//global default var resultJson
resultJson = { current_page: 1,
    limit: 20,
    next_page: 1,
    previous_page: 1,
    results:
        [  ],
    search_term: '',
    status: 200,
    total_jokes: 1,
    total_pages: 1 };

