<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    {% block meta %}
    {% include 'meta.swig' with meta %}
    {% endblock %}
    {% block head_css %}
    <link rel="stylesheet" href="/normalize-css/normalize.css">
    {% endblock %}
    {% block head_js %}
    <script type="text/javascript" src="/modernizr/modernizr.js"></script>
    {% endblock %}
</head>
<body>
    {% block body_content %}
    <!--[if lt IE 8]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    {% endblock %}
    {% block body_js %}
    {% endblock %}
</body>
</html>