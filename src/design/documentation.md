# Making these Docs

Initially, we wanted to mimic Godot's docs, so we used Sphinx and `sphinx-rtd-theme`.
However, we soon realized that Sphinx was not the best option.
It used a specific markup language we didn't know, and had many different complex configuration options.
We wanted something that was so easy to use that we could write down anything in these docs when we needed to.

That was why we switched to VitePress.

## Making API Reference

We are also trying to make an API reference for GonerEngine.
The commands to do this are:

```bash
mkdir -p ~/gonerengine-docs/godot-docs ~/gonerengine-docs/src/reference
godot --headless --doctool ~/gonerengine-docs/godot-docs
godot --headless --path ~/GonerEngine --import
godot --headless --path ~/GonerEngine --doctool ~/gonerengine-docs/src/reference --gdscript-docs res://scripts/classes/
npm run prebuild
```

(You could also do `res://scripts/` instead to make docs for all scripts.)

All of these docs are in XML,
so we wrote a script to generate Markdown from the XML files.

`npm run prebuild` runs the script `src/.vitepress/xml_to_md.js` which converts the XML documentation
to Markdown. It uses `src/.vitepress/xml_to_md_template.md` as a template for the generated Markdown files.

