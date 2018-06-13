---
title: ""
nav_title: Home
layout: base
---

{% capture raw_content %}{% include_relative README.md %}{% endcapture %}

{% assign content_lines = raw_content | newline_to_br | strip_newlines | split: '<br />' %}

{% assign first_line = content_lines | first %}
{% assign footer_end = content_lines | size | minus: 1 %}
{% assign footer_start = footer_end | minus: 2 %}

{% assign content = raw_content | remove: first_line %}

{% for i in (footer_start..footer_end) %}
  {% assign content = content | remove: content_lines[i] %}
{% endfor %}

{% assign first_header = "## Installation" %}
{% capture toc_and_first_header %}
<toc></toc>

{{ first_header }}
{% endcapture %}

{% assign content = content | replace: first_header, toc_and_first_header %}

{{ content }}
