const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const fs = require('fs')

var getDate = () => {
    var today = new Date();
    var newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    return newDate.toISOString().substring(0,10);
}


var keywords = [
                'role', 'roles', 'apply', 'positions', 'opening', 'entry-level', 'recent grad', 'hiring',
                'swe', 'SWE', 'software developer', 'consulting', 'think tank',
                '#hiring', '#job', '#jobs', '#career', '#careers', 
            ];
var str = keywords.join(' OR ');

var params = { 
    q: '(' + str + ') -is:retweet since:' + getDate(), 
    lang: 'en',
    count: 500,
    tweet_mode: 'extended'
};

function getData(err, data, response) {
    var tweets = data.statuses;
    fs.readFile('./test2.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            var obj = [JSON.parse(data)];

            for(var i=0; i< tweets.length; i++) {
                let some_text = tweets[i].full_text;
                if(!some_text.startsWith("RT ")) {
                    obj.push({username: tweets[i].user.name, text:some_text});
                }
            }
        }
        json = JSON.stringify(obj);
        fs.writeFile('./test2.json', json, 'utf8', err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }});
    });
    // console.log(data);
}

T.get('search/tweets', params, getData);