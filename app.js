const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
    var firstName = req.body.FName;
    var lastName = req.body.LName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/6f0a017af1";

    const options = {
        method: "POST",
        auth: "hanthienduc1:d08857667efa54ff940b0287bc347866-us7"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function(data) {
        //     console.log(data);
        // });

    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The server is running on port 3000");
});

// apiKey d08857667efa54ff940b0287bc347866-us7
// listID 6f0a017af1