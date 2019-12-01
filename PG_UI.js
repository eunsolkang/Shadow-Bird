class PG_UI{
  constructor(){
    this.Init();
  }
  Init(){
    this.size = 30;
    this.playHp = 100;
    this.distance = 10;
    this.margin = 0;
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = "white"

    ctx.beginPath();
    ctx.scale(0.2, 0.2);
    ctx.bezierCurveTo(75,37,70 ,25 ,50 ,25 );
    ctx.bezierCurveTo(20 ,25 ,20 ,62.5 ,20 ,62.5 );
    ctx.bezierCurveTo(20 ,80 ,40 ,102 ,75 ,120 );
    ctx.bezierCurveTo(110 ,102 ,130 ,80 ,130 ,62.5 );
    ctx.bezierCurveTo(130 ,62.5 ,130 ,25 ,100 ,25 );
    ctx.bezierCurveTo(85 ,25 ,75 ,37 ,75 ,40 );
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.scale(1, 1);
    ctx.fillStyle = "gray";
    ctx.transform(1, 0, -0.75, 1, 0, 0);
    for(var i=0; i<100 / 5; i++)
    {
      ctx.fillRect(30 + i*12, 10, 10, 8);
    }
    ctx.fillStyle = "white";
    for(var i=0; i<this.playHp / 5; i++)
    {
      ctx.fillRect(30 + i*12, 10, 10, 8);
    }
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "white"
    var num = Math.floor(this.distance).toString();
    var numDigit = num.length;
    ctx.fillText(this.distance.toFixed(2)+"M", canvasWidth - 35 - (numDigit)*10, 0, 100, 100);
    ctx.restore();
    ctx.save();
    ctx.fillStyle = "white"

    ctx.beginPath();
    ctx.scale(0.2, 0.2);
    ctx.bezierCurveTo(75,37,70 ,25 ,50 ,25 );
    ctx.bezierCurveTo(20 ,25 ,20 ,62.5 ,20 ,62.5 );
    ctx.bezierCurveTo(20 ,80 ,40 ,102 ,75 ,120 );
    ctx.bezierCurveTo(110 ,102 ,130 ,80 ,130 ,62.5 );
    ctx.bezierCurveTo(130 ,62.5 ,130 ,25 ,100 ,25 );
    ctx.bezierCurveTo(85 ,25 ,75 ,37 ,75 ,40 );
    ctx.fill();
    ctx.restore();
  }
  Update(hp, distance){
    this.playHp = hp;
    this.distance = distance
  }
}
