# {{name}}

class {{name}} extends {{inherits}}

{{#brief_description}}
## Brief Description
{{.}}
{{/brief_description}}

{{#description}}
## Description
{{.}}
{{/description}}

{{#has_methods}}
## Methods

{{#methods}}
### {{#static}}static {{/static}}func `{{name}}`({{#params}}{{name}}: {{type}}{{#more}}, {{/more}}{{/params}}) -> {{return_type}}
{{description}}

{{/methods}}

{{/has_methods}}
