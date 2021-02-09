import React, { useState } from 'react';
import _ from 'lodash';
import {
  Card,
  CardHeader,
  //CardMedia,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';
import {
  initiateGetUser,
  // initiateGetUsersTop,
  initiateGetCurrTrack,
} from '../actions/result';
import { connect } from 'react-redux';
import Current from './Current';

const Profile = props => {
  console.log(props);
  const { user, player } = props;
  const [getImage, setGetImage] = useState('');
  let media;

  // props.dispatch(initiateGetUser());
  // console.log(Object.keys(user).length);
  // media = user.images[0];
  if (_.isEmpty(user)) {
    console.log('wat');
    props.dispatch(initiateGetUser());
    props.dispatch(initiateGetCurrTrack());
  } else {
    user.items = {};
    // props.dispatch(initiateGetUsersTop('artists'));
    // props.dispatch(initiateGetUsersTop('tracks'));
    // (async () => {
    //   await props.dispatch(initiateGetCurrTrack());
    // })();
    console.log(user);
    media = user.images[0];
    media['height'] = 200;
    media['width'] = 200;
    if (getImage === '') {
      setGetImage(media.url);
    }
    console.log(player);
    console.log(media);
    return (
      <Card>
        <CardHeader avatar={<Avatar alt={media.url} srcSet={media.url} />}>
          <Typography variant="h5" component="h2">
            Lizard
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="h5" component="h2">
            {user.display_name}
          </Typography>
          {!_.isEmpty(player) && <Current player={player} />}
        </CardContent>
        <img alt="" src={media.url}></img>
        {getImage && <img alt="" src={getImage} width="320"></img>}
      </Card>
    );
  }
  return null;
  // (
  //   <React.Fragment>
  //     {!_.isEmpty(user) && (
  //       <Card>
  //         <CardHeader avatar={<Avatar alt={media.url} srcSet={media.url} />}>
  //           <Typography variant="h5" component="h2">
  //             Lizard
  //           </Typography>
  //         </CardHeader>
  //         <CardContent>
  //           <Typography variant="h5" component="h2">
  //             {user.display_name}
  //           </Typography>
  //         </CardContent>

  //         <img alt="" src={media.url}></img>
  //         <a href={media.url}>click</a>
  //       </Card>
  //     )}
  //   </React.Fragment>
  // );
};

const mapaStateToProps = state => {
  return {
    user: state.user,
    player: state.player,
  };
};

export default connect(mapaStateToProps)(Profile);
