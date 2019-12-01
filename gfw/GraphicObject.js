class GraphicObject{
  constructor( img, type ){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.img = img;
    this.objectType = type;
    this.rotate = false;
    this.angle = 0;
    this.spear = false;
    this.rotation = 2;
    this.alertCnt = 0;
    this.alertD = true;
  }
  Render( ctx ){
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.strokeCircle(this.x + this.width / 2, this.y + this.height / 2, this.height / 2)
    // ctx.strokeCircle(this.x + this.width / 2, this.y + this.width / 2, this.width / 2)
    // if(this.objectType == 9 || this.objectType == 8 || this.objectType == 1 || this.objectType == 10){
    //   // ctx.strokeRect(this.x , this.y, this.width / 2 , this.height );
    //   ctx.strokeCircle(this.x + this.width / 2, this.y + this.width / 2, this.width / 2 - 10)
    //   ctx.strokeCircle(this.x + this.width / 1.5, this.y + this.width / 2, this.width / 2 - 10)
    // }
      if(this.rotate){
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
        ctx.rotate( this.angle*Math.PI / 180);
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
      }
      if(this.spear){
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
        ctx.rotate(-15*Math.PI / 180);
        ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
      ctx.drawImage( this.img, this.x, this.y    , this.width , this.height );
      if(this.rotate){
        ctx.restore();
        this.angle+= this.rotation;
      }
      if(this.spear){
        ctx.restore();
      }


  }

  Translate( x, y ){
    this.x += x;
    this.y += y;
  }
  SetPosition( x, y ){
    this.x = x;
    this.y = y;
  }
  SetSize( w, h ){
    this.width = w;
    this.height = h;
  }
  Rotate(){
    this.rotate = true;
  }
  Rotate(rotation){
    this.rotate = true;
    this.rotation = rotation;
  }
  Spear(){
    this.spear = true;
  }
  SpearTo(){
    this.spearTo = true;
  }
}
