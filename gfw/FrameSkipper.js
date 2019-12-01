class FrameSkipper{
  constructor( delay ){
    this.timer = new Timer();
    this.delay = delay;
  }
  isWork(){
    if( this.timer.nowFrame > this.delay )
    {
        this.timer.Reset();
        return true;
    }

    return false;
  }
}
