# Engine Folder Structure

This article attempts to lay out the standard folder structure for organizing all project files (assets, scripts, scenes, resources, etc.).
This structure is very subject to change during the early stage of developing this engine,
so don't be surprised if it's massively reorganized at some point.

## Overview

Folders that might need clarification have comments added for them.

```txt
| addons/ # Will probably get removed at some point
| fonts/
| libraries/ # GonerEngine libraries (feature extensions)
| music/
| resources/ # Custom GonerEngine resources
| scenes/
|-- battle/
|-- overworld/
|-- ui/
| scripts/
|-- autoloads/
|-- battle/
|-- classes/
|-- overworld/
|-- ui/
| shaders/
| sounds/
|-- ui/
|-- voice/
| sprites/
|-- actors/
|-- battle/
|-- borders/
|-- class_icons/
|-- misc/
|-- overworld/
|-- souls/
|-- tiles/
|-- ui/
| themes/ # UI Themes
| tilesets/
```

Filepaths for files in `scenes` and `scripts` should be mirrored.
For example if there's a scene in `scenes/battle`, a script of the same name on the root node of that scene should be in `scripts/battle`.
Try to do the same for stuff in `sprites`, too. But those are less parallel.

### Restructuring Considerations

- Consider attempting to unify `scripts` and `scenes` folder in some way considering how intertwined they can be.
One way would be giving each script its own folder and having the scene folder inside there along with all the scripts from that scene.
Folders like `autoloads` and `classes` that don't rely on any scenes would still be in a scripts folder.
This solution causes confusion around what to do with classes that have scenes tied to them like [PartyMember](/reference/PartyMember) and [TextBox](/reference/TextBox).

- If we want users to be able to set data in dialogue like `{char('susie')}`, `{face('kris')}`, `{voice('ralsei')}` then how should they be stored to be able to allow that?
And how should "types/subcategories" like `susie_bangs` and `ralsei_hood` be handled? Should they have their own dialogue character resources where their voice and font are also defined?
That would seem rather redundant to some people. Here's some ideas on how this would be structured (each solution assumes there's some sort of dialogue character resource system):

  1. We create a `resources/characters/{char_name}` folder for each character, which holds all their data, including their subcategories (whether subcategory faces would actually be included in the dialogue char resource is up for debate).

  2. All dialogue char resources are stored in a central `resources/dialogue_chars` folder and commands like `{face('kris')}` and `{voice('ralsei')}` would only be able to pull data from those chars, not something custom that's not tied to an existing char resource.

  3. Copy kristal

  4. Copy tldr
