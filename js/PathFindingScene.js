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
        // Player Assets
        this.load.image("player", "assets/man.png")
        this.load.image("playerGun", "assets/man-with-gun.png")
        // Tile Assets
        this.load.image("tileset", "assets/tiles100-spacing2.png")
        this.load.tilemapTiledJSON("tilemap", "assets/tilemap.json")
        // Weapon Assets
        this.load.image("gun", "assets/gun.png")
        this.load.image("bullet", "assets/bullet.png")
        // Enemy Assets
        this.load.image("enemy", "assets/enemy.png")
        this.load.image("enemydead", "assets/dead-enemy.png")
    }
    create() {
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
    }
    fireBullet() {
    }
    worldBoundsBullet(body) {
    }
    bulletHitWall(bullet, layer) {
    }
    bulletHitEnemy(enemySprite, bullet) {
    }
    collideEnemy(player, sprite) {
    }
    update(time, delta) {
    }
}