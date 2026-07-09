# {{name}}

class {{name}} extends {{inherits}}

{{#brief_description}}
## Description
{{.}}
{{/brief_description}}

{{#description}}
{{.}}
{{/description}}

{{#has_methods}}
## Methods

{{#methods}}
### {{#static}}static {{/static}}func `{{name}}`({{#params}}{{name}}: {{#enum}}{{enum}}{{/enum}}{{^enum}}{{type}}{{/enum}}{{#more}}, {{/more}}{{/params}}) -> {{return_type}}
{{description}}

{{/methods}}

{{/has_methods}}
