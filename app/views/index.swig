{% extends "./boilerplate.swig" %}

{% block head_css %}
    {% parent %}
    <link rel="stylesheet" href="/build/styles/main.css">
{% endblock %}
{% block body_content %}
    {% parent %}
    {% block main %}
    <main class="main-content-wrapper">
        <header class="hero-container">
            <h1>{{ title|default('Hello.') }}</h1>
            {% include 'nav.swig' with nav %}
        </header>
        <section class="main-content" id="mainContent">
            {% if data.spotify.id %}
                <div id="main-view">
                    <p>Click a playlist to view tracks. Click a track to request that track.</p>
                </div>
            {% else %}
                <p>This app requires you to login to Spotify in order to access your playlists.</p>
                <a href="/auth/spotify/login">Login To Spotify</a>
            {% endif %}
        </section>
    </main>
    {% endblock %}
{% endblock %}

{% block body_js %}
    <script type="text/javascript">
        var __SERVER_VARS = {% autoescape false %}{{ data|json_encode }}{% endautoescape %};
    </script>
    <script src="/build/js/main.js"></script>
{% endblock %}
