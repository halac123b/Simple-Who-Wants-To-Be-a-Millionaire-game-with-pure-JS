class ui {
  constructor(){
  }

  // Hàm chọn hiển thị screen theo tên
  showScreen(screenName){
    // Get tất cả các element screen
    let screens = document.querySelectorAll("#wrapper > div");
    // Ẩn tất cả screen
    screens.forEach( (screen) => {
      screen.style.display = "none";
    })
    // Get screen cần được hiển thị
    let currentScreen = document.getElementById(screenName);
    // Sau khi ẩn tất cả ở trên, bây giờ chỉ còn 1 screen được chọn đc bật
    currentScreen.style.display = "block";
  }

  // Listen khi nhấn nút Start game
  onStartClick(callback){
    // Get element nút Start
    let startButton = document.getElementById("start");
    // Add listener mỗi khi nút Start đc nhấn
    startButton.addEventListener("click", callback);
  }

  // Hàm hiển thị câu hỏi
  showQuestion(question){
    // Hiển thị đề câu hỏi
    let title = document.getElementById("title");
    title.innerText = question.question;

    // Get cả 4 item answer
    let answers = document.querySelectorAll(".answer");
    // Loop cùng lúc danh sách các element và dữ liệu câu hỏi
    for(let i = 0; i < 4; i++){
      answers[i].innerText = question.answers[i];
    }
  }

  // Hàm listen click vào answer
  onClickAnswer(callback){
    let answers = document.querySelectorAll(".answer");
    for (let i = 0; i < 4; i++){
      answers[i].addEventListener("click", () => callback(i));
    }
  }

  setSelectedAnswer(answer){
    // Get element answer được chọn
    let answerDiv = document.querySelectorAll(".answer")[answer];
    // Đổi style
    answerDiv.style.backgroundColor = "green";
  }

  // Reset lại style các đáp án khi chuyển sang câu hỏi mới
  resetAnswerStyle(){
    let answers = document.querySelectorAll(".answer");
    answers.forEach( (answer) => { 
      answer.style.backgroundColor = "purple";
      answer.classList.remove("blink");
    })
  }
}