

var getPost = (postData)=>{
    var userh6 = $("<h6></h6>")
                .addClass("card-title text-left w-50 font-weight-bold text-info")
                .text(postData.user); 
                
    var timeh6 = $("<h6></h6>")
                .addClass("text-right w-50 text-primary")
                .text(postData.time); 
    var titleh4 = $("<h4></h4>")
                .addClass("card-title text-left w-50 font-weight-bold text-dark")
                .text(postData.title);

    var para = $("<p></p>").addClass("float-left").text(postData.text); 


    var row1 = $("<div></div>")
    .addClass("row px-4").append(
        titleh4, timeh6, userh6
    );

    var hr = $("<hr></hr>");

    var row2 = $("<div></div>").addClass("row px-4").append(
        para
    );
    var cardbody = $("<div></div>")
                    .addClass("card-body")
                    .append(
                        row1,hr, row2
                    );
    var card = $("<div></div>")
                .addClass("card bg-light my-4")
                .append(
                    cardbody
                );
    return card;
};

var newDataInput = ()=>{
    var PostData = function(title, user, text){  
        var date = new Date();     
        this.time = `${date.toLocaleTimeString()} ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
        this.user = user;
        this.title = title;
        this.text = text;
    };
    var title = $("#title").val();
    $("#title").val("");
    var user = $("#user").val();
    $("#user").val("");
    var text = $("#text").val();
    $("#text").val("");
    if(title&&user&&text){
        turnoffslide = false;
        $("#alert").slideUp();
        var postData = new PostData(title, user, text);        
        sendRequest(postData);
        renderPost(postData);
        _slideUp();
        stopPostInputAnim();
    }
    else{        
        turnoffslide = true;
        $("#alert").slideDown();
    }
};

var renderPost = postData=>{
    $("#mainTab").append(getPost(postData));
};

var renderPrePosts = ()=>{
    getRequest(posts=>{
        posts.forEach(post => {
            renderPost(post);
        });
    });
};

var sendRequest = (object)=>{
    $.ajax({
        type: "POST",
        url: "/jsonData",
        data: JSON.stringify(object),
        contentType : "application/json; charset=UTF-8",
        success: function (response) {
            console.log(response);
        }
    });
};

var getRequest = (callback)=>{
    $.get("/jsonData", 'requesting json',
        function (data) {
            console.log('Successfully fetched json data');
            callback(data);
        },
        "json"
    );
};






