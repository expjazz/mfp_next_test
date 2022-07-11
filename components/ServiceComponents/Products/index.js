import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'src/utils/dataStructures';
import { handleProducts } from 'src/services';
import ToolTip from 'components/ToolTip';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import { Heading, Description } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import Loader from 'components/Loader';
import { requestTypesKeys } from 'src/constants/requestTypes';
import BoostFans from '../BoostFans';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import { Wrap, ModalWrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Products = props => {
  const { data: entityData } = useGetPartner()
  const { t, ready } = useTranslation();
  const [terms, setTerms] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [promote, showPromote] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);
  const termsTrigger = () => {
    setTerms(!terms);
  };
  const addNewItem = () => {
    setCardSelected({});
    setAddNew(true);
    props.modalBackHandler(false);
  };
  const goBack = () => {
    setAddNew(false);
    setCardSelected({});
    props.modalBackHandler(true);
  };

  const cardClick = item => {
    setAddNew(true);
    setCardSelected(item);
    props.modalBackHandler(false);
  };

  const updateList = (product, op) => {
    if (product) {
      const tempList = cloneDeep(productList);
      if (op === 'delete') {
        const list = tempList.filter(
          item => item.product_id !== product.product_id,
        );
        setProductList(list);
        setAddNew(false);
        props.modalBackHandler(true);
      } else if (op === 'add') {
        tempList.unshift(product);
        setProductList(tempList);
        setAddNew(false);
        props.modalBackHandler(true);
      } else {
        const list = tempList.map(item => {
          if (item.product_id === product.product_id) {
            return product;
          }
          return item;
        });
        setProductList(list);
        setCardSelected(product);
      }
    }
  };

  const updateSortList = list => {
    setProductList(list);
  };

  const getFunList = async () => {
    try {
      const result = handleProducts();
      result.then(res => {
        setProductList(res.products);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getFunList();
  }, []);

  if (addNew) {
    return (
      <ModalWrap isForm={addNew}>
        <Wrap>
          <AddProduct
            {...props}
            updateToast={props.updateToast}
            goBack={goBack}
            selected={cardSelected}
            updateList={updateList}
            currencyData={props.currencyData}
            loaderAction={props.loaderAction}
            userDetails={props.userDetails}
            celbDetails={props.celbDetails}
            updateUserData={props.updateUserData}
            saved={props.saved}
            history={props.history}
            confirmSave={props.confirmSave}
          ></AddProduct>
        </Wrap>
      </ModalWrap>
    );
  }

  return ready && (
    <ModalWrap isForm={addNew}>
      <Wrap className="content-wrapper">
        <Heading className="inner-head">{t('services.merch.heading')}</Heading>
        <section className="terms-wrap">
          <Description>
            {
              t('services.merch.description', {
                purchaser: entityData?.partnerData?.purchaser_plural_name
              })
            }
          </Description>
          {terms && (
            <div className="terms-modal">
              <span className="text">{t('services.merch.merchIdeasTitle')}</span>
              <ul className="list-ul text">
                <li>{t('services.merch.idea1')}</li>
                <li>{t('services.merch.idea2', {purchaser: entityData?.partnerData?.purchaser_singular_name})}</li>
                <li>{t('services.merch.idea3')}</li>
                <li>{t('services.merch.idea4')}</li>
                <li>{t('services.merch.idea5')}</li>
                <li>{t('services.merch.idea6')}</li>
              </ul>
              <FlexCenter>
                <Button className="button" onClick={termsTrigger}>
                  {t('common.ok')}
                </Button>
              </FlexCenter>
            </div>
          )}
          <Dashed className="add-item" role="presentation" onClick={addNewItem}>
            {t("services.merch.addProduct")}
          </Dashed>
        </section>
        {productList && productList.length > 0 && (
          <ProductList
            {...props}
            cardClick={cardClick}
            productList={productList}
            updateToast={props.updateToast}
            currencyData={props.currencyData}
            loaderAction={props.loaderAction}
            updateSortList={updateSortList}
          />
        )}
        {
          props.entityData.allow_star_share_graphics && props.celebActive && props.adminApproved &&
          props.celbDetails.services.products &&
            <FlexCenter className="btn-wrap">
              <ToolTip title={t('services.promoteExperience')}>
                <Button
                  secondary
                  className="promote-btn"
                  onClick={() => showPromote(!promote)}
                >
                  {t('services.promote', {
                    purchaser: entityData?.partnerData?.purchaser_plural_name
                  })}
                </Button>
              </ToolTip>
            </FlexCenter>
        }
        {props.entityData.allow_star_share_graphics && props.celebActive && props.adminApproved &&
          props.celbDetails.services.products && promote &&
          <BoostFans requestType={requestTypesKeys.shoutout} global={false}/>}
        {loader && <Loader class="custom-loader" />}
      </Wrap>
    </ModalWrap>
  );
};

Products.propTypes = {
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  confirmSave: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
};

Products.defaultProps = {};

export default Products;
