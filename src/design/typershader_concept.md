# TyperShader Concept

We need to be able to apply multiple shaders.

My idea was to have a list of "pairs".
The first element in a pair is the Rect that should be processed.
The second element in a pair is a list of "shaders".
These can be represented by shader RIDs OR by indices
that are for a specific shader array.
I personally think it should be a list of indices.

This list of pairs is added to and modified whenever effects are added
and removed from the text.

