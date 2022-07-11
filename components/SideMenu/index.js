/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
// import { cloneDeep } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
// import { withRouter, Link } from 'react-router-dom';
import { Description } from 'styles/TextStyled';
import { NotificationCount } from 'styles/CommonStyled';
import { Layout, Ul, Li, LinkWrapper, LinkStyles } from './styled';
import { cloneDeep } from 'src/utils/dataStructures';
import { useRouter } from 'next/router';

const MenuList = props => {
  const [menuList, setMenuList] = useState(props.links);
  const { shallow } = props
  const router = useRouter()
  const listHandler = (link, list) => {
    return list.map(item => {
      const tLink = { ...item };
      if (link.key === item.key) {
        tLink.active = !item.active;
        return tLink;
      }
      if (item.subMenu) {
        return { ...tLink, subMenu: listHandler(link, item.subMenu) };
      } else if (!props.mOpen) {
        tLink.active = false;
      }
      return tLink;
    });
  };

  const menuClick = link => event => {
    if (link.onClick) link.onClick();
    event.preventDefault();
    event.stopPropagation();
    const temp = listHandler(link, menuList);
    setMenuList(temp);
  };

  useEffect(() => {
    const activeLink = menuList.find(link => link.active);
    let temp = cloneDeep(props.links);
    if (activeLink) {
      temp = temp.map(link => {
        if (link.key === activeLink.key) {
          return { ...link, active: activeLink.active };
        }
        return link;
      });
      setMenuList(temp);
    } else {
      setMenuList(props.links);
    }
  }, [props.change]);

  const getMenu = (list, sub, classNM = 'hidden') => {
    return (
      <Ul className={classNM}>
        {list.map(link => {
          return (
            <Li
              key={link.key}
              selected={
                link.url === props.origin
                  ? router.asPath === link.url
                  : router.asPath.includes(link.url)
              }
              onClick={
                (link.subMenu && menuClick(link)) ||
                (link.onClick && link.onClick)
              }
              className={
                link.active || router.asPath.includes(link.sel_url)
                  ? 'wrapper-li'
                  : 'normal-li'
              }
              maxHeight={link.maxHeight}
            >
              <LinkWrapper
                className={`link-wrap ${link.sel_url ? 'sub-link-wrp' : ''}`}
              >
                {link.icon && (
                  <FontAwesomeIcon icon={link.icon} className="menu-icon" />
                )}
                {link.url ? (
                  <Link
                    // className="link-item flex-item"
                    href={link.url}
                    shallow={shallow}
                    onClick={!link.subMenu && props.onClose}
                    passHref
                  >
                    <LinkStyles
                      className="link-item flex-item"
                      onClick={!link.subMenu && props.onClose}

                    >
                      {link.linkName}
                      {link.reqCount > 0 && (
                        <NotificationCount
                          className={`count ${link.selectedName} ${
                            sub ? 'sub-count' : ''
                          }`}
                        >
                          {link.reqCount}
                        </NotificationCount>
                      )}
                      {link.arrow && (
                        <FontAwesomeIcon
                          className="right"
                          icon={faChevronRight}
                        />
                      )}
                    </LinkStyles>
                  </Link>
                ) : (
                  <span className="d-link flex-item">
                    {link.linkName}
                    {link.reqCount > 0 && (
                      <NotificationCount className="count">
                        {link.reqCount}
                      </NotificationCount>
                    )}
                    {link.arrow && (
                      <FontAwesomeIcon
                        className="right"
                        icon={faChevronRight}
                      />
                    )}
                  </span>
                )}
              </LinkWrapper>
              {link.subMenu &&
                getMenu(
                  link.subMenu,
                  true,
                  link.active || router.asPath.includes(link.sel_url)
                    ? 'active sub-menu'
                    : 'hidden sub-menu',
                )}
            </Li>
          );
        })}
      </Ul>
    );
  };

  return (
    <Layout className={props.classNames.root}>
      {props.noteText && (
        <Description className="menu-desc">{props.noteText}</Description>
      )}
      {menuList && menuList.length > 0 && getMenu(menuList)}
    </Layout>
  );
};

MenuList.propTypes = {
  location: PropTypes.object.isRequired,
  classNames: PropTypes.object,
  links: PropTypes.array,
  mOpen: PropTypes.bool,
  noteText: PropTypes.string,
  onClose: PropTypes.func,
  change: PropTypes.string,
  origin: PropTypes.string,
  shallow: PropTypes.bool,
};
MenuList.defaultProps = {
  classNames: {},
  links: [],
  onClose: () => {},
  mOpen: false,
  noteText: '',
  change: '',
  origin: '',
  shallow: false
};

export default MenuList
