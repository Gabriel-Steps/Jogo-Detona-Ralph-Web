const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
        containerModal: document.querySelector("#containerModal"),
        pontosFinais: document.querySelector("#pontuacaoFinal")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countLifes: 3
    },
    actions:{
        timeId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}


function endGame(){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timeId);
    state.view.pontosFinais.textContent = state.values.result;
    state.view.containerModal.classList.remove("desaparecer");
    state.view.containerModal.classList.add("aparecer");
    
}
function countDownLifes(){
    state.values.countLifes--;
    if(state.values.countLifes <= 0){
        endGame();
    }
    lifes();
}
function countDown(){
    if(state.values.currentTime <= 0){
        endGame();
    }else{
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
    }
}
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
}
function lifes(){
    state.view.lifes.textContent = "x" + state.values.countLifes;
}
function addListenerHitbox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result ++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }else{
                countDownLifes();
            }
        })
    })
}
function main(){
    lifes();
    moveEnemy();
    addListenerHitbox();
}

main();