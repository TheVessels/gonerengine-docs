# Making these Docs

Initially, we wanted to mimic Godot's docs, so we used Sphinx and `sphinx-rtd-theme`.
However, we soon realized that Sphinx was not the best option.
It used a specific markup language we didn't know, and had many different complex configuration options.
We wanted something that was so easy to use that we could write down anything in these docs when we needed to.

That was why we switched to VitePress.

## Making API Reference

We are also trying to make an API reference for GonerEngine.
The command to do this is: `godot --doctool ~/deltamodders-guide/src/reference --gdscript-docs res://scripts/classes/`.
(You could also do `res://scripts/` instead to make docs for all scripts.)
The big problem is that all of these docs are in XML.
We need to write a script to generate HTML or Markdown from the XML files.
