import { IImageConstructor } from '../interfaces/IImageConstructor';

export class Pipe extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    // image
    this.setScale(3);
    this.setOrigin(0, 0);
  }

  public setBody(): void {
    this.body.allowGravity = false;
    this.body.setSize(19, 20);
  }
}
