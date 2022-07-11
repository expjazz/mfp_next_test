import React, { useEffect, useRef } from 'react'
import { DialogStyled } from './styled';
import PropTypes from 'prop-types'

function Modal(props) {
  // const scrollTop = useRef(0);
  // useEffect(() => {
  //   document.body.style.position = 'initital';
  //   if (scrollTop.current) {
  //     document.body.style.position = 'fixed';
  //   } 
  // })
  // const onModalMount = () => {
  //   if (window !== undefined && window.pageYOffset) {
  //     this.scrollTop = window.pageYOffset;
  //     document.body.style.position = 'fixed';
  //   }
  // };
  return (
    <DialogStyled
      autoHide
      disableBackdropClick={props.disableBackdropClick || true}
      open={props.open}
      onClose={props.onClose}
      // onRendered={onModalMount}
      classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      overrideProps={props.overrideProps}
    >
      {props.children}
    </DialogStyled>
  )
}

export default Modal

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  overrideProps: PropTypes.object,
  disableBackdropClick: PropTypes.bool,
};

Modal.defaultProps = {
  overrideProps: {},
  disableBackdropClick: true,
};