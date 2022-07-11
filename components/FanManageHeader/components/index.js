import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuList from 'components/SideMenu';
import { Wrap } from './styled';

function MobDrawer({ links, onClose, origin }) {
  let scrollTop = 0;
  const onModalMount = () => {
    scrollTop = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.transform = 'translate3d(0, 0, 0)';
  };

  useEffect(() => {
    return () => {
      document.body.style.position = 'initial';
      document.body.style.transform = 'inherit';
      if (scrollTop) {
        window.scrollTo(0, scrollTop);
      }
    };
  }, []);

  return (
    <Wrap
      anchor="left"
      open
      onClose={onClose}
      onRendered={onModalMount}
      classes={{
        paper: 'drawer-paper',
        root: 'drawer-root',
      }}
      BackdropProps={{ classes: { root: 'back-drop' } }}
    >
      <MenuList
        links={links}
        classNames={{ root: 'menu-layout' }}
        onClose={onClose}
        origin={origin}
        shallow
      />
    </Wrap>
  );
}

MobDrawer.propTypes = {
  links: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  origin: PropTypes.string,
};

MobDrawer.defaultProps = {
  origin: '',
};

export default MobDrawer;
