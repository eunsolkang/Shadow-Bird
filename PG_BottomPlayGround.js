class PG_BottomPlayGround extends PG_PlayGround{
  Init(){
    this.objectNum = 0;
    this.objectTotal = 9;
    this.arrObjects = new Array();
    this.AddGrapicObject(0);
  }
  AddGrapicObject( type ){
    var obj;
    var obj2;
    if( type == 0 )
    {
      obj = new GraphicObject( this.object05, 1 )
      obj.SetPosition(canvasWidth, 220 - 10);
      obj.SetSize(33 * 6, 23 * 6);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 1 )
    {
      obj = new GraphicObject( this.object06, 1)
      obj.SetPosition(canvasWidth, 220 - 40);
      obj.SetSize(13 * 40, 4 * 40 );
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 2 )
    {
      obj = new GraphicObject( this.object07, 0 )
      obj.SetPosition(canvasWidth, 240);
      obj.SetSize(66 * 5, 17 * 5);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 3 )
    {
      obj = new GraphicObject( this.gear, 2 )
      obj.SetPosition(canvasWidth, 240);
      obj.SetSize(250, 250);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 4 )
    {
      obj = new GraphicObject( this.spear, 3 )
      obj.SetPosition(canvasWidth, 400);
      obj.SetSize(50, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 5 )
    {
      obj = new GraphicObject( this.wheel_out, 2 )
      obj.SetPosition(canvasWidth, 400);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 6 )
    {
      obj = new GraphicObject( this.wheel_out, 2 )
      obj2 = new GraphicObject( this.wheel_in, -2 )
      obj.SetPosition(canvasWidth, 225);
      obj2.SetPosition(canvasWidth + 55, 275);
      obj.SetSize(250, 250);
      obj2.SetSize(150, 150);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 7 ){
      obj = new GraphicObject(this.missle, 4)
      obj2 = new GraphicObject(this.alert, 5)
      var objY = Math.floor(Math.random()*canvasHeight - 120)+50
      obj.SetPosition(canvasWidth*2, objY);
      obj2.SetPosition(canvasWidth - 50, objY);
      obj.SetSize(50, 50);
      obj2.SetSize(20 / 1.5, 60 / 1.5);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if(type == 8 ){
      obj = new GraphicObject(this.leg, 6);
      obj.SetPosition(canvasWidth - 50, canvasHeight);
      obj.SetSize(50, canvasHeight);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    if(obj == undefined){
      console.log('Object undefined!! : Error Type : ' + type);
    }
    this.arrObjects.push( obj );
    if(obj2 != undefined){
      this.arrObjects.push( obj2 );
    }
  }
  // AddGrapicObject( type ){
  //   var obj;
  //   var obj2;
  //   if( type == 0 )
  //   {
  //     obj = new GraphicObject( this.wheel_out, 2 )
  //     obj2 = new GraphicObject( this.wheel_in, -2 )
  //     obj.SetPosition(canvasWidth, 225);
  //     obj2.SetPosition(canvasWidth + 50, 275);
  //     obj.SetSize(250, 250);
  //     obj2.SetSize(150, 150);
  //     this.objectNum = Math.floor((Math.random()*0));
  //
  //   }
  //   if(obj2 != undefined){
  //     this.arrObjects.push( obj2 );
  //   }
  //   this.arrObjects.push( obj );
  //   console.log(this.arrObjects);
  //
  // }

}
