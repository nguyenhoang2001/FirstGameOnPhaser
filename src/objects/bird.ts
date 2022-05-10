import { IImageConstructor } from "../interfaces/image.interface";

export class Bird extends Phaser.GameObjects.Image {
    private isDead:boolean;
    private isFlapping:boolean;
    body!: Phaser.Physics.Arcade.Body;
    private jumpKey!: Phaser.Input.Keyboard.Key;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
            // image
        this.setScale(3);
        this.setOrigin(0, 0);

        // variables
        this.isDead = false;
        this.isFlapping = false;

        // // physics
        // this.scene.physics.world.enable(this);
        // this.body.setGravityY(1000);
        // this.body.setSize(17, 12);

        // // input
        // this.jumpKey = this.scene.input.keyboard.addKey(
        // Phaser.Input.Keyboard.KeyCodes.SPACE
        // );

        // this.scene.add.existing(this);
    }
}