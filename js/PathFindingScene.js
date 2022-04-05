class PathFindingScene extends Phaser.Scene {
    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    /** @type {Player} */
    player
    /** @type  {Phaser.Physics.Arcade.Sprite} */
    gun
    /** @type {Array.<Enemy>} */
    enemies = []
    /** @type {Array.<object>} */
    enemySpawnPoints = []
    /** @type {Enemy} */
    activeEnemy
    /** @type {number} */
    minEnemies = 2   
    /** @type  {Phaser.Physics.Arcade.Group} */
    bullets
    constructor() {
        super({ key: 'pathFindingScene' })
    }
    preload() {
        // Player Assets.
        this.load.image("player", "assets/man.png")
        this.load.image("playerGun", "assets/man-with-gun.png")
        // Tile Assets.
        this.load.image("tileset", "assets/tiles100-spacing2.png")
        this.load.tilemapTiledJSON("tilemap", "assets/tilemap.json")
        // Weapon Assets.
        this.load.image("gun", "assets/gun.png")
        this.load.image("bullet", "assets/bullet.png")
        // Enemy Assets.
        this.load.image("enemy", "assets/enemy.png")
        this.load.image("enemydead", "assets/dead-enemy.png")
    }
    create() {
        // Collect Gun.
        this.physics.add.overlap(this.player.sprite, this.gun, this.collectGun, null, this)    
        // Bullet Group.
        this.bullets = this.physics.add.group({
            defaultKey: "bullet",
            maxSize: 50,
            collideWorldBounds: true
        })
        // Bullet Wall Collision.
        this.physics.world.on("worldbounds", this.worldBoundsBullet, this)
        this.physics.add.collider(this.bullets,groundAndWallsLayer, this.bulletHitWall, null, this)
        // Perform Bullet Event
        this.events.on("firebullet", this.fireBullet, this)
    }
    findPath(point) {
    }
    moveEnemy(path) {
    }
    onEnemySpawn() {
    }
    handleEnemyMove(enemy) {
    }
    collectGun(player, gun) {
        // Collecting Gun will change the player sprite and can begin to fire.
        this.gun.destroy()
        this.player.hasGun = true
        this.player.sprite.setTexture("playerGun")
    }
    fireBullet() {
        // Here we tell what direction the bullet will travel based on player current direction they are facing.
        let vector = new Phaser.Math.Vector2(48, 19)
        vector.rotate(this.player.sprite.rotation)
        let bullet = this.bullets.get(this.player.sprite.x+vector.x, this.player.sprite.y+vector.y)
        if(bullet){
            bullet.setDepth(3)
            bullet.body.collideWorldBounds = true
            bullet.body.onWorldBounds = true
            bullet.enableBody(false, bullet.x, bullet.y, true, true)
            bullet.rotation = this.player.sprite.rotation
            // Change the below number for more speed!
            this.physics.velocityFromRotation(bullet.rotation, 500, bullet.body.velocity)
            // To kill enemy on screen when bullet collided,
            for(let i = 0; i < this.enemies.length; i++){
                this.physics.add.collider(this.enemies[i].sprite, bullet, this.bulletHitEnemy, null, this)
            }
        }
    }
    worldBoundsBullet(body) {
        // Return bullet to Pool.
        body.gameObject.disableBody(true, true)
    }
    bulletHitWall(bullet, layer) {
        // Destroy Bullet.
        bullet.disableBody(true, true)
    }
    bulletHitEnemy(enemySprite, bullet) {
        // Destroy Bullet.
        bullet.disableBody(true, true)
        // To remove the enemy from the curret avaliable games in the game.
        let index
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].sprite === enemySprite) {
                index = i
                break
            }
        }
        this.enemies.splice(index, 1)
        // Change Enemy Sprite to a pile of black ashes and disable them as a active enemy.
        this.add.image(enemySprite.x, enemySprite.y, 'enemydead').setRotation(enemySprite.rotation).setDepth(0)
        enemySprite.destroy()
        // To spawn new enemeies if the player is still alive and the enemy spawn capacity is not fully maxed out in the current game.
        if (!this.player.isDead && this.enemies.length < this.minEnemies) {
            this.onEnemySpawn()
        }
    }
    collideEnemy(player, sprite) {
        // If the player collides with the enemy, the game will end and completely stop all movements.
        this.tweens.killAll()
        this.physics.pause()
        this.player.isDead = true
        this.player.sprite.setTint(0xff0000)
    }
    update(time, delta) {
    }
}
