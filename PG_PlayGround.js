class PG_PlayGround{
  constructor(back){
    this.imgBird = resourcePreLoader.GetImage('file/img/bird/bird.svg');

    this.object00 = resourcePreLoader.GetImage('file/img/front/object_00.svg');
    this.object01 = resourcePreLoader.GetImage('file/img/front/object_01.svg');
    this.object02 = resourcePreLoader.GetImage('file/img/front/object_02.svg');
    this.object03 = resourcePreLoader.GetImage('file/img/front/object_03.svg');
    this.object04 = resourcePreLoader.GetImage('file/img/front/object_04.svg');
    this.object05 = resourcePreLoader.GetImage('file/img/front/object_05.svg');
    this.object06 = resourcePreLoader.GetImage('file/img/front/object_06.svg');
    this.object07 = resourcePreLoader.GetImage('file/img/front/object_07.svg');
    this.spear = resourcePreLoader.GetImage('file/img/object/spear_01.svg');
    this.gear = resourcePreLoader.GetImage('file/img/object/gear.svg');
    this.wheel_out = resourcePreLoader.GetImage('file/img/object/wheel_out_00.svg');
    this.wheel_in = resourcePreLoader.GetImage('file/img/object/wheel_out_01.svg');
    this.missle = resourcePreLoader.GetImage('file/img/object/missle.svg');
    this.alert = resourcePreLoader.GetImage('file/img/object/alert.svg');
    this.leg = resourcePreLoader.GetImage('file/img/object/leg_00.svg');
    this.explode = false;
    this.background = back
    this.circles = [];

    // ObjectTpye 0 : 정적인 배경 추가요소 << 아무 기능없음
    // ObjectType 1 : 지속적으로 회전하는 오브젝트 요소 << Rotate
    // ObjectType 2 : 땅에서 튀어나오는 요소 Y값 감소함 << 기울어짐 처리됨
    // ObjcetType 3 : 추가 예정 아이템 요소 << None
    this.ObjectCode = {
      bird : 1,
    }
    this.ItemCode = {
      balloon : 2,
    }
    this.Init();
    this.objectSpeed = 0 ;
  }
  Init(){
  }
  Render(){
    var canvas = document.getElementById("canvas");
    var ctx  = canvas.getContext("2d");
    for(var i=0; i<this.arrObjects.length; i++)
    {
      this.arrObjects[i].Render( ctx );
    }
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
  }
  Update(speed){
    for(var i=0; i<this.arrObjects.length; i++)
    {
      var obj = this.arrObjects[i];
      if(obj.objectType == 0 || obj.objectType == 1 || obj.objectType == 9 || obj.objectType == 8 || obj.objectType == 10){
        obj.Translate(-speed, 0)
      }
      else if(obj.objectType == 2){
        obj.Translate(-speed, 0)
        obj.Rotate(2);
      }
      else if(obj.objectType == -2){
        obj.Translate(-speed, 0)
        obj.Rotate(-2);
      }
      else if(obj.objectType == 3){
        obj.Translate(-speed, 0)
        obj.Spear();
        if(obj.x < canvasWidth / 2 && obj.y > 190){
          obj.y -= 20
        }
      }
      else if(obj.objectType == 4){
        obj.Rotate(20);
        obj.Translate(-speed * 2, 0)
        if(obj.x < canvasWidth){
          var tmp = this.arrObjects[i + 1]
          this.arrObjects.splice(i+1, 1);
        }
      }
      else if(obj.objectType == 5){
        if(obj.alertD)
        {
          if(obj.alertCnt < 5){
            obj.alertCnt++;
          }
          else{
            obj.alertD = false;
            obj.SetSize(0, 0)
          }
        }
        else if(!obj.alertD){
          if(obj.alertCnt > 0){
            obj.alertCnt--;
          }
          else{
            obj.alertD = true;
            obj.SetSize(20 / 1.5, 60 / 1.5)
          }
        }
      }
      if(obj.objectType == 6){
        obj.Translate(-speed, 0)
        if(obj.x < canvasWidth - 20 && obj.y > 0){
          obj.y -= 20
        }
        if(obj.x + obj.width > -50){
          // this.background.gameSpeed = 0.5
        }
        else{
          // this.background.gameSpeed = 1.4
        }
      }
      if(obj.Update)
      {
        obj.Update();
        obj.SetPosition( obj.x , obj.y );
      }
      if(obj.x + obj.width < -50)
      {
        if(obj.objectType >= 0)
        {
          this.AddGrapicObject( this.objectNum );
        }
        this.arrObjects.splice(i, 1);
        console.log('delete');
      }
    }
  }
  AddObject( type ){

  }
  AddGrapicObject( type ){

  }
  AddItem( type ){
    var obj;
    if( type == this.ItemCode.balloon )
    {
      obj = new ItemBalloon();
      obj.SetPosition(0, 0);
    }
    this.arrObjects.push( obj );
  }
  CheckCollision( player )
  {
    var obj;
    for( var i = 0; i < this.arrObjects.length; i++ )
    {
      var obj = this.arrObjects[i];
      if( obj.objectType == 1 || obj.objectType == 2 || obj.objectType == 3 || obj.objectType == 4)
      {
        //원의 외곽과 사각형이 충돌했는가
        var distance = [];
        var x = [player.left, player.right, player.left, player.right];
        var y = [player.top, player.top, player.bottom, player.bottm];
        for(var i=0; i<4; i++){
          var tmpX = x[i] - (obj.x + obj.width / 2);
          var tmpY = y[i] - (obj.y + obj.width / 2);
          distance[i] = Math.sqrt(tmpX*tmpX + tmpY*tmpY);
          if(distance[i] < obj.width / 2){
            playGameState.Notification( 1 );
          }
        }
      }
      else if(obj.objectType == 6){
        if( obj.x < player.right && obj.y + 60 + 80 > player.top
                 && obj.x + obj.width > player.left && obj.y + 60 < player.bottom ){
                   for (var k = 0; k < 100; k++) {
                     this.circles.push({
                       x : obj.x + obj.width / 2,
                       y : obj.y + obj.height / 2,
                       radius : 3 +Math.random()*3,
                       vx : -5 + Math.random()*10,
                       vy : -5 + Math.random()*10,
                       r : Math.round(Math.random())*30 ,
                       g : Math.round(Math.random())*30 ,
                       b : Math.round(Math.random())*30 ,
                     })
                   }
                   this.explode = true;
                   this.arrObjects.splice(i, 1);
                   this.AddGrapicObject( this.objectNum );

                 }
        else{
          if( obj.x < player.right && obj.y + obj.height > player.top
                   && obj.x + obj.width > player.left && obj.y< player.bottom ){
                     playGameState.Notification( 1 );
                   }
        }

      }
      else if(obj.objectType == 9 || obj.objectType == 8){
        if(obj.objectType == 8){
          var dx = obj.width / 2 - 20;
        }
        else{
          var dx = 0;
        }
        if( obj.x + dx < player.right && obj.y + obj.height > player.top
                 && obj.x + dx+ obj.width / 2 > player.left && obj.y< player.bottom ){

                 }
        else{
          var distance = [];
          var x = [player.left, player.right, player.left, player.right];
          var y = [player.top, player.top, player.bottom, player.bottm];
          for(var i=0; i<4; i++){
            var tmpX = x[i] - (obj.x + obj.width / 2);
            var tmpY = y[i] - (obj.y + obj.width / 2);
            distance[i] = Math.sqrt(tmpX*tmpX + tmpY*tmpY);
            if(distance[i] < obj.width / 2 - 10){
              playGameState.Notification( 1 );
            }
          }
        }
      }
      else if(obj.objectType == 10){
        var distance = [];
        var x = [player.left, player.right, player.left, player.right];
        var y = [player.top, player.top, player.bottom, player.bottm];
        for(var i=0; i<4; i++){
          var tmpX = x[i] - (obj.x + obj.width / 2);
          var tmpY = y[i] - (obj.y + obj.width / 2);
          distance[i] = Math.sqrt(tmpX*tmpX + tmpY*tmpY);
          if(distance[i] < obj.width / 2 - 10){
            var distance = [];
            var x = [player.left, player.right, player.left, player.right];
            var y = [player.top, player.top, player.bottom, player.bottm];
            for(var i=0; i<4; i++){
              var tmpX = x[i] - (obj.x + obj.width / 1.5);
              var tmpY = y[i] - (obj.y + obj.width / 2);
              distance[i] = Math.sqrt(tmpX*tmpX + tmpY*tmpY);
              if(distance[i] < obj.width / 2 - 10){
                playGameState.Notification( 1 );
              }
            }
          }
        }
      }
    }
  }
}
