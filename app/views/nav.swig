<nav class="nav" id="nav">
    <ul class="nav-items">
    {% for item in nav.items %}
    <li class="nav-item">
        <a href="{{ item.href }}" target="{{ item.target|default('_self') }}" title="{{ item.title }}">{{ item.title }}</a>
    </li>
    {% endfor %}
    </ul>
</nav>