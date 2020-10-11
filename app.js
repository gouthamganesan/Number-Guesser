// GUESS NUMBERS
let minNum = 1,
  maxNum = 10,
  guessLimit = 3,
  winningNumber;

const uiForm = document.querySelector("form"),
  uiGuessNumber = document.querySelector("#guess-number"),
  uiMessage = document.querySelector("#message");

/* 

* Algorithm

* High level
    - Set the winning number
    - Listen for form submit event
    - Check if the number is valid. When number is valid,
    - Check if it is winning number and if not reduce guesses left

* Low level
    - Setting winning number
        - Generate a random number between the limit
    - When there are guesses left
        - Listen for form submit event and check the value with the winning number
            - If the number is winning number,
            - Disable the input
            - Display winning message
            - Game over
            - Change the enter button to play again button (which reloads)
            - If the number is not winning number,
                - Reduce guesses left
                - Display message
    - When there are no guesses left,
        - Game over
        - Lock input
        - Display message
        - Play again button

*/

(function main() {
  // FORM SUBMIT
  uiForm.addEventListener("submit", validateGuess);
  // PLAY AGAIN
  const game = document.querySelector(".container");
  game.addEventListener("mousedown", playAgain);
  // SET WINNING NUMBER
  setWinningNumber();
})();

/* 
██╗   ██╗ █████╗ ██╗     ██╗██████╗  █████╗ ████████╗███████╗    ███╗   ██╗██╗   ██╗███╗   ███╗
██║   ██║██╔══██╗██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ████╗  ██║██║   ██║████╗ ████║
██║   ██║███████║██║     ██║██║  ██║███████║   ██║   █████╗      ██╔██╗ ██║██║   ██║██╔████╔██║
╚██╗ ██╔╝██╔══██║██║     ██║██║  ██║██╔══██║   ██║   ██╔══╝      ██║╚██╗██║██║   ██║██║╚██╔╝██║
 ╚████╔╝ ██║  ██║███████╗██║██████╔╝██║  ██║   ██║   ███████╗    ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║
  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝
*/

function validateGuess(event) {
  if (
    isNaN(uiGuessNumber.value) ||
    uiGuessNumber.value < minNum ||
    uiGuessNumber.value > maxNum
  ) {
    setMessage(false, `Enter a number between ${minNum} and ${maxNum}`);
  } else {
    if (Number(uiGuessNumber.value) === winningNumber) {
      setMessage(
        true,
        `${uiGuessNumber.value} is the correct number. YOU WON!`
      );
      gameOver(true);
    } else {
      guessLimit -= 1;
      if (guessLimit > 0) {
        uiGuessNumber.value = "";
        setMessage(false, `Wrong. ${guessLimit} guesses left`);
      } else {
        setMessage(false, `You lost. Better luck next time :(`);
        gameOver(false);
      }
    }
  }
  event.preventDefault();
}

/* 
 ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ 
██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗
██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝
*/

function gameOver(won) {
  won ? color = 'green' : color = 'red';
  uiGuessNumber.disabled = true;
  uiGuessNumber.style.backgroundColor = "#f5f5f5";
  // CHANGING BUTTON
  const uiButton = document.querySelector("button");
  uiButton.textContent = "Play Again";
  uiButton.classList.add("button-primary");
  uiButton.style.backgroundColor = color;
}

/* 
 ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗███████╗    ███╗   ██╗██╗   ██╗███╗   ███╗██████╗ ███████╗██████╗ 
██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝    ████╗  ██║██║   ██║████╗ ████║██╔══██╗██╔════╝██╔══██╗
██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   █████╗      ██╔██╗ ██║██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝
██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝      ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗
╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ███████╗    ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
*/

function setWinningNumber() {
  winningNumber = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

/* 
██████╗ ██╗███████╗██████╗ ██╗      █████╗ ██╗   ██╗    ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗
██╔══██╗██║██╔════╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝
██║  ██║██║███████╗██████╔╝██║     ███████║ ╚████╔╝     ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  
██║  ██║██║╚════██║██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  
██████╔╝██║███████║██║     ███████╗██║  ██║   ██║       ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗
╚═════╝ ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
*/

function setMessage(result, message) {
  let color;
  result ? (color = "green") : (color = "red");
  uiMessage.textContent = message;
  uiMessage.style.color = color;
  uiGuessNumber.style.borderColor = color;
}

/* 
██████╗ ██╗      █████╗ ██╗   ██╗     █████╗  ██████╗  █████╗ ██╗███╗   ██╗
██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔════╝ ██╔══██╗██║████╗  ██║
██████╔╝██║     ███████║ ╚████╔╝     ███████║██║  ███╗███████║██║██╔██╗ ██║
██╔═══╝ ██║     ██╔══██║  ╚██╔╝      ██╔══██║██║   ██║██╔══██║██║██║╚██╗██║
██║     ███████╗██║  ██║   ██║       ██║  ██║╚██████╔╝██║  ██║██║██║ ╚████║
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
*/

function playAgain(event) {
    if (event.target.classList.contains("button-primary")) {
        window.location.reload();   
    }
  event.preventDefault();
}
