import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-regular-svg-icons';
import { Wrapper } from './styled';
import { getRedirectURL } from '../../../../../../../../../../customHooks/domUtils';
import { LinkText } from '../../../../../../../../../../styles/TextStyled';

function ExternalLink(props) {
  const { t } = useTranslation();
  const {
    fun_stuff_request_details: reqDetails,
    fun_stuff_request_details: { fun_stuff: funStuff },
  } = props.bookingData;

  const copyText = text => () => {
    copy(text);
    props.updateToast({
      value: true,
      message: t('common.copied_clipboard'),
      variant: 'success',
    });
  };
  return (
    <Wrapper>
      <span className="sub-head">{funStuff.title}</span>
      <div className="link-wrapper">
        <FontAwesomeIcon icon={faLink} className="link-icon" />
        <span className="links">
          <LinkText>
            <a
              href={getRedirectURL(reqDetails.external_link)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {reqDetails.external_link}
            </a>
          </LinkText>
          <LinkText onClick={copyText(reqDetails.external_link)}>
            {t('common.copy_link')}
          </LinkText>
        </span>
      </div>
    </Wrapper>
  );
}

ExternalLink.propTypes = {
  updateToast: PropTypes.func.isRequired,
  bookingData: PropTypes.object.isRequired,
};

export default ExternalLink;
