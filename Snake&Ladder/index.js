const snakes={37:3,48:16,28:10,75:32,96:42,94:71}
const ladders={4:56,12:50,14:55,22:58,41:79,54:88}
const turn=document.querySelector(".turn");
const roll=document.querySelector(".roll");
const dice=document.querySelector(".dice");

let player2=0;
let player1=0;
let currentPlayer=1;

const start=()=>{
    player1=1;
    player2=1;
    currentPlayer=1;
    turn.textContent=`Player${currentPlayer}'s turn`;
    position();
}
const move=()=>{
    const rand=Math.floor(Math.random()*6)+1;
    dice.src=`./images/face${rand}.png`;
    let newPos= (currentPlayer===1)?player1+rand:player2+rand;
    if(newPos>100){
        newPos-=rand;
        position();
    }
    if(newPos===100){
        turn.textContent=`Player${currentPlayer} Wins \(*o*)/`;
        roll.removeEventListener("click",move);
        position();
        
    }
    if(currentPlayer===1){
        animateMove(1,newPos);
        player1=newPos;
    }else{
        animateMove(2,newPos);
        player2=newPos;
    }
    // position();
    roll.removeEventListener("click",move);
    setTimeout(()=>{
        if(snakes[newPos]){
            newPos=snakes[newPos];
        }
        
        if(ladders[newPos]){
            newPos=ladders[newPos];
        }
        
        if(currentPlayer===1){
            player1=newPos;
        }else{
            player2=newPos;
        }
        position();
        currentPlayer= (currentPlayer===1)?2:1;
        if(player1===100||player2===100){
            return;
        }else{
            turn.textContent=`Player${currentPlayer}'s turn`;
        }

        roll.addEventListener("click",move);
    },1000);
}

const position = () => {
    document.querySelectorAll(".block").forEach((block) => {
        block.textContent = ""; 
    });

    let p2=document.createElement("p");
    p2.className="player2";
    p2.textContent="P2";

    let p1=document.createElement("p");
    p1.className="player1";
    p1.textContent="P1";

    if (player1 > 0) {
        document.querySelector(`.block${player1}`).appendChild(p1);
    }
    if (player2 > 0) {
        document.querySelector(`.block${player2}`).appendChild(p2);
    }
};

roll.addEventListener("click",move);

const animateMove = (player, newPos) => {
    let startPos = player === 1 ? player1 : player2;
    let step = 1;

    const interval = setInterval(() => {
        if (startPos >= newPos) {
            clearInterval(interval);
            return;
        }
        startPos++;
        if (player === 1) {
            player1 = startPos;
        } else {
            player2 = startPos;
        }
        position();
    }, 200); // Smooth animation speed
};

start();