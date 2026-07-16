# GameMaker Quirks

When we first started to use GameMaker, we thought it was an extremely weird engine.
Now, we know that it's a lot better than we initially gave it credit for.
But it still has some quirks.

## GameMaker Object "Movement"

GameMaker's [Event Order docs](https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Object_Properties/Event_Order.htm)
explain the following very well.

Let there be an object `obj_test` that is instantiated
in the Step event of another object, `obj_creator`,
using `instance_create_depth` or `instance_create_layer`.
Inside of the instance creation function, `obj_test`'s Create event is called,
before returning to the Step event of `obj_creator`.
During its Create event, the `obj_test` instance's `direction` is set to `45`,
and its `speed` is set to `10`.

GameMaker runs the Step events for all objects that have been created, one after the other.
So after running the Step event for `obj_creator` instances, it runs the Step events for other objects.
Note that GameMaker does NOT run the Step event for `obj_test`, because it was created during
a Step event on the current frame.

Once it is done with all these Step events, it moves all objects
according to their `hspeed` and `vspeed` variables.
Since the `obj_test` instance was created before this, it will also be moved.
GameMaker will convert `direction` and `speed` to `hspeed` and `vspeed`.
In this case, both `hspeed` and `vspeed` are equal to `10 * cos(45deg)`, which is about 7.07.
So GameMaker moves the instance of `obj_test` about 7.07 pixels down, and about 7.07 pixels to the right.

The "move all instances" part of the game loop always happens
right after the "run all Step events" part of the game loop.
Since `obj_test` was created during a Step event, its first "movement" happens before its first Step event.
Therefore, on `obj_test`'s Nth Step event, it will have moved N times.

What if there was an object called `obj_inroom` that was instantiated
by being inside a room (in the room editor)?
When the room is entered, `obj_inroom`'s Create event is called.
Let's say that `obj_inroom` also sets its `speed` and `direction` variables in the Create event.

`obj_inroom`'s first Step event is ran BEFORE its first movement,
so on the Nth Step event, it will have moved N-1 times.
It is very confusing that two similar objects could behave so differently,
but remember that it is because `obj_test` was instantiated during a Step event,
so it never ran its first Step before its first movement.

## Things GameMaker does better than Godot

GameMaker's object management system is simple, but REALLY good at what it does.
If you always have just one instance of an object, you can reference it with the object's name.
This is what Deltarune's code does when referencing `obj_mainchara`.
If you have multiple instances of an object, you can do something to ALL of them with a `with` statement.
And you can use `instance_number(object_name)` to get the number of instances of an object.
Meanwhile, Godot has a tree system, but that makes it a lot more complex to move around.
You cannot easily just get a node of a specific type in Godot, or get the number of nodes of that type.
You have to implement "object pooling" in order to do that.

(Every time I think of this, I feel shame.
How could Godot do something so fundamental, worse than GameMaker?
Surely there's something missing, right?)
