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

const PlayList = ({ playlist }) => {
  return (
    <>
      {Object.keys(playlist).length > 0 && (
        <div className="palylist">
          <Grid className="list" justify="space-evenly" container spacing={4}>
            {playlist.items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ width: '18rem', margin: 'auto' }}>
                      <div className="card-image-link search-item">
                        <PlayCircleOutlineIcon className="play-icon" />

                        {!_.isEmpty(item.images) ? (
                          <CardMedia
                            className="search-image"
                            component="img"
                            image={item.images[0].url}
                            title={item.name}
                            onClick={() => put(item.uri)}
                          />
                        ) : (
                          <img
                            className="search-image"
                            src={music}
                            alt={item.name}
                            onClick={() => put(item.uri)}
                          />
                        )}
                      </div>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          By {item.owner.display_name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="primary"
                          href={item.external_urls.spotify}
                        >
                          Go to playlist page
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

export default PlayList;
