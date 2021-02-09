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

const ArtistsList = ({ artists }) => {
  return (
    <React.Fragment>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          <Grid container spacing={4}>
            {artists.items.map((artist, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ width: '18rem' }}>
                      <a
                        target="_blank"
                        href={artist.external_urls.spotify}
                        rel="noopener noreferrer"
                        className="card-image-link"
                      >
                        {!_.isEmpty(artist.images) ? (
                          <CardMedia
                            component="img"
                            image={artist.images[0].url}
                            title=""
                          />
                        ) : (
                          <img src={music} alt="" />
                        )}
                      </a>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {artist.name}
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

export default ArtistsList;
