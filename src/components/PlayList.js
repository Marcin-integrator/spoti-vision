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

const PlayList = ({ playlist }) => {
  return (
    <React.Fragment>
      {Object.keys(playlist).length > 0 && (
        <div className="palylist">
          <Grid container spacing={4}>
            {playlist.items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      style={{ width: '18rem' }}
                      onClick={() => put(item.uri)}
                    >
                      <a
                        target="_blank"
                        // href={item.external_urls.spotify}
                        rel="noopener noreferrer"
                        className="card-image-link"
                      >
                        {!_.isEmpty(item.images) ? (
                          <CardMedia
                            component="img"
                            image={item.images[0].url}
                            title=""
                          />
                        ) : (
                          <img src={music} alt="" />
                        )}
                      </a>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          By {item.owner.display_name}
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

export default PlayList;
