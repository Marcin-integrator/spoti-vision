import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
} from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';

import {
  initiateGetUser,
  initiateGetUsersTop,
  initiateGetCurrTrack,
} from '../actions/result';
import { useStyles } from '../utils/styles';
import Current from './Current';
import Tops from './Tops';

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
          {!_.isEmpty(user.artists) && <Tops tops={user.artists} />}
        </CardContent>
        <CardContent>
          {!_.isEmpty(user.tracks) && <Tops tops={user.tracks} />}
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
