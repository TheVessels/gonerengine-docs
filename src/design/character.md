# Characters in GonerEngine

In GonerEngine, a `Character` defines the sprites, animations,
name, and other properties of any character in the game.
This includes Kris, Susie, Ralsei, Noelle, Queen, Flowery, Tasque, Nubert, etc.

# States

> [!NOTE]
> I had the idea to add a checkbox called "Multiple States".
> If it's unchecked, then the states dictionary won't show up in the Inspector.
> We can do this with `_get_property_list`, but I'm wondering if it's scope creep or not.
> I want to add it because it would make creating characters simpler.

If you want your character to have a singular state, then just add a single state
to the States dictionary.
You can add states with any arbitrary name.
If you want to add default Light/Dark World states, call the state name `dark` or `light`.
To add states specific to the Dark or Light world, write `dark_statename` or `light_statename`,
where `statename` is replaced with the name of your state.

![Character States Demonstration](/img/character_states.png)
