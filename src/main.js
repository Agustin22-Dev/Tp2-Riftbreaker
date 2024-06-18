import Bootloader from "./Bootloader.js";

const config = {
    title: "Riftbreaker",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1500,
        height: 416,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 500,
            },
        },
    },
    scene: [Bootloader],
};

new Phaser.Game(config);
