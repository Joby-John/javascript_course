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
        
        //result display        
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

        //move buttons
        document.querySelector('.js-rock-btn').addEventListener('click',()=>{
            play(0)
        } );
        document.querySelector('.js-paper-btn').addEventListener('click',()=>{
            play(1)
        } );
        document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
            play(2)
        } );

        document.body.addEventListener('keydown', (event)=>{
            if(event.key === 'r'){
                play(0);
            }else if(event.key === 'p'){
                play(1);
            }else if(event.key === 's'){
                play(2);
            }
        });

        function play(userChoice){
         
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
        
        //reset 
        document.querySelector('.js-rst-btn').addEventListener('click', 
            ()=>{
                score.wins = 0;
                score.loses = 0;
                score.ties = 0;
                localStorage.removeItem('score');

                if(autoplay){
                    autoPlay();
                }

                updateScreen();
            }
        );

        //autoplay
        const autoPlaybtn = document.querySelector('.autoplay-btn');

        autoPlaybtn.addEventListener('click', ()=>{
            autoPlay();
        })

        let autoplay = false;
        let autoPlayIntervalID = null;

        function autoPlay(){
            if(!autoplay){
                autoplay = true;
                autoPlaybtn.classList.add('autoplay-on');
                autoPlayIntervalID = setInterval(function(){
                    const randNum = Math.random();
                    let userChoice = -1;
                    if(randNum <= 1/3){
                        userChoice = 0;
                    }else if(randNum > 1/3 && randNum <= 2/3){
                        userChoice = 1;
                    }else{
                        userChoice = 2;
                    }

                    play(userChoice);
                }, 1000);
            }else{
                autoPlaybtn.classList.remove('autoplay-on');
                autoplay = false;
                clearInterval(autoPlayIntervalID);   
            }
        }