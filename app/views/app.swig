{% extends "./base.swig" %}

{% block content %}
    <div class="main-content" id="app-view">
    {% include './_masthead.swig' %}
    {% include './_search.swig' %}
    {% include './_spotify-playlists.swig' %}
    </div>
{% endblock %}

{% block body_js %}
    <script type="text/javascript">
        var __SERVER_VARS = {% autoescape false %}{{ data|json_encode }}{% endautoescape %};
    </script>
    <script src="/build/js/main.js"></script>
{% endblock %}
