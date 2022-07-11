import React, { lazy } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import SearchSection from './styled';
import { Transition } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';
import { starProfessionsFormater } from '../../src/utils/dataToStringFormatter';
import Modal from '../Modal';
import withRouter from 'next/dist/client/with-router';
import PropTypes from 'prop-types'
import { algoliaGeneralSearch } from '../../src/services/algolia';
import Link from 'next/link'
import Loader from '../../components/Loader'
import ErrorHandler from '../../components/ErrorHandler'
import dynamic from 'next/dynamic'
import { withTranslation } from 'next-i18next';
import AddStarCategory from './components'
import { updateSearchTerm, withGeneral } from 'src/context/general';
// const AddStarCategory = dynamic(() =>
//   import ('./components').then((mod) => mod.AddStarCategory)
// )
class Search extends React.Component {
  constructor(props) {
    super(props);
    let searchText = '';
    if (this.props.router.pathname === '/') {
      searchText = this.props.filters?.searchParam || '';
    }
    this.state = {
      showSuggestions: false,
      profileDropdown: false,
      searchText,
      profilePhoto: null,
      suggestionTopOffset: null,
      showModal: false,
      suggestionList: {suggestions: null},
      suggestionLoading: false,
    };
    this.cursorPos = -1;
    this.searchInput = React.createRef();
    this.suggestionsFetchDelay = undefined;
    this.mounted = true;
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      const profilePhoto = this.props.userValue.settings_userDetails
        ?.avatarPhoto;
    }
  }

  componentDidMount() {
    this.props.router.prefetch('/search-update')
    if (this.searchInput && this.props.openWithFocus) {
      this.searchInput.current.focus()
    }
    window.addEventListener('mousedown', this.removeSuggestions);
    window.addEventListener('resize', this.onWindowResize);
    this.getTopOffset();
  }

  componentWillReceiveProps(nextProps) {
    // // const categoryChange =
    // //   this.props.filters.category.label !== nextProps.filters.category.label;
    // // if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
    // //   this.props.updateSearchParam('');
    // //   this.setState({ searchText: '' });
    // // }

    // // if (categoryChange) {
    // //   this.handleSearchItemClick();
    // // }

  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.removeSuggestions);
    window.removeEventListener('resize', this.onWindowResize);
    this.mounted = false;
  }

  onWindowResize = () => {
    if (
      document.body.getBoundingClientRect().width < 832 ||
      window.innerWidth < 832
    ) {
      this.getTopOffset();
    }
  };

  setListFocus = e => {
    const { showSuggestions } = this.state;
    const { cursorPos } = this;
    const { suggestions } = this.state.suggestionList;
    if (e.key === 'ArrowUp' && showSuggestions && cursorPos - 1 >= 0) {
      this.suggestionList.childNodes[cursorPos - 1].focus();
      this.cursorPos = cursorPos - 1;
    } else if (
      e.key === 'ArrowDown' &&
      showSuggestions &&
      cursorPos + 1 < suggestions.length
    ) {
      this.suggestionList.childNodes[cursorPos + 1].focus();
      this.cursorPos = cursorPos + 1;
    }
  };

  getTopOffset = () => {
    if (this.searchInput.current) {
      const bounding = this.searchInput.current.getBoundingClientRect();
      this.setState({ suggestionTopOffset: bounding.bottom });
    } else {
      this.setState({ suggestionTopOffset: null });
    }
  };

  fetchSuggestionList = async searchParam => {
    this.setState({suggestionLoading: true})
    try {

      const data = await algoliaGeneralSearch(searchParam, this.props.entityData);
      this.setState({suggestionLoading: false})
      this.setState({suggestionList: {suggestions: {...data}}})
    } catch (e){
      this.setState({suggestionLoading: false})
    }

  }

  handleSearchChange = e => {
    this.setState({ searchText: e.target.value });
    if (e.target.value.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
      if (this.suggestionsFetchDelay) {
        clearTimeout(this.suggestionsFetchDelay);
      }
      this.suggestionsFetchDelay = setTimeout(() => {
        this.fetchSuggestionList(this.state.searchText.trim(''));
      }, 500);
    } else {
      this.setState({ showSuggestions: false });
      this.cursorPos = -1;
    }
  };

  handleSearchSubmit = e => {
    if (e.keyCode === 13) {
      // this.props.updateSearchParam(e.target.value.trim(''));
      if (this.props.router.pathname != '/') {
        this.props.router.push('/');
      }
      this.setState({
        searchText: e.target.value.trim(''),
        showSuggestions: false,
      });
    }
    this.setListFocus(e);
  };

  showSuggestions = () => {
    if (this.state.searchText.trim('').length >= 3) {
      this.setState({ showSuggestions: true });
    }
  };

  removeSuggestions = e => {
    if (this.searchRef && !this.searchRef.contains(e.target)) {
      this.setState({ showSuggestions: false });
      this.cursorPos = -1;
    }
    if (
      this.searchRef.current &&
      !this.searchRef.current.contains(e.target)
    ) {
      this.searchInput.current.blur();
    }
    // if (
    //   this.profileDropDown &&
    //   !this.profileButton.contains(e.target) &&
    //   !this.profileDropDown.contains(e.target)
    // ) {
    //   this.setState({ profileDropdown: false });
    // }
  };

  deactivateSearch = () => {
    this.setState({
      searchText: '',
      showSuggestions: false,
    });
    this.cursorPos = -1;
    if (this.searchInput.current) {
      this.searchInput.current.focus();
    }
    this.fetchSuggestionList('');
  };

  handleSearchItemClick = () => {
    this.setState({
      searchText: '',
      showSuggestions: false,
    });
    this.cursorPos = -1;
  };

  handleSearchListClick = link => e => {
    if (e.keyCode === 13) {
      this.handleSearchItemClick();
      this.props.router.push(link);
    }
  };

  sendGAEvent = (event, term) => () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event,
        term,
      })
    }
  }

  categoryClick = profession => () => {
    if (profession.search_type === 'tag') {
      this.sendGAEvent('tag-search', profession.tag_name)();
      this.props.router.push(`/tag/${profession.tag_slug}`);
    } else {
      this.sendGAEvent('category-search', profession.title)();
      this.props.router.push(`/category/${profession.slug}`);
    }
    this.deactivateSearch();
  };

  checkToAdd = () => {
    const { suggestions } = this.state.suggestionList;
    const isProfession =
      suggestions &&
      suggestions.professions &&
      suggestions.professions.find(
        profession => profession.title === this.state.searchText,
      );
    const isStar =
      suggestions &&
      suggestions.stars &&
      suggestions.stars.find(
        star =>
          star.first_name === this.state.searchText ||
          star.nick_name === this.state.searchText,
      );
    if ((!isProfession || !isStar) && !this.state.suggestionLoading)
      return true;
    return false;
  };

  openModal = () => {
    if (this.props.openRef) {
      this.props.openRef.current = true;
    }
    this.setState({ showModal: true });
  };

  handleClose = () => {
    if (this.props.openRef) {
      this.props.openRef.current = false;
    }
    this.setState({ showModal: false });
  };

  getAddStarCategory = () => {
    updateSearchTerm(this.props.generalContext[1], this.state.searchText)
    if (
      document.body.getBoundingClientRect().width >= 832 ||
      window.innerWidth >= 832
    ) {
      return (
        <Modal
          open={this.state.showModal}
          onClose={this.handleClose}
          overrideProps={{ height: 'auto' }}
        >
          <ErrorHandler>
            <AddStarCategory
              open={this.state.showModal}
              handleClose={this.handleClose}
            />
          </ErrorHandler>
        </Modal>
      );
    }
    this.props.router.push('/search-update')
    return <React.Fragment/>
  };

  renderSuggestionsList = () => {
    const { suggestions } = this.state.suggestionList;
    if (
      suggestions &&
      (suggestions.professions.length ||
        suggestions.stars.length ||
        suggestions.tags.length)
    ) {
      return (
        <SearchSection.SuggestionList
          onKeyDown={this.setListFocus}
          ref={node => (this.suggestionList = node)}
        >
          {suggestions.professions.length > 0 && (
            <React.Fragment>
            <SearchSection.StarHeading>{this.props.t('common.categoriesCap')}</SearchSection.StarHeading>
              <SearchSection.CategoryList>
                {suggestions.professions.map(profession => (
                  <SearchSection.CategoryItem
                    isTag={false}
                    onClick={this.categoryClick(profession)}
                    key={profession.id}
                    darkMode={this.props.darkMode}
                  >
                    <span>{profession.title}</span>
                  </SearchSection.CategoryItem>
                ))}
              </SearchSection.CategoryList>
            </React.Fragment>
          )}

          {suggestions.tags.length > 0 && (
            <React.Fragment>
            <SearchSection.StarHeading>{this.props.t('common.tags')}</SearchSection.StarHeading>
              <SearchSection.CategoryList>
                {suggestions.tags.map(tag => (
                  <SearchSection.CategoryItem
                    isTag
                    onClick={this.categoryClick(tag)}
                    key={tag.tag_id}
                    darkMode={this.props.darkMode}
                  >
                    <span>{tag.tag_name}</span>
                  </SearchSection.CategoryItem>
                ))}
              </SearchSection.CategoryList>
            </React.Fragment>
          )}

          {suggestions.stars.length > 0 && (
            <React.Fragment>
              <SearchSection.StarHeading>Talent Plural</SearchSection.StarHeading>
              {suggestions.stars.map(item => {
                let fullName = '';
                if (item.nick_name || item.first_name || item.last_name) {
                  fullName = item.nick_name
                    ? item.nick_name
                    : `${item.first_name} ${item.last_name}`;
                }
                return (
                  <SearchSection.SuggestionListItem
                    darkMode={this.props.darkMode}
                    tabIndex="0"
                    key={item.user_id}
                    onKeyDown={this.handleSearchListClick(
                      item.has_group_account
                        ? `/group-profile/${item.user_id}`
                        : `/${item.vanity_id}`,
                    )}
                  >
                    <Link
                      href={
                        item.has_group_account
                          ? `/group-profile/${item.user_id}`
                          : `/${item.vanity_id}`
                      }
                      onClick={this.sendGAEvent('user-search', fullName)}
                      passHref
                    >
                      <SearchSection.SuggestionListContent
                        onClick={this.handleSearchItemClick}
                      >
                        <span>
                          <SearchSection.SuggestionListImage
                            imageUrl={item.thumbnail_url || item.image_url}
                          />
                        </span>
                        <SearchSection.SuggestionListName darkMode={this.props.darkMode}>
                          <SearchSection.SuggestionDetails darkMode={this.props.darkMode}>
                            {starProfessionsFormater(
                              JSON.parse(item.professions.replace(/'/g, '"')),
                              'search',
                            )}
                          </SearchSection.SuggestionDetails>
                          {fullName}
                        </SearchSection.SuggestionListName>
                      </SearchSection.SuggestionListContent>
                    </Link>
                  </SearchSection.SuggestionListItem>
                );
              })}
            </React.Fragment>
          )}
        </SearchSection.SuggestionList>
      );
    }
    return (
      <SearchSection.noDataWrapper>
        <SearchSection.noDataText>{this.props.t('common.noResults')}</SearchSection.noDataText>
      </SearchSection.noDataWrapper>
    );
  };

  animatedSearch = () => {
    const {props} = this;

    return (
      <Transition
      items={props.item}
      from={{ opacity: 0}}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      reverse={props.item}
      delay={200}
    >
      {(style, item) => item && (

        <SearchSection
          className={`search-root ${props.classes.root}`}
          style={style}
          ref={node => {
            this.searchRef = node;
          }}
        >
          <SearchSection.InputWrapper
            className={`input-root ${props.classes.inputRoot}`}
            alternate={this.props.alternate}
          >
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <SearchSection.Input
              ref={this.searchInput}
              placeholder={
                props.placeholder
                  ? props.placeholder
                  : this.props.t('common.searchDefaultPlaceholder', { talent: this.props.entityData.talent_plural_name })
              }
              id="search-term"
              value={this.state.searchText}
              onClick={this.showSuggestions}
              onChange={this.handleSearchChange}
              autoComplete="off"
              {...this.props.inputProps}
            />
            {this.state.searchText.length >= 3 ? (
              <SearchSection.ClearButton
                className={props.classes.clearBtn}
                onClick={this.deactivateSearch}
              />
            ) : null}
            {this.state.showSuggestions && this.renderSuggestions()}
            {this.state.showModal && this.getAddStarCategory()}
          </SearchSection.InputWrapper>
        </SearchSection>
        )}

    </Transition>
    )
  }

  renderSuggestions = () => {
    return (
      <SearchSection.SuggestionListWrapper
        className={`search-suggest-root ${this.props.classes.searchList}`}
        topOffset={this.state.suggestionTopOffset}
        darkMode={this.props.darkMode}
      >
        <SearchSection.AutoSuggest
          disableUserSuggest={this.props.disableUserSuggest}
          darkMode={this.props.darkMode}
        >
          <Scrollbars
            className="search-list-wrap"
            renderView={scrollProps => (
              <div {...scrollProps} className="search-list" />
            )}
          >
            {this.state.suggestionLoading ? (
              <Loader />
            ) : (
              this.renderSuggestionsList()
            )}
          </Scrollbars>

          {!this.props.disableUserSuggest && (
            <p
              className="search-lookup"
              onClick={this.openModal}
              role="presentation"
            >
              <span className="add-search-without-color">
                {this.props.t('common.searchSuggDescription', { talent: this.props.entityData?.talentSingle })}
              </span>
              <span className="add-search">
                {this.props.t('common.addSearch', { text: this.state.searchText })}
              </span>
            </p>
          )}
        </SearchSection.AutoSuggest>
      </SearchSection.SuggestionListWrapper>
    );
  };

  render() {
    const { props } = this;

    return props.transition ? this.animatedSearch() : (
      <SearchSection
        className={`search-root ${props.classes.root}`}
        ref={node => {
          this.searchRef = node;
        }}
      >
        <SearchSection.InputWrapper
          className={`input-root ${props.classes.inputRoot}`}
          alternate={this.props.alternate}
        >
          <FontAwesomeIcon icon={faSearch} className="search-icon" data-cy='header-v3-search' />
          <SearchSection.Input
            ref={this.searchInput}
            placeholder={
              props.placeholder
                ? props.placeholder
                : this.props.t('common.searchDefaultPlaceholder', { talent: this.props.entityData.talent_plural_name })
            }
            id="search-term"
            value={this.state.searchText}
            onClick={this.showSuggestions}
            onChange={this.handleSearchChange}
            autoComplete="off"
            {...this.props.inputProps}
          />
          {this.state.searchText.length >= 3 ? (
            <SearchSection.ClearButton
              className={props.classes.clearBtn}
              onClick={this.deactivateSearch}
            />
          ) : null}
          {this.state.showSuggestions && this.renderSuggestions()}
        </SearchSection.InputWrapper>
        {this.state.showModal && this.getAddStarCategory()}
      </SearchSection>
    );
  }
}


export default  withTranslation()(withRouter(withGeneral(Search)))

Search.defaultProps = {
  classes: {},
  alternate: false,
  disableUserSuggest: false,
  placeholder: undefined,
  inputProps: {},
  darkMode: false,
  transition: false,
  item: false,
  entityData: {}
};

Search.propTypes = {
  suggestionsList: PropTypes.object.isRequired,
  alternate: PropTypes.bool,
  inputProps: PropTypes.object,
  classes: PropTypes.object,
  disableUserSuggest: PropTypes.bool,
  placeholder: PropTypes.string,
  professionsList: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  darkMode: PropTypes.bool,
  transition: PropTypes.bool,
  item: PropTypes.bool,
  entityData: PropTypes.object,
};