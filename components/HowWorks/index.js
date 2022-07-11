import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'components/CloseIcon';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Description } from 'styles/TextStyled';
import { getList } from './constants';
import { DialogStyled, Heading, Content, List, Footer, Logo } from './styled';
import Link from 'next/link';

const HowWorks = (props) => {
  const { t } = useTranslation();
  return (
    <DialogStyled
      open
      onClose={props.onClose}
      classes={{
        paper: 'paper-root',
      }}
    >
      <CloseIcon className='close-icon' onClick={props.onClose} />
      <Heading>{t('common.howDoesWork')}</Heading>
      <Content>
        <List>
          {getList(props.respTime, t).map(listItem => (
            <li className='list-item'>
              <FontAwesomeIcon className='how-icon' icon={listItem.icon} />
              <Description>
                {listItem.description}
              </Description>
            </li>
          ))}
        </List>
        <Footer>
          <Link href="/">
            <a>
              <Logo src={props.logo} alt="logo" />
            </a>
          </Link>
          <span className='note'>
            *{t('common.howNote')}
          </span>
        </Footer>
      </Content>
    </DialogStyled>
  )
}

HowWorks.propTypes = {
  logo: PropTypes.string.isRequired,
  respTime: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default HowWorks;
