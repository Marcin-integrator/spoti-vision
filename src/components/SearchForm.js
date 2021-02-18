import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SearchForm = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

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
            {/* <Field
              type="search"
              name="searchTerm"
              value={searchTerm}
              component={TextField}
              placeholder="Search for stuff"
              onChange={handleInputChange}
            /> */}
            <div id="form">
              <Field name="searchTerm">
                {({ input }) => (
                  <div style={{ display: 'flex' }}>
                    <input
                      className="search-input"
                      {...input}
                      type="text"
                      placeholder="Search for stuff"
                    />
                  </div>
                )}
              </Field>
              <Button
                variant="contained"
                type="submit"
                // style={{ position: 'absolute', right: 0 }}
              >
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
