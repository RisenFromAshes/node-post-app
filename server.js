const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var user_ = require('./utils/user');
var _user = new user_();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname+'/static'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname+'/static/html/posts.html');
});

app.post('/jsonData/user:id', (req,res)=>{
    var jsonData = [];
    fs.readFile('./res/jsonData.json', function(err, data) {
        if(err) res.send('error');
        else{
            jsonData = JSON.parse(data);
            jsonData.push(req.body);
            fs.writeFile('./res/jsonData.json', JSON.stringify(jsonData, undefined, 2), ()=>{
                res.send('success');
                console.log(`Data added by user:${req.params.id}`);                
                _user.needUpdate(req.params.id);
            });
        }         
    });
}); 
app.get('/jsonData/user:id', (req,res)=>{
    fs.readFile('./res/jsonData.json', function(err, data) {
        if(err) res.send('error');
        else{
            _user.addUser(req.params.id);
            _user.updated(req.params.id);            
            res.send(data);         
        }       
    });
});

app.get('/update/user:id',(req,res)=>{
    if(_user.getUser(req.params.id)){                  
        if(_user.getUser(req.params.id).updateRequired){            
            res.send('true');
            console.log(`Update advised to user: ${req.params.id}`);
        }
        else {        
            res.send('false');
        }
    }            
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
