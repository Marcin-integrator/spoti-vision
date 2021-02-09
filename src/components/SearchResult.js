import React from 'react';
import _ from 'lodash';
import ArtistsList from './ArtistsList';
import AlbumsList from './AlbumsList';
import PlayList from './PlayList';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
            className={`${
              selectedCategory === 'albums' ? 'btm active' : 'btn'
            }`}
            onClick={() => setCategory('albums')}
          >
            Albums
          </Button>
        )}
        {!_.isEmpty(artists.items) && (
          <Button
            className={`${
              selectedCategory === 'artists' ? 'btm active' : 'btn'
            }`}
            onClick={() => setCategory('artists')}
          >
            Artists
          </Button>
        )}
        {!_.isEmpty(playlist.items) && (
          <Button
            className={`${
              selectedCategory === 'playlist' ? 'btm active' : 'btn'
            }`}
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
            <Button variant="text" type="button">
              Load More
            </Button>
          </div>
        )}
    </React.Fragment>
  );
};

export default SearchResult;
