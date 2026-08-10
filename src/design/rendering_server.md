# Rendering Server

Godot has a lower-level way to draw, called RenderingServer.
RenderingServer has many different primitives, so it can
seem complex at times.
This page tries to explain useful things about RenderingServer.

## The RID

Everything in RenderingServer functions is represented
with a "Resource ID" (RID).
You can get the RID of any `CanvasItem`, `Viewport`, and `Texture`
objects, by using the `get_rid()` method.
However, you cannot convert an RID back into a
`CanvasItem`, `Viewport`, or `Texture`.

All RIDs have an `is_valid()` method to check if
they are a valid RID. This is useful in things like
tool scripts, where you can remake RIDs
if they are invalid.

Most RenderingServer methods follow the convention
`RenderingServer.typename_do_thing(x: RID)`,
where `typename` is the name of the resource being acted on,
and `x` is a RID for a `typename` resource.

Viewports, canvases, and canvas items
can be created with `RenderingServer.typename_create()`,
where typename is the name of the thing you want to create.

## Viewport, Canvas, and CanvasItem

These three things all have different uses.

A viewport is for getting the texture of.
Viewports have a defined size.
You can get a texture from a viewport RID
by using `RenderingServer.viewport_get_texture(viewport)`.

A canvas is something which CanvasItems can be added to.
A canvas has to be attached to a viewport,
which can be done with
`RenderingServer.viewport_attach_canvas(viewport, canvas)`.

A canvas item is something that can be drawn to.
Any Node2D in Godot is a canvas item.
Canvas items can be attached to canvases with
`RenderingServer.canvas_item_set_parent(canvas_item, canvas)`.
Canvas items can have shaders by using
`RenderingServer.canvas_item_set_material(canvas_item, material)`.

## Example

Creating

```gdscript
var viewport: RID = RenderingServer.viewport_create()
RenderingServer.viewport_set_size(viewport, 640, 480)
RenderingServer.viewport_set_active(viewport, true)
RenderingServer.viewport_set_update_mode(viewport, RenderingServer.VIEWPORT_UPDATE_ALWAYS)
RenderingServer.viewport_set_transparent_background(viewport, true)

var canvas: RID = RenderingServer.canvas_create()
RenderingServer.viewport_attach_canvas(viewport, canvas)

var canvas_item: RID = RenderingServer.canvas_item_create()
RenderingServer.canvas_item_set_parent(canvas_item, canvas)

var material: ShaderMaterial = ShaderMaterial.new()
material.shader = load("res://path/to/shader.gdshader")
RenderingServer.canvas_item_set_material(canvas_item, material.get_rid())
```

Drawing (this draws a green circle)

```gdscript
# Make sure to clear a canvas item before you draw to it!
RenderingServer.canvas_item_clear(canvas_item)
RenderingServer.canvas_item_add_circle(
    canvas_item, Vector2(20.0, 20.0), 10.0, Color.GREEN
)
```

Drawing text with a font

```gdscript
# The position is (10, 20) and the color is red
# This draws the letter P
# This function takes the character as an ASCII code,
# which is why we use ord()

my_font.draw_char(
    canvas_item, Vector2(10.0, 20.0), ord("P"), Color.RED
)
```

Drawing a viewport to a canvas item

```gdscript
var texture: RID = RenderingServer.viewport_get_texture(viewport)

# The entire texture will be drawn
# to a rectangle with width 640 and height 480
RenderingServer.canvas_item_add_texture_rect(
    canvas_item, Rect2(0, 0, 640, 480), texture
)
```

Drawing a portion of a viewport to a canvas item

```gdscript
var texture: RID = RenderingServer.viewport_get_texture(viewport)

# A 100x100 region of the viewport with top-left corner at (50, 50)
# will be drawn to a rectangle with width 640 and height 480
RenderingServer.canvas_item_add_texture_rect_region(
    canvas_item, Rect2(0, 0, 640, 480), texture, Rect2(50, 50, 100, 100)
)
```

