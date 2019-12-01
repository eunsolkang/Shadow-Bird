var count = 0;

class PGBackground{
  constructor(){

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imgBackground00 = resourcePreLoader.GetImage('file/img/background/back_00.svg');
    this.imgBackground01 = resourcePreLoader.GetImage('file/img/background/back_01.svg');
    this.imgBackground02 = resourcePreLoader.GetImage('file/img/background/back_02.svg');
    this.imgBackground03 = resourcePreLoader.GetImage('file/img/background/middle_00.svg');
    this.imgBackground04 = resourcePreLoader.GetImage('file/img/background/middle_01.svg');
    this.imgBackground05 = resourcePreLoader.GetImage('file/img/background/middle_02.svg');
    this.imgBackground06 = resourcePreLoader.GetImage('file/img/background/front_00.svg');
    this.imgBackground07 = resourcePreLoader.GetImage('file/img/background/front_01.svg');
    this.imgBackground08 = resourcePreLoader.GetImage('file/img/background/front_02.svg');

    this.imgBackground09 = resourcePreLoader.GetImage('file/img/background/back2_00.svg');
    this.imgBackground10 = resourcePreLoader.GetImage('file/img/background/back2_01.svg');
    this.imgBackground11 = resourcePreLoader.GetImage('file/img/background/back2_02.svg');

    this.imgBackground12 = resourcePreLoader.GetImage('file/img/background/back3_00.svg');
    this.imgBackground13 = resourcePreLoader.GetImage('file/img/background/back3_01.svg');
    this.imgBackground14 = resourcePreLoader.GetImage('file/img/background/back3_02.svg');


    this.imgFog = resourcePreLoader.GetImage('file/img/background/fog.png');
    this.gameSpeed = 1.8;


    this.totalCnt = 0;


    this.offsetY = 0;
    this.backOffsetX = 0;
    this.middleOffsetX = 0;
    this.frontOffsetX = 0;
    //Front + Middle + Back 마지막에 통
    this.Init();

    this.count = 0;
    this.timer = 0;
    this.FogOpacity = 0.0;

    this.backgroundArr = new Array(); // 백그라운드 배열
    this.backgroundLen = 0; //
    this.backgroundLenCount = 0; // 백그라운드 총 랜더한 계수
    this.backgroundCount = 0; // 지금랜더중인 백그라운드 카운트
    this.middleBackgroundArr = new Array();
    this.middleBackgroundLen = 0;
    this.middleBackgroundLenCount = 0;
    this.middleBackgroundCount = 0;
    this.frontBackgroundArr = new Array();
    this.frontBackgroundLen = 0;
    this.frontBackgroundLenCount = 0;
    this.frontBackgroundCount = 0;
    if(this.imgBackground00 == undefined)
    {
      console.log('BackGround00 Load ERROR!!');
    }
    if(this.imgBackground01 == undefined)
    {
      console.log('BackGround01 Load ERROR!!');
    }
    if(this.imgBackground02 == undefined)
    {
      console.log('BackGround02 Load ERROR!!');
    }
    this.backgroundArr.push(this.imgBackground00);
    this.backgroundArr.push(this.imgBackground01);
    // this.backgroundArr.push(this.imgBackground02);
    this.middleBackgroundArr.push(this.imgBackground03);
    this.middleBackgroundArr.push(this.imgBackground04);
    // this.middleBackgroundArr.push(this.imgBackground05);
    this.frontBackgroundArr.push(this.imgBackground06);
    this.frontBackgroundArr.push(this.imgBackground07);
    // this.frontBackgroundArr.push(this.imgBackground08);
  }
  Init(){
    if(mode){
      this.totalCnt = 4;
      console.log('Hard');
      this.gameSpeed =1.8
    }
    this.backgroundSpeed = 0.5 * this.gameSpeed;
    this.middleBackgroundSpeed = 2 * this.gameSpeed;
    this.frontBackgroundSpeed = 5 * this.gameSpeed;
    this.totalCnt = 0;

  }
  Render_back(){
    this.middleOffsetX -= this.middleBackgroundSpeed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    for(var i=0; i<this.backgroundArr.length; i++)
    {
        var background_sx = (this.backOffsetX + ((this.canvasWidth - 2) * this.backgroundLen)) ;
        ctx.drawImage(this.backgroundArr[i], background_sx, 0, this.canvasWidth , this.canvasHeight );
        this.backgroundLen++;
    }
    if((-this.backOffsetX) % this.canvasWidth < this.backgroundSpeed && -this.backOffsetX > 3)
    {
      if(this.backgroundCount == 0)
      {
        this.backgroundArr.push(this.imgBackground02);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 1)
      {
        this.backgroundArr.push(this.imgBackground00);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 2)
      {
        this.backgroundArr.push(this.imgBackground01);
        this.backgroundCount = 0;
        this.totalCnt++;
        this.backgroundLenCount = -1;
        this.backOffsetX = 0;
      }
      this.backgroundArr.splice(0, 1);
      this.backgroundLenCount++;
    }
    this.backgroundLen = this.backgroundLenCount;
  }
  Render_back2(){
    this.middleOffsetX -= this.middleBackgroundSpeed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    for(var i=0; i<this.backgroundArr.length; i++)
    {
        var background_sx = (this.backOffsetX + ((this.canvasWidth - 2) * this.backgroundLen)) ;
        ctx.drawImage(this.backgroundArr[i], background_sx, 0, this.canvasWidth , this.canvasHeight );
        this.backgroundLen++;
    }
    if((-this.backOffsetX) % this.canvasWidth < this.backgroundSpeed && -this.backOffsetX > 3)
    {
      if(this.backgroundCount == 0)
      {
        this.backgroundArr.push(this.imgBackground09);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 1)
      {
        this.backgroundArr.push(this.imgBackground10);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 2)
      {
        this.backgroundArr.push(this.imgBackground11);
        this.backgroundCount = 0;
        this.backgroundLenCount = -1;
        this.totalCnt++;
        this.backOffsetX = 0;
      }
      this.backgroundArr.splice(0, 1);
      this.backgroundLenCount++;
    }
    this.backgroundLen = this.backgroundLenCount;
  }
  Render_back3(){
    this.middleOffsetX -= this.middleBackgroundSpeed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    for(var i=0; i<this.backgroundArr.length; i++)
    {
        var background_sx = (this.backOffsetX + ((this.canvasWidth - 2) * this.backgroundLen)) ;
        ctx.drawImage(this.backgroundArr[i], background_sx, 0, this.canvasWidth , this.canvasHeight );
        this.backgroundLen++;
    }
    if((-this.backOffsetX) % this.canvasWidth < this.backgroundSpeed && -this.backOffsetX > 3)
    {
      if(this.backgroundCount == 0)
      {
        this.backgroundArr.push(this.imgBackground12);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 1)
      {
        this.backgroundArr.push(this.imgBackground13);
        this.backgroundCount++;
        this.totalCnt++;
      }
      else if(this.backgroundCount == 2)
      {
        this.backgroundArr.push(this.imgBackground14);
        this.backgroundCount = 0;
        this.backgroundLenCount = -1;
        this.backOffsetX = 0;
        this.totalCnt++;
      }
      this.backgroundArr.splice(0, 1);
      this.backgroundLenCount++;
    }
    this.backgroundLen = this.backgroundLenCount;
  }
  Render_middle(){
    this.backOffsetX -= this.backgroundSpeed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for(var i=0; i<this.middleBackgroundArr.length; i++)
    {
        var middleBackground_sx = (this.middleOffsetX + ((this.canvasWidth -1) * this.middleBackgroundLen)) ;
        var fog_sx = (this.middleOffsetX + ((this.canvasWidth ) * this.middleBackgroundLen)) ;

        ctx.drawImage(this.middleBackgroundArr[i], middleBackground_sx, 0, this.canvasWidth , this.canvasHeight );
        ctx.save();
        ctx.globalAlpha = this.FogOpacity;
        ctx.drawImage(this.imgFog, fog_sx, 0, this.canvasWidth, this.canvasHeight)
        ctx.restore();
        this.middleBackgroundLen++;
    }
    if((-this.middleOffsetX) % this.canvasWidth < this.middleBackgroundSpeed && -this.middleOffsetX > 3)
    {
      if(this.middleBackgroundCount == 0)
      {
        this.middleBackgroundArr.push(this.imgBackground05);
        this.middleBackgroundCount++;
      }
      else if(this.middleBackgroundCount == 1)
      {
        this.middleBackgroundArr.push(this.imgBackground03);
        this.middleBackgroundCount++;
      }
      else if(this.middleBackgroundCount == 2)
      {
        this.middleBackgroundArr.push(this.imgBackground04);
        this.middleBackgroundCount = 0;
        this.middleBackgroundLenCount = -1;
        this.middleOffsetX = 0;
      }
      this.middleBackgroundArr.splice(0, 1);
      this.middleBackgroundLenCount++;

    }
    this.middleBackgroundLen = this.middleBackgroundLenCount;
  }
  Render_front(){
    this.frontOffsetX -= this.frontBackgroundSpeed;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    for(var i=0; i<this.frontBackgroundArr.length; i++)
    {
        var frontBackground_sx = (this.frontOffsetX + ((this.canvasWidth - 2) * this.frontBackgroundLen)) ;
        ctx.drawImage(this.frontBackgroundArr[i], frontBackground_sx, 0, this.canvasWidth , this.canvasHeight );
        this.frontBackgroundLen++;
    }
    if((-this.frontOffsetX) % this.canvasWidth < this.frontBackgroundSpeed && -this.frontOffsetX > 3)
    {
      if(this.frontBackgroundCount == 0)
      {
        this.frontBackgroundArr.push(this.imgBackground08);
        this.frontBackgroundCount++;
      }
      else if(this.frontBackgroundCount == 1)
      {
        this.frontBackgroundArr.push(this.imgBackground06);
        this.frontBackgroundCount++;
      }
      else if(this.frontBackgroundCount == 2)
      {
        this.frontBackgroundArr.push(this.imgBackground07);
        this.frontBackgroundCount = 0;
        this.frontBackgroundLenCount = -1;
        this.frontOffsetX = 0;
      }
      this.frontBackgroundArr.splice(0, 1);
      this.frontBackgroundLenCount++;
    }
    this.frontBackgroundLen = this.frontBackgroundLenCount;

  }
  // 최종 최적화 할때 Front + Middle + Back 코드 중복 부분 for 문으로 통합해서 마지막에 랜더할것
  Update(){


    // console.log(this.totalCnt);
    if(this.FogOpacity <= 0.7){
      this.FogOpacity += 0.02
    }
  }

}
