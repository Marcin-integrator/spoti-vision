# Spotify super awesome visualizer

Log into spotify and display some visuals to your current track(based on its album cover).

## If you want to run it

1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Add your keys to .env.test file
```
   REACT_APP_CLIENT_ID=Client_ID
   REACT_APP_AUTHORIZE_URL=https://accounts.spotify.com/authorize
   REACT_APP_REDIRECT_URL=http://localhost:3000/redirect
   REACT_APP_IMAGGA_KEY=API_key
   REACT_APP_IMAGGA_SECRET=API_Secret
   REACT_APP_IMAGGA_BASIC=Authorization
```
For Client ID register at:
https://developer.spotify.com/dashboard/

And for imagga stuff visit:
https://imagga.com/auth/signup

## Base for the project

I started writing this thing based on this search app:
https://github.com/myogeshchavan97/spotify-music-search-app
Then I implemented Profile card and another page just for visualization.
The image recognition API shoud analize the cover and adjust the colours.

## Next steps and challenges

-get more details about a current track(tempo, mood) which will allow to create more diverse visuals
-player bar at the bottom of the page
-make more thing clickable(like top artists and stuff...)

## Main dependencies, libraries, frameworks

-Redux(kinda must-have)  
\_Lodash(highly useful)  
-Material-UI(just to try it)  
-Final-Form  
-Axios

## APIs:

-Spotify Web API  
-Imagga API

## License:

MIT
