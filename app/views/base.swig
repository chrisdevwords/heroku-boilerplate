{% extends "./boilerplate.swig" %}
{% block head_css %}
    {% parent %}
    <link href='https://fonts.googleapis.com/css?family=Armata' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/build/styles/main.css">
{% endblock %}
{% block body_content %}
    {% parent %}
    <main class="main-content-wrapper">
        {% block content %}
        {% endblock %}
    </main>
{% endblock %}