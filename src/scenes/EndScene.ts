
export class EndScene extends Phaser.Scene {
    private scoreText!: Phaser.GameObjects.Text;
    private score:number;
    private highScore:number;
    private highScoreText!: Phaser.GameObjects.Text;
    private background!: Phaser.GameObjects.TileSprite;
    private buttonPlay!: Phaser.GameObjects.Image;
    private playAgainText!: Phaser.GameObjects.Text;
    private hitButton!:Phaser.Sound.BaseSound;
    private cheerSound!:Phaser.Sound.BaseSound;

    constructor() {
        super('EndScene');
        this.score = 0;
        this.highScore = 0;
    }

    init(data: any): void {
        this.score = data.score;
    }

    create(): void {
        this.cheerSound = this.sound.add('clapping',{loop:false,volume:0.5});

        this.background = this.add.tileSprite(0, 0, 144, 257, 'background').setOrigin(0);
        this.background.setScale(2.5);

        this.hitButton = this.sound.add('hitButton',{loop:false,volume:0.5});

        this.buttonPlay = this.add.image(0,0,'buttonPlay').setOrigin(0.5);
        this.buttonPlay.x = this.cameras.main.width/2 + 38;
        this.buttonPlay.y = this.cameras.main.height/2 + 10;
        this.buttonPlay.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {
            this.hitButton.play();
            this.cheerSound.stop();
            this.scene.start('GameScene');
        });

        if(this.highScore < this.score) {
            this.cheerSound.play();
            this.highScore = this.score;
        }

        this.scoreText = this.add.text(0, 0,'Your Score: ' + this.score.toString()).setOrigin(0.5);
        this.scoreText.x = this.cameras.main.width/2;
        this.scoreText.y = this.cameras.main.height/2 - 50;
        this.scoreText.setFontFamily('Arial').setFontSize(30).setColor('#ffff00');

        this.highScoreText = this.add.text(0, 0,'High Score: ' + this.highScore.toString()).setOrigin(0.5);
        this.highScoreText.x = this.cameras.main.width/2;
        this.highScoreText.y = this.cameras.main.height/2 - 150;
        this.highScoreText.setFontFamily('Arial').setFontSize(30).setColor('#ffff00');

        this.playAgainText = this.add.text(0, 0,'Play again?').setOrigin(0.5);
        this.playAgainText.x = this.cameras.main.width/2 - 30;
        this.playAgainText.y = this.cameras.main.height/2 + 10;
        this.playAgainText.setFontFamily('Arial').setFontSize(15).setColor('#ffff00');

    }
}