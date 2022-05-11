export class BootScene extends Phaser.Scene {
    private loadingBar!: Phaser.GameObjects.Graphics;
    private progressBar!: Phaser.GameObjects.Graphics;
  
    constructor() {
      super({
        key: 'BootScene'
      });
    }
  
    preload(): void {
      // set the background and create loading bar
      this.cameras.main.setBackgroundColor(0x98d687);
      this.createLoadingbar();
  
      // pass value to change the loading bar fill
      this.load.on(
        'progress',
         (value: number) => {
          this.progressBar.clear();
          this.progressBar.fillStyle(0xfff6d3, 1);
          this.progressBar.fillRect(
            this.cameras.main.width / 4,
            this.cameras.main.height / 2 - 16,
            (this.cameras.main.width / 2) * value,
            16
          );
        },
        this
      );
    
      // delete bar graphics, when loading complete
      this.load.on(
        'complete',
         () => {
          this.progressBar.destroy();
          this.loadingBar.destroy();
        },
        this
      );
  
      // load our package
      this.load.image('background', './assets/images/background.png');
      this.load.image('birdUp', './assets/images/birdUp.png');
      this.load.image('birdMid', './assets/images/birdMid.png');
      this.load.image('birdDown', './assets/images/birdDown.png');
      this.load.image('buttonPlay', './assets/images/buttonPlay.png');
      this.load.image('gameTitle', './assets/images/gameTitle.png');
      this.load.image('ground','./assets/images/ground.png');
      this.load.spritesheet('pipe','./assets/sprites/pipe.png',{"frameWidth": 20,"frameHeight": 20});
      this.load.audio('backgroundMusic','./assets/music/backgroundMusic.mp3');
      this.load.audio('ding','./assets/sfx/dingSound.mp3');
      this.load.audio('flapSound','./assets/sfx/flapSound.mp3');
      this.load.audio('hitButton','./assets/sfx/hitButtonSound.mp3');
      this.load.audio('crowdSad','./assets/sfx/crowdSad.mp3');
      this.load.audio('clapping','./assets/sfx/clappingSound.mp3');
    }
  
    update(): void {
      this.scene.start('StartScene');
    }
  
    private createLoadingbar(): void {
      this.loadingBar = this.add.graphics();
      this.loadingBar.fillStyle(0x5dae47, 1);
      this.loadingBar.fillRect(
        this.cameras.main.width / 4 - 2,
        this.cameras.main.height / 2 - 18,
        this.cameras.main.width / 2 + 4,
        20
      );
      this.progressBar = this.add.graphics();
    }
}