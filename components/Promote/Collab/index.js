/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Link from 'next/link';
import algoliasearch from 'algoliasearch'
import AsyncSelect from 'react-select/async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { Heading, DescriptionP } from 'styles/TextStyled';
import { Image } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import Loader from 'components/Loader';
import { getStarName } from 'src/utils/dataToStringFormatter';
import Collablist from './List';
import { Layout, Option, Search } from './styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { getCollab } from 'src/services/myfanpark/celebActions';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';


const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_ID, process.env.NEXT_PUBLIC_ALGOLIA_TOKEN)

const indexAlgolia = client.initIndex(process.env.NEXT_PUBLIC_SEARCH_USER_INDEX);

const OpComp = (t) => (option, props) => {
  const { data: optionData, selectOption } = option;
  return (
    <Option {...props.innerProps} onClick={() => selectOption(optionData)}>
      <Link href={`/${optionData.vanity_id}`} target='_blank'>
        <span className="img-wrp">
          <Image
            className="img-star"
            image={optionData.thumbnail_url || optionData.avatar_photo}
          />
          <span className="content">
            <span className="cat">
              {optionData.professions.replace(/['[\]]/g, '')}
            </span>
            <span className="name">{optionData.label}</span>
          </span>
        </span>
      </Link>
      <Button secondary className="sel-btn">
        {t('common.select')}
      </Button>
    </Option>
  )
}
function Collab(props) {
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dataList, updateDataList] = useState([]);
  const [_, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const callApi = (method, payload, msgs) => {
    if (method === 'get') setLoading(true);
    if (method !== 'get') loaderAction(true);
    const result = getCollab(userData?.user?.user_id, payload, method);
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
        if (res) {
          updateDataList([...res]);
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
      { celebrities: option.encode_id },
      { success: t('common.saved_successfull'), error: t('common.failed_to_save') },
    );
  };

  const onDelete = star => {
    callApi('delete', star.id, {
      success: t('common.deleted_success'),
      error: t('common.failed_delete'),
    });
  };

  const updateSortList = list => {
    updateDataList(list);
  };

  useEffect(() => {
    callApi('get');
  }, []);

  const filterStars = async inputValue => {
    let list = [];
    const result = await indexAlgolia.search(inputValue, { typoTolerance: false, filters: `celebrity_entities:${entityData?.partnerData?.entity_id} AND (talent_status: ${accountStatus.live} OR talent_status: ${accountStatus.paused})` });
    if (result && result.hits.length) {
      list = result.hits.filter(user => user.vanity_url !== userData?.user?.user_id).map(star => ({
        ...star, value: star.vanity_url, user_id: star.id ,professions: JSON.
        stringify(star.celebrity_profession.map(x => x.title)), tags: JSON.
        stringify(star.tags.map(x => x.name)), ...star.avatar_photo, label: getStarName(star.nick_name, star.first_name, star.last_name)
      }))
    }
    return list;
  };

  const promiseOptions = inputVal =>
    new Promise(async resolve => {
      let list = [];
      if (inputVal.length >= 3) {
        list = await filterStars(inputVal);
      }
      resolve(list);
    });

  return (
    <Layout>
      <Heading className="title">{t('common.cross_promote_head')}</Heading>
      <DescriptionP className="description">
        {t('common.cross_promote_desc', {
          talent: entityData?.partnerData?.talent_plural_name,
          purchaser: entityData?.partnerData?.purchaser_plural_name,
        })}
      </DescriptionP>
      <Search>
        <FontAwesomeIcon icon={faSearch} />
        <AsyncSelect
          cacheOptions
          placeholder={t('common.sel_stars')}
          components={{Option: OpComp(t)}}
          className="auto__select__wrap"
          classNamePrefix="auto__select"
          loadOptions={promiseOptions}
          onChange={optionChange}
        />
      </Search>
      {dataList && dataList.length > 0 && (
        <Collablist
          list={dataList}
          onDelete={onDelete}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
          updateSortList={updateSortList}
          vanity={userData?.user?.user_id}
        />
      )}
      {loading && <Loader />}
    </Layout>
  );
}

Collab.propTypes = {
  userDetails: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};

export default Collab;
