import React from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Button } from '@material-ui/core';

import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';
import PlayList from './PlayList';

const SearchResult = props => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory,
  } = props;
  const { albums, artists, playlist } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true,
          },
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="search-buttons">
        {!_.isEmpty(albums.items) && (
          <Button
            variant={`${
              selectedCategory === 'albums' ? 'contained' : 'outlined'
            }`}
            className="btn"
            color="primary"
            onClick={() => setCategory('albums')}
          >
            Albums
          </Button>
        )}
        {!_.isEmpty(artists.items) && (
          <Button
            variant={`${
              selectedCategory === 'artists' ? 'contained' : 'outlined'
            }`}
            className="btn"
            color="primary"
            onClick={() => setCategory('artists')}
          >
            Artists
          </Button>
        )}
        {!_.isEmpty(playlist.items) && (
          <Button
            variant={`${
              selectedCategory === 'playlist' ? 'contained' : 'outlined'
            }`}
            className="btn"
            color="primary"
            onClick={() => setCategory('playlist')}
          >
            Playlists
          </Button>
        )}
      </div>
      <div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
        {albums && <AlbumsList albums={albums} />}
      </div>
      <div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
        {artists && <ArtistsList artists={artists} />}
      </div>
      <div className={`${selectedCategory === 'playlist' ? '' : 'hide'}`}>
        {playlist && <PlayList playlist={playlist} />}
      </div>
      {!_.isEmpty(result[selectedCategory]) &&
        !_.isEmpty(result[selectedCategory].next) && (
          <div className="load-more" onClick={() => loadMore(selectedCategory)}>
            <Button variant="outlined" color="primary">
              Load More
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};

export default SearchResult;
