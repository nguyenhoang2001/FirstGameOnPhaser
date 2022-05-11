import { IImageConstructor } from "../interfaces/IImageConstructor";

export class Bird extends Phaser.GameObjects.Sprite {
    private isDead:boolean;
    private isFlapping:boolean;
    body!: Phaser.Physics.Arcade.Body;
    
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
    }

    public setBody(): void {
      this.body.setGravityY(1000);
      this.body.setSize(17, 12);
    }

    public getDead(): boolean {
        return this.isDead;
    }
    
    public setDead(dead: boolean): void {
        this.isDead = dead;
    }

    public setFlapping(flap:boolean): void {
      this.isFlapping = flap;
    }

    public update(): void {
        // handle angle change
        if (this.angle < 30) {
          this.angle += 2;
        }
        // handle input
        if (this.isFlapping) {
          this.isFlapping = false;
          this.body.setVelocityY(-300);
          this.body.setVelocityX(180);
          this.scene.tweens.add({
            targets: this,
            props: { angle: -20 },
            duration: 150,
            ease: 'Power0'
          });
        }
    }
}
