import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DialogStyled } from './styled';

class Confirm extends Component {
  componentWillUnmount() {}
  onModalMount = () => {};
  preventBackdropScroll = event => {
    event.preventDefault();
  };

  render() {
    return (
      <DialogStyled
        autoHide
        disableBackdropClick
        open={this.props.open}
        onClose={this.props.onClose}
        onRendered={this.onModalMount}
        classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
        overrideProps={this.props.overrideProps}
      >
        {this.props.children}
      </DialogStyled>
    );
  }
}
Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  overrideProps: PropTypes.object,
};

Confirm.defaultProps = {
  overrideProps: {},
};

export default Confirm;
