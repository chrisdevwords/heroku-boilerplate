{% extends "./base.swig" %}

{% block content %}
    <main class="main-content" id="app-view">
    {% include './_masthead.swig' %}
    <section class="now-playing" id="now-playing"></section>
    {% include './_search.swig' %}
    {% include './_spotify-playlists.swig' %}
    </main>
{% endblock %}

{% block body_js %}
    <script type="text/javascript">
        var __SERVER_VARS = {% autoescape false %}{{ data|json_encode }}{% endautoescape %};
    </script>
    <script src="/build/js/main.js"></script>
{% endblock %}
