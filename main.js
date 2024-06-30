/*
@title: Simple Maze
@author: Aditi Ranjan
*/

const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [player, bitmap`
................
................
.......999......
.......999......
.....9999999....
......0...0.00..
....0003.30.0...
....0.0...000...
...00.05550.....
.....00...0.....
.....0....0.....
.....0...00.....
.....00000......
......0.0.......
.....CC.CC......
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [goal, bitmap`
................
................
................
...00DDDDDDDD...
...0044444DDD...
...00444444DD...
...004444444D...
...004444444D...
...00DDDDDDDD...
...00...........
...00...........
...00...........
...00...........
...00...........
...00...........
...00...........`]
);

setSolids([player]);

let level = 0;
const levels = [
  map`
p..w..........
.www..w..ww...
...w..ww.w..g.
ww.w..w..w..ww
.w.wwwww..w.w.
.w.......w....
....wwww..w...
www.w.........
..w.wwww.wwww.
www.w..w.w....
w...wwww.www..
w.w........w.w
w....ww..www..
ww...........w
w..w..w..ww.ww`
];


setMap(levels[level]);


// Reset the player back to original position if they crash into a wall!
function resetPlayer() {
  addText("Try again!", { x: 2, y: 2, color: color`3` });
  const playerPos = getFirst(player);
  playerPos.x = 0;
  playerPos.y = 0;
}

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});


afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level++;
    
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 4, y: 4, color: color`3` });
    }
    
  }

  if (getTile(playerPos.x, playerPos.y).find(t => t.type === wall)) { // if the users bumps into the wall
    resetPlayer(); // reset 
  }
  
});
