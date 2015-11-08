{% extends "./base.swig" %}

{% block content %}
    {% include './_masthead.swig' %}
    {% include './_spotify-playlists.swig' %}
    {% include './_search.swig' %}
{% endblock %}

{% block body_js %}
    <script type="text/javascript">
        var __SERVER_VARS = {% autoescape false %}{{ data|json_encode }}{% endautoescape %};
    </script>
    <script src="/build/js/main.js"></script>
{% endblock %}
