import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'src/utils/dataStructures';
import { useTranslation, Trans } from 'react-i18next';
import { handleDigitalGoods } from 'src/services/';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import ToolTip from 'components/ToolTip';
import { Heading, Description } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import Loader from 'components/Loader';
import BoostFans from '../BoostFans';
import FunItem from './Components/AddFun';
import FunList from './Components/FunList';
import { Wrap, ModalWrap } from './styled';

const FunStuff = props => {
  const { t, ready } = useTranslation();
  const [terms, setTerms] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [promote, showPromote] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [funList, setFunList] = useState([]);
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

  const updateList = (fun, op) => {
    if (fun) {
      const tempList = cloneDeep(funList);
      if (op === 'delete') {
        const list = tempList.filter(
          item => item.fun_stuff_id !== fun.fun_stuff_id,
        );
        setFunList(list);
        setAddNew(false);
        props.modalBackHandler(true);
      } else if (op === 'add') {
        tempList.unshift(fun);
        setFunList(tempList);
        setAddNew(false);
        props.modalBackHandler(true);
      } else {
        const list = tempList.map(item => {
          if (item.fun_stuff_id === fun.fun_stuff_id) {
            return fun;
          }
          return item;
        });
        setFunList(list);
        setCardSelected(fun);
      }
    }
  };

  const updateSortList = list => {
    setFunList(list);
  };

  const getFunList = async () => {
    try {
      const result = handleDigitalGoods();
      result.then(res => {
        setFunList(res.fun_stuff);
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
          <FunItem
            {...props}
            updateToast={props.updateToast}
            goBack={goBack}
            selected={cardSelected}
            updateList={updateList}
            currencyData={props.currencyData}
            loaderAction={props.loaderAction}
            deliveryTypes={props.deliveryTypes}
            userDetails={props.userDetails}
            celbDetails={props.celbDetails}
            updateUserData={props.updateUserData}
            saved={props.saved}
            history={props.history}
            confirmSave={props.confirmSave}
          ></FunItem>
        </Wrap>
      </ModalWrap>
    );
  }
  return ready && (
    <ModalWrap isForm={addNew}>
      <Wrap className="content-wrapper">
        <Heading className="inner-head">{t('services.funstuff.heading')}</Heading>
        <section className="terms-wrap">
          <Description>
            {
              t('services.funstuff.description', {
                purchaser: props.entityData?.purchaser_plural_name
              })
            }
          </Description>
          {terms && (
            <div className="terms-modal">
              <span className="text">{t('services.funstuff.funIdeasTitle')}</span>
              <ul className="list-ul text">
                <li>{t('services.funstuff.idea1')}</li>
                <li>{t('services.funstuff.idea2')}</li>
                <li>{t('services.funstuff.idea3')}</li>
                <li>{t('services.funstuff.idea4')}</li>
                <li>{t('services.funstuff.idea5')}</li>
                <li>{t('services.funstuff.idea6')}</li>
                <li>{t('services.funstuff.idea7')}</li>
              </ul>
              <span className="text">
                <Trans i18nKey="services.funstuff.reachOut"
                values={{
                  siteName: entity('siteName'),
                  mailUrl: 'info@myfanpark.com'
                }}>
                  Want to brainstorm with a {entity('siteName')} rep? Reach out to
                  <a href="mailto: info@myfanpark.com" className="link">
                    info@myfanpark.com
                  </a>
                </Trans>
              </span>
              <FlexCenter>
                <Button className="info-button" onClick={termsTrigger}>
                  {t('common.ok')}
                </Button>
              </FlexCenter>
            </div>
          )}
          <Dashed
            className="add-item dashed-btn"
            role="presentation"
            onClick={addNewItem}
          >
            {t('common.addItem')}
          </Dashed>
        </section>

        {funList && funList.length > 0 && (
          <FunList
            {...props}
            cardClick={cardClick}
            funList={funList.filter(
              del => del.delivery_method !== deliveryMethods.videoCalls,
            )}
            updateToast={props.updateToast}
            loaderAction={props.loaderAction}
            currencyData={props.currencyData}
            updateSortList={updateSortList}
          />
        )}
        {props.entityData.allow_star_share_graphics && props.celebActive && props.adminApproved &&
          props.celbDetails.services.fun_stuff && (
            <FlexCenter className="btn-wrap">
              <ToolTip title={t('services.promoteExperience')}>
                <Button
                  secondary
                  className="promote-btn"
                  onClick={() => showPromote(!promote)}
                >
                  {
                    t('services.promote', {
                      purchaser: props.entityData?.purchaser_plural_name
                    })
                  }
                </Button>
              </ToolTip>
            </FlexCenter>
          )}
        {props.entityData.allow_star_share_graphics && props.celebActive && props.adminApproved &&
          promote &&
          props.celbDetails.services.fun_stuff && (
            <BoostFans requestType={requestTypesKeys.shoutout} global={false} />
          )}
        {loader && <Loader class="custom-loader" />}
      </Wrap>
    </ModalWrap>
  );
};

FunStuff.propTypes = {
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  confirmSave: PropTypes.func.isRequired,
  deliveryTypes: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
};

FunStuff.defaultProps = {
  deliveryTypes: [],
};

export default FunStuff;
