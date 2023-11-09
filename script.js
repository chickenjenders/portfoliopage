function preload() {
  img = loadAnimation("./idle.png", { frameSize: [48, 48], frames: 3 });
  img1 = loadAnimation("./idle2.png", { frameSize: [48, 48], frames: 3 });
  img2 = loadAnimation("./Walk.png", { frameSize: [32, 32], frames: 6 });
}

let player, floor, npc1, npc2, ball, stick;
let ballPickedUp = false;
let stickPickedUp = false;

function setup() {
  new Canvas(500, 600);
  world.gravity.y = 0;

  player = new Sprite();
  player.addAni("walk", img2, 6);
  player.diameter = 50;
  player.rotationLock = true;
  player.text = "Player";

  npc1 = new Sprite();
  npc1.addAni("idle", img, 3);
  npc1.diameter = 50;
  npc1.x = 50;
  npc1.y = 50;
  npc1.collider = "static";

  npc2 = new Sprite();
  npc2.img = img1;
  npc2.x = 450;
  npc2.y = 550;
  npc2.diameter = 50;
  npc2.collider = "static";

  floor = new Sprite();
  floor.y = height - 10;
  floor.w = width;
  floor.h = 5;
  floor.collider = "kinematic";

  ball = new Sprite(400, 40, 30);
  ball.diameter = 30;
  ball.color = "blue";
  ball.collider = "static";

  stick = new Sprite(40, 500, 10, 90, "static");
  stick.color = "brown";
}
dialogueText = "";
function draw() {
  clear();
  npc1.changeAni("idle");
  player.changeAni("walk");
  if (player.collides(npc2)) {
    dialogueText = "Help me find my ball!";
  }
  textSize(15);
  text(dialogueText, 0, 580);
  if (kb.pressing("left")) {
    player.vel.x = -1.5;
  } else if (kb.pressing("right")) {
    player.vel.x = 1.5;
  } else if (kb.pressing("up")) {
    player.vel.y = -1.5;
  } else if (kb.pressing("down")) {
    player.vel.y = 1.5;
  } else {
    player.vel.y = 0;
    player.vel.x = 0;
  }
  if (player.overlaps(stick)) {
    stick.remove();
    stickPickedUp = true;
  }
  if (player.overlaps(ball)) {
    ball.remove();
    ballPickedUp = true;
  }
  if (player.collides(npc1) && stickPickedUp == true) {
    dialogueText = "You found my stick!";
  } else if (player.collides(npc1)) {
    dialogueText = "Help me find my stick!";
  }
  if (player.collides(npc2)) {
    if (ballPickedUp) {
      dialogueText = "You found my ball!";
    } else {
      dialogueText = "Help me find my ball!";
    }
  }
}
