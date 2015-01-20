{{ title }}
{% for _ in title %}={% endfor %}

{{ content }}

{% set script_files = script_files + ["_static/google_analytics.js"] %}
