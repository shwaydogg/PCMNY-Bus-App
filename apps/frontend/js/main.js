var content = $("#content");
var database;
var state = 0;

var flow = [
    { request: "", template: "starttpl", data: {} }, {
        request: "",
        template: "survey",
        data: {
            question: "Hi, my name is",
            id: "name",
            placeholder: "name"
        }
    }, {
        request: "",
        template: "survey",
        data: {
            question: "My bus id is",
            id: "bus",
            placeholder: "bus id"
        }
    }, {
        request: "",
        template: "survey",
        data: {
            question: "I'm coming from",
            id: "zip",
            placeholder: "zip code"
        }
    }, {
        request: "",
        template: "survey",
        data: {
            question: "Hit me up here",
            id: "email",
            placeholder: "email"
        }
    }, {
        request: "",
        template: "survey",
        data: {
            question: "Or buzz my cell piece",
            id: "phone",
            placeholder: "888-555-1234"
        }
    }, {
        request: "http://jsonplaceholder.typicode.com/posts",
        template: "surveyInterests",
        data: {
            question: "Pick your top 3 interests...",
            interests: []
        }
    }, {
        request: "", // needs a request
        template: "findsquad",
        data: ["Melinda", "Judith", "Prakash"]
    }, {
        request: "",
        template: "questions",
        data: ["What was your favorite sign, art, chant today?"]
    }, {
        request: "",
        template: "questions",
        data: ["Where are you from?"]
    }, {
        request: "",
        template: "questions",
        data: ["What was your favorite part of the march?"]
    }, {
        request: "",
        template: "questions",
        data: ["What was your low point of the day/march?"]
    }, {
        request: "",
        template: "questions",
        data: ["Why are you here?", "What’s your climate awakening story?", "Who did you march/mobilize/protest for today?"]
    }, {
        request: "",
        template: "questions",
        data: ["It drives me crazy that________", "<insert something someone does that is contributing to climate change or climate injustice>"]
    }, {
        request: "",
        template: "questions",
        data: ["I have to confess, I feel guilty that________ ", "<Share a story of something you struggle with>"]
    }
]


function render() {
    function renderNow(d) {
        var template = $("#" + flow[state].template).html();
        var compiledCode = Handlebars.compile(template);
        content.html(compiledCode(d));
        listeners();

    }
    if (flow[state].request == "") {
        renderNow(flow[state].data);
    } else {
        $.ajax(flow[state].request, {
            method: 'GET'
        }).then(function(data) {
            console.log(data);
            flow[state].data.interests = data;
            renderNow(flow[state].data);
        });

        // submitting marchers info should be similar to this:
        // check Cassie test code: https://github.com/cassiemoy/create-and-advocate
        // var newMarcherKey = database.ref().child('marchers').push().key;
        // database.ref('marchers/' + newMarcherKey).set({
        //     busID: bus,
        //     name: name,
        //     email: email,
        //     phone: phone,
        //     zip: zip,
        //     askChoices: askChoices
        // });

    }
}

function listeners() {
    $(".next").click(function() {
        // should add form validation
        state++;
        console.log("state:", state);
        render();
    })
    $(".prev").click(function() {
        state--;
        console.log("state:", state);
        render();
    })
}

function initFirebase() {
    var config = {
        apiKey: "AIzaSyCnZ0Otme1WwhM4-CEKZtLjGHCpspa4Kdw",
        authDomain: "function-demo-bd359.firebaseapp.com",
        databaseURL: "https://function-demo-bd359.firebaseio.com/"
    };

    firebase.initializeApp(config);
    database = firebase.database();
    database.ref('/marchers').once('value').then(function(data) {
        console.log(data.val());
    });
}

$(document).ready(function() {
    initFirebase();
    render();
});
