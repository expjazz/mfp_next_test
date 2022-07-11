/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/utils/dataStructures';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import Dropdown from 'components/Dropdown';
import { Heading, DescriptionP } from 'styles/TextStyled';
import Loader from 'components/Loader';
import {
  handleDigitalGoods,
  getSocialDetails,
  handleProducts,
  handleCommercialOfferings,
} from 'src/services/';
import { featuedExp } from 'src/services/video';
import FeaturedList from './FeaturedList';
import { getCategoryList } from './constants';
import { Container } from '../styled';
import { Wrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const SocialExp = props => {
  const { data: entityData } = useGetPartner()
  const { t, ready } = useTranslation();
  const [category, setcategory] = useState({});
  const [exp, setExp] = useState({});
  const [expList, setExpList] = useState([]);
  const [socialDetails, setDetails] = useState({});
  const [funList, setFunList] = useState({});
  const [productList, setProductList] = useState([]);
  const [commercialList, setCommercialList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [loader, setLoader] = useState(false);

  const callApi = ({ type, experience }) => {
    props.loaderAction(true);
    featuedExp('post', {
      request_type: type.id,
      product_id: experience ? experience.id : null,
    })
      .then(res => {
        props.loaderAction(false);
        if (res && res.data && res.data.data) {
          if (!isEmpty(res.data.data.services)) {
            props.updateUserData({
              userDetails: props.userDetails,
              celbDetails: {
                ...props.celbDetails,
                services: res.data.data.services,
              },
            });
          }
          setFeaturedList([...featuredList, ...[res.data.data.featured]]);
          props.updateToast({
            value: true,
            message: t('common.updatedSuccessfully'),
            variant: 'success',
          });
        } else {
          props.updateToast({
            value: true,
            message: t('common.failedAdd'),
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.failedAdd'),
          variant: 'error',
        });
      });
  };

  const save = ({ type, experience }) => {
    if (type && type.sub && experience.id) {
      callApi({ type, experience });
      setcategory({});
      setExp({});
    } else if (type && !type.sub) {
      callApi({ type });
      setcategory({});
    }
  };

  const dropChange = value => {
    setcategory(value);
    if (value.id === requestTypesKeys.socialShoutout) {
      setExpList(socialDetails?.interaction || []);
    } else if (value.id === requestTypesKeys.promotion) {
      setExpList(socialDetails.promotion || []);
    } else if (value.id === requestTypesKeys.products) {
      setExpList(productList || []);
    } else if (value.id === requestTypesKeys.digitalGoods && value.del_method) {
      setExpList(funList.live || []);
    } else if (value.id === requestTypesKeys.digitalGoods) {
      setExpList(funList.fun || []);
    } else if (value.id === requestTypesKeys.commercial) {
      setExpList(commercialList || []);
    } else {
      setExpList([]);
    }
    setExp({});
    save({ type: value, experience: {} });
  };

  const prodChange = value => {
    setExp(value);
    save({ type: category, experience: value });
  };

  const updateInteractionlist = socialList => {
    let list = [];
    socialList.forEach(interaction => {
      const temp = interaction.details.filter(item => item.checked);
      list = [...list, ...temp];
    });
    return list.map(item => {
      return {
        ...item,
        title: `${item.social_media.charAt(0).toUpperCase() +
          item.social_media.slice(1)} - ${item.title}`,
      };
    });
  };

  const updateSortList = list => {
    setFeaturedList(list);
  };

  const getSocials = async cat => {
    const type =
      cat.id === requestTypesKeys.socialShoutout ? 'interaction' : 'promotion';
    try {
      setLoader(true);
      const result = getSocialDetails();
      result.then(res => {
        const list = { interaction: [], promotion: [] };
        list.interaction = updateInteractionlist(
          res.social_media_shout_out_title,
        );
        list.promotion = updateInteractionlist(
          res.social_media_promotions_title,
        );
        setDetails({
          interaction: list.interaction,
          promotion: list.promotion,
        });
        setExpList(list[type]);
      });
      setLoader(false);
    } catch (e) {
      setLoader(false);
    }
  };

  const getFunList = async cat => {
    const type = cat.del_method ? 'live' : 'fun';
    try {
      setLoader(true);
      const result = handleDigitalGoods();
      result.then(res => {
        const list = { live: [], fun: [] };
        list.live = res.fun_stuff
          .filter(
            del =>
              del.delivery_method === deliveryMethods.videoCalls && !del.hide,
          )
          .map(item => {
            return { ...item, id: item.fun_stuff_id };
          });

        list.fun = res.fun_stuff
          .filter(
            del =>
              del.delivery_method !== deliveryMethods.videoCalls && !del.hide,
          )
          .map(item => {
            return { ...item, id: item.fun_stuff_id };
          });
        setFunList(list);
        setExpList(list[type]);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const getMerchList = async () => {
    try {
      setLoader(true);
      const result = handleProducts();
      result.then(res => {
        const list = res.products
          .filter(prod => !prod.hide)
          .map(item => {
            return { ...item, id: item.product_id };
          });
        setProductList(list);
        setExpList(list);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const getCommercialList = async () => {
    try {
      setLoader(true);
      const result = handleCommercialOfferings();
      result.then(res => {
        const list = res.commercial_offering.map(item => {
          return { ...item, id: item.commercial_offering_id };
        });
        setCommercialList(list);
        setExpList(list);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const getFeaturedList = () => {
    featuedExp('get', {}, props.userDetails.user_id).then(res => {
      if (res.data && res.data.data) {
        setFeaturedList(res.data.data.featured);
      }
    });
  };

  useEffect(() => {
    if (
      [requestTypesKeys.socialShoutout, requestTypesKeys.promotion].includes(
        category.id,
      ) &&
      (isEmpty(socialDetails?.interaction) && isEmpty(socialDetails?.promotion))
    ) {
      getSocials(category);
    }
    if (
      requestTypesKeys.digitalGoods === category.id &&
      isEmpty(funList.fun) &&
      isEmpty(funList.live)
    ) {
      getFunList(category);
    }
    if (requestTypesKeys.products === category.id && isEmpty(productList)) {
      getMerchList(category);
    }
    if (
      requestTypesKeys.commercial === category.id &&
      isEmpty(commercialList)
    ) {
      getCommercialList();
    }
  }, [category.id]);
  const getExpList = () => {
    if (
      expList &&
      expList.length > 0 &&
      featuredList &&
      featuredList.length > 0
    ) {
      const selected = featuredList.reduce((acc, cur) => {
        return [
          ...acc,
          ...[
            cur.product_id,
            cur.id,
            cur.commercial_offering_id,
            cur.fun_stuff_id,
          ],
        ];
      }, []);
      if (selected) return expList.filter(item => !selected.includes(item.id));
    }
    return expList;
  };

  useEffect(() => {
    getFeaturedList();
  }, []);

  return ready && (
    <React.Fragment>
      <Container>
        <Wrap className="content-wrapper">
          <Heading className="inner-head">{t("services.featuredExp.heading")}</Heading>
          <DescriptionP>
            {t("services.featuredExp.description", {
              purchaser: entityData?.partnerData?.purchaser_singular_name,
              storeName: entityData?.partnerData?.partner_name
            })}
          </DescriptionP>
          {featuredList.length < 3 && (
            <React.Fragment>
              <Dropdown
                rootClass="category-drop"
                selected={category || {}}
                options={getCategoryList(
                  props.celbDetails.services,
                  featuredList,
                  t,
                  entityData?.partnerData
                )}
                labelKey="title"
                valueKey="key"
                onChange={dropChange}
                placeHolder={t('common.selectCat')}
                secondary
                classes={{ list: 'drop-list' }}
              />
              {category.sub && (
                <Dropdown
                  rootClass="product-drop"
                  selected={exp || {}}
                  options={getExpList()}
                  labelKey="title"
                  valueKey="id"
                  onChange={prodChange}
                  placeHolder={t('common.selectExp')}
                  secondary
                  classes={{ list: 'drop-list' }}
                />
              )}
            </React.Fragment>
          )}
          {featuredList && featuredList.length > 0 && (
            <FeaturedList
              {...props}
              featuredList={featuredList}
              updateToast={props.updateToast}
              loaderAction={props.loaderAction}
              updateSortList={updateSortList}
              userDetails={props.userDetails}
              celbDetails={props.celbDetails}
              updateUserData={props.updateUserData}
            />
          )}
          {loader && <Loader class="custom-loader" />}
        </Wrap>
      </Container>
    </React.Fragment>
  );
};

SocialExp.propTypes = {
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
};

SocialExp.defaultProps = {};

export default SocialExp;
