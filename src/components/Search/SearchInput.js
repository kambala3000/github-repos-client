import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

// store
import { fetchRepos } from '../../store/Search/actions';

class SearchInput extends Component {
  static propTypes = {
    fetchRepos: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { location, fetchRepos } = this.props;
    const { search } = location;
    if (search) {
      const searchQuery = search.slice(3);
      fetchRepos(searchQuery);
    }
  }

  handleSearch = e => {
    const { history } = this.props;
    const inputValue = e.target.value.trim();

    if (inputValue) {
      history.push({ search: `?q=${inputValue}` });
      this.searchDebounce(inputValue);
    } else {
      history.push({ search: '' });
    }
  };

  searchDebounce = debounce(async searchQuery => {
    this.props.fetchRepos(searchQuery);
  }, 400);

  render() {
    const { search } = this.props.location;
    const defaultValue = search ? search.slice(3) : '';

    return (
      <SCSearchWrap>
        <Input.Search
          defaultValue={defaultValue}
          placeholder="Search repositories..."
          onChange={this.handleSearch}
          enterButton
        />
      </SCSearchWrap>
    );
  }
}

const SCSearchWrap = styled.div`
  width: 400px;
`;

export default withRouter(connect(null, { fetchRepos })(SearchInput));
