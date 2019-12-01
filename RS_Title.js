var mode = false;
class TitleState{
  constructor(){
    this.imgBackground00 = resourcePreLoader.GetImage('file/img/background/back_02.svg')
    this.imgBackground01 = resourcePreLoader.GetImage('file/img/background/middle_02.svg')
    this.imgBackground02 = resourcePreLoader.GetImage('file/img/background/front_02.svg')
    this.imgBackground03 = resourcePreLoader.GetImage('file/img/background/back_00.svg')
    this.imgBackground04 = resourcePreLoader.GetImage('file/img/background/middle_00.svg')
    this.imgBackground05 = resourcePreLoader.GetImage('file/img/background/front_00.svg')
    this.light = resourcePreLoader.GetImage('file/img/background/light.png');
    this.title = resourcePreLoader.GetImage('file/img/ui/title.svg');
    this.easy = resourcePreLoader.GetImage('file/img/ui/easymode.svg');
    this.hard = resourcePreLoader.GetImage('file/img/ui/hardmode.svg');

    this.ready = false;
    this.Init();
  }
  Init(){
    this.titleX = 0;
    this.titleWidth = 106;
    this.titleHeight = 124;
    this.titleScale = 2;

    this.emodeX = -140 + canvasWidth;
    this.emodeWidth = 129;
    this.emodeHeight = 43;
    this.emodeScale = 1.8;

    this.hmodeX = 140 + canvasWidth;
    this.hmodeWidth = 129;
    this.hmodeHeight = 43;
    this.hmodeScale = 1.8;

    this.background = new PGBackground();
    this.background.gameSpeed = 1;
    this.mode = false;
    this.modeS = false;
    this.modeEasy = false;
    this.modeHard = false;
    // console.log(soundSystem);
    soundSystem.PlayBackGroundMusic("file/sound/background.mp3");
    this.background.Init();
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");
    // 배경 화면 그리기
    this.background.Render_back();
    this.background.Render_middle();
    this.background.Render_front();
    if(!this.modeS){
      ctx.drawImage(this.title, (canvasWidth / 2 - this.titleWidth / 2 * this.titleScale) + this.titleX, canvasHeight / 2 - this.titleHeight / 2 * this.titleScale - 15 , this.titleWidth * this.titleScale, this.titleHeight * this.titleScale);
    }
    if(this.ready || this.modeS){
      ctx.drawImage(this.easy, (canvasWidth / 2 - this.emodeWidth / 2 * this.emodeScale) + this.emodeX, canvasHeight / 2 - this.emodeHeight / 2 * this.emodeScale - 10 , this.emodeWidth * this.emodeScale, this.emodeHeight * this.emodeScale);
      ctx.drawImage(this.hard, (canvasWidth / 2 - this.hmodeWidth / 2 * this.hmodeScale) + this.hmodeX, canvasHeight / 2 - this.hmodeHeight / 2 * this.hmodeScale - 10 , this.hmodeWidth * this.hmodeScale, this.hmodeHeight * this.hmodeScale);
    }
    ctx.save();
    ctx.fillStyle = "white"
    ctx.fillText('ver.1.0.0', canvasWidth - 75, canvasHeight - 25);
    ctx.restore();



  }
  Update(){
    this.background.Update();
    if(this.ready){
      // this.background.gameSpeed = 1
      // this.background.Init();
      if(this.emodeX > -140 ){
        this.titleX -= 5 * this.background.gameSpeed;
        this.emodeX -= 5 * this.background.gameSpeed;
        this.hmodeX -= 5 * this.background.gameSpeed;
      }
      else{
        // this.background.gameSpeed = 0.2
        this.modeS = true;
        this.ready = false;
        this.background.Init();
      }
      // if(this.background.gameSpeed < 1.2 && !this.mode){
      //   this.background.gameSpeed += 0.1
      //   this.background.Init();
      // }
      // if(this.background.gameSpeed <= 1 && !this.mode){
      //   this.background.gameSpeed += 0.1;
      //   this.background.Init();
      // }
      // else if(this.titleX < -400){
      //   playGameState = new PlayGameState(this.background);
      //   ChangeGameState( playGameState );
      // }
    }
    if(this.modeEasy || this.modeHard){
      if(this.hmodeX > -140 - canvasWidth ){
        this.emodeX -= 5 * this.background.gameSpeed;
        this.hmodeX -= 5 * this.background.gameSpeed;
      }
      else{
        playGameState = new PlayGameState(this.background);
        ChangeGameState( playGameState );
      }
      // if(this.background.gameSpeed < 1.2){
      //   this.background.gameSpeed += 0.1
      //   this.background.Init();
      // }
    }
  }
  onMouseDown(){
    if(!this.ready){
      this.ready = true;
    }
  }
  onTouchStart(events){
    var e = events;
    if(this.modeS){
      if (e.touches[0].clientX < canvasWidth / 2 && (e.touches[0].clientY < canvasHeight / 2 + this.emodeHeight / 2 * this.emodeScale - 10)
          && (e.touches[0].clientY > canvasHeight / 2 - this.emodeHeight / 2 * this.emodeScale - 10)
          &&  e.touches[0].clientX > (this.emodeX + canvasWidth / 2 - this.emodeWidth *this.emodeScale / 2)
          &&  e.touches[0].clientX < (this.emodeX + canvasWidth / 2 + this.emodeWidth *this.emodeScale / 2)){
        this.modeEasy = true;
        this.emodeScale = 2;
        mode = false;
      }
      else if (e.touches[0].clientX > canvasWidth / 2 && (e.touches[0].clientY < canvasHeight / 2 + this.hmodeHeight / 2 * this.hmodeScale - 10)
          && (e.touches[0].clientY > canvasHeight / 2 - this.hmodeHeight / 2 * this.hmodeScale - 10)
          &&  e.touches[0].clientX > (this.hmodeX + canvasWidth / 2 - this.hmodeWidth *this.hmodeScale / 2)
          &&  e.touches[0].clientX < (this.hmodeX + canvasWidth / 2 + this.hmodeWidth *this.hmodeScale / 2)){
          this.modeHard = true;
          this.hmodeScale = 2;
          mode = true;
      }
    }
  }
  // onTouchMove(events){
  //   var e = events;
  //   // if(this.modeS){
  //   //   if (e.touches[0].clientX < canvasWidth / 2 && (e.touches[0].clientY < canvasHeight / 2 + this.emodeHeight / 2 * this.emodeScale - 10)
  //   //       && (e.touches[0].clientY > canvasHeight / 2 - this.emodeHeight / 2 * this.emodeScale - 10)
  //   //       &&  e.touches[0].clientX > (this.emodeX + canvasWidth / 2 - this.emodeWidth *this.emodeScale / 2)
  //   //       &&  e.touches[0].clientX < (this.emodeX + canvasWidth / 2 + this.emodeWidth *this.emodeScale / 2)){
  //   //     this.modeHard = true;
  //   //   }
  //   //   else if (e.touches[0].clientX > canvasWidth / 2 && (e.touches[0].clientY < canvasHeight / 2 + this.hmodeHeight / 2 * this.hmodeScale - 10)
  //   //       && (e.touches[0].clientY > canvasHeight / 2 - this.hmodeHeight / 2 * this.hmodeScale - 10)
  //   //       &&  e.touches[0].clientX > (this.hmodeX + canvasWidth / 2 - this.hmodeWidth *this.hmodeScale / 2)
  //   //       &&  e.touches[0].clientX < (this.hmodeX + canvasWidth / 2 + this.hmodeWidth *this.hmodeScale / 2)){
  //   //       this.modeHard = true;
  //   //   }
  //   //   // console.log(e.touches[0].clientX, e.touches[0].clientY, (this.hmodeX + canvasWidth / 2 - this.hmodeWidth *this.hmodeScale / 2));
  //   // }
  //   console.log(e.touches[0].clientX, e.touches[0].clientY);
  // }
}
