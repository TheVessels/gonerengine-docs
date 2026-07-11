# Battle Controller

> [!NOTE] Much of the information in this article was based on code from Deltarune Chapter 3.

The GonerEngine `BattleController` node and scene aim to replicate the behavior of
several battle-related tools in Deltarune:

1. `scr_battle()`, which starts a battle by creating `obj_encounterbasic` and `obj_battleback`
    and creates enemy markers that enter from the right side of the screen.
2. `obj_battleback`, which is the purple grid background in battles.
3. `obj_encounterbasic`, which is is the intro animation that begins the battle.
4. `scr_encountersetup()`, which sets the types of enemies and other useful battle-related things.
5. `obj_battlecontroller`, which draws the battle UI and controls the logic of the battle.

## The Details

`global.heromakex[character_idx]` and `global.heromakey[character_idx]` are the X and Y
positions of heroes in battle.
`global.monstermakex[enemy_idx]` and `global.monstermakey[enemy_idx]` are the X and Y
positions of enemies in battle.
All four of these arrays are set by `scr_encountersetup()`.

After `scr_encountersetup()`, `obj_encounterbasic`'s Create event disables
`obj_mainchara` and `obj_caterpillarchara`, then creates "Hero Markers"
that are in the same locations as the party members.
These markers are in their "battle jump" sprites and move to the
locations specified by the `heromake` arrays over a duration of **10 frames**.
On every frame (after the first frame) of this "gliding", the markers make afterimages with a starting opacity of 0.5.
An afterimage is created for nine frames, so keep that in mind.

> [!NOTE] We believe the hero markers actually move to the "heromake" arrays over a duration
> of 9 frames, and fall just short of the `monstermake` locations.
> This needs to be verified.

On the 10th frame, `snd_impact` is played with a volume of 0.7, and `snd_weaponpull_fast` is played
with a volume of 0.8. All of the hero markers are stopped, and their sprites become "battle intro" sprites.
(Note that the image speed of these sprites is set to 0.5, so they are actually played at 15 FPS).
14 frames later, the hero markers and `obj_encounterbasic` are destroyed, and `obj_battlecontroller` is created.

After `scr_encountersetup()`, and after `obj_encounterbasic` is created, `scr_battle()` creates "Enemy Markers"
that are 300 pixels to the right of the location specified by the `monstermake` arrays.
They move to the location specified by the `monstermake` arrays over a duration of **20 frames**.

## `heromake` and `monstermake` Values

All party members have an x-value of 80.
If there are three party members, they have y-values of 50, 130, and 210 (note that they are 80 pixels apart).
If there are two party members, they have y-values of 100 and 180.
If there is one party member, they have a y-value of 140.

The monsters have x-values of 500, 520, and 540 (note that they are 20 pixels apart, horizontally).
The monsters have y-values of 40, 130, and 220 (note that they are 90 pixels apart, vertically).

These values are the default values, but can easily be overridden in `scr_encountersetup(enemy_id)`.
There is a switch statement in the function that acts on the first argument `enemy_id`.
If the id is zero, it does nothing, but it has many values that correspond to all the different
enemies in the game.


## `blcon`

In Deltarune battles, there are "speech bubbles".
These are called `obj_battleblcon` and are created with `scr_blcon(x, y, type).`

