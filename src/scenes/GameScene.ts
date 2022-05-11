import Phaser from "phaser";
import { Bird } from "../objects/Bird";
import { Pipe } from "../objects/Pipe";

export class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite;
    private pipes!: Phaser.GameObjects.Group;
    private ground!: Phaser.GameObjects.TileSprite;
    private bird!: Bird;
    private timerGeneratePipe!: number;
    private positionPipe!: number;
    private spaceBetweenPipes!: number;
    private positionOfPipes!: number[];
    private score!: number;
    private endSound!: Phaser.Sound.BaseSound;
    private flapSound!:Phaser.Sound.BaseSound;
    private jumpKey!: Phaser.Input.Keyboard.Key;


    constructor() {
        super({
            key: 'GameScene'
        });
        this.timerGeneratePipe = 0;
        this.positionOfPipes = [];
        this.score = 0;
    }

    init(): void {
        this.registry.set('score', -1);
    }

    create(): void {
        // Background
        this.background = this.add.tileSprite(0, 0, 144, 257, 'background').setOrigin(0);
        this.background.setScale(2.5);
        this.background.width += 10000;

        // Ground
        this.ground = this.add.tileSprite(0,0,168,55,'ground').setOrigin(0);
        this.ground.setScale(2);
        this.ground.width += 10000;
        this.ground.displayWidth += 24;
        this.ground.y = 550 + 2;

        // Bird
        this.bird = new Bird({
            scene:this,
            x:50,
            y:50,
            texture:'birdUp'
        });
        this.physics.world.enable(this.bird);
        this.bird.setBody();
        this.add.existing(this.bird);

        // Camera main
        this.cameras.main.setBounds(0,0,this.background.displayWidth + this.background.width,this.background.displayHeight);
        this.cameras.main.startFollow(this.bird,true);
       
        // Collision between ground and bird
        this.physics.add.existing(this.ground,true);
        this.physics.add.collider(this.bird, this.ground,()=>{this.birdDead()});

        // Pipe
        this.positionPipe = 400;
        this.positionOfPipes = [];
        this.spaceBetweenPipes = 100;
        this.timerGeneratePipe = 0;
        this.pipes = this.add.group();
        this.addNewRowOfPipes();

        // Score
        this.score = 0;

        // Sound
        this.endSound = this.sound.add('crowdSad',{loop:false,volume:0.5});
        this.flapSound = this.sound.add('flapSound',{loop:false,volume:0.5});

        // Input
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time: number, delta: number): void {
        if(!this.bird.getDead()) {
            this.timerGeneratePipe += delta;
            if(this.timerGeneratePipe >= 500) {
                this.addNewRowOfPipes();
                this.timerGeneratePipe = 0;
            }
            this.inputHandling();
            this.bird.update();
            this.physics.overlap(
                this.bird,
                this.pipes,
                () => {
                    this.birdDead();
                },
                ()=>{},
                this
            );
            this.countScore();
        } else {
            this.scene.start('EndScene',{score:this.score});
        }
    }

    private inputHandling(): void {
        if(this.jumpKey.isDown) {
            this.flapSound.play();
            this.bird.setFlapping(true);
        }
    }

    private birdDead(): void {
        this.endSound.play();
        this.bird.setDead(true);
        this.bird.body.stop();
        this.cameras.main.stopFollow();
    }

    private addNewRowOfPipes(): void {
        this.positionOfPipes.push(this.positionPipe);
        // update the score
        this.registry.values.score += 1;
    
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

    private countScore() {
        for(let i = 0; i < this.positionOfPipes.length; i++) {
            if(this.bird.x > this.positionOfPipes[i] + 60) {
                this.score += 1;
                this.positionOfPipes.shift();
                i -= 1;
                console.log(this.score);
            }else {
                if(i == 0)
                    break;
            }
        }
    }

    private addPipe(x: number, y: number, frame: number): void {
        let newPipe = new Pipe({scene: this,x: x,y: y,frame: frame,texture: 'pipe'});
        this.physics.world.enable(newPipe);
        newPipe.setBody();
        this.add.existing(newPipe);
        this.pipes.add(newPipe);
    }
}