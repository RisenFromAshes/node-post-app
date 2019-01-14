module.exports = function (){

    var user = function (id){
        this.id = id;
        this.updateRequired = false;
    };
    
    var users = [];
    
    this.getUser = (id) =>{
        var _user;
        users.forEach(user=>{
            if(id===user.id) {
                _user = user;
            }
        });
        return _user;
    };

    this.addUser = (id)=>{
        var idCheck = (id)=>{
            var notmatch = true;
            if(users.length > 0){
                users.forEach(user=>{
                    notmatch = notmatch&&(user.id !== id);
               });
               return notmatch;
            }
            else return true;        
        };
        if(idCheck(id)){ 
            users.push(new user(id));
            console.log(`User with id: ${id} added`);
         }   
    };
    
    this.needUpdate = (id)=>{
        users.forEach((user)=>{
            if(user.id !== id) user.updateRequired = true; 
        });
    };
    
    this.updated = (id)=>{
        users.forEach((user)=>{
            if(user.id === id) user.updateRequired = false; 
        });
    };
};