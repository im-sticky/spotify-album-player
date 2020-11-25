// refresh spotify oauth access token
async function refreshSpotifyAccess() {
  await spotifyApi.refreshAccessToken().then(data => {
    if (data.statusCode === 200) {
      spotifyApi.setAccessToken(data.body.access_token);
      spotifyApi.setRefreshToken(data.body.refresh_token);
    }
  });
}

module.exports = {
  refreshSpotifyAccess,
};