/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: sprokoban chapter 1
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const boxGreen = "b"
const boxGreenGoal = "g"
const exitClosed = "e"
const wall = "w"
const exitOpen = "E"
const fakeExit = "f"
const doorOpen = tune`
120: G4-120,
120: G4-120,
120: A4-120,
240,
120: B4^120,
120: B4^120,
120: C5^120,
2880`
const bg = "G"
const boxRed = "B"
const boxRedGoal = "r"
//let canExit = false
let level = 0
const levels = [
  map`
wwwww
wp.ew
wwbww
wwgww
wwwww`,
  map`
wwwwwwwwww
w........w
ww.w.wg.ww
w.b...w.ww
w...b....w
w........w
ww.w.....w
wg..w....w
w........w
wwwwwwwwww`,
  map`.`
]
const texts = [
  "WASD to move",
  "that's a solid\ndoor, right?",
  "",
  "little harder",
  ""
]
setLegend(
  [player, bitmap`
................
................
................
....00000000....
....02222220....
....00000000....
....0LL00LL0....
....00022000....
....02222220....
....022LL220....
....02222220....
....00000000....
...00......00...
...00......00...
..000......000..
..000......000..`],
  [boxGreen, bitmap`
................
................
..000000000000..
..000444444000..
..000044440000..
..040004400040..
..044000000440..
..044400004440..
..044400004440..
..044000000440..
..040004400040..
..000044440000..
..000444444000..
..000000000000..
................
................`],
  [boxGreenGoal, bitmap`
................
................
.....0000000....
.....0044400....
.....0404040....
.....0440440....
.....0404040....
.....0044400....
.....0000000....
........0.......
......0.0.0.....
.......000......
........0.......
................
.04444444444440.
0000000000000000`],
  [exitOpen, bitmap`
......0000000000
......0111111110
......0111111110
......0111111110
......0111111110
......0110000110
......0110440110
......0110440110
......0110440110
......0110000110
......0111111110
......0111111110
......0111111110
......0111111110
......0111111110
......0000000000`],
  [wall, bitmap`
00L0000000000L00
00L0000000000L00
LLL0000000000LLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLL0000000000LLL
00L0000000000L00
00L0000000000L00`],
  [exitClosed, bitmap`
......0000000000
......0111111110
......0111111110
......0111111110
......0111111110
......0110000110
......0110330110
......0110330110
......0110330110
......0110000110
......0111111110
......0111111110
......0111111110
......0111111110
......0111111110
......0000000000`],
  [bg, bitmap`
LL1LLLLLLLLLL1LL
LL1LLLLLLLLLL1LL
111LLLLLLLLLL111
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
111LLLLLLLLLL111
LL1LLLLLLLLLL1LL
LL1LLLLLLLLLL1LL`],
  [fakeExit, bitmap`
....0000000000..
....0111111110..
....0111111110..
....0111111110..
....0111111110..
....0110000110..
....0110440110..
....0110440110..
....0110440110..
....0110000110..
....0111111110..
....0111111110..
....0111111110..
....0111111110..
....0111111110..
....0000000000..`],
  [boxRed, bitmap`
................
................
..000000000000..
..000333333000..
..000033330000..
..030003300030..
..033000000330..
..033300003330..
..033300003330..
..033000000330..
..030003300030..
..000033330000..
..000333333000..
..000000000000..
................
................`],
  [boxRedGoal, bitmap`
................
................
.....0000000....
.....0033300....
.....0303030....
.....0330330....
.....0303030....
.....0033300....
.....0000000....
........0.......
......0.0.0.....
.......000......
........0.......
................
.03333333333330.
0000000000000000`]
)
const currentLevel = levels[level];
setMap(currentLevel);
addText(texts[level], { x: 1, color: color`1` });
setSolids([player, boxGreen, boxRed, wall, exitClosed])

setMap(levels[level])
setPushables({
  [player]: [boxGreen, boxRed, exitClosed],
  [boxGreen]: [boxGreen, boxRed],
  [boxRed]: [boxRed, boxGreen],
  [exitClosed]: [boxGreen, boxRed]
})
setMap(levels[level])
setBackground(bg)

onInput("w", () => {
  players = getAll(player);
  for (i of players) {
    i.y -= 1;
  }
})
onInput("s", () => {
  players = getAll(player);
  for (i of players) {
    i.y += 1;
  }
})
onInput("a", () => {
  players = getAll(player);
  for (i of players) {
    i.x -= 1;
  }
})
onInput("d", () => {
  players = getAll(player);
  for (i of players) {
    i.x += 1;
  }
})
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  const targetNumber = tilesWith(boxGreenGoal).length
  const exitNum = tilesWith(exitOpen).length
  const noExit = tilesWith(exitClosed).length
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(boxGreenGoal, boxGreen).length
  const inExit = tilesWith(player, exitOpen).length
 // const dCovered = tilesWith(exitClosed, doorGoal)


  
  if (numberCovered == targetNumber)   {
    changeDoors()

    if (noExit == 0) {
      if (exitNum === inExit && !(level === levels.length - 1)) {
        level += 1
        clearText();
        addText(texts[level], { x: 1, color: color`1` });
        const currentLevel = levels[level];
        setMap(currentLevel);
        //const currentLevel = levels[level]
        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
          setMap(currentLevel)
        }
        if (level === levels.length - 1) {
          addText("You win!", {
            y: 4,
            color: color`4`
          })
        }
      }
    }
  }
})
function changeDoors() {
  getAll(exitClosed).forEach((e) => {
      let cx = e.x
      let cy = e.y
      clearTile(cx, cy)
      addSprite(cx, cy, exitOpen)
      canExit = true
      playTune(doorOpen)
    })
}