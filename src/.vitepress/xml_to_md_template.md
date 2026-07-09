# {{name}}

class `{{name}}` extends `{{inherits}}`

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
### {{#static}}static {{/static}}{{return_type}} `{{name}}`({{#params}}{{type}} {{name}}{{#more}}, {{/more}}{{/params}})

{{description}}

{{/methods}}

{{/has_methods}}
