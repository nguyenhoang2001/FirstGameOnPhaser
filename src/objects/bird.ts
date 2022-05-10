import { IImageConstructor } from "../interfaces/IImageConstructor";

export class Bird extends Phaser.GameObjects.Sprite {
    private isDead:boolean;
    private isFlapping:boolean;
    body!: Phaser.Physics.Arcade.Body;
    private jumpKey!: Phaser.Input.Keyboard.Key;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
        // image
        this.setScale(2);
        this.setOrigin(0, 0);

        // variables
        this.isDead = false;
        this.isFlapping = false;

        this.scene.anims.create({
            key: 'fly',
            frames: [
                { key: 'birdUp' },
                { key: 'birdMid' },
                { key: 'birdDown', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });
        this.play('fly');

        // input
        this.jumpKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // // physics
        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setSize(17, 12);

        this.scene.add.existing(this);
    }

    public getDead(): boolean {
        return this.isDead;
    }
    
    public setDead(dead: boolean): void {
        this.isDead = dead;
    }

    public update(): void {
        // handle angle change
        if (this.angle < 30) {
          this.angle += 2;
        }
    
        // handle input
        if (this.jumpKey.isDown && !this.isFlapping) {
          this.isFlapping = true;
          this.body.setVelocityY(-400);
          this.body.setVelocityX(180);
          this.scene.tweens.add({
            targets: this,
            props: { angle: -20 },
            duration: 150,
            ease: 'Power0'
          });
        } else if (this.jumpKey.isUp && this.isFlapping) {
          this.isFlapping = false;
        }
    }
}