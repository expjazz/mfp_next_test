import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import moment from 'moment';
// import { updateUserDetails } from 'store/shared/actions/getUserDetails';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import { Dashed } from 'styles/CommonStyled';
import {
  getCharityList,
  addCharity,
  deleteCharity,
  getFundRaiser,
  addFundRaiser,
} from 'src/services/myfanpark/celebActions';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import ToolTip from '../../../ToolTip';
import DisplayCard from '../../../DisplayCard';
import { toolTips } from './constants';
import { isFundraiserStarted, isFundraiserEnded } from './utils';
import FormSection from './components/FormSection';
import { Layout, Content, Container, ListContainer } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';

const Charity = props => {
  const { t } = useTranslation();
  const [formObject, toggleFormObject] = useState(null);
  const [charityList, updateCharityList] = useState([]);
  const [fundRaiser, updateFundRaiser] = useState(null);
  const [_, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const addForm = type => () => {
    toggleFormObject({
      type,
    });
  };

  const getCharities = async () => {
    loaderAction(true);
    try {
      const charityData = await getCharityList();
      const userDetails = props.userDetails.settings_userDetails;
      const celebDetails = props.userDetails.settings_celebrityDetails;
      if (charityData.success) {
        updateCharityList(charityData.data.charity);
        props.updateUserDetails({
          userDetails,
          celbDetails: {
            ...celebDetails,
            charity: charityData.data.charity,
          },
        });
      }
    } catch (e) {
      if (e && e.response) {
        localUpdateToast({
          value: true,
          message: e.response.data.error.message,
          variant: 'error',
        });
      } else {
        localUpdateToast({
          value: true,
          message: t('common.refresh_error'),
          variant: 'error',
        });
      }
    }
    loaderAction(false);
  };

  const getFundRaiserData = async () => {
    loaderAction(true);
    try {
      const fundRaiserData = await getFundRaiser();
      if (fundRaiserData.success) {
        updateFundRaiser(fundRaiserData.data);
      }
    } catch (e) {
      if (e && e.response) {
        localUpdateToast({
          value: true,
          message: e.response.data.error.message,
          variant: 'error',
        });
      } else {
        localUpdateToast({
          value: true,
          message: t('common.refresh_error'),
          variant: 'error',
        });
      }
    }
    loaderAction(false);
  };

  const deleteCharityDetails = async charityId => {
    loaderAction(true);
    const resp = await deleteCharity(charityId);
    loaderAction(false);
    if (resp) {
      getCharities();
    }
  };

  const onCardClick = (type, data) => () => {
    if (type === 'charity') {
      toggleFormObject({
        type: 'charity',
        charityName: data.charity,
        charityWebsite: data.website,
        id: data.charity_id,
      });
    } else {
      const startDate = data.start_date && data.start_date.split('common.T')[0];
      const endDate = data.end_date && data.end_date.split('common.T')[0];
      toggleFormObject({
        ...data,
        type: 'fundraiser',
        charityName: data.charity,
        charityWebsite: data.website,
        id: data.fund_raiser_id,
        started: isFundraiserStarted(startDate),
        ended: isFundraiserEnded(endDate),
        goalAmount: parseInt(data.goal_amount, 0),
        startDate: moment(startDate),
        endDate: moment(endDate),
      });
    }
  };

  const onBackClick = () => {
    if (!formObject) {
      props.goBack();
    } else {
      toggleFormObject(null);
    }
  };

  const onSave = async formData => {
    let saveType = 'add';
    if (formData.id) {
      saveType = 'update';
    }
    if (formData.ended) {
      toggleFormObject(null);
      return;
    }
    try {
      if (formData.type === 'charity') {
        loaderAction(true);
        const success = await addCharity(formData, saveType);
        loaderAction(false);
        if (success) {
          toggleFormObject(null);
          getCharities();
        }
      } else {
        let { startDate, endDate } = formData;
        const { started } = formData;
        saveType = started ? 'update' : 'add';
        startDate = moment(startDate).format('MMM D YYYY 00:00:00');
        endDate = moment(endDate).format('MMM D YYYY 00:00:00');
        loaderAction(true);
        const success = await addFundRaiser(
          { ...formData, startDate, endDate },
          saveType,
        );
        loaderAction(false);
        if (success) {
          toggleFormObject(null);
          getFundRaiserData();
        }
      }
    } catch (e) {
      loaderAction(false);
      if (e && e.response) {
        localUpdateToast({
          value: true,
          message: e.response.data.error.message,
          variant: 'error',
        });
      } else {
        localUpdateToast({
          value: true,
          message: t('common.refresh_error'),
          variant: 'error',
        });
      }
    }
  };

  const renderSelectionField = (type, title, toolTip = '') => {
    return (
      <ToolTip title={toolTip}>
        <Dashed onClick={addForm(type)} className="dashed-btn">
          {title}
        </Dashed>
      </ToolTip>
    );
  };

  const renderMainContent = () => {
    return (
      <React.Fragment>
        <ListContainer>
          <Heading>{props.titleCharity}</Heading>
          <Description className="main-desc">
            {props.subtitleCharity}
          </Description>
          {charityList.map(charity => (
            <DisplayCard
              heading={charity.charity}
              id={charity.charity_id}
              description={charity.website}
              onClick={onCardClick('charity', charity)}
              onClose={deleteCharityDetails}
            />
          ))}
          {charityList.length < 3 &&
            renderSelectionField(
              'charity',
              t('common.profilesec.add_charity'),
              toolTips(t).addCharity,
            )}
          <Heading className="fund-head">{props.titleFund}</Heading>
          <Description className="main-desc">{props.subtitleFund}</Description>
          {!isEmpty(fundRaiser) && !isEmpty(fundRaiser.active_fund_raiser) && (
            <React.Fragment>
              <Description className="card-title">
                {`${
                  isFundraiserStarted(
                    fundRaiser.active_fund_raiser.start_date &&
                      fundRaiser.active_fund_raiser.start_date.split('common.T')[0],
                  )
                    ? t('common.profilesec.active_fundraiser')
                    : t('common.profilesec.pending_fundraiser')
                }`}
              </Description>
              <DisplayCard
                heading={fundRaiser.active_fund_raiser.charity}
                id={fundRaiser.active_fund_raiser.fund_raiser_id}
                description={fundRaiser.active_fund_raiser.website}
                onClick={onCardClick(
                  'fundRaiser',
                  fundRaiser.active_fund_raiser,
                )}
              />
            </React.Fragment>
          )}
          {!isEmpty(fundRaiser) &&
            isEmpty(fundRaiser.active_fund_raiser) &&
            renderSelectionField(
              'fundraiser',
              t('common.profilesec.add_fundraiser'),
              toolTips(t).addFundraiser,
            )}
          {!isEmpty(fundRaiser) && !isEmpty(fundRaiser.completed_fund_raiser) && (
            <ListContainer
              className="fund-list"
              hasActiveFund={!isEmpty(fundRaiser.active_fund_raiser)}
            >
              <React.Fragment>
                <Description className="card-title">
                  {t('common.profilesec.past_fundraiser')}
                </Description>
                {fundRaiser.completed_fund_raiser.map(fundRaiserItem => (
                  <DisplayCard
                    heading={fundRaiserItem.charity}
                    id={fundRaiserItem.fund_raiser_id}
                    description={
                      fundRaiserItem.end_date
                        ? t('common.profilesec.completed_on', {
                            date: moment(
                              fundRaiserItem.end_date.split('common.T')[0],
                            ).format(props.dateFormat),
                          })
                        : ''
                    }
                    onClick={onCardClick('fundRaiser', fundRaiserItem)}
                  />
                ))}
              </React.Fragment>
            </ListContainer>
          )}
        </ListContainer>
      </React.Fragment>
    );
  };

  useEffect(() => {
    getCharities();
    getFundRaiserData();
  }, []);

  return (
    <Layout formEnabled={!isEmpty(formObject)}>
      <BackHeader
        backHandler={onBackClick}
        label={
          !isEmpty(formObject)
            ? t('common.profilesec.charity&fundraisers')
            : t('common.profilesec.page_setup')
        }
        closeHandler={onBackClick}
        noHelp
      />
      <Scrollbars
        autoHide
        renderView={scrollProps => <div {...scrollProps} id="scroll-charity" />}
      >
        <Container>
          {!isEmpty(formObject) && (
            <React.Fragment>
              <Heading>
                {formObject.type === 'fundraiser'
                  ? props.titleFund
                  : props.titleCharity}
              </Heading>
              <Description>{t('common.profilesec.charity_desc')}</Description>
            </React.Fragment>
          )}
          <Content>
            {!formObject ? (
              renderMainContent()
            ) : (
              <FormSection
                dateFormat={props.dateFormat}
                formObject={formObject}
                onSave={onSave}
              />
            )}
          </Content>
        </Container>
      </Scrollbars>
    </Layout>
  );
};

Charity.defaultProps = {
  titleCharity: '',
  subtitleCharity: '',
  subtitleFund: '',
  titleFund: '',
};

Charity.propTypes = {
  titleCharity: PropTypes.string,
  subtitleCharity: PropTypes.string,
  subtitleFund: PropTypes.string,
  titleFund: PropTypes.string,
  userDetails: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userDetails: state.userDetails,
  dateFormat: state.entity.data.base_date_format,
});

const mapDispatchToProps = dispatch => ({
  updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
  loaderAction: state => dispatch(loaderAction(state)),
  updateUserDetails: obj => dispatch(updateUserDetails(obj)),
});

export default Charity
