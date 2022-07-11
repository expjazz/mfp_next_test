import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Ul, Li, Text, Note } from './styled';

function MoboList({ links, noShallow }) {
  return (
    <Ul className="mobo-link-ul">
      {links.map(link => {
        return (
          <Link href={link.url || link.sel_url} className="mobo-link" shallow={!noShallow}>
            <a className="mobo-link">
            {link.customLi && link.customLi(link)}
            {!link.customLi && (
              <Li
                indicator={link.completed}
                center={!link.cusIcon && !link.moboIcon}
              >
                {link.cusIcon ? (
                  link.cusIcon
                ) : (
                  <FontAwesomeIcon icon={link.moboIcon} />
                )}
                <Text center={!link.cusIcon && !link.moboIcon}>
                  {link.moboLinkName}
                </Text>
                <Note>{link.info}</Note>
              </Li>
            )}
            </a>
          </Link>
        );
      })}
    </Ul>
  );
}

MoboList.propTypes = {
  links: PropTypes.array.isRequired,
  noShallow: PropTypes.bool,
};

MoboList.defaultProps = {
  noShallow: false
}

export default MoboList;
