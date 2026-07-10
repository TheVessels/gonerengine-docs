# Party Members

In GonerEngine, a [PartyMember](/reference/PartyMember) is anyone who is part of the player's party
(like Kris, Susie, or Ralsei).
It manages both player movement and party member following.
In Deltarune's code, the player character is the object `obj_mainchara`
and the party followers are objects `obj_caterpillarchara`,
but we decided to put all this logic in one place.

Unfortunately, despite all the work that has been done on PartyMember,
it still isn't fully accurate to the game.

## Things to Improve

- If you go in one direction and repeatedly start and stop, and then start walking without stopping for a while,
one frame of that "stopping" data is recorded to the party followers, making them stop for one frame.
This should not happen. The party followers should not jitter like this.
- The logic needs to be higher-FPS-friendly. The party follower gets data from the party member 30 times per second,
but this means they will move at a lower FPS than the player character.
- We need to implement `scr_caterpillar_interpolate`. This is what lets party followers get
back into the line of the party, after they have been moved by a cutscene, or by something else.
