// Dữ liệu các câu hỏi
const questions = [
  {
    question: "Ai là người đẹp trai nhất?",
    answers: [
      "Duy Hà", "Nam Phú", "Văn Hoàng", "Văn Sơn"
    ],
    correct: 0
  },
  {
    question: "Ai là thầy dạy Mạch điện - Điện tử?",
    answers: [
      "Nguyễn An Khương", "Lê Bảo Thịnh", "Trần Ngọc Bảo Duy", "Vũ Trọng Thiên"
    ],
    correct: 3
  }
]

class game {
  constructor(){
    // Construct ui, mở 'welcome' screen
    this.ui = new ui();
    this.ui.showScreen("welcome");

    // Phát audio intro game
    this.introSound = new sound("start.ogg");
    this.introSound.playAudio();

    // Nhấn nút Start, chạy StartGame()
    this.ui.onStartClick( () =>{
      this.startGame();
    })

    this.currentQuestion = 0; // Index của câu hỏi hiện tại
    this.currentAnswer = null; // Câu trả lời được chọn

    // Audio trong thời gian chờ trả lời câu hỏi
    this.questionWaitSound = new sound("waiting.ogg");
    // Audio sau khi nhận answer và đang chờ kết quả
    this.waitAnswerSound = new sound("waiting_answer.ogg");
    // Audio trả lời đúng/sai
    this.rightSound = new sound("right.ogg");
    this.wrongSound = new sound("wrong.ogg");
  }

  // Bắt đầu chạy game
  startGame(){
    this.ui.resetAnswerStyle(); // Reset lại style các answer
    // Mở 'question' screen
    this.ui.showScreen("question");
    // Chạy introSound, có tham số là onEndCallBack, để khi phát xong tiếp tục phát questionWaitSound
    this.introSound.playAudio( () => {
      this.questionWaitSound.playAudio();
    });
    this.ui.showQuestion(questions[this.currentQuestion]); // Hiện câu hỏi theo index hiện tại
    this.ui.onClickAnswer( (answer) => {
      // Record lại câu trả lời
      this.currentAnswer = answer;
      this.ui.setSelectedAnswer(answer);
      
      
      this.questionWaitSound.stopAudio(); // Stop nhạc chờ
      this.waitAnswerSound.playAudio( () => {
        this.checkAnswer();
      });
    });
  }

  checkAnswer(){
    let answers = document.querySelectorAll(".answer");
    answers[questions[this.currentQuestion].correct].classList.add("blink");
    if (this.currentAnswer == questions[this.currentQuestion].correct){
      this.rightSound.playAudio( () =>{
        this.currentQuestion++;
        this.startGame();
      });
    }
    else {
      this.wrongSound.playAudio( () => {this.resetGame(); });
    }
  }
  // Reset chơi lại từ đầu
  resetGame(){
    this.currentQuestion = 0;
    this.ui.showScreen("welcome");
  }
}

// Khởi tạo obj game chính thức
var mainGame = new game();
