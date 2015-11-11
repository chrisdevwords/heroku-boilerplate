{% extends "./base.swig" %}
{% block content %}
    {% include './_masthead.swig' %}
    <section class="login" id="login">
        <p>Please login to post.</p>
        <ul class="inline-nav -aligned -padded">
            <li>
                <a href="/auth/spotify/login" class="pure-button -green">Sign in with Spotify</a>
            </li>
            <li>
                <a href="/auth/google/login" class="pure-button -red">Sign in with Google</a>
            </li>
        </ul>
    </section>
{% endblock %}
