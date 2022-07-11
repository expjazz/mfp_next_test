import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';

import Tooltip from '../ToolTip';
// import { logOutUser } from '../../store/shared/actions/login';
import { SidebarStyled, Note } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const InnerSidebar = props => {
  const { data: userData } = useFetchLoggedUser()
  const router = useRouter()
  const pathname = router.asPath
  const linkClick = link => () => {
    router.push(link, undefined, { shallow: true });
  };
  const renderLinkItem = link => {
    if (link.tooltip) {
      return (
        <Tooltip title={link.tooltip} key={link.selectedName}>
          <SidebarStyled.LinkItem
            selected={link.url === pathname}
            className="menu-li"
            completed={link.completed}
            onClick={linkClick(link.url)}
          >
            {props.normalTick ? (
              <span className="tick-circle" />
            ) : (
              <FontAwesomeIcon
                className="tick-circle-icon"
                icon={faCheckCircle}
              />
            )}

            <span className="link-item" to={link.url}>
              {link.linkName}
            </span>
            {props.arrow && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="innerLink-arrow"
              />
            )}
          </SidebarStyled.LinkItem>
        </Tooltip>
      );
    }
    return (
      <SidebarStyled.LinkItem
        key={link.selectedName}
        selected={link.url === pathname}
        className="menu-li"
        completed={link.completed}
        onClick={linkClick(link.url)}
      >
        {props.normalTick ? (
          <span className="tick-circle" />
        ) : (
          <FontAwesomeIcon className="tick-circle-icon" icon={faCheckCircle} />
        )}
        <span className="link-item" to={link.url}>
          {link.linkName}
        </span>
        {props.arrow && (
          <FontAwesomeIcon icon={faChevronRight} className="innerLink-arrow" />
        )}
      </SidebarStyled.LinkItem>
    );
  };

  return (
    <SidebarStyled className="sub-menu-wrap">
      {props.noteText && <Note>{props.noteText}</Note>}
      <SidebarStyled.LinkList className="menu-ul">
        {props.links.map(link => renderLinkItem(link))}
        {props.customChild && props.customChild()}
      </SidebarStyled.LinkList>
    </SidebarStyled>
  );
};

InnerSidebar.propTypes = {
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  arrow: PropTypes.bool,
  normalTick: PropTypes.bool,
  noteText: PropTypes.string,
  customChild: PropTypes.func,
};
InnerSidebar.defaultProps = {
  arrow: false,
  normalTick: false,
  noteText: '',
  customChild: null,
};

// const mapDispatchToProps = dispatch => ({
//   logOut: () => dispatch(logOutUser()),
// });

// const mapStateToProps = state => ({
//   userDetails: state.userDetails.settings_userDetails,
//   celebDetails: state.userDetails.settings_celebrityDetails,
// });

export default InnerSidebar
