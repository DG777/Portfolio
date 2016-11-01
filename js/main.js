sessionStorage.setItem("pageID", 0);

var introText = ["Life is all about being curious and asking questions, right?", "So do it!", "Hi! I'm Matvey, what do you want to know about me?"];

//TODO: when no input and the user goes to a project page and back to index NO info is displayed

$(document).ready(function () {
    // TODO: timing 2600, 3600, 3600
    var domElement = $("#output");
    if (sessionStorage.getItem("initLoad") == null) {
        $("#input").fadeIn(0).addClass("hidden");
        $('.siteNav-social').addClass("hidden");

        $(domElement).empty();
        showText(domElement, introText[0], 0, 10);

        setTimeout(function () {
            $(domElement).empty();
            showText(domElement, introText[1], 0, 10);
        }, 1600);
        setTimeout(function () {
            $(domElement).empty();
            showText(domElement, introText[2], 0, 10);
        }, 2600);

        setTimeout(function () {
            if (sessionStorage.getItem("initLoad") == null) {
                $("#input").fadeIn(1300).removeClass("hidden").addClass("visible");
                $('.siteNav-social').fadeIn(1300).removeClass("hidden").addClass("visible");
                sessionStorage.setItem("initLoad", 1);
            } else {
                $("#output").append(sessionStorage.getItem('outputValue'));
                $("#input").removeClass("hidden").addClass("visible");
                $('.siteNav-social').removeClass("hidden").addClass("visible");
            }
        }, 2600);
    } else {
        domElement.empty();
        showText(domElement, introText[2], 0, 10);
    }
});


function updatePage() {
    if (sessionStorage.getItem('pageID') == 1) {
        updateAccordion();
        updateOutputGET();
    } else {
        sessionStorage.setItem('pageID', 0);
    }
}

var counter = 0;
function updateCounter() {
    function isEven(n) {
        return n % 2 == 0;
    }
    counter++;
    if (isEven(counter))
        document.getElementById("projects").href = "projects.html";
    else
        document.getElementById("projects").href = "index.html";
}

function updateOutputGET() {
    $("#output").html(sessionStorage.getItem('outputValue'));
    console.log('fired');
}

function updateAccordion() {
    $('#accordion').find('.accordion-toggle').click(function () {

        //Expand or collapse this panel
        $(this).next().slideToggle('fast');

        //Hide the other panels
        $(".accordion-content").not($(this).next()).slideUp('fast');

    });
}


//shows text  gradually, letter by letter
var showText = function (target, message, index, interval) {
    if (index<message.length) {
        $(target).append(message[index++]);
        setTimeout(function () {
            showText(target, message, index, interval);
        }, interval);
    }
};

//loading a GeoJSON file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'ai.json', false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};

//parsing JSON
var aiJSON = null;
(function init() {
    loadJSON(function (response) {
        // Parse JSON string into object
        return aiJSON = JSON.parse(response);
    });
})();

// takes an input and separates into an array of words
function separateWords(string) {
    return string.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\n]/g, "").toLowerCase().split(" ");
}

//Check if an input has matching words in aiJSON, outputs a proper response
function checkForMatch(obj, string) {
    var output,
        wordList = separateWords(string);
    for (j in obj) {
        for (i = 0; obj[j].keywords.length>i; i++) {
            for (word in wordList) {
                if (wordList[word] !== obj[j].keywords[i]) {
                    output = "I'm just a script, I don't know, why don't you ask the real me at latooma@gmail.com?"
                    sessionStorage.setItem("outputValue", output);
                } else {
                    output = obj[j].output;
                    sessionStorage.setItem("outputValue", output);
                    return output;
                }
            }
        }
    }
    return output;
}


//parses user input
function parseInput() {
    return string = document.getElementById("input").value;
}

//rewrites a text output
function rewrite(input) {
    var domElement = document.getElementById("output");
    $(domElement).empty();
    showText(domElement, checkForMatch(aiJSON, input), 0, 20);
}

//open all links in a new tab
window.onload = function () {
    var anchors = $("li a");
    for (var i = 0; i<anchors.length; i++) {
        anchors[i].setAttribute('target', '_blank');
    }
}
