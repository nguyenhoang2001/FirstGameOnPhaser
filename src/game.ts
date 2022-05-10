import Phaser from "phaser";
import { BirdScene } from "./scenes/BirdScene";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { StartScene } from "./scenes/StartScene";

const config: Phaser.Types.Core.GameConfig = {
    width: 320,
    height: 600,
    title: 'Flappy Bird',
    parent: 'game',
    type: Phaser.AUTO,
    input: {
        keyboard: true,
        mouse:true,
    },
    scene: [BootScene,StartScene,GameScene,BirdScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    backgroundColor: '#98d687',
    render: { pixelArt: true, antialias: false }
}

const game = new Phaser.Game(config);