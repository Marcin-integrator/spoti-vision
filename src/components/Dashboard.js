import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Header from './Header';
import Loader from './Loader';
import Profile from './Profile';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMoreArtists,
  initiateLoadMorePlaylist,
} from '../actions/result';

const Dashboard = props => {
  const { isValidSession, history, location } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');

  const handleSearch = searchTerm => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true,
          whereTo: location.pathname,
        },
      });
    }
  };

  const loadMore = async type => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true,
          whereTo: location.pathname,
        },
      });
    }
  };

  const setCategory = category => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  return (
    <React.Fragment>
      <Container maxWidth={'xl'}>
        {isValidSession() ? (
          <div>
            <Header />
            <SearchForm handleSearch={handleSearch} />
            <Profile />
            <Loader show={isLoading}>Loading...</Loader>
            <SearchResult
              result={result}
              loadMore={loadMore}
              setCategory={setCategory}
              selectedCategory={selectedCategory}
              isValidSession={isValidSession}
            />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                session_expired: true,
                whereTo: location.pathname,
              },
            }}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

const mapaStateToProps = state => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist,
  };
};

export default connect(mapaStateToProps)(Dashboard);
