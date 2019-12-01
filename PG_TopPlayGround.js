class PG_TopPlayGround extends PG_PlayGround{
  Init(){
    this.objectNum = 0;
    this.objectTotal = 7;
    this.arrObjects = new Array();
    this.AddGrapicObject(-1);
  }
  AddGrapicObject( type ){
    var obj;
    var obj2;
    if ( type == -1 ){
      obj = new GraphicObject( this.object00, 9)
      obj.SetPosition(canvasWidth + canvasWidth / 2, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 0 )
    {
      console.log('object00');
      obj = new GraphicObject( this.object00, 9)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 1 ){
      console.log('object01');
      obj = new GraphicObject( this.object01, 8)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 2 ){
      console.log('object02');
      obj = new GraphicObject( this.object02, 1)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 3 ){
      console.log('object03');
      obj = new GraphicObject( this.object03, 9)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 4 ){
      console.log('object04');
      obj = new GraphicObject( this.object04, 10)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(300, 300);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 5 ){
      obj = new GraphicObject( this.gear, 2)
      obj.SetPosition(canvasWidth, -150);
      obj.SetSize(250, 250);
      this.objectNum = Math.floor((Math.random()*this.objectTotal));
    }
    else if( type == 6 ){
      obj = new GraphicObject(this.missle, 4)
      obj2 = new GraphicObject(this.alert, 5)
      var objY = Math.floor(Math.random()*canvasHeight - 120)+50
      obj.SetPosition(canvasWidth*2, objY);
      obj2.SetPosition(canvasWidth - 50, objY);
      obj.SetSize(50, 50);
      obj2.SetSize(20 / 1.5, 60 / 1.5);
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
}
