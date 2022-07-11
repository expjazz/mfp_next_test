import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import Dropdown from 'components/Dropdown';
import Loader from 'components/Loader';
// import { fetchUserDetails } from 'store/shared/actions/getUserDetails';
import { Heading, Description } from 'styles/TextStyled';
import { Container } from '../../../styled';
import { Wrap, List, ListItem, ListEle } from './styled';
import { handleUserLangs } from 'src/services/myfanpark/celebActions';
import { useConfigPartner } from 'customHooks/reactQueryHooks';

const Languages = props => {
  const { t, ready } = useTranslation();
  const [userLangs, setUserLangs] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { data: config } = useConfigPartner()
  const languages = config?.languages
  const updateUseDet = () => {
    props.fetchUserDetails(props.userDetails.id)
  }

  const langApi = (type, lang) => {
    setLoading(true);
    handleUserLangs(type, lang)
      .then(resp => {
        setLoading(false);
        if (resp) {
          setUserLangs(resp ? resp.sort((a, b) => {
            if(a.language.language.toLowerCase() < b.language.language.toLowerCase()) { return -1; }
            else if(a.language.language.toLowerCase() > b.language.language.toLowerCase()) { return 1; }
            return 0;
          }) : []);
          if (type === 'post' || type === 'delete') {
            updateUseDet();
          }
        }
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const onLanChange = option => {
    langApi('post', { id: option.id });
  };

  const onDefault = lang => () => {
    langApi('post', {
      id: lang.language.id,
      default: true,
    });
  };

  const onLangDel = lang => () => {
    langApi('delete', {
      id: lang.language.id,
    });
  };

  useEffect(() => {
    langApi();
  }, []);
  return ready && (
    <Container>
      <Wrap className="content-wrapper">
        <Heading className="inner-head">{t('services.language.heading')}</Heading>
        <Description className="note-padding">
          {t('services.language.description')}
        </Description>
        <Dropdown
          rootClass="lang-drop"
          classes={{ list: 'drop-list' }}
          options={languages || []}
          labelKey="language"
          valueKey="id"
          onChange={onLanChange}
          label={t('services.language.selectLang')}
          className="cus-drop"
          searchable
          nativeProps={{ type: 'text', tabIndex: '5' }}
        />
        <List>
          {userLangs.map(lang => (
            <ListItem>
              <ListEle head>{lang.language.language}</ListEle>
              <ListEle
                highlight={!lang.default}
                clickable
                onClick={onDefault(lang)}
              >
                {lang.default ? t('common.default') : t('common.makeDefault')}
              </ListEle>
              {userLangs.length > 1 && (
                <ListEle close clickable onClick={onLangDel(lang)}>
                  <FontAwesomeIcon icon={faTimes} className="close-icon" />
                </ListEle>
              )}
            </ListItem>
          ))}
        </List>
        {Loading && <Loader class="loader" />}
      </Wrap>
    </Container>
  );
};

Languages.defaultProps = {
  languages: [],
};

Languages.propTypes = {
  languages: PropTypes.array,
};

// const mapStateToProps = state => ({
//   languages: state.config.data.languages,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchUserDetails: id => dispatch(fetchUserDetails(id)),
// })

export default Languages
