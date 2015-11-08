{% extends "./base.swig" %}
{% block content %}
    {% include './_masthead.swig' %}
    <section class="login" id="login">
        <p>This app requires you to login to Spotify in order to access your playlists.</p>
        <a href="/auth/spotify/login">Login To Spotify</a>
    </section>
{% endblock %}
