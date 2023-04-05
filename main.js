

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let initTimer ; 
let isClick = [ , false , false, false , false] ; 
let isStop = false ; 


const drawRect = (x,y,width,height,color)  => {
    ctx.fillStyle = color ; 
    ctx.fillRect(x,y,width,height); 

}

const drawCircleF = (x,y,r,color) => {   

ctx.fillStyle = color ; 
ctx.beginPath() ; 
ctx.arc(x,y,r,0 , 2*Math.PI ,false) ; 
ctx.closePath() ; 
ctx.fill() ; 

}

const drawCircleS = (x,y,r,lineWidth , color) => {  

    ctx.strokeStyle = color ; 
    ctx.lineWidth = lineWidth ; 
    ctx.beginPath() ; 
    ctx.arc(x,y,r,0 , 2*Math.PI); 
    ctx.closePath() ; 
    ctx.stroke() ; 
}
const drawText = (text,x,y,color) => {

    ctx.fillStyle= color ; 
    ctx.font = "50px arial" ; 
    ctx.fillText(text,x,y) ;

}

const user = {
    x : 20, 
    y : canvas.height / 2 - 50 ,
    width : 10 ,
    height: 100 ,
    color:  '#D3756B' , 
    score : 0
}

const computer = {
    x : canvas.width -30, 
    y : canvas.height / 2 - 50 ,  
    width : 10 ,
    height: 100 ,
    color:  'D3756B' , 
    score : 0
}

const ball = {
    x : canvas.width / 2,
    y : canvas.height/ 2,
    r  : 8 , 
    color : "black" ,
    speed : 5 ,  
    velocityX : -3 , 
    velocityY : -4 ,
    stop : true ,

}
let body = document.getElementsByTagName("body");

canvas.addEventListener("mousemove" , userMove);
const canvasBounding = canvas.getBoundingClientRect() ;
function userMove(e) {
    
   

    user.y = e.clientY - canvasBounding.y - user.height / 2 ;  
 


}


function isCollision(b,p){  

   b.top = b.y - b.r ; 
   b.bottom = b.y + b.r ; 
   b.left  = b.x - b.r 
   b.right = b.x + b.r ; 

   p.top = p.y ; 
   p.bottom = p.y + p.height ; 
   p.left = p.x ; 
   p.right = p.x + p.width ;


   return (b.right  > p.left && b.top < p.bottom && b.bottom > p.top  && b.left < p.right) ; 

}
let reset  =true ; 
const resetBall = ( ) => {
    ball.x = canvas.width/2 ; 
    ball.y = canvas.height/2 ; 
    ball.speed = 4 ;  
    ball.velocityX =  4
    ball.velocityY =  4
  
   
 
    
}

const  resetDifficulty = () => {
    difficulty = 0.1 ; 
    i = 0 ;
} 


let difficulty = 0.1 ; 
let array = [1000,2000,3000] ;
let  i = 0 ; 
const update = () => {
    ball.x += ball.velocityX ; 
    ball.y += ball.velocityY ; 

    if(ball.y + ball.r >= canvas.height   ||  ball.y - ball.r < 0){  
        ball.velocityY = -ball.velocityY;
     
    }

 
    if(ball.speed > 10){     
    while(i<1){  
    let x = Math.floor(Math.random() * 3) ; 
  let deneme =   setTimeout(() => {
      
            difficulty = 3; 
        
    }, array[x] );  
i++ ; 
}}
    console.log(difficulty);
        computer.y = ball.y -computer.height/2 * difficulty ;  




    let player  = ball.x < canvas.width/2 ? user :  computer ; 
   
    if(isCollision(ball,player)){
        console.log("collision detected");
       

        let intersectY = ball.y - (player.y + player.height/2); 
        intersectY /= (player.height/2) ;  

        let maxBounceRate = Math.PI / 3 ;  
        let bounceAngle = intersectY * maxBounceRate ;      
        
        

        
        
        const direction = (ball.x<canvas.width/2) ? 1 : -1 ;
        ball.velocityX = direction * ball.speed * Math.cos(bounceAngle);
        ball.velocityY =  ball.speed * Math.sin(bounceAngle) ;  
        

        ball.speed+= 0.4 ; 

    

    }

    if( ball.x > canvas.width ){
        user.score++; 
        resetBall() ; 
        resetDifficulty() ; 
        ball.velocityX = -ball.velocityX;  
        isStop = true ;
        setTimeout(() => {
            isStop = false ; 
        }, (1000));
        scoreCheck() ; 
       
    
}

else if(ball.x <0){
    computer.score++; 
    reset = false ; 
    resetBall() ; 
    resetDifficulty() ; 
    isStop = true ; 
    setTimeout(() => {
        isStop = false ; 
    }, (1000));
    scoreCheck() ; 
}



   
}

let x = false ; 
const scoreCheck = () => {


for(var i = 1 ; i<=4 ; i ++){  
    if(isClick[i]){
        x = true ; 
        console.log(i) ; 
        break ; 
    }
}


if(i == 1){  
    if(user.score == 3 || computer.score == 3){
        clearInterval(initTimer) ; 
        UI () ; 

        user.score = 0 ; 
        computer.score = 0 ; 
        
    }
}

if(i == 2){
    if(user.score == 5 || computer.score == 5){
        clearInterval(initTimer) ; 
        UI () ; 

        user.score = 0 ; 
        computer.score = 0 ; 
        
    }
}

if(i == 3){
    if(user.score == 7 || computer.score == 7){
        clearInterval(initTimer) ; 
        UI () ; 

        user.score = 0 ; 
        computer.score = 0 ; 
        
    }
}

if(i == 4){
    if(user.score == 10 || computer.score == 10){
        clearInterval(initTimer) ; 
        UI () ; 

        user.score = 0 ; 
        computer.score = 0 ; 
        
    }
}



     
        
    }



const render = ()=>{
    drawRect(0,0,canvas.width , canvas.height , "#FFC3A1") ;
    drawRect(canvas.width/2 -2 , 0 , 4 , canvas.height , "#D3756B" ) ; 
    drawCircleF(canvas.width / 2, canvas.height/2 , 8 , "#D3756B") ;  
    drawCircleS(canvas.width/2 , canvas.height/ 2, 50 , 4 , "#D3756B" ) ;
    drawText( user.score , canvas.width / 4 , 100 , "#D3756B");
    drawText(computer.score , canvas.width * 3/4 , 100 , "#D3756B" ) ;

    drawRect(user.x , user.y , user.width , user.height , user.color);
    drawRect(computer.x , computer.y , computer.width , computer.height , computer.color);
    drawCircleF(ball.x , ball.y , ball.r,ball.color);


    if(isStop){
        drawText("READY!" ,220,100 ,"#D3756B");
    }


     
    
}

const game = () => {


    if(!isStop){
    update() ; 
}


    render() ; 




}

const fps =144 ; 


const UI = () => {  
  let menu =   document.createElement("div");
    menu.style.width = "400px" ; 
    menu.style.height = "230px" ; 
    menu.style.left = "50%" ; 
    menu.style.transform = "translate(-50%)" ; 
    menu.style.background = "#BDCDD6" ; 
    menu.style.position = "absolute"  ; 
    menu.style.marginTop = "100px" ; 
    menu.style.borderRadius = "10px" ; 
    document.body.appendChild(menu );
    let topbar = document.createElement("div");
    topbar.style.width = "400px" ; 
    topbar.style.height ="50px" ; 
    topbar.style.background = "#EEE9DA" ; 
    topbar.innerHTML = "JAVASCRIPT PONG GAME"
    topbar.style.font = "bold 25px arial" ; 
    topbar.style.color = "gray" ; 
    topbar.style.display= "flex" ; 
    topbar.style.borderRadius = "10px" ; 
    topbar.style.justifyContent = "center" ; 
    topbar.style.paddingTop = "20px";
    menu.appendChild(topbar);

 
    let text = document.createElement("p");
    text.style.font = "bold 20px arial" ; 
    text.innerHTML = "Choose the score for game end :"
    text.style.margin = "15px" ; 
    menu.appendChild(text);
    let button1 = document.createElement("button");  
    button1.innerHTML = "3" ;
    button1.style.padding = "10px 30px" ; 
    button1.style.margin = "0 20px 0 25px";
    button1.style.background= "#EEE9DA" ; 
    button1.style.font = " 20px arial" ; 
    menu.appendChild(button1);
    button1.addEventListener("mouseover", function(){   
        button1.style.background = "#FFFBEB" ; 
        button1.style.boxShadow = "0px 0px 10px black" ; 
    });

    button1.addEventListener("click", function(){
        isClick[1] = true ; 
        isClick[2] = false ; 
        isClick[3] = false ;
        isClick[4] = false ;

        if(!isClick[2]){
            button2.style.background = "#EEE9DA" ; 
            button2.style.boxShadow = "0px 0px 0px black" ; 
        }
    
        if(!isClick[3]){
            button3.style.background = "#EEE9DA" ; 
            button3.style.boxShadow = "0px 0px 0px black" ; 
        }
        if(!isClick[4]){
            button4.style.background = "#EEE9DA" ; 
            button4.style.boxShadow = "0px 0px 0px black" ; 
        }

    });



    button1.addEventListener("mouseout", function(){
        if(!isClick[1]){
        button1.style.background = "#EEE9DA" ; 
        button1.style.boxShadow = "0px 0px 0px black" ; 
    }

    
    });

    
    let button2 = document.createElement("button");
    button2.innerHTML = "5" ;
    button2.style.padding = "10px 30px" ; 
    button2.style.margin = "0 20px 0 0";
    button2.style.background= "#EEE9DA" ; 
    button2.style.font = " 20px arial" ; 
    menu.appendChild(button2);
    button2.addEventListener("mouseover", function(){
        button2.style.background = "#FFFBEB" ; 
        button2.style.boxShadow = "0px 0px 10px black" ; 
    });

    
    button2.addEventListener("click", function(){
        isClick[2] = true ; 
        isClick[1] = false ; 
        isClick[3] = false ; 
        isClick[4] = false ; 
        if(!isClick[1]){
            button1.style.background= "#EEE9DA" ; 
            button1.style.boxShadow = "0px 0px 0px black" ; 
        } 

        if(!isClick[3]){
            button3.style.background= "#EEE9DA" ; 
            button3.style.boxShadow = "0px 0px 0px black" ; 
        } 
        if(!isClick[4]){
            button4.style.background= "#EEE9DA" ; 
            button4.style.boxShadow = "0px 0px 0px black" ; 
        } 




    });
    
    button2.addEventListener("mouseout", function(){
        if(!isClick[2]){
        button2.style.background = "#EEE9DA" ; 
        button2.style.boxShadow = "0px 0px 0px black" ; 
    }
    });


 

    let button3 = document.createElement("button");
    button3.innerHTML = "7" ;
    button3.style.padding = "10px 30px" ; 
    menu.appendChild(button3);  
    button3.style.margin = "0 20px 0 0";
    button3.style.background= "#EEE9DA" ; 
    button3.style.font = " 20px arial" ; 
    button3.addEventListener("mouseover", function(){
        button3.style.background = "#FFFBEB" ; 
        button3.style.boxShadow = "0px 0px 10px black" ; 
    });
    button3.addEventListener("mouseout", function(){
        if(!isClick[3]){
        button3.style.background = "#EEE9DA" ; 
        button3.style.boxShadow = "0px 0px 0px black" ; 
        }
    });


    button3.addEventListener("click", function(){
        isClick[1] = false ; 
        isClick[2] = false ; 
        isClick[3] = true ;
        isClick[4] = false ;

        if(!isClick[1]){
            button1.style.background = "#EEE9DA" ; 
            button1.style.boxShadow = "0px 0px 0px black" ; 
        }
    
        if(!isClick[2]){
            button2.style.background = "#EEE9DA" ; 
            button2.style.boxShadow = "0px 0px 0px black" ; 
        }
        if(!isClick[4]){
            button4.style.background = "#EEE9DA" ; 
            button4.style.boxShadow = "0px 0px 0px black" ; 
        }

    });


    let button4 = document.createElement("button");
    button4.innerHTML = "10" ;
    button4.style.padding = "10px 30px" ;
    button4.style.background= "#EEE9DA" ;  
    button4.style.font = " 20px arial" ; 
    menu.appendChild(button4);
    button4.addEventListener("mouseover", function(){
        button4.style.background = "#FFFBEB" ; 
        button4.style.boxShadow = "0px 0px 10px black" ; 
    });


    button4.addEventListener("mouseout", function(){
        if(!isClick[4]){
        button4.style.background = "#EEE9DA" ; 
        button4.style.boxShadow = "0px 0px 0px black" ; 
    }
    });

    button4.addEventListener("click", function(){
        isClick[2] = false ; 
        isClick[1] = false ; 
        isClick[3] = false ; 
        isClick[4] = true ; 
        if(!isClick[1]){
            button1.style.background= "#EEE9DA" ; 
            button1.style.boxShadow = "0px 0px 0px black" ; 
        } 

        if(!isClick[2]){
            button2.style.background= "#EEE9DA" ; 
            button2.style.boxShadow = "0px 0px 0px black" ; 
        } 
        if(!isClick[3]){
            button3.style.background= "#EEE9DA" ; 
            button3.style.boxShadow = "0px 0px 0px black" ; 
        } 




    });

    



    let play = document.createElement("button");

    play.innerHTML = "PLAY" ; 
    play.style.background = "#EEE9DA";
    play.style.borderRadius= "5px" ; 
    play.style.font = "bold 20px impact" ; 
    play.style.color = "red" ; 
    play.style.width = "100%" ; 
    play.style.position = "absolute" ; 
    play.style.bottom = "10%" ; 
    play.style.left = "0" ; 
    play.addEventListener("mouseover", function(){
        play.style.background = "#FFFBEB" ; 
        play.style.boxShadow = "0px 0px 10px black" ; 
    });
    play.addEventListener("mouseout", function(){
       play.style.background = "#EEE9DA" ; 
       play.style.boxShadow = "0px 0px 0px black" ; 
    });
    render() ; 
    play.addEventListener("click" , function(){
    

        menu.style.display = "none" ; 
        setTimeout(() => {
           initTimer =  setInterval(game, 1000/fps); 
        }, 1000);
     
          drawText("READY!" ,220,100 , "#D3756B");
    }   );

    

    
    menu.appendChild(play);



}

UI() ; 

