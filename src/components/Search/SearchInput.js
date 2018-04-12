import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

// components
import LangSelect from './LangSelect';

// store
import { fetchRepos } from '../../store/Search/actions';

// constants
import { SEARCH_DEBOUNCE_DELAY } from '../../utils/constants';

class SearchInput extends Component {
  static propTypes = {
    fetchRepos: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { fetchRepos } = this.props;
    const { term, lang } = this.parseQueryParams();
    if (term) {
      const searchQuery = this.prepareSearchQuery(term, lang);
      fetchRepos(searchQuery);
    }
  }

  parseQueryParams = () => {
    const { search } = this.props.location;
    if (search) {
      const searchParams = {};
      const query = new URLSearchParams(search);

      for (let param of query.entries()) {
        searchParams[param[0]] = param[1];
      }

      return searchParams;
    }

    return {};
  };

  setQueryParams = paramsObj => {
    const { history, location } = this.props;
    const queryParams = [];

    for (let param in paramsObj) {
      if (paramsObj[param]) {
        const queryItem = `${encodeURIComponent(param)}=${encodeURIComponent(
          paramsObj[param]
        )}`;
        queryParams.push(queryItem);
      }
    }

    const newParams = queryParams.join('&');
    const oldParams = location.search.slice(1);

    if (newParams !== oldParams) {
      history.push({
        search: newParams
      });
    }
  };

  prepareSearchQuery = (term, lang) => {
    if (lang) {
      return `${term}+language:${lang}`;
    }

    return term;
  };

  handleSelect = lang => {
    const { fetchRepos } = this.props;
    const { term, lang: oldLang } = this.parseQueryParams();
    this.setQueryParams({ term, lang });

    if (term && lang !== oldLang) {
      const searchQuery = this.prepareSearchQuery(term, lang);
      fetchRepos(searchQuery);
    }
  };

  handleSearch = e => {
    const term = e.target.value.trim();
    const { term: oldTerm, lang } = this.parseQueryParams();
    this.setQueryParams({ term, lang });

    if (term && term !== oldTerm) {
      const searchQuery = this.prepareSearchQuery(term, lang);
      this.searchDebounce(searchQuery);
    }
  };

  searchDebounce = debounce(async searchQuery => {
    this.props.fetchRepos(searchQuery);
  }, SEARCH_DEBOUNCE_DELAY);

  render() {
    const { term, lang } = this.parseQueryParams();

    return (
      <SCFieldsWrap>
        <LangSelect defaultValue={lang} onSelect={this.handleSelect} />
        <SCSearchWrap>
          <Input.Search
            defaultValue={term}
            placeholder="Search repositories..."
            onChange={this.handleSearch}
          />
        </SCSearchWrap>
      </SCFieldsWrap>
    );
  }
}

const SCFieldsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-height: 32px;
`;

const SCSearchWrap = styled.div`
  width: 400px;
`;

export default withRouter(connect(null, { fetchRepos })(SearchInput));
