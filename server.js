const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

var app = express();

//var updateRequired = false;

var user = function (id){
    this.id = id;
    this.updateRequired = false;
};

var users = [];

var getUser = (id) =>{
    var _user;
    users.forEach(user=>{
        if(id===user.id) {
            _user = user;
        }
    });
    return _user;
};
var addUser = (id, users)=>{
    var idCheck = (id,users)=>{
        var notmatch = true;
        if(users.length > 0){
            users.forEach(user=>{
                notmatch = notmatch&&(user.id !== id);
           });
           return notmatch;
        }
        else return true;        
    };
    if(idCheck(id,users)){ 
        users.push(new user(id));
        console.log(`User with id: ${id} added`);
     }   
};

var needUpdate = (id)=>{
    users.forEach((user)=>{
        if(user.id !== id) user.updateRequired = true; 
    });
};

var updated = (id)=>{
    users.forEach((user)=>{
        if(user.id === id) user.updateRequired = false; 
    });
};

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
                needUpdate(req.params.id);
                console.log(JSON.stringify(users, undefined, 2)); 
            });
        }         
    });
}); 
app.get('/jsonData/user:id', (req,res)=>{
    fs.readFile('./res/jsonData.json', function(err, data) {
        if(err) res.send('error');
        else{
            addUser(req.params.id,users);
            updated(req.params.id);            
            res.send(data);         
        }       
    });
});

app.get('/update/user:id',(req,res)=>{
    if(getUser(req.params.id)){                  
        if(getUser(req.params.id).updateRequired){            
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
