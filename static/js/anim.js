
var inside = false; 
var focusState = false;

var mousetimer1 = 1200, mousetimer2 = 0, now, headanimTimer, postanimeTimer;

var focusChecker = ()=>{
    $("#title").focus(function (e) { 
        e.preventDefault();
        focusState =  true;
    });
    $("#user").focus(function (e) { 
        e.preventDefault();
        focusState = true;
    });
    $("#text").focus(function (e) { 
        e.preventDefault();
        focusState = true;
    });
    $("#title").blur(function (e) { 
        e.preventDefault();
        focusState =  false;
    });
    $("#user").blur(function (e) { 
        e.preventDefault();
        focusState = false;
    });
    $("#text").blur(function (e) { 
        e.preventDefault();
        focusState = false;
    });
};

var startHeadAnimation = ()=>{
    var reverseOrder = false;
    var state = 0;
    var states = ['|', 'P', 'Po', 'Pos', 'Post', 'Post S', 'Post So', 'Post Som', 'Post Some', 'Post Somet', 'Post Someth', 'Post Somethi', 'Post Somethin', 'Post Something', 'Post Something H', 'Post Something He', 'Post Something Her', 'Post Something Here', 'Post Something Here .', 'Post Something Here ..', 'Post Something Here...', 'Post Something Here... |', 'Post Something Here...', 'Post Something Here...', 'Post Something Here... |', 'Post Something Here...', 'Post Something Here...', 'Post Something Here... |', 'Post Something Here...'];
    if(!headanimTimer){   
        headanimTimer =  setInterval(()=>{
                $("#header").text(states[state]);
                if(!reverseOrder && state<states.length) state++;
                else if(!reverseOrder) reverseOrder=true;
                if(reverseOrder && state>0) state--;
                else if(reverseOrder) reverseOrder=false;         
        },120);
    }
};

var stopHeadAnimation = ()=>{
    if(headanimTimer){
        clearTimeout(headanimTimer);
        headanimTimer = undefined;        
        $("#header").text("Write Your Post here");
    }    
};



var checkMouse = ()=>{ 
    $("#postContainer").mouseenter(function (){
        mousetimer1 = new Date().getTime();
        inside = true;         
        
    });
    $("#postContainer").mouseleave(function () {
        mousetimer2 = new Date().getTime();
        inside = false;
    });     
};

var animPostInput = ()=>{
    if(!postanimeTimer)
    {
        postanimeTimer = setInterval(()=>{
            now = new Date().getTime();
            if(!focusState){
                if(inside && (now - mousetimer1)>1000){            
                    _slideDown();
                }
                else if((now - mousetimer2)>1000){
                    _slideUp();
                }
            }
        },100);
    }
};

var _slideUp = ()=>{                             
    $('#close').hide(); startHeadAnimation();
    $("#formContainer").slideUp(600);
    $("#postContainer").removeClass("bg-default").addClass("bg-light");
};

var _slideDown = ()=>{     
    $('#close').show(); stopHeadAnimation();
    $("#formContainer").slideDown(600);
    $("#postContainer").removeClass("bg-light").addClass("bg-default"); 
};

var stopPostInputAnim = ()=>{
    if(postanimeTimer){
        clearTimeout(postanimeTimer);
        postanimeTimer = undefined;
    }
};