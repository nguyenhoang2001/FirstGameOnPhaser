import Phaser from "phaser";
import { Bird } from "../objects/bird";

export class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.Image;
    private ground!: Phaser.GameObjects.Image;
    private bird!: Phaser.GameObjects.Sprite;
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create(): void {
        this.background = this.add.image(0,0,'background');
        this.background.displayHeight = this.sys.game.config.height as number;
        this.background.scaleX = this.background.scaleY;
        this.background.y = (this.game.config.height as number) / 2;
        this.background.x = (this.game.config.width as number) / 2;

        
        this.ground = this.add.image(0,0,'ground');
        // this.ground.displayWidth = this.sys.game.config.width as number;
        // this.ground.scaleX = this.ground.scaleY;
        this.ground.scale = 3.5;
        this.ground.y = this.sys.game.config.height as number - this.ground.height + 30;
        this.ground.x += 30;
        this.scene.launch('BirdScene');
        // this.anims.create({
        //     key: 'fly',
        //     frames: [
        //         { key: 'birdUp' },
        //         { key: 'birdMid' },
        //         { key: 'birdDown', duration: 50 }
        //     ],
        //     frameRate: 8,
        //     repeat: -1
        // });
        // this.bird = this.add.sprite(50, 50, 'birdUp').play('fly');
        // this.bird.setScale(2);
        // this.bird.y += 350;
    }
}