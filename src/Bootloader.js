const AssetKeys = {
    fondo: "fondo",
    niebla: "niebla",
    primerplano: "primerplano",
    arboles: "arboles",
};
class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
    }

    preload() {
        this.load.image(AssetKeys.fondo, "assets/background/background.png");
        this.load.image(AssetKeys.niebla, "assets/background/fog.png");
        this.load.image(
            AssetKeys.primerplano,
            "assets/background/foreground.png"
        );
        this.load.image(AssetKeys.arboles, "assets/background/trees.png");
        this.load.spritesheet("p1", "assets/atlas/atlas.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        //escenario
        const { width, height } = this.scale;
        this.bg = this.add
            .tileSprite(0, 0, width, height, AssetKeys.fondo)
            .setScale(2);
        this.arboles = this.add
            .tileSprite(0, 0, width, height, AssetKeys.arboles)
            .setScale(2);
        this.primerplano = this.add
            .tileSprite(0, 0, width, height, AssetKeys.primerplano)
            .setScale(2);
        this.niebla = this.add
            .tileSprite(0, 0, width, height, AssetKeys.niebla)
            .setScale(2);

        //jugador
        this.player = this.physics.add.sprite(100, 450, "p1");
        this.player.setScale(3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(50);
        this.player.setSize(20, 20);

        //creando animaciones del jugador
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNames("p1", {
                start: 7,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNames("p1", { start: 0, end: 3 }),
            frameRate: 3,
            repeat: 10,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("p1", {
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });
        //creando teclas
        this.cursor = this.input.keyboard.createCursorKeys();

        //crear camara
        this.cameras.main.setBounds(
            0,
            0,
            this.bg.displayWidth,
            this.bg.displayHeight
        );
        this.cameras.main.startFollow(this.player, false, 1, 1, 200, 200);
    }
    update() {
        // this.bg.tilePositionX += 0.1;
        // this.arboles.tilePositionX += 0.14;
        // this.primerplano.tilePositionX += 0.2;
        // this.niebla.tilePositionX += 0.7;
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.player.body.velocity.y < -30) {
            this.player.setFrame(17);
        } else if (this.player.body.velocity.y > 30) {
            this.player.setFrame(18);
        }
        if (
            this.player.body.velocity.y < -30 &&
            this.player.body.velocity.x < 0
        ) {
            this.player.setFrame(26);
        }
        if (
            this.player.body.velocity.y > 30 &&
            this.player.body.velocity.x < 0
        ) {
            this.player.setFrame(25);
        }
    }
}

export default Bootloader;
