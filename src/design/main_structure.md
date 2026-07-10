# Main Scene structure

When first opening the project in Godot, you may be slightly confused at what exactly is going on in the Main scene.
Worry not! This article will explain what's actually going on in all those nodes!

## GameRenderer

This is the node that actually renders the entire game.
It is a [TextureRect](https://docs.godotengine.org/en/stable/classes/class_texturerect.html) with a texture of type [ViewportTexture](https://docs.godotengine.org/en/stable/classes/class_viewporttexture.html) with the [SubViewport](https://docs.godotengine.org/en/stable/classes/class_viewporttexture.html) node 'BorderAndGame' as its viewport path.
So, without this node, none of the game would actually be rendered.

## BorderAndGame

This is the SubViewport where the entire game exists. It doesn't actually render it to the screen, though. That's what **GameRenderer** is for.
This is the space in the scene tree between the **Main** scene and **GameRoot** scene. It is needed purely for border logic, which leads us to the next nodes we will look at:

### BorderTexture and BorderPrevTexture

These are the entire point of **BorderAndGame**. These are the nodes where all the game borders are rendered.
**BorderTexture**, as the name implies, is where the texture for the border is. **BorderPrevTexture** is where the "previous" border texture is.
As in, when changing the border, it is the node where the border being replaced goes before fading away and being fully replaced
by the border now set in the BorderTexture node (refer to [BorderNode](https://thevessels.github.io/gonerengine-docs/reference/BorderNode.html)).

***Note:** The actual logic for all of this is in the Main scene's root node.*

## GameSubViewport

Inside **BorderAndGame**, lies another SubViewport. That viewport is the **GameSubViewport**. This is where our "GameRoot" child scene lives.
The name "GameRoot" might be a bit confusing, but it's essentially just where the entire game, minus the game borders system, is.
This is an entirely different scene which definitely deserves its own article, so we will not be talking about it here.

## TouchscreenLayer

As the name might imply, this is the [CanvasLayer](https://docs.godotengine.org/en/stable/classes/class_canvaslayer.html) where GonerEngine's touchscreen controls exist.
This is, of course, entirely mobile exclusive (mobile support is still very broken and unpolished).
This also contains its own child scene which might get its own article at some point so we also won't be talking about it here.
