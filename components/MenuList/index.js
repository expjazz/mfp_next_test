/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { Description } from 'styles/TextStyled';
import { NotificationCount } from 'styles/CommonStyled';
import { Layout, Ul, Li } from './styled';
import { useRouter } from 'next/router';
import { cloneDeep } from 'src/utils/dataStructures';

const MenuList = props => {
  const router = useRouter()
  const [menuList, setMenuList] = useState(props.links);

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
  }, [props.change, JSON.stringify(props.services)]);

  const getMenu = (list, classNM = 'hidden', sub) => {
    return (
      <Ul className={classNM}>
        {list.map(link => {
          const checkURL = link.isQuery
            ? `${router.asPath}${router.query.search}`
            : router.asPath;
          return (
            <Li
              key={link.key}
              selected={link.url === checkURL}
              onClick={link.subMenu && menuClick(link)}
              className={
                link.active || router.asPath.includes(link.sel_url)
                  ? 'wrapper-li'
                  : 'normal-li'
              }
              maxHeight={link.maxHeight}
              completed={link.completed}
            >
              <span className="link-wrapper">
                {link.icon && (
                  <FontAwesomeIcon icon={link.icon} className="menu-icon" />
                )}
                {props.tick && !sub && <span className="tick-circle" />}
                {link.url ? (
                  <Link className="link-item flex-item" href={link.url} shallow={props.shallow}>
                    <a className="link-item flex-item">
                      {link.linkName}
                      <span className="count-wrp">
                        {link.reqCount > 0 && (
                          <NotificationCount
                            className={`count ${sub ? 'sub-count' : ''}`}
                          >
                            {link.reqCount}
                          </NotificationCount>
                        )}
                        <FontAwesomeIcon
                          className="right"
                          icon={faChevronRight}
                        />
                      </span>
                    </a>
                  </Link>
                ) : (
                  <span className="d-link flex-item">
                    {link.linkName}
                    <span className="count-wrp">
                      {link.reqCount > 0 && (
                        <NotificationCount
                          className={`count ${sub ? 'sub-count' : ''}`}
                        >
                          {link.reqCount}
                        </NotificationCount>
                      )}
                      <FontAwesomeIcon
                        className="right"
                        icon={faChevronRight}
                      />
                    </span>
                  </span>
                )}
              </span>
              {link.subMenu &&
                getMenu(
                  link.subMenu,
                  link.active || router.asPath.includes(link.sel_url)
                    ? 'active'
                    : 'hidden',
                  true,
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
  tick: PropTypes.bool,
  noteText: PropTypes.string,
  change: PropTypes.string,
  services: PropTypes.object,
  shallow: PropTypes.bool,
};
MenuList.defaultProps = {
  classNames: {},
  links: [],
  mOpen: false,
  tick: false,
  noteText: '',
  change: '',
  services: {},
  shallow: false
};

export default MenuList
