
var playGameState;
var moveTouch = false;

var sMoveX, sMoveY;
var eMoveX, eMoveY;
class PlayGameState{
  constructor(background){
    this.background = background;
    this.playground = new PG_PlayGround(background);
    this.bottomPlayground = new PG_BottomPlayGround();
    this.topPlayground = new PG_TopPlayGround();
    this.player = new PGPlayer();
    this.boss = new PG_Boss();
    this.ui = new PG_UI();
    this.Init();
  }
  Init(){
    soundSystem.PlayBackGroundMusic("file/sound/background2.mp3");
    this.circles = [];
    this.isGameOver = false;
    this.score = 0;
    this.touch = false;
    this.right = false;
    this.left = false;
    this.leftCount = 0;
    this.rightCount = 0;
    this.timer;
    this.shake = false;
    this.shakeSlow = false;
    this.shakeCnt = 0;
    this.shakeSlowCnt = 0;
    this.isGameOver = false;
    this.explode = false;

    this.distance = 0;
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");
    // 후방 배경 화면 그리기

    if(this.shake)
    {
      ctx.save();
      var dx = Math.random()*10;
      var dy = Math.random()*10;
      ctx.translate(dx, dy);
      this.shakeCnt++;
      this.background.frontBackgroundSpeed = 5 / 3 * this.background.gameSpeed
      this.background.middleBackgroundSpeed = 2 /3 * this.background.gameSpeed;
      this.background.backgroundSpeed = 0.5 / 3 * this.background.gameSpeed;
    }
    else if(this.shakeSlow){
      ctx.save();
      var dx = Math.random()*10;
      var dy = Math.random()*10;
      ctx.translate(dx, dy);
      this.shakeSlowCnt++;
      this.background.frontBackgroundSpeed = 5 / 1.5 * this.background.gameSpeed;
      this.background.middleBackgroundSpeed =2 / 1.5 * this.background.gameSpeed;
      this.background.backgroundSpeed = 0.5 / 1.5 * this.background.gameSpeed;
    }
    //백그라운드 그리기
    if(this.background.totalCnt < 3){
      this.background.Render_back();
    }
    else if (this.background.totalCnt < 6 && this.background.totalCnt >= 3){
      this.background.Render_back2();
    }
    else{
      this.background.Render_back3();
    }
    this.boss.Render();
    this.background.Render_middle();
    this.background.Render_front();
    this.boss.Render_Bullet();


    //오브젝트 그리기
    this.bottomPlayground.Render();
    this.topPlayground.Render();
    this.ui.Render();
    // 플레이어 그리기
    this.player.Render();
    if(this.shake)
    {
      ctx.restore();
      if(this.shakeCnt > 20)
      {
        this.shake = false;
        this.shakeCnt = 0;
        this.background.frontBackgroundSpeed = 5 * this.background.gameSpeed;
        this.background.middleBackgroundSpeed = 2 * this.background.gameSpeed;
        this.background.backgroundSpeed = 0.5 * this.background.gameSpeed;
      }
    }
    else if(this.shakeSlow){
      ctx.restore();
      if(this.shakeSlowCnt > 15){
        this.shakeSlow = false;
        this.shakeSlowCnt = 0;
        this.background.frontBackgroundSpeed = 5 * this.background.gameSpeed;
        this.background.middleBackgroundSpeed = 2 * this.background.gameSpeed;
        this.background.backgroundSpeed = 0.5 * this.background.gameSpeed;
      }

    }
  }
  Update(){
    this.background.Update();
    if( inputSystem.isKeyDown( 39 ) || this.right)
    {
        this.player.Right( true );
        this.rightCount++;
        if(this.rightCount > 50)
        {
          this.rightCount = 0;
          this.right = false;
        }
        this.player.Right( true , this.rightCount);
    }
    if( !inputSystem.isKeyDown( 39 ) && !this.right)
    {
        this.player.Right( false );
    }
    if( inputSystem.isKeyDown( 37 ) || this.left)
    {
        this.leftCount++;
        if(this.leftCount > 50)
        {
          this.leftCount = 0;
          this.left = false;
        }
        this.player.Left( true , this.leftCount);
    }
    if( !inputSystem.isKeyDown( 37 ) && !this.left)
    {
        this.player.Left( false );
    }
    if( inputSystem.isKeyDown( 32 ) || this.touch)
    {
        this.player.Jump( true );
    }
    if( !inputSystem.isKeyDown( 32 ) && !this.touch)
    {
        this.player.Jump( false );
    }

    this.distance += 0.1;
    this.bottomPlayground.Update(this.background.frontBackgroundSpeed);
    this.bottomPlayground.CheckCollision( this.player.collisionBox );
    this.topPlayground.Update(this.background.frontBackgroundSpeed);
    this.topPlayground.CheckCollision( this.player.collisionBox );
    this.boss.Update();
    this.ui.Update(this.player.hp, this.distance);
    this.boss.CheckCollision( this.player );
    this.player.Update();
  }
  Notification(msg){
    switch( msg )
    {
        case 0:
          // 충돌 : 화면 흔들림
          // this.isGameOver = true;
          console.log('쾅!');
          if(this.player.shield){
            this.player.shield = false;
          }
          else{
            this.shake = true;
            this.player.hp -= 5;
            soundSystem.PlaySound("file/sound/break.wav");
          }
          break;
        case 1:
          if(this.player.shield){
            this.player.shield = false;
          }
          else{
            this.shake = true;
            this.player.hp -= 1;
            soundSystem.PlaySound("file/sound/break.wav");
          }
          break;
        case 3:
          this.player.width * 2;
          this.player.height * 2;
          if(this.player.shield){

          }
          this.player.shield = true;

          break;
    }

    if(this.player.hp < 0){
      if(this.isGameOver == false){
        this.isGameOver = true;
        for (var k = 0; k < 100; k++) {
          this.circles.push({
            x : this.player.x + this.player.width / 2,
            y : this.player.y + this.player.height / 2,
            radius : 3 +Math.random()*3,
            vx : -5 + Math.random()*10,
            vy : -5 + Math.random()*10,
            r : Math.round(Math.random())*30 ,
            g : Math.round(Math.random())*30 ,
            b : Math.round(Math.random())*30 ,
          })
        }
        playGameState = new OverState(this.background, this.boss, this.circles, this.topPlayground, this.bottomPlayground, this.playground, this.distance);
        ChangeGameState( playGameState );
      }
    }
    if(this.boss.hp <= 0){
      for (var k = 0; k < 100; k++) {
        boss.circles.push({
          x : this.boss.x + this.boss.width / 2,
          y : this.boss.y + this.boss.height / 2,
          radius : 3 +Math.random()*3,
          vx : -5 + Math.random()*10,
          vy : -5 + Math.random()*10,
          r : Math.round(Math.random())*30 ,
          g : Math.round(Math.random())*30 ,
          b : Math.round(Math.random())*30 ,
        })
      }
    }

  }

  onTouchStart(e){
    inputSystem.mouseX = e.touches[0].clientX;
    inputSystem.mouseY = e.touches[0].clientY;
    if(inputSystem.mouseX > canvasWidth / 3 * 2)
    {
      this.touch = true;
    }
    else if(inputSystem.mouseX < canvasWidth / 3 * 2){
      sMoveX = inputSystem.mouseX;
      sMoveY = inputSystem.mouseY;
    }

  }
  onTouchEnd(e){
    inputSystem.mouseX = e.changedTouches[0].clientX;
    inputSystem.mouseY = e.changedTouches[0].clientY;
    if(inputSystem.mouseX < canvasWidth / 3 * 2){
      eMoveX = inputSystem.mouseX;
      eMoveY = inputSystem.mouseY;

      if (eMoveX - sMoveX > 10)
      {
        this.right = true;
      }
      else if(eMoveX - sMoveX < -40)
      {
        this.left = true;

      }
    }
    this.touch = false;
  }
  onTouchMove(){
    moveTouch = true;
  }

}
