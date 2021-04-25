var bloquant;
var terrain;
var player;
var position_x = 510;
var position_y = 1730;
var cursors;
var cursors2;
var Sortie;
var enemie2;
var enemie1;
var invincible = false;
var compteur = 150; 
var playerPdv=3;
var gameOver = false;
var scorevie;
var collectible1;
var collectibles1;
var ScoreEmeraude;
var emeraudes = 0;
var gamepad;
var paddle;
var padConnected;
var pad;
var clef;
var clefs;
var ScoreClefs;
var nbrClefs = 0;





class SceneOne extends Phaser.Scene{
    constructor(){
        super("Scene1");
        this.pad = null;
    }
        
preload() {
    this.load.image("tiles", "assets/tilesets/tilesheet.png" );
    this.load.tilemapTiledJSON("scene1", "assets/tilemaps/Scene1.json");
    this.load.image("player", "assets/images/perso.png");
    this.load.image("monstre1", "assets/images/Monstre1.png");
    this.load.image("collectible1","assets/images/emeraude.png");
    this.load.image("clef","assets/images/Clef.png");
    


    
}

create() {
    //map
    const map = this.make.tilemap({key: 'scene1'});
    const tileset = map.addTilesetImage('tilesheet', 'tiles');
    terrain = map.createLayer('Sol', tileset, 0, 0);
    const zone = map.createLayer('Sortie', tileset, 0, 0);
    bloquant = map.createLayer('Mur', tileset, 0, 0);
    
    const collectibleObject = map.getObjectLayer('emeraude').objects;
    const collectibleObject2= map.getObjectLayer('Clef').objects;
    
    
    
    bloquant.setCollisionByExclusion(-1, true);
    zone.setCollisionByExclusion(-1, true)
    
    
    

    
    //perso
    
    player = this.physics.add.sprite(position_x, position_y, 'player').setScale(3);
    this.physics.add.collider(player, bloquant);
    cursors = this.input.keyboard.createCursorKeys();
        cursors2 = this.input.keyboard.addKeys('A,Z,S,Q,D,T,space');
    this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    
    //changement de zone
    this.physics.add.overlap(player, zone, changementZone, null, this);
    
    function changementZone(player, zone){
            if (player.y >= 780 && player.y <=821 && player.x >= 588 && player.x <= 692){
                //player.body.stop();
                this.scene.start("maison");
                console.log("changement");
            }
    }
    
    //collectibles Emeraude
    
    collectibles1 = this.physics.add.group({
        });
     for (const collectible1 of collectibleObject) {
            collectibles1.create(collectible1.x, collectible1.y, 'collectible1')
            }
    ScoreEmeraude = this.add.text(100, 75, ScoreEmeraude, { fontSize: '48px', fill: '#ff0000' }).setScrollFactor(0);
    
    //Collectibles Clefs
    
        clefs = this.physics.add.group({
        });
     for (const clef of collectibleObject2) {
            clefs.create(clef.x, clef.y, 'Clef')
            }
    ScoreClefs = this.add.text(100, 105, ScoreClefs, { fontSize: '48px', fill: '#ff0000' }).setScrollFactor(0);
    
    //ennemie
    

    
    enemie1 = this.physics.add.sprite(1376,735, 'monstre1')
    
     this.tweens.add({
            targets: enemie1,
            props: {
                x: { value: 1576, duration: 2000, flipX: true },
                y: { value: 935, duration: 3000},
            },
            yoyo: true,
            repeat: -1
        });
    
        enemie2 = this.physics.add.sprite(991,1187, 'monstre1')
    
     this.tweens.add({
            targets: enemie2,
            props: {
                x: { value: 1191, duration: 2000, flipX: true },
                y: { value: 1387, duration: 3000},
            },
            yoyo: true,
            repeat: -1
        });
    
    //collider
    this.physics.add.collider(player,enemie1,perdPdv,destructionEnnemie,null,this);
    this.physics.add.collider(player,enemie2,perdPdv,destructionEnnemie,null,this);
    this.physics.add.overlap(player, collectibles1, collecteEmeraude, null, this);
    this.physics.add.overlap(player, clefs, nbrClef, null, this);
    
    
    
    //affiche vie
    scorevie = this.add.text(100, 25, playerPdv, { fontSize: '48px', fill: '#ff0000' }).setScrollFactor(0);
    
   
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
    //controle clavier
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
    
    //invulénrabilité
    
     if(invincible == true){ 
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        } 
   
   

    
   
}
}
    
function perdPdv(){ // si le joueur touche un monstre il perd un point de vie //
    
    if(invincible == false){
        playerPdv -= 1;
        scorevie.setText("Vie"+playerPdv)
    }
    invincible = true;
    if(playerPdv <1 ){
                gameOver = true;
                this.physics.pause();
                this.add.text(635, 360, "Partie perdu", { fontSize: '48px', fill: '#ff0000' }).setScrollFactor(0);
            }
}
function collecteEmeraude(player,collectible1){
            collectible1.destroy();
            emeraudes +=  1;

            ScoreEmeraude.setText("Emeraudes " +emeraudes);
    
}

function nbrClef (player, clef){
    clef.destroy();
    nbrClef += 1;
    ScoreClefs.setText('CLefs:'  +nbrClef);
}

function destructionEnnemie(player, ennemie1){
    ennemie1.destroy();
    aleatoire = Math.floor(Math.random() * Math.floor(2));
    if (aleatoire == 1){
        collectibles1.create(ennemie1.x, ennemie1.y, 'collectible1')
    }
    
}
    

