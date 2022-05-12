import Phaser from "phaser";
import { Bird } from "../objects/Bird";
import { PipesManager } from "../objects/PipesManager";

export class GameScene extends Phaser.Scene {
    private background!: Phaser.GameObjects.TileSprite;
    private pipesManager!: PipesManager;
    private ground!: Phaser.GameObjects.TileSprite;
    private bird!: Bird;
    private timerGeneratePipe!: number;
    private score!: number;
    private endSound!: Phaser.Sound.BaseSound;
    private flapSound!:Phaser.Sound.BaseSound;
    private jumpKey!: Phaser.Input.Keyboard.Key;


    constructor() {
        super({
            key: 'GameScene'
        });
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

        // PipesManager
        this.timerGeneratePipe = 0;
        this.pipesManager = new PipesManager(this);
        this.pipesManager.pipes = this.add.group();
        this.pipesManager.addNewRowOfPipes();
        this.physics.add.collider(this.bird,this.pipesManager.pipes,()=>{this.birdDead()});

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
                this.pipesManager.addNewRowOfPipes();
                this.timerGeneratePipe = 0;
            }
            this.inputHandling();
            this.bird.update();
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

    private countScore() {
        for(let i = 0; i < this.pipesManager.positionOfPipes.length; i++) {
            if(this.bird.x > this.pipesManager.positionOfPipes[i] + 60) {
                this.score += 1;
                this.pipesManager.positionOfPipes.shift();
                i -= 1;
                console.log(this.score);
            }else {
                if(i == 0)
                    break;
            }
        }
    }
}