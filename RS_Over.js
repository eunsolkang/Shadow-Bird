class OverState{
  constructor(background, boss, circles, top, bottom, ground, distance){
    this.background = background;
    this.boss = boss;
    this.circles = circles;
    this.topPlayground = top;
    this.bottomPlayground = bottom;
    this.playground = ground;
    this.distance = distance;
    this.distanceNow = 0;
    this.distanceColor = "#A57164"
    this.rank = "Bronze";
    this.distanceNowNum = 0;
    this.Init();
  }
  Init(){
    this.explode = true;
    this.background.frontBackgroundSpeed = 0.5 * this.background.gameSpeed;
    this.background.middleBackgroundSpeed = 0.2 * this.background.gameSpeed;
    this.background.backgroundSpeed = 0.05 * this.background.gameSpeed;
    this.totalDis = 100;
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");

    this.background.Render_back();
    this.boss.Render();
    this.background.Render_middle();
    this.background.Render_front();

    if(this.explode){
      for(var j = 0; j < this.circles.length; j++){
        var c = this.circles[j]
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2, false);
        ctx.fillStyle = "rgba("+c.r+", "+c.g+", "+c.b+", 0.9)";
        ctx.fill();
        c.x += c.vx * 2;
        c.y += c.vy * 2;
        c.radius -= .09;
        if(c.radius < 0 )
        {
          this.circles.splice(j, 1);
        }
        if(this.circles.length <= 0){
          this.explode = false;
        }
      }
    }
    this.bottomPlayground.Render();
    this.topPlayground.Render();
    ctx.save();
    ctx.font = '80pt league Gothic'
    if(!this.explode){
      var num = Math.floor(this.distance).toString();
      var numDigit = num.length;
      ctx.fillText(this.distanceNowNum.toFixed(2)+"M", (canvasWidth / 2 - 80 - (numDigit)*10) , canvasHeight / 2 - 100);
      ctx.font = '84pt league Gothic'
      ctx.fillStyle = "white"
      ctx.fillText(this.distanceNowNum.toFixed(2)+"M", (canvasWidth / 2 - 80 - (numDigit)*10) - 3 , canvasHeight / 2 - 100 - 5);
      // ctx.fillText(this.distanceNow.toFixed(2)+'M', canvasWidth / 2 - 70, )
      ctx.save();
      ctx.fillStyle = "white"
      ctx.fillRect(canvasWidth / 2 - 135, canvasHeight / 2 + 20, 100 * 3, 7);
      ctx.fillStyle = this.distanceColor;
      ctx.font = '50pt league Gothic'
      ctx.fillRect(canvasWidth / 2 - 135, canvasHeight / 2 + 20, (this.distanceNow / this.totalDis * 100) * 3, 7);
      if(this.rank == "Diamond"){
        ctx.fillText(this.rank, canvasWidth / 2 - 70, canvasHeight / 2 + 40);
      }
      else if(this.rank == "Gold"){
        ctx.fillText(this.rank, canvasWidth / 2 - 30, canvasHeight / 2 + 40);
      }
      else{
        ctx.fillText(this.rank, canvasWidth / 2 - 50, canvasHeight / 2 + 40);
      }


      ctx.restore();

      ctx.restore();
    }


  }
  Update(){
    this.background.Update();
    this.boss.Exit();
    this.topPlayground.Update(this.background.frontBackgroundSpeed);
    this.bottomPlayground.Update(this.background.frontBackgroundSpeed);
    if(!this.explode){
      if(this.distanceNow <= this.distance){
        if(this.distanceNow >= this.totalDis){
          this.distanceNow = 0;
          this.distance -= this.totalDis;
          if(this.distanceColor == "#A57164"){
            this.distanceColor = "#C0C0C0";
            this.rank = "Silver"
            this.totalDis += 30
          }
          else if(this.distanceColor == "#C0C0C0"){
            this.distanceColor = "#ffd700";
            this.rank = "Gold"
            this.totalDis += 30
          }
          else if(this.distanceColor == "#ffd700"){
            this.distanceColor = "#b9f2ff";
            this.rank = "Diamond"
            this.totalDis += 30
          }
          else if(this.distanceColor == "#b9f2ff"){
            this.distanceColor = "##7e9c68";
            this.rank = "Master"
            this.totalDis += 30
          }
        }
        this.distanceNow += 1
        this.distanceNowNum += 1
      }
    }

  }
  Notification(){

  }
}
