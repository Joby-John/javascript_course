        let score = JSON.parse(localStorage.getItem('score')) ||
        {
            wins:0, 
            loses:0,
            ties:0
        };
        updateScreen();

        /*if(!score){
            score = {
                wins:0, 
                loses:0,
                ties:0
            }
        }; */
        

        const rockImg = '<img src="10_Rock_Paper_scissors_rsrcs/rock-emoji.png" class="result-Icon" alt="Rock" >';

        const paperImg = '<img src="10_Rock_Paper_scissors_rsrcs/paper-emoji.png" class="result-Icon" alt="Paper" >';

        const scissorImg = '<img src="10_Rock_Paper_scissors_rsrcs/scissors-emoji.png" class="result-Icon" alt="Scissor">';

        const moveImgs = {
            rock : rockImg,
            paper : paperImg,
            scissors : scissorImg
        };

        function updateScreen(winMessage ='', cpMove = 'Not Moved', userMove = 'Not Moved'){
            const winnerElement = document.querySelector('.js-winner');
            const moveElement = document.querySelector('.js-moves');
            const scoreElement = document.querySelector('.js-score');


            winnerElement.innerHTML = winMessage;
            
            moveElement.innerHTML = `Computer : ${cpMove} ${userMove}:User`;

            scoreElement.innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;

        } 

        function getChoice(userChoice){
         
            const cSelection = Math.random();
            let winMessage = '';
            let compMove = -1
            let cpMove = ''
            let userMove = '';

            if(userChoice === 0){
                userMove = 'Rock';
            }else if(userChoice === 1){
                userMove = 'Paper';
            }else{
                userMove = 'Scissors';
            }
            
            if(cSelection >= 0 && cSelection < 1/3){
                compMove = 0;
                cpMove = 'Rock';
            }
            else if(cSelection >= 1/3 && cSelection < 2/3){
                compMove = 1;
                cpMove = 'Paper';
            }else{
                compMove = 2;
                cpMove = 'Scissors';
            }

            //tie
            if(compMove == userChoice){
                score.ties++;
                winMessage = 'Its a Tie';
            }
            //wins
            if( compMove == 0 && userChoice == 1){
                score.wins++;
                winMessage = 'You won';
            }else if(compMove == 1 && userChoice == 2){
                score.wins++;
                winMessage = 'You won';
            }else if(compMove == 2 && userChoice == 0){
                score.wins++;
                winMessage = 'You won';
            }

            //loses
            if( compMove == 1 && userChoice == 0){
                score.loses++;
                winMessage = 'Computer Won';
            }else if(compMove == 2 && userChoice == 1){
                score.loses++;
                winMessage = 'Computer Won';
            }else if(compMove == 0 && userChoice == 2){
                score.loses++;
                winMessage = 'Computer Won';
            }

            localStorage.setItem('score', JSON.stringify(score));


            updateScreen(winMessage, 
                         moveImgs[cpMove.toLowerCase()], 
                         moveImgs[userMove.toLowerCase()]);

        }