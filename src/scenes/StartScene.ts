import Phaser from "phaser";

export class StartScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.Image;
    private buttonPlay!: Phaser.GameObjects.Image;
    private gameTitle!: Phaser.GameObjects.Image;

    constructor() {
        super({
            key: 'StartScene'
        });
    }

    create(): void {
        this.background = this.add.image(0,0,'background');
        this.background.displayHeight = this.sys.game.config.height as number;
        this.background.scaleX = this.background.scaleY;
        this.background.y = (this.game.config.height as number) / 2;
        this.background.x = (this.game.config.width as number) / 2;

        this.buttonPlay = this.add.image(0,0,'buttonPlay');
        this.gameTitle = this.add.image(0,0,'gameTitle');
        this.gameTitle.scale = 1.5;
        Phaser.Display.Align.In.Center(this.buttonPlay,this.background);
        Phaser.Display.Align.In.Center(this.gameTitle,this.background);
        this.gameTitle.y -= 100;
        this.buttonPlay.y += 50;
        this.buttonPlay.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() => {
            console.log('change scene!!');
            this.scene.start('GameScene');
        });
    }

    update(time: number, delta: number): void {
        
    }
}