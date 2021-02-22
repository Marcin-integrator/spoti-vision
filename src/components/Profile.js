import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import {
  initiateGetCurrTrack,
  initiateGetUser,
  initiateGetUsersTop,
} from '../actions/result';
import { useStyles } from '../utils/styles';
import Current from './Current';
import Tops from './Tops';

const Profile = props => {
  const classes = useStyles();
  const { dispatch, player, user } = props;

  if (!_.isEmpty(player)) {
    const currTrack = () => {
      dispatch(initiateGetCurrTrack());
    };
    setTimeout(currTrack, player.timer);
  }

  useEffect(() => {
    dispatch(initiateGetUser());
    dispatch(initiateGetCurrTrack());
    dispatch(initiateGetUsersTop('artists'));
    dispatch(initiateGetUsersTop('tracks'));
  }, []);

  if (!_.isEmpty(user)) {
    const media = user.images[0];

    return (
      <Card className={classes.root}>
        <div className={classes.halfProfile}>
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
            <Typography variant="h5" component="h3">
              Currently playing:
            </Typography>
            <List>
              <ListItem>
                {!_.isEmpty(player) ? (
                  <Current player={player} />
                ) : (
                  <div id="empty-player">
                    <p>Nothing</p>
                  </div>
                )}
              </ListItem>
            </List>
          </CardContent>
        </div>
        <div className={classes.halfProfile}>
          <CardContent>
            {!_.isEmpty(user.artists) && <Tops tops={user.artists} />}
          </CardContent>
          <CardContent>
            {!_.isEmpty(user.tracks) && <Tops tops={user.tracks} />}
          </CardContent>
        </div>
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
