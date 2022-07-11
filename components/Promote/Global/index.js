/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faTimes } from '@fortawesome/pro-light-svg-icons';
import Checkbox from 'components/Checkbox';
// import {
//   shareEntity,
//   getSharePartList,
// } from 'services/userManagement/shareEntity';
import Dropdown from 'components/Dropdown';
import { EmptyText } from 'styles/CommonStyled';
import { Heading, DescriptionP } from 'styles/TextStyled';
import Loader from 'components/Loader';
import { Layout, PartnerItem, PartnerList } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { getSharePartList, shareEntity } from 'src/services/myfanpark/partnerActions';
import { updateUserDetails } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';

function Global(props) {
  const { t } = useTranslation();
  const queryClient = useQueryClient()
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const [loading, setLoading] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [starEntList, updateStarEntList] = useState([]);
  const { data: userData } = useFetchLoggedUser()

  const callApi = (
    method = 'get',
    entId,
    msgs,
    api,
    stateFunc,
    callBack = () => {},
  ) => {
    if (method === 'get') setLoading(true);
    if (method !== 'get') loaderAction(true);
    const result = api(method, entId);
    result
      .then(res => {
        if (method === 'get') setLoading(false);
        if (method !== 'get') {
          loaderAction(false);
          localUpdateToast({
            value: true,
            message: msgs.success,
            variant: 'success',
          });
        }
        if (res && res.entities) {
          callBack();
          stateFunc(
            res.entities.map(ent => ({
              ...ent,
              name: `${ent.partner_name} ${ent.region_name}`,
            })),
          );
        }
      })
      .catch(() => {
        if (method === 'get') setLoading(false);
        if (method !== 'get') {
          loaderAction(false);
          localUpdateToast({
            value: true,
            message: msgs.error,
            variant: 'error',
          });
        }
      });
  };

  const optionChange = option => {
    callApi(
      'post',
      option.entity_id,
      { success: t('common.saved_successfull'), error: t('common.failed_to_save') },
      shareEntity,
      updateStarEntList,
      () => {
        setPartnerList(
          partnerList.filter(partner => partner.entity_id !== option.entity_id),
        );
      },
    );
  };

  const onDelete = partner => () => {
    callApi(
      'delete',
      partner.entity_id,
      {
        success: t('common.deleted_success'),
        error: t('common.failed_delete'),
      },
      shareEntity,
      updateStarEntList,
      () => {
        setPartnerList([
          ...partnerList,
          { entity_id: partner.entity_id, ...partner },
        ]);
      },
    );
  };

  const defaultLanguage = useMemo(() => {
    if (userData?.celebrity_details?.languages && userData?.celebrity_details?.languages.length) {
      return userData?.celebrity_details?.languages.find(lang => lang.default);
    }
    return {};
  }, [userData?.user?.id.id]);

  useEffect(() => {
    callApi('get', null, null, shareEntity, updateStarEntList);
    callApi('get', null, null, getSharePartList, setPartnerList);
  }, []);

  // id,
  // obj,
  // callBack,
  // toastGloabal = true,
  // noToast = false,
  // updateToast,
  // loaderAction = () => {},
  // user = {},
  // queryClient = () => {setQueryData: () => {}},
  // t = value => value,
  // isCelebrity = false
  const onStarCheck = () => {
    updateUserDetails(
      userData?.user?.id,
      {
        celebrity_details: {
          allow_entity_share: !userData?.celebrity_details?.allow_entity_share,
        },
        user_details: {},
      },
      () => {},
      false,
      false,
      () => {},
      loaderAction,
      userData,
      queryClient,
      t
    );
  };

  const renderPartner = partner => {
    return (
      <PartnerItem key={partner.entity_id}>
        <span className="left-col">
          <img
            alt="partner logo"
            className="partner-logo"
            src={partner.logo_processed}
          />
          <span className="bold">{partner.region_name}</span>
        </span>
        <span className="right-col">
          {partner.is_default ? (
            t('common.default')
          ) : (
            <React.Fragment>
              <FontAwesomeIcon
                className="act-icon enter-icon"
                icon={faSignIn}
              />
              <FontAwesomeIcon
                className="act-icon"
                onClick={onDelete(partner)}
                icon={faTimes}
              />
            </React.Fragment>
          )}
        </span>
      </PartnerItem>
    );
  };

  return (
    <Layout>
      <Heading className="title">{t('common.global_head')}</Heading>
      <DescriptionP className="description">
        {t('common.global_desc', { language: defaultLanguage.language })}
      </DescriptionP>
      <Checkbox
        onChange={onStarCheck}
        checked={!userData?.celebrity_details?.allow_entity_share}
        label={t('common.global_check_lbl')}
      />
      {loading || partnerList.length > 0 ? (
        <React.Fragment>
          <Dropdown
            options={partnerList}
            labelKey="name"
            valueKey="entity_id"
            placeHolder={t('common.select_partner')}
            className="cat-drop"
            classes={{ scrollbar: 'scroll-wrap', list: 'drop-list' }}
            onChange={optionChange}
          />
        </React.Fragment>
      ) : null}
      {loading || (starEntList && starEntList.length > 0) ? (
        <PartnerList>
          {starEntList.map(partner => renderPartner(partner))}
        </PartnerList>
      ) : (
        <EmptyText>{t('common.no_partner')}</EmptyText>
      )}
      {loading && <Loader />}
    </Layout>
  );
}

Global.propTypes = {
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};

export default Global;
