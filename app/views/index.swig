{% extends "./boilerplate.swig" %}

{% block head_css %}
    {% parent %}
    <link rel="stylesheet" href="/build/styles/main.css">
{% endblock %}
{% block body_content %}
    {% parent %}
    <main class="main-content-wrapper">
        <header class="hero-container">
            <h1>My Site</h1>
            {% include 'nav.swig' with nav %}
        </header>
        <section class="main-content" id="mainContent">
        </section>
    </main>
{% endblock %}

{% block body_js %}
    <script src="/build/js/main.js"></script>
{% endblock %}