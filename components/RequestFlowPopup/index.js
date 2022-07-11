import React from 'react';
import PropTypes from 'prop-types';
import { times, random } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
// import { isIOSDevice } from 'src/utils/checkOS';
import PopupStyled from './styled';
import { isIOSDevice } from '../../src/utils/checkOS';

// const isIOSDevice = () => true

class RequestFlowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
    this.popupContent = React.createRef();
    this.popupWrapper = null;
    this.scrollTop = 0;
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.body.style.position = 'initial';
    if (this.scrollTop && isIOSDevice()) {
      window.scrollTo(0, this.scrollTop);
    }
    window.removeEventListener('resize', this.handleResize);
  }

  onModalMount = () => {
    if (window.pageYOffset && isIOSDevice()) {
      this.scrollTop = window.pageYOffset;
      document.body.style.position = 'fixed';
    }
    if (this.props.setScrollRef) {
      this.props.setScrollRef(this.popupContent.current);
    }
    if (this.props.onMounted) {
      this.props.onMounted();
    }
  };

  handleResize = () => {
    const { fullScreen } = this.state;
    if (fullScreen && document.body.getBoundingClientRect().width >= 834) {
      this.setState({ fullScreen: false });
    } else if (
      !fullScreen &&
      document.body.getBoundingClientRect().width < 834
    ) {
      this.setState({ fullScreen: true });
    }
  };

  renderPopup = () => {
    return (
      <PopupStyled.Dialog
        fullScreen={this.state.fullScreen}
        open
        disableBackdropClick={this.props.modalView}
        PaperProps={this.props.paperProps}
        classes={{ paper: 'paper-root' }}
        onRendered={this.onModalMount}
        onClose={this.props.closePopUp}
        aria-labelledby="responsive-dialog-title"
      >
        <PopupStyled.SmallContainer
          className={`${this.props.classes.root} ${this.props.classes.sub} modal-root`}
          noPadding={this.props.noPadding}
          largePopup={this.props.largePopup}
          autoWidth={this.props.autoWidth}
          ref={this.popupContent}
        >
          <PopupStyled.SmallContent>
            {this.props.children}
          </PopupStyled.SmallContent>
          {!this.props.disableClose && (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={this.props.closePopUp}
              className={`profile-close ${this.props.closeClass}`}
              id="id_close"
            />
          )}
        </PopupStyled.SmallContainer>
      </PopupStyled.Dialog>
    );
  };

  render() {
    return this.renderPopup();
  }
}

RequestFlowPopup.defaultProps = {
  classes: {},
  modalView: false,
};

RequestFlowPopup.propTypes = {
  classes: PropTypes.object,
  modalView: PropTypes.bool,
};

export default RequestFlowPopup;
