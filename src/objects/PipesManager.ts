import { Bird } from "./Bird";
import { Pipe } from "./Pipe";

export class PipesManager {
    public pipes!: Phaser.GameObjects.Group;
    private positionPipe!: number;
    private spaceBetweenPipes!: number;
    public positionOfPipes!: number[];
    private scene!: Phaser.Scene;

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
        this.positionPipe = 400;
        this.spaceBetweenPipes = 100;
        this.positionOfPipes = [];
    }

    public addNewRowOfPipes(): void {
        this.positionOfPipes.push(this.positionPipe);
    
        // randomly pick a number between 1 and 5
        let hole = Math.floor(Math.random() * 5) + 1;

        // add 6 pipes with one big hole at position hole and hole + 1
        for (let i = 0; i < 10; i++) {
          if (i !== hole && i !== hole + 1 && i !== hole + 2) {
            if (i === hole - 1) {
              this.addPipe(this.positionPipe, i * 55, 0);
            } else if (i === hole + 3) {
              this.addPipe(this.positionPipe, i * 55, 1);
            } else {
              this.addPipe(this.positionPipe, i * 55, 2);
            }
          }
        }
        this.positionPipe += 60 + this.spaceBetweenPipes;
    }

    private addPipe(x: number, y: number, frame: number): void {
        let newPipe = new Pipe({scene: this.scene,x: x,y: y,frame: frame,texture: 'pipe'});
        this.scene.physics.world.enable(newPipe);
        newPipe.setBody();
        this.scene.add.existing(newPipe);
        this.pipes.add(newPipe);
    }
}