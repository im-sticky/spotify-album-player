const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

const config = require('../helpers/config');
const spotifyHelper = require('../helpers/spotify');

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotifyClientId,
  clientSecret: config.spotifyClientSecret,
});

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
}));
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

/**
 * Routes
 */

// get most recent
app.get('/spotify/listening', async(req, res, next) => {
  await spotifyHelper.refreshSpotifyAccess();

  spotifyApi.getMyRecentlyPlayedTracks({
    limit: 1,
  })
  .then(resp => {
    res.json({
      song: resp.body.items[0].track.name,
      artist: resp.body.items[0].track.artists[0].name,
      album: resp.body.items[0].track.album.name,
      albumUrl: resp.body.items[0].track.album.images[0].url,
      previewUrl: resp.body.items[0].track.preview_url,
    });
  })
  .catch(err => {
    console.error(err);
    res.json({
      success: false,
      message: err,
    });
  });
});