var player;
var background;
var branches;
var score = 0;
var scoreText;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.checkCollision.down = false;

	addBackground();

	addPlayer();
	
	addBranches();

	game.time.events.loop(Phaser.Timer.SECOND, addScore, this);
	scoreText = game.add.text(20, 20, 'Score: ' + score, { font: "16px Arial", fill: "#000000", align: "center" });
}

function addPlayer() {
	
	player = game.add.sprite(50, game.world.height/2, 'bird');
	player.scale.setTo(3, 3);
	//player.smooth = false;
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;

	player.animations.add('left_run', [6, 7, 10, 11], 10, true);
	player.animations.add('left_stand', [2, 3], 5, true);
	player.animations.add('right_run', [5, 4, 9, 8], 10, true);
	player.animations.add('right_stand', [1, 0], 5, true);

	player.events.onOutOfBounds.add(playerDead, this);
	player.checkWorldBounds = true;
}

function playerDead() {
	game.add.text(game.world.centerX, 400, 'Awwwww :(', { font: "40px Arial", fill: "#ffffff", align: "center" }).anchor.setTo(0.5, 0.5);
	game.time.events.stop();
}

function addBackground() {
	background = game.add.tileSprite(0, 0, 800, 600, 'background');
}

function addBranches() {
	branches = game.add.group();
	branches.enableBody = true;

	var branch = branches.create(0, game.world.height - 100, 'branch');
	branch.body.immovable = true;
	branch.checkWorldBounds = true;
	branch.events.onOutOfBounds.add(branchDone, this);

	branch = branches.create(game.world.width/2, Math.random() * (game.world.height - 200) + 200, 'branch');
	branch.body.immovable = true;
	branch.checkWorldBounds = true;
	branch.events.onOutOfBounds.add(branchDone, this);

}

function branchDone(branch) {
	branch.reset(game.world.width - 1, Math.random() * (game.world.height - 200) + 180, 'branch');
}

function addScore() {
	score += 10;
}