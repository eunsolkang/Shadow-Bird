class PGPlayer{
  constructor(){
    this.width = 76 / 1.3 ;
    this.height = 94 / 1.3 ;
    this.sprPlayer = new SpriteAnimation(
    resourcePreLoader.GetImage("file/img/bird/bird.svg"),
     this.width  , this.height , 71, 94, 9 ,4 );
     this.Init();
    this.shieldImg = resourcePreLoader.GetImage("file/img/bird/s.png")
  }
  Init(){
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.dy = 1.5;
    this.isFlying = false;
    this.isRight = false;
    this.isLeft = false;
    this.dl = 2;
    this.dr = 2;
    this.leftCnt = 0;
    this.rightCnt = 0;
    this.explode = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight
    this.collisionBox
    = {left: this.x  ,top : this.y + 25 , right: this.x + this.width, bottom: this.y + this.height - 45 + 25 };

    this.hp = 100;
    this.shield = false;
    this.shieldScale = 0;
    this.Invalid();
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");
    // ctx.strokeRect(this.collisionBox.left, this.collisionBox.top , this.width, this.height - 45)
    this.sprPlayer.Render( ctx );
    if(this.shield)
    {
        if(this.shieldScale < 1.5){
          this.shieldScale += 0.05
        }
        ctx.drawImage(this.shieldImg, (this.sprPlayer.x + 1) + this.sprPlayer.width / 2 - (this.sprPlayer.width / 2) * this.shieldScale,
        (this.sprPlayer.y - this.sprPlayer.height / 2) + this.sprPlayer.height / 2 -  (this.sprPlayer.height / 2) * this.shieldScale + 45,
        this.sprPlayer.width * this.shieldScale, this.sprPlayer.width *this.shieldScale)
    }
  }
  Update(){
    // console.log(offsetY);
    this.sprPlayer.Update();
    if( this.isFlying == true)
    {
      this.dy = 0;
      if(this.y > this.canvasHeight / 2)
      {
        this.y -= 2;
      }
      // else if(this.y  == (this.canvasHeight / 2) && offsetY < (this.canvasHeight  - this.canvasHeight) - 20){
      // }
      else if (this.y > 50){
        this.y -= 2
      }
    }
    else{

      if(this.y < this.canvasHeight  && this.y >= this.canvasHeight / 2)
      {
        this.dy += 7.8 / 60
        this.y += this.dy;
        if(this.y > this.canvasHeight / 2 + 100)
        {
          playGameState.Notification( 0 );
        }
      }
      // else if(this.y  == this.canvasHeight / 2 && offsetY <= (this.canvasHeight - this.canvasHeight) - 20 ){
      // }
      else if (this.y < this.canvasHeight - this.height / 2 ){
        this.dy += 7.8 / 60
        this.y += this.dy;
      }
    }
    if( this.isRight == true )
    {
        this.x += this.dr;
        if(this.rightCnt < 20)
        {
          this.dr += 0.17
        }
        else{
          this.dr -= 0.13
        }
    }
    else{
      this.dr = 2;
    }
    if( this.isLeft == true )
    {
      this.x -= this.dl;
      if(this.leftCnt < 20)
      {
        this.dl += 0.17
      }
      else{
        this.dl -= 0.13
      }

    }
    else{
      this.dl = 2
    }
    this.Invalid();
    if(this.hp < 0){
      this.explode = true;
    }
  }
  Jump( state ){
    if( this.isFlying == false && state == true )
    {
        this.isFlying = true;
    }
    else if( this.isFlying == true && state == false )
    {

      this.isFlying = false;
    }
  }
  Right( state , cnt){
    if( this.isRight == false && state == true)
    {
      this.isRight = true;
    }
    else if( this.isRight == true && state == false)
    {
      this.isRight = false;
    }
    this.rightCnt = cnt;
  }
  Left( state , cnt)
  {
    if( this.isRight == false && state == true)
    {
      this.isLeft = true;
    }
    else if( this.isLeft == true && state == false)
    {
      this.isLeft = false;
    }
    this.leftCnt = cnt;
  }
  Invalid(){
    this.sprPlayer.SetPosition( this.x, this.y  );
    this.sprPlayer.SetSize( this.width , this.height );
    this.collisionBox
    = {left: this.x  ,top : this.y + 25 , right: this.x + this.width, bottom: this.y + this.height - 45 + 25 };
  }
}
