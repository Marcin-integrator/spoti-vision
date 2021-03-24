import React from 'react';
import _ from 'lodash';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import music from '../images/music-icon.jpg';
import { put } from '../utils/api';

const ArtistsList = ({ artists }) => {
  return (
    <>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          <Grid className="list" justify="space-evenly" container spacing={4}>
            {artists.items.map((artist, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ width: '18rem', margin: 'auto' }}>
                      <div className="card-image-link search-item">
                        <PlayCircleOutlineIcon className="play-icon" />

                        {!_.isEmpty(artist.images) ? (
                          <CardMedia
                            className="search-image"
                            component="img"
                            image={artist.images[0].url}
                            title={artist.name}
                            onClick={() => put(artist.uri)}
                          />
                        ) : (
                          <img
                            className="search-image"
                            src={music}
                            alt={artist.name}
                            onClick={() => put(artist.uri)}
                          />
                        )}
                      </div>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {artist.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          href={artist.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to artist page
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
};

export default ArtistsList;
