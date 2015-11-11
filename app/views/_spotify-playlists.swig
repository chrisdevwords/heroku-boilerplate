<section id="spotify-view" class="-left -bg-dark-gradient">
    {%  if data.spotify %}
    <header class="playlists__masthead -center" id="playlist-header">
        <h1 class="-headline -green">Your Spotify Playlists</h1>
        <p class="-white">Click a playlist to view tracks.</p>
    </header>
    <div class="main-inner">
        <div class="playlists"></div>
    </div>
    <footer class="spotify__footer">
        <a class="load-more load-bar -bg-green -hover-white">Load More Playlists</a>
        <p class="loading-text load-bar -bg-green">Loading Playlists...</p>
    </footer>
    {% else %}
        <header class="playlists__masthead -center" id="playlist-header">
            <h1 class="-headline -green">Have a Spotify Account?</h1>
            <p class="-white">Request tracks from your playlists.</p>
            <a href="/auth/spotify/login" class="pure-button -green">Login to Spotify</a>
        </header>
    {% endif %}
</section>
