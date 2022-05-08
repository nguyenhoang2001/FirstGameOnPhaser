import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { StartScene } from "./scenes/StartScene";

const config: Phaser.Types.Core.GameConfig = {
    width: 100,
    height: 600,
    title: 'Flappy Bird',
    parent: 'game',
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        keyboard: true,
        mouse:true,
    },
    scene: [BootScene,StartScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    backgroundColor: '#98d687',
    render: { pixelArt: true, antialias: false }
}
console.log('hello');
const game = new Phaser.Game(config);