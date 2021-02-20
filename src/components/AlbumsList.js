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

const AlbumsList = ({ albums }) => {
  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          <Grid className="list" justify="space-evenly" container spacing={4}>
            {albums.items.map((album, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ width: '18rem', margin: 'auto' }}>
                      <div className="card-image-link search-item">
                        <PlayCircleOutlineIcon className="play-icon" />

                        {!_.isEmpty(album.images) ? (
                          <CardMedia
                            className="search-image"
                            component="img"
                            image={album.images[0].url}
                            title={album.name}
                            onClick={() => put(album.uri)}
                          />
                        ) : (
                          <img
                            className="search-image"
                            src={music}
                            alt={album.name}
                            onClick={() => put(album.uri)}
                          />
                        )}
                      </div>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {album.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {album.artists.map(artist => artist.name).join(', ')}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          href={album.external_urls.spotify}
                        >
                          Go to album page
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
    </React.Fragment>
  );
};

export default AlbumsList;
