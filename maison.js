var bloquant;
var terrain;
var player;
var cursors;
var cursors2;
var position_x = 203;
var position_y = 521;
var gamepad;
var paddle;
var padConnected;
var pad;




class maison extends Phaser.Scene{
    constructor(){
        super("maison");
        this.pad = null;
    }
    
preload() {
    this.load.image("tiles", "assets/tilesets/tilesheet.png" );
    this.load.tilemapTiledJSON("maison", "assets/tilemaps/maison.json");
    this.load.image("player", "assets/images/perso.png");
    
    }

create(){
//map
const map = this.make.tilemap({key: 'maison'});
    const tileset = map.addTilesetImage('tilesheet', 'tiles');
    terrain = map.createLayer('Sol', tileset, 0, 0);
    bloquant = map.createLayer('Mur', tileset, 0, 0);
    const zone = map.createLayer('Sortie', tileset, 0, 0);
    
    bloquant.setCollisionByExclusion(-1, true);
    zone.setCollisionByExclusion(-1, true)
    
    
//perso
    player = this.physics.add.sprite(position_x, position_y, 'player').setScale(3);
    this.physics.add.collider(player, bloquant);
    cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('A,Z,S,Q,D,T,space');
    this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    
    
    this.physics.add.overlap(player, zone, changementZone, null, this);
    function changementZone(player, zone){
            if (player.y >= 583 && player.x >= 138 && player.x <= 633 && player.y >= 243 ){
                //player.body.stop();
                this.scene.start("SceneOne");
                console.log("changement");
            }
    }
    
    //controle manette
    
    if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
    
}
    
    update() {
    //Normalize and scale the velocity so that player can't move faster along a diagonal
    
        player.body.velocity.normalize().scale(300);
    if (cursors.right.isDown){
        player.setVelocityX(300);
        }
        else if (cursors.left.isDown){
            player.setVelocityX(-300);
        }
        else if (cursors.up.isDown){
            player.setVelocityY(-300);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(300);
        }
        else{
            player.setVelocity(0);
        }
    }
    //controle manette
    if (padConnected){
         if (paddle.right){
        player.setVelocityX(300);
        }
        else if (paddle.left){
            player.setVelocityX(-300);
        }
        else if (paddle.up){
            player.setVelocityY(-300);
        }
        else if (paddle.down){
            player.setVelocityY(300);
        }
        else{
            player.setVelocity(0);
        }
    }
       
}