import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { sessionExpired } from '../utils/functions';

const Dashboard = props => {
  const {
    albums,
    artists,
    dispatch,
    history,
    isValidSession,
    location,
    playlist,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');

  const handleSearch = searchTerm => {
    if (isValidSession()) {
      setIsLoading(true);
      dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      sessionExpired(history, location.pathname);
    }
  };

  const loadMore = async type => {
    if (isValidSession()) {
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
      sessionExpired(history, location.pathname);
    }
  };

  const setCategory = category => {
    setSelectedCategory(category);
  };

  const result = { albums, artists, playlist };

  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <SearchForm handleSearch={handleSearch} />
        <Profile {...props} />
        <Loader show={isLoading}>Loading...</Loader>
        <SearchResult
          result={result}
          loadMore={loadMore}
          setCategory={setCategory}
          selectedCategory={selectedCategory}
          isValidSession={isValidSession}
        />
      </Container>
    </>
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
