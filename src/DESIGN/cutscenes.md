# How Cutscenes Work in Deltarune (and in other fangame engines)

In Deltarune and in TLDR, cutscenes are "event queues".
All cutscene commands are run on a single frame, then put into a
queue of commands that are interpreted until the queue is empty.

In Kristal and in GonerEngine, cutscenes are coroutines.
This is because in Lua and Godot, functions can be paused in
the middle, so the cutscene functions can be executed when
the corresponding part in the cutscene happens.
We believe this way is much more intuitive.

## Cutscene Actor Variables

Deltarune uses "actor variables" such as `kr`, `ra`, and `su`
to control characters.
These are instance variables created by `scr_maincharacters_actors()`
because in GameMaker, all functions can add instance variables to any
object.
Of course, we can't really do this in Godot.

## Deltarune Cutscene Commands

I don't list *every* command here, just the ones of interest.
Also, `time` is almost always in 30FPS frames.

### `c_sel(actor)`
Sets the main actor.
In the cutscene system, there is always a "selected actor" that
cutscene functions act on.

### `c_walk(direction, speed, time)`
Walk in a specific direction, at a specific speed, for some amount of time.

`direction` is a string that is either "l", "d", "r", or "u".

### `c_walkdirect(xx, yy, time)`
Walk to a point in space in a duration of time.

### `c_walkto_actor(actor, xoff, yoff)`
Walks to an actor.


### `c_walkto_object(actor, xoff, yoff)`
Walks to any object.

