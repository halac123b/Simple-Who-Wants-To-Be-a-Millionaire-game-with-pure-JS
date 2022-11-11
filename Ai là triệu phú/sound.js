class sound {
  constructor(fileName){
    this.fileName = fileName;
    // Check xem audio file đã đc load xong hay chưa
    this.loaded = false;
    // Khởi tạo obj Audio có sẵn trong js với relative path
    this.audio = new Audio("./assets/sound/" + this.fileName);
    // Add eventListener để check xem audio đã load xong chưa, thay đổi trạng thái this.loaded
    this.audio.addEventListener("canplaythrough", () => {
      this.loaded = true;
    })
  }

  // Hàm giúp phát audio
  playAudio(oneEndCallBack){
    // Check trước xem audio file đã đc load xong chưa
    if(this.loaded){
      this.audio.play();
      // Trả về tín hiệu khi audio đã play hết
      if (typeof oneEndCallBack == "function"){
        this.audio.onended = oneEndCallBack;
      } 
    }
  }

  // Stop audio
  stopAudio(){
    this.audio.pause();
  }
}