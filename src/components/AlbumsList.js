import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import music from '../images/music-icon.jpg';
import { put } from '../utils/api';

const AlbumsList = ({ albums }) => {
  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          <Grid container spacing={4}>
            {albums.items.map((album, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      style={{ width: '18rem' }}
                      onClick={() => put(album.uri)}
                    >
                      <a
                        target="_blank"
                        //href={album.external_urls.spotify}
                        rel="noopener noreferrer"
                        className="card-image-link"
                      >
                        {!_.isEmpty(album.images) ? (
                          <CardMedia
                            component="img"
                            image={album.images[0].url}
                            title=""
                          />
                        ) : (
                          <img src={music} alt="" />
                        )}
                      </a>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {album.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {album.artists.map(artist => artist.name).join(', ')}
                        </Typography>
                      </CardContent>
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
