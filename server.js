const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname+'/static'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/static/html/posts.html');
});

app.post('/jsonData', (req,res)=>{
    var jsonData = [];
    fs.readFile('./res/jsonData.json', function(err, data) {
        if(err) res.send('error');
        else{
            jsonData = JSON.parse(data);
            jsonData.push(req.body);
            fs.writeFile('./res/jsonData.json', JSON.stringify(jsonData), ()=>{
                res.send('success');
            });
        }         
    });
}); 
app.get('/jsonData', (req,res)=>{
    fs.readFile('./res/jsonData.json', function(err, data) {
        if(err) res.send('error');
        else{
            res.send(data);
        }       
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
