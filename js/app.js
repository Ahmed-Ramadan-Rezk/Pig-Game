let scores, roundScores, activePlayer, gamePlaying;
init()

document.querySelector('.dice').style.display = 'none';

// Set all numbers to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// Roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        
        // Disabled the input
        document.getElementById('finalScoreInput').setAttribute('disabled', 'disabled')
        document.getElementById('finalScoreInput').classList.add('blocked')

        // Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = `images/dice-${dice1}.png`;
        document.getElementById('dice-2').src = `images/dice-${dice2}.png`;
        if(dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
    }
    
});

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        let scoreInput = document.getElementById('finalScoreInput').value;
        let winningScore;
        if(scoreInput) {
            winningScore = scoreInput;
        } else {
            winningScore = 100;
        }
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';

        // Check if the player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer()
        }
    }
    
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// New game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // Set all numbers to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    // Enabled the input
    document.getElementById('finalScoreInput').removeAttribute('disabled', 'disabled')
    document.getElementById('finalScoreInput').classList.remove('blocked')
}

// How to play BUTTON (?)
document.querySelector('.howToPlay').onclick = function () {
    document.querySelector('.game-rules').classList.toggle('hide-game-rules')
}

// Close BUTTON (x)
document.querySelector('.close-icon').onclick = function () {
    document.querySelector('.game-rules').classList.remove('hide-game-rules')
}