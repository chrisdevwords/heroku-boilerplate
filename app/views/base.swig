{% extends "./boilerplate.swig" %}
{% block head_css %}
    {% parent %}
    <link rel="stylesheet" href="/build/styles/main.css">
{% endblock %}
{% block body_content %}
    {% parent %}
    <main class="main-content-wrapper">
        {% block content %}
        {% endblock %}
    </main>
{% endblock %}