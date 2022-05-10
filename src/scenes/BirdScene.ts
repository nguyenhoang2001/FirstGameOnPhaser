export class BirdScene extends Phaser.Scene {
    private bird!: Phaser.GameObjects.Sprite;

    constructor() {
        super('BirdScene');
    }

    create(): void {
        this.anims.create({
            key: 'fly',
            frames: [
                { key: 'birdUp' },
                { key: 'birdMid' },
                { key: 'birdDown', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });
        this.bird = this.add.sprite(50, 50, 'birdUp').play('fly');
        this.bird.setScale(2);
        this.bird.y += 350;
    }

}