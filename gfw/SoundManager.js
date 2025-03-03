class SoundSystem{
  constructor(){
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0; // 현재 로딩된 리소스 수
    this.intAllResourceCount = 0; // 로딩해야 할 총 리소스 수
    this.volume = 1;
    this.arrSounds = new Array();
    this.backgroundMusic = undefined;
  }
  AddSound( fileName, resourceCount ){
    var SOUND_RESOURCE_MAX = 8;

    if( resourceCount == undefined )
      resourceCount = SOUND_RESOURCE_MAX;

    for( var i = 0; i < resourceCount; i++ )
    {
      var soundMusic = new Audio();
      soundMusic.src = fileName;
      soundMusic.volume = this.volume;
      soundMusic.isPlayed = false;
      soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
      soundMusic.addEventListener("ended", function()
      {
        if( window.chrome ) this.load();
        this.pause();
      }, false);

      document.body.appendChild(soundMusic);

      this.arrSounds.push( { name: fileName, sound: soundMusic, isPlayed: false  } );
      this.intAllResourceCount++;
    }
  }
  PlaySound( fileName ){
    for( var i = 0; i < this.arrSounds.length; i++ )
    {
      if( this.arrSounds[i].name == fileName )

      {
        if( this.arrSounds[i].sound.ended == true || this.arrSounds[i].sound.isPlayed == false )
        {
          if( this.arrSounds[i].sound.paused )
          {
            this.arrSounds[i].sound.volume = this.volume;
            this.arrSounds[i].sound.play();
            this.arrSounds[i].isPlayed = true;
            break;
          }
        }
      }
    }
  }
  PlayBackGroundMusic( fileName ){
    if( this.backgroundMusic ) // 현재 재생 중인 배경음이 존재한다면
    {
      console.log('띠용');
      this.backgroundMusic.sound.pause();
      this.backgroundMusic.isPlayed = false;
      this.backgroundMusic = undefined;
    }

    for( var i = 0; i < this.arrSounds.length; i++ )
    {
      if( this.arrSounds[i].name == fileName )
      {
        var backgroundMusic = this.arrSounds[i];
        backgroundMusic.sound.pause();  // 기존에 실행되고 있을지 모르니 우선 정지
        if( window.chrome ) backgroundMusic.sound.load();
        backgroundMusic.sound.loop   = true; // 일반적으로 배경음은 반복된다
        backgroundMusic.isPlayed   = true;
        var promise = backgroundMusic.sound.play();

        if (promise !== undefined) {
          promise.then(_ => {
            this.backgroundMusic = backgroundMusic;
          }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }

         // 배경음 교체
      }
    }
  }
  SetVolume( volume ){
    this.volume = volume;

    for( var i = 0; i < this.arrSounds.length; i++ )
    {
      this.arrSounds[i].sound.volume = this.volume;
    }
  }
}

var soundSystem = new SoundSystem();

function onLoadSoundComplete()
{
  soundSystem.nowResourceLoadedCount++;

  // 현재 로딩된 리소스 수와 총 리소스 수 와 비교
  if( soundSystem.nowResourceLoadedCount <= soundSystem.intAllResourceCount )
  {
    // 모든 리소스 로딩 완료!!
    soundSystem.isLoadComplete  = true;
  }
}
