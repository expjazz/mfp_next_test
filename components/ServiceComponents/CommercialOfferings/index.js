import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { handleCommercialOfferings } from 'services/';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import ToolTip from 'components/ToolTip';
import { Heading, Description } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import Loader from 'components/Loader';
import BoostFans from '../BoostFans';
import AddCommercial from './Components/AddCommercial';
import CommercialList from './Components/CommercialList';
import { Wrap, ModalWrap } from './styled';
import { cloneDeep } from 'src/utils/dataStructures';
import { handleCommercialOfferings } from 'src/services';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';

const CommercialOfferings = props => {
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { t, ready } = useTranslation();
  const [addNew, setAddNew] = useState(false);
  const [promote, showPromote] = useState(false);
  const [cardSelected, setCardSelected] = useState({});
  const [commercialList, setcommercialList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [templateState, setTemplateState] = useState(false);

  useEffect(() => {
    props.getCommercialTemplates(userData?.user.partner_data.entity_id);
  }, [])
  const addNewItem = () => {
    setTemplateState(false);
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

  const updateList = (commercial, op) => {
    if (commercial) {
      const tempList = cloneDeep(commercialList);
      if (op === 'delete') {
        const list = tempList.filter(
          item =>
            item.commercial_offering_id !== commercial.commercial_offering_id,
        );
        setcommercialList(list);
        setAddNew(false);
        props.modalBackHandler(true);
      } else if (op === 'add') {
        tempList.unshift(commercial);
        setcommercialList(tempList);
        setAddNew(false);
        props.modalBackHandler(true);
      } else {
        const list = tempList.map(item => {
          if (
            item.commercial_offering_id === commercial.commercial_offering_id
          ) {
            return commercial;
          }
          return item;
        });
        setcommercialList(list);
        setCardSelected(commercial);
      }
    }
  };

  const updateSortList = list => {
    setcommercialList(list);
  };

  const getCommercialList = async () => {
    try {
      const result = handleCommercialOfferings();
      result.then(res => {
        setcommercialList(res.commercial_offering);
        setLoader(false);
      });
    } catch (e) {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCommercialList();
  }, []);

  if (addNew) {
    return (
      <ModalWrap isForm={addNew}>
        <Wrap>
          <AddCommercial
            {...props}
            updateToast={localUpdateToast}
            goBack={goBack}
            selected={cardSelected}
            updateList={updateList}
            currencyData={props.currencyData}
            templateState={templateState}
            setTemplateState={setTemplateState}
            // https://starsona.freshrelease.com/ws/PM/tasks/PM-3238 - remove starting price
            minPrice=""
            loaderAction={loaderAction}
            userDetails={userData?.user}
            celbDetails={userData?.celebrity_details}
            updateUserData={props.updateUserData}
            saved={props.saved}
            history={props.history}
            confirmSave={props.confirmSave}
            commercialTemplates={props.commercialTemplates}
          />
        </Wrap>
      </ModalWrap>
    );
  }

  return ready && (
    <ModalWrap isForm={addNew}>
      <Wrap className="content-wrapper">
        <Heading className="inner-head">{t('services.commercial.heading')}</Heading>
        <section className="terms-wrap">
          <Description>
            {t('services.commercial.description')}
          </Description>
          <Dashed className="add-item" role="presentation" onClick={addNewItem}>
            {t('services.commercial.add')}
          </Dashed>
        </section>
        {commercialList && commercialList.length > 0 && (
          <CommercialList
            {...props}
            cardClick={cardClick}
            commercialList={commercialList}
            updateToast={localUpdateToast}
            templateState={templateState}
            setTemplateState={setTemplateState}
            currencyData={props.currencyData}
            loaderAction={loaderAction}
            updateSortList={updateSortList}
          />
        )}
        {entityData?.partnerData.allow_star_share_graphics && props.celebActive && props.adminApproved &&
          userData?.celebrity_details.services.commercial && (
            <FlexCenter className="btn-wrap">
              <ToolTip title={t('services.commercial.shareTitle')}>
                <Button
                  secondary
                  className="promote-btn"
                  onClick={() => showPromote(!promote)}
                >
                  {t('services.promote', { purchaser: entityData?.partnerData?.purchaser_plural_name })}
                </Button>
              </ToolTip>
            </FlexCenter>
          )}
        {entityData?.partnerData.allow_star_share_graphics && props.celebActive && props.adminApproved && promote && (
          <BoostFans requestType={requestTypesKeys.commercial} global={false} />
        )}
        {loader && <Loader class="custom-loader" />}
      </Wrap>
    </ModalWrap>
  );
};

CommercialOfferings.propTypes = {
  updateToast: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  confirmSave: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  celbDetails: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  getCommercialTemplates: PropTypes.func.isRequired,
  entityData: PropTypes.object.isRequired,
  commercialTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CommercialOfferings.defaultProps = {};

export default CommercialOfferings;
