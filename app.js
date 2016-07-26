var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

var COMMENTS_FILE = path.join(__dirname, 'public/learn-react/examples/comments/data/comments.json');
//console.log(COMMENTS_FILE);
app.get('/api/comments', function(req, res) {
    // console.log(req.body);
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function(req, res) {
    // console.log(req.body);
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

var router = express.Router();

var SEARCHPRODUCT_FILE = path.join(__dirname, 'public/learn-react/examples/searchProduct/data/search.json');

//(accessed at POST http://localhost:3030/api/search)
router.route('/search')
    .post(function(req, res) {
        var keyword = req.body.kw;
        var stocked = req.body.stocked;
        fs.readFile(SEARCHPRODUCT_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            var result = JSON.parse(data);
            var arr = [];
            var arr1 = [];
            result.forEach(function(d, i) {
                if (d.stocked == stocked) {
                    if (d.name.indexOf(keyword) > -1) {
                        arr.push(d);
                    }
                    if (keyword == '') {
                        arr1.push(d);
                    }
                }
            });
            if (keyword == '') {
                res.json(arr1);
            } else {
                res.json(arr);
            }
        });
    })
    .get(function(req, res) {
        fs.readFile(SEARCHPRODUCT_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(JSON.parse(data));
        });
    });

app.use('/api', router);

module.exports = app;