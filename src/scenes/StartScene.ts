import Phaser from "phaser";

export class StartScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite;
    private buttonPlay!: Phaser.GameObjects.Image;
    private gameTitle!: Phaser.GameObjects.Image;
    constructor() {
        super({
            key: 'StartScene'
        });
    }

    create(): void {
        this.background = this.add.tileSprite(0, 0, 144, 257, 'background').setOrigin(0);
        this.background.setScale(2.5);
        this.buttonPlay = this.add.image(0,0,'buttonPlay').setOrigin(0.5);
        this.gameTitle = this.add.image(0,0,'gameTitle').setOrigin(0.5);
        this.gameTitle.setScale(1.5);
        this.buttonPlay.x = this.cameras.main.width/2;
        this.buttonPlay.y = this.cameras.main.height/2;
        this.gameTitle.x = this.cameras.main.width/2;
        this.gameTitle.y = this.cameras.main.height/2 - 100;
        this.buttonPlay.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {
            console.log('change scene!!');
            this.scene.start('GameScene');
        });
    }
}