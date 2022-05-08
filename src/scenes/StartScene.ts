import Phaser from "phaser";

export class StartScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite;


    constructor() {
        super({
            key: 'StartScene'
        });
    }

    init(): void {

    }

    create(): void {
        this.background = this.add.tileSprite(0,0,390,600,'background').setOrigin(0,0);
    }

    update(time: number, delta: number): void {
        
    }
}