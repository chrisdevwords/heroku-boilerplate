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
        {% if data.spotify.id %}
        <section class="main-content" id="mainContent">
            <div id="main-view">
                <header class="spotify__header">
                    <p>Click a playlist to view tracks. Click a track to request that track.</p>
                </header>
                <div class="spotify__playlists"></div>
                <footer class="spotify__footer">
                    <a class="load-more load-bar">Load More Playlists</a>
                    <p class="loading-text load-bar">Loading Playlists...</p>
                </footer>
            </div>
        </section>
        <section class="search__modal" id="youtubeSearch">
            <form id="search-form" class="search__form">
                <input name="query" id="search-query" type="text" />
                <button type="submit">Search</button>
            </form>
            <div id="search-results" class="search__results">

            </div>
            <a class="close-btn">Close</a>
        </section>
        {% else %}
        <section class="main-content" id="mainContent">
            <p>This app requires you to login to Spotify in order to access your playlists.</p>
            <a href="/auth/spotify/login">Login To Spotify</a>
        </section>
        {% endif %}

    </main>
    {% endblock %}
{% endblock %}

{% block body_js %}
    <script type="text/javascript">
        var __SERVER_VARS = {% autoescape false %}{{ data|json_encode }}{% endautoescape %};
    </script>
    <script src="/build/js/main.js"></script>
{% endblock %}
