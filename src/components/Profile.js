import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  Card,
  CardHeader,
  //CardMedia,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import {
  initiateGetUser,
  initiateGetUsersTop,
  initiateGetCurrTrack,
} from '../actions/result';
import { connect } from 'react-redux';
import Current from './Current';
// import { useTheme } from '@material-ui/core/styles';
import { useStyles } from '../utils/styles';

const Profile = props => {
  const classes = useStyles();
  // const theme = useTheme();
  const { user, player } = props;

  if (!_.isEmpty(player)) {
    const currTrack = () => {
      props.dispatch(initiateGetCurrTrack());
    };
    setTimeout(currTrack, player.timer);
  }

  useEffect(() => {
    props.dispatch(initiateGetUser());
    props.dispatch(initiateGetCurrTrack());
    props.dispatch(initiateGetUsersTop('artists'));
    props.dispatch(initiateGetUsersTop('tracks'));
  }, []);

  if (!_.isEmpty(user)) {
    const media = user.images[0];

    return (
      <Card className={classes.root}>
        <CardHeader
          className={classes.details}
          avatar={<Avatar src={media.url} className={classes.large} />}
          title={
            <Typography className={classes.title} variant="h5" component="h3">
              {user.display_name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary" component="p">
              Country: {user.country}
              <br />
              Followers: {user.followers.total}
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          {!_.isEmpty(player) && (
            <div className="profile">
              <Typography variant="h5" component="h3">
                Currently playing:
              </Typography>
              <List>
                <ListItem>
                  <Current player={player} />
                </ListItem>
              </List>
            </div>
          )}
        </CardContent>
        <CardContent>
          {!_.isEmpty(user.artists) && (
            <div className="profile">
              <Typography variant="h5" component="h3">
                My top artists:
              </Typography>
              <List>
                {user.artists.map((artist, index) => {
                  return (
                    <ListItem key={artist.id}>
                      <Typography
                        className={classes.numbers}
                        variant="body1"
                        component="p"
                      >
                        {index + 1}
                      </Typography>

                      <ListItemAvatar>
                        <Avatar src={artist.images[2].url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={artist.name}
                        secondary={`Followers: ${artist.followers.total}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
        </CardContent>
        <CardContent>
          {!_.isEmpty(user.tracks) && (
            <div className="profile">
              <Typography variant="h5" component="h3">
                My top tracks:
              </Typography>
              <List>
                {user.tracks.map((track, index) => {
                  return (
                    <ListItem key={track.id}>
                      <Typography
                        className={classes.numbers}
                        variant="body1"
                        component="p"
                      >
                        {index + 1}
                      </Typography>

                      <ListItemAvatar>
                        <Avatar src={track.album.images[2].url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={track.name}
                        secondary={track.artists[0].name}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  return null;
};

const mapaStateToProps = state => {
  return {
    user: state.user,
    player: state.player,
  };
};

export default connect(mapaStateToProps)(Profile);
