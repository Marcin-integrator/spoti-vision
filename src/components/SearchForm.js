import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Button } from '@material-ui/core';

const SearchForm = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = ({ searchTerm }) => {
    //event.preventDefault();
    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Form
        onSubmit={handleSearch}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {errorMsg && <p className="errorMsg">{setErrorMsg}</p>}
            <Field
              type="search"
              name="searchTerm"
              value={searchTerm}
              component={TextField}
              placeholder="Search for stuff"
              onChange={handleInputChange}
            />

            <Button variant="contained" type="submit">
              Search
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default SearchForm;
