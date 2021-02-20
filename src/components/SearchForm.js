import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SearchForm = props => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = ({ searchTerm }) => {
    if (searchTerm !== undefined) {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  return (
    <div
      style={{
        paddingTop: 16,
        paddingBottom: 64,
        margin: 'auto',
        maxWidth: 600,
      }}
    >
      <Form
        onSubmit={handleSearch}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '8px 0px', height: 48 }}>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            </div>
            <div id="form">
              <Field name="searchTerm">
                {({ input }) => (
                  <div style={{ display: 'flex', flexGrow: 1 }}>
                    <input
                      className="search-input"
                      {...input}
                      type="text"
                      placeholder="Search for stuff"
                    />
                  </div>
                )}
              </Field>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default SearchForm;
