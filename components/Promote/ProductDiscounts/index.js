import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { cloneDeep } from 'src/utils/dataStructures';
import { Scrollbars } from 'react-custom-scrollbars';
import { Dashed } from 'styles/CommonStyled';
import Loader from 'components/Loader';
import { Heading, DescriptionP } from 'styles/TextStyled';
// import { handleDiscount } from 'services/userManagement/productDiscount';
import AddDiscount from './AddDiscount';
import DiscontList from './DiscountList';
import { Container, Wrap, ModalWrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { handleDiscount } from 'src/services/myfanpark/celebActions';

const ProductDiscounts = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [addNew, setAddNew] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [discountList, setDiscountList] = useState([]);
  const [avtiveDiscount, setActiveDiscount] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [active, setActive] = useState(true);
  const [dType, setType] = useState('');
  const addNewItem = () => {
    setCardSelected({});
    setAddNew(true);
    setType('');
    props.modalBackHandler(false);
  };
  const goBack = () => {
    setAddNew(false);
    setCardSelected({});
    setType('');
    props.modalBackHandler(true);
  };

  const cardClick = (item, type) => {
    setAddNew(true);
    setCardSelected(item);
    setType(type);
    props.modalBackHandler(false);
  };

  const getDiscountList = async () => {
    try {
      setLoader(true);
      const result = handleDiscount();
      result.then(res => {
        setDiscountList(res.discounts);
        setProductList(res.products);
        setActiveDiscount(res.active_discounts);
        setActive(res.active);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };

  const updateList = (product, op) => {
    if (product) {
      if (op === 'add') {
        const tempList = cloneDeep(avtiveDiscount);
        tempList.unshift(product);
        setActiveDiscount(tempList);
        setAddNew(false);
        props.modalBackHandler(true);
      } else if (op === 'delete') {
        getDiscountList();
        setAddNew(false);
        props.modalBackHandler(true);
      } else {
        const temp = dType === 'active' ? avtiveDiscount : discountList;
        const tempList = cloneDeep(temp);
        const list = tempList.map(item => {
          if (item.id === product.id) {
            return product;
          }
          return item;
        });
        if (dType === 'active') {
          setActiveDiscount(list);
        } else {
          setDiscountList(list);
        }
        setCardSelected(product);
      }
    }
  };

  useEffect(() => {
    getDiscountList();
  }, []);

  if (addNew) {
    return (
      <ModalWrap isForm={addNew}>
        <Wrap edit>
          <AddDiscount
            updateToast={props.updateToast}
            goBack={goBack}
            dateFormat={entityData?.partnerData?.base_date_format}
            selected={cardSelected}
            updateList={updateList}
            loaderAction={props.loaderAction}
            productList={productList}
            type={dType}
          ></AddDiscount>
        </Wrap>
      </ModalWrap>
    );
  }
  return (
    <Container>
      <Wrap active={productList.length > 0}>
        <Heading className="title">
          {t('promote_page.discount.reward', {
            purchaser: entityData?.partnerData?.purchaser_singular_name,
          })}
        </Heading>
        <DescriptionP className="description">
          {t('promote_page.discount.offering')} {entityData?.partnerData?.purchaser_plural_name}.
        </DescriptionP>
        {(!active || avtiveDiscount.length === 0) && (
          <Dashed onClick={addNewItem} className="dashed-button" active={active}>
            {t('promote_page.discount.add_discount')}
          </Dashed>
        )}
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="discount-list-scroll" />
          )}
        >
          {avtiveDiscount && avtiveDiscount.length > 0 && (
            <DiscontList
              cardClick={cardClick}
              discountList={avtiveDiscount}
              dateFormat={entityData?.partnerData?.base_date_format}
              updateToast={props.updateToast}
              loaderAction={props.loaderAction}
              title={t('promote_page.discount.current_discount')}
              type="active"
            />
          )}
          {discountList && discountList.length > 0 && (
            <DiscontList
              cardClick={cardClick}
              discountList={discountList}
              dateFormat={entityData?.partnerData?.base_date_format}
              updateToast={props.updateToast}
              loaderAction={props.loaderAction}
              title={t('promote_page.discount.past_discounts')}
              type="past"
            />
          )}
        </Scrollbars>
        {loader && <Loader class="custom-loader" />}
      </Wrap>
    </Container>
  );
};

ProductDiscounts.propTypes = {
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
};

ProductDiscounts.defaultProps = {};

export default ProductDiscounts;
