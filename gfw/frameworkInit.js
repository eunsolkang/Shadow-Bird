var canvasWidth,
    canvasHeight;
function onGameInit()
{
    GAME_FPS = 30;
    debugSystem.debugMode = true;

    resourcePreLoader.AddImage( "file/img/background/back_00.svg" );
    resourcePreLoader.AddImage( "file/img/background/back_01.svg" );
    resourcePreLoader.AddImage( "file/img/background/back_02.svg" );

    resourcePreLoader.AddImage( "file/img/background/back2_00.svg" );
    resourcePreLoader.AddImage( "file/img/background/back2_01.svg" );
    resourcePreLoader.AddImage( "file/img/background/back2_02.svg" );

    resourcePreLoader.AddImage( "file/img/background/back3_00.svg" );
    resourcePreLoader.AddImage( "file/img/background/back3_01.svg" );
    resourcePreLoader.AddImage( "file/img/background/back3_02.svg" );

    resourcePreLoader.AddImage( "file/img/background/middle_00.svg" );
    resourcePreLoader.AddImage( "file/img/background/middle_01.svg" );
    resourcePreLoader.AddImage( "file/img/background/middle_02.svg" );
    resourcePreLoader.AddImage( "file/img/background/front_00.svg" );
    resourcePreLoader.AddImage( "file/img/background/front_01.svg" );
    resourcePreLoader.AddImage( "file/img/background/front_02.svg" );
    resourcePreLoader.AddImage( "file/img/background/light.png" );
    resourcePreLoader.AddImage( "file/img/ui/title.svg" );


    resourcePreLoader.AddImage( "file/img/bird/bird.svg" );
    resourcePreLoader.AddImage( "file/img/bird/bird.svg" );
    resourcePreLoader.AddImage( "file/img/item/balloon.svg" );
    resourcePreLoader.AddImage( "file/img/object/boss.svg" );
    resourcePreLoader.AddImage( "file/img/object/boss_attack.svg" );
    resourcePreLoader.AddImage( "file/img/object/gear.svg" );
    resourcePreLoader.AddImage( "file/img/object/wheel_out_00.svg" );
    resourcePreLoader.AddImage( "file/img/object/wheel_out_01.svg" );
    resourcePreLoader.AddImage( "file/img/object/gear.svg" );
    resourcePreLoader.AddImage( "file/img/object/spear_01.svg" );

    resourcePreLoader.AddImage( "file/img/front/object_00.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_01.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_02.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_03.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_04.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_05.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_06.svg" );
    resourcePreLoader.AddImage( "file/img/front/object_07.svg" );
    resourcePreLoader.AddImage( "file/img/background/fog.png" );

    resourcePreLoader.AddImage( "file/img/ui/easymode.svg" );
    resourcePreLoader.AddImage( "file/img/ui/hardmode.svg" );
    resourcePreLoader.AddImage( "file/img/bird/s.png" );
    resourcePreLoader.AddImage( "file/img/item/feather.svg" );

    resourcePreLoader.AddImage( "file/img/object/missle.svg" );
    resourcePreLoader.AddImage( "file/img/object/alert.svg" );
    resourcePreLoader.AddImage( "file/img/object/leg_00.svg" );


    soundSystem.AddSound( "file/sound/break.wav", 1 );
    soundSystem.AddSound( "file/sound/background.mp3", 1 );
    soundSystem.AddSound( "file/sound/background2.mp3", 1 );

    // 게임 초기 시작 상태 설정

    canvasWidth = 640 ;
    canvasHeight = 360 ;

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    after_loading_state = new TitleState();
    gameLoop();
}
window.addEventListener("load", onGameInit, false);
