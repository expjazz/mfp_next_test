import React from 'react';
import PropTypes from 'prop-types';
import { EmptyText } from '../../styles/CommonStyled'
import styled from '@emotion/styled';

export const HorizontalLazy = (WrappedComponent) => {

  const ListStyled = styled.section`
    position: relative;
    display: flex;
    .loader {
      position: static;
      z-index: initial;
      background: transparent;
      opacity: initial;
      height: inherit;
    }
  `;

  const NoDataText = styled(EmptyText)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasMore: true,
      };
    }
    componentWillMount() {
      const endOfList = this.props.dataList && this.props.dataList.length !== 0 && this.props.dataList.length >= this.props.totalCount;
      if ((!this.props.loading && endOfList) || this.props.finite) {
        this.setState({ hasMore: false });
      }
    }
  
    componentDidMount() {
      if (this.props.scrollTarget) {
        const scrollEle = document.getElementById(this.props.scrollTarget);
        scrollEle.onscroll = (event) => this.listenScroll(event.target);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.finite) {
        const endOfList = nextProps.dataList.length !== 0 && nextProps.dataList.length >= nextProps.totalCount;
        if (endOfList) {
          this.setState({ hasMore: false });
        } else {
          this.setState({ hasMore: true });
        }
      }
    }
  
    listenScroll = (scrollEvent) => {
      if (!this.props.loading && this.state.hasMore && scrollEvent.scrollLeft + scrollEvent.offsetWidth >= (scrollEvent.scrollWidth / 2)) {
        this.fetchMoreData();
      }
    }

    fetchMoreData = () => {
      if (this.props.dataList.length >= this.props.totalCount) {
        this.setState({ hasMore: false });
        return;
      }
      if (!this.props.loading) {
        this.props.fetchData(this.props.offset + this.props.limit, false);
      }
    }

    infiniteScrollList = () => {
      return (
          <React.Fragment>
            <WrappedComponent {...this.props} />
            { this.props.loading && this.renderLoader() }
          </React.Fragment>
      );
    }

    renderLoader = () => {
      if (!this.props.customLoader && this.props.loading) {
        return <h1>Loading</h1>
      }
      return null
    }

    renderNoDataText = () => {
      if (!this.props.loading) {
        return <NoDataText>{this.props.noDataText}</NoDataText>
      }
      return null;
    }

    renderList = () => {
      if (this.props.noScroll) {
        return <WrappedComponent {...this.props} />;
      } else if (this.props.scrollTarget) {
        return this.infiniteScrollList(this.props.scrollTarget)
      }
      return (
        this.infiniteScrollList(null)
      );
    }

    render() {
      return (
        <ListStyled
          scrollTarget={this.props.scrollTarget}
          className='scroll-container'
          loading={this.props.loading}
          notCenter={this.props.notCenter}
          customLoader={this.props.customLoader}
        >
          {
            !this.props.dataList.length && this.props.loading && !this.props.customLoader ?
              this.renderLoader()
            :
              this.renderList()
          }
        </ListStyled>
      );
    }
  };
};

HorizontalLazy.defaultProps = {
  dataList: [],
  customLoader: false,
};

HorizontalLazy.propsTypes = {
  dataList: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  customLoader: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
