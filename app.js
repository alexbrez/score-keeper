const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}



const resetButton = document.querySelector('#reset');

const winningScoreSelect = document.querySelector('#playto');


let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent){
    if(!isGameOver){
        if (player.score !== winningScore){ 
            player.score +=1;
            if(player.score ===winningScore){
                isGameOver = true;
                player.display.classList.add('has-text-success');
                opponent.display.classList.add('has-text-danger');
                player.button.disabled = true;
                opponent.button.disabled = true;

                const winnerMessage = document.querySelector('#winnerMessage');
                if (player === p1) {
                    winnerMessage.textContent = "Player 1 Wins!";
                    winnerMessage.classList.add('has-text-primary');
                } else {
                    winnerMessage.textContent = "Player 2 Wins!";
                    winnerMessage.classList.add('has-text-info');
                }

                confetti({
                    particleCount: 200, 
                    spread: 100,        
                    origin: { y: 0.6 } 
                });

            }
            player.display.textContent = player.score;
        }
    }
}

p1.button.addEventListener('click', function() {
    updateScores(p1, p2)
})

p2.button.addEventListener('click', function() {
    updateScores(p2, p1)
})

winningScoreSelect.addEventListener('change', function(){
    winningScore = parseInt(this.value);
})


resetButton.addEventListener('click', reset)

function reset(){
    isGameOver = false;
    for(let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    
    const winnerMessage = document.querySelector('#winnerMessage');
    winnerMessage.textContent = '';
    winnerMessage.classList.remove('has-text-primary', 'has-text-info');
 
}
