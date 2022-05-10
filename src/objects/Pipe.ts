import { IImageConstructor } from '../interfaces/IImageConstructor';

export class Pipe extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body;
  positionX:number;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    this.positionX = aParams.x;
    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(19, 20);

    this.scene.add.existing(this);
  }
}
