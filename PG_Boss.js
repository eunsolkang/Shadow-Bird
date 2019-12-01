class PG_Boss{
  constructor(player){
    this.width = 462 -  35.3 ;
    this.height = 360 ;
    this.sprBoss = new SpriteAnimation(
    resourcePreLoader.GetImage("file/img/object/boss.svg"),
     this.width , this.height , (462  -35.3)/ 8, 350 / 8, 12 ,5 );
    // this.sprBoss = new SpriteAnimation(
    //  resourcePreLoader.GetImage("file/img/object/boss_attack.svg"),
    //   this.width, this.height , (462 - 37)/ 4, 360 / 4, 6 ,5 );
    this.item = resourcePreLoader.GetImage("file/img/item/feather.svg");
    this.hp = 2;
    this.circles = [];
    this.Init();
  }
  Init(){
    this.direction = false;
    this.x = 0;
    this.y = 50;
    this.moveMax = 4;
    if(mode){
      this.speed = 0.2;
    }
    else{
      this.speed = 0.1;
    }

    this.sprBoss.SetPosition(-500, this.y);
    this.bullet = [];
    this.ready = false;
    this.angle = 85;
    this.velocity = 70 ;
    this.bulletWidth = 30;
    this.bulletHeight = 10;
    this.player;
    this.isGameOver = false;

  }
  Update(){
    this.sprBoss.Update();
    // this.sprBoss.SetPosition(100, 0)
    for(var i=0; i<this.bullet.length; i++){
      var mouseX = this.player.x;
      var mouseY = this.player.y;
      var dx = mouseX - this.bullet[i].x,
            dy = mouseY - this.bullet[i].y,
            len = Math.sqrt(dx * dx + dy * dy);
        dx /= len ? len : 1.0; dy /= len ? len : 1.0;
        var dirx = Math.cos(this.bullet[i].angle);
        var diry = Math.sin(this.bullet[i].angle);
        dirx += (dx - dirx) * 0.9;
        diry += (dy - diry) * 0.9;
        var dirx_f = dirx;
        var diry_f = diry;
        this.bullet[i].angle = Math.atan2(diry_f, dirx_f);

      this.bullet[i].collisionBox.top = this.bullet[i].y;
      this.bullet[i].collisionBox.left = this.bullet[i].x;
      this.bullet[i].collisionBox.right = this.bullet[i].x + this.bulletWidth;
      this.bullet[i].collisionBox.bottom = this.bullet[i].y + this.bulletHeight;

      this.bullet[i].Vy = this.bullet[i].Vy+1.98;
      this.bullet[i].x = this.bullet[i].x + this.bullet[i].Vx;
      this.bullet[i].y = this.bullet[i].y + this.bullet[i].Vy / 5 ;
      if(this.bullet[i].x > canvasWidth || this.bullet[i].y > canvasHeight){
        this.bullet.splice(i, 1);
      }

    }
    this.sprBoss.SetSize(this.width, this.height);
    if(this.sprBoss.x < -150 )
    {
      this.sprBoss.x += this.speed * 5
    }
    else{
      this.ready = true;
    }
    if(this.direction){
      if(this.sprBoss.y < this.moveMax + this.y)
      {
        this.sprBoss.y += this.speed
      }
      else{
        this.direction = false;
        if(this.ready)
        {
          this.velocity = Math.floor((Math.random()*35)+40)
          this.bullet.push({x : 100, y : 200, Vy : -this.velocity*Math.sin(this.angle*Math.PI / 180), Vx : this.velocity*Math.cos(this.angle*Math.PI / 180), angle : 45,
                          collisionBox : {
                            left : 100,
                            top : 200,
                            right : 110,
                            bottom : 210,
                          }})

        }
      }
    }
    else if(!this.direction){
      if(this.sprBoss.y > -this.moveMax + this.y)
      {
        this.sprBoss.y -= this.speed;
      }
      else{
        this.direction = true;
        if(this.ready)
        {
          var rnd =  Math.floor(Math.random()*10);
          var isItem = false;
          if(rnd%3 == 0){
            console.log('item!');
            isItem = true;
          }
          this.velocity = Math.floor((Math.random()*35)+40)
          this.bullet.push({x : 100, y : 200, Vy : -this.velocity*Math.sin(this.angle*Math.PI / 180), Vx : this.velocity*Math.cos(this.angle*Math.PI / 180), angle : 45,
                          collisionBox : {
                            left : 100,
                            top : 200,
                            right : 110,
                            bottom : 210,

                          }, item : isItem,})
          }
        }
    }
  }
  Exit(){
    this.sprBoss.Update();
    if(this.sprBoss.x < canvasWidth){
      this.sprBoss.x += 2;
    }
    for(var i=0; i<this.bullet.length; i++){
      var mouseX = this.player.x;
      var mouseY = this.player.y;
      var dx = mouseX - this.bullet[i].x,
            dy = mouseY - this.bullet[i].y,
            len = Math.sqrt(dx * dx + dy * dy);
        dx /= len ? len : 1.0; dy /= len ? len : 1.0;
        var dirx = Math.cos(this.bullet[i].angle);
        var diry = Math.sin(this.bullet[i].angle);
        dirx += (dx - dirx) * 0.9;
        diry += (dy - diry) * 0.9;
        var dirx_f = dirx;
        var diry_f = diry;
        this.bullet[i].angle = Math.atan2(diry_f, dirx_f);

      this.bullet[i].collisionBox.top = this.bullet[i].y;
      this.bullet[i].collisionBox.left = this.bullet[i].x;
      this.bullet[i].collisionBox.right = this.bullet[i].x + this.bulletWidth;
      this.bullet[i].collisionBox.bottom = this.bullet[i].y + this.bulletHeight;

      this.bullet[i].Vy = this.bullet[i].Vy+1.98;
      this.bullet[i].x = this.bullet[i].x + this.bullet[i].Vx;
      this.bullet[i].y = this.bullet[i].y + this.bullet[i].Vy / 5 ;
      if(this.bullet[i].x > canvasWidth || this.bullet[i].y > canvasHeight){
        this.bullet.splice(i, 1);
      }

    }
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");

    this.sprBoss.Render(ctx);

  }
  Render_Bullet(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");

    ctx.fillStyle = "black"

    for(var i=0; i<this.bullet.length; i++){
      if(this.bullet[i].item){
        ctx.drawImage(this.item, this.bullet[i].x, this.bullet[i].y, 40, 40)
      }
      else{
        ctx.save();
        ctx.translate(this.bullet[i].x, this.bullet[i].y)
        ctx.rotate(this.bullet[i].angle);
        ctx.translate(-this.bullet[i].x, -this.bullet[i].y)
        ctx.fillRect(this.bullet[i].x, this.bullet[i].y, this.bulletWidth, this.bulletHeight);
        ctx.restore();
      }
      // ctx.fillRect(this.bullet[i].x, this.bullet[i].y, this.bulletWidth, this.bulletHeight);

    }
  }
  CheckCollision( players ){
    this.player = players;
    var player = players.collisionBox;
    for(var i=0; i<this.bullet.length; i++){
      if( this.bullet[i].collisionBox.left < player.right && this.bullet[i].collisionBox.bottom > player.top
               && this.bullet[i].collisionBox.right > player.left && this.bullet[i].collisionBox.top < player.bottom )
      {

        if(this.bullet[i].item){
          playGameState.Notification( 3 );
          this.bullet.splice(i, 1);
        }
        else{
          playGameState.Notification( 1 );
          // this.bullet.splice(i, 1);
        }
      }
    }
  }
  explode(){

  }

}
