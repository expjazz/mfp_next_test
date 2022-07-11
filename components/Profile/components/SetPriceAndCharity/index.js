import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Layout, Heading, Content, SetPriceWrapper } from './styled';
import { BackArrow } from '../../../../styles/CommonStyled';
import PrimaryButton from '../../../../components/PrimaryButton';
import { TextInput } from '../../../TextField';
// import { updateUserDetails } from '../../../../store/shared/actions/saveSettings';
import {
  iosPriceFinder,
  numberToCommaFormatter,
  commaToNumberFormatter,
} from 'src/utils/dataformatter';
import { isEmpty } from 'src/utils/dataStructures';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const SetPriceAndCharity = props => {
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  const { data: config } = useConfigPartner()
  const inAppPriceList = config?.in_app_pricing
  const { t } = useTranslation();
  const celebrityDetails = userData?.celebrity_details;
  const [priceCharityData, setpriceCharityData] = useState({
    price: {
      value: celebrityDetails.rate
        ? numberToCommaFormatter(celebrityDetails.rate)
        : '',
      isValid: false,
      message: '',
    },
    bookingsLimit: celebrityDetails.weekly_limits
      ? celebrityDetails.weekly_limits
      : '',
  });
  const [confirmPrice, setconfirmPrice] = useState(false);
  const [enableCharity, setenableCharity] = useState(
    !isEmpty(celebrityDetails.charity),
  );
  const [modifyDetails, setmodifyDetails] = useState(
    !isEmpty(celebrityDetails.charity),
  );
  const [showCharity, setShowCharity] = useState(false);
  const saveFormEntries = (event, type) => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    const dollarpattern = /^\$.*$/;
    const value = dollarpattern.test(event.target.value)
      ? event.target.value.substr(1)
      : event.target.value;

    if (type === 'price' && value !== '') {
      setpriceCharityData({
        ...priceCharityData,
        [type]: {
          ...priceCharityData.type,
          value: pattern.test(commaToNumberFormatter(value))
            ? numberToCommaFormatter(commaToNumberFormatter(value))
            : priceCharityData.price.value,
        },
      });
    } else if (type === 'price' && value === '') {
      setpriceCharityData({
        ...priceCharityData,
        [type]: {
          ...priceCharityData.type,
          value,
        },
      });
    } else {
      setpriceCharityData({
        ...priceCharityData,
        [type]: event.target.value,
      });
    }
  };
  const convertedApplePrice = (actualPrice, inAppPriceList) => {
    const priceText =
      actualPrice < 1000 || !actualPrice
        ? t('common.profilesec.apple_price')
        : t('common.profilesec.apple_price2', {
            purchaser: entityData?.partnerData?.purchaser_plural_name,
          });

    return priceText;
  };
  const checkPriceRequired = () => {
    const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
    const priceEmpty = !priceCharityData.price.value;
    if (priceEmpty) {
      const priceMsg = t('common.profilesec.price_cant_be_blank');
      setpriceCharityData({
        ...priceCharityData,
        price: {
          ...priceCharityData.price,
          message: priceMsg,
        },
      });
      return false;
    }
    if (!pattern.test(commaToNumberFormatter(priceCharityData.price.value))) {
      setpriceCharityData({
        ...priceCharityData,
        price: {
          ...priceCharityData.price,
          message: t('common.profilesec.price_number'),
        },
      });
      return false;
    }
    setpriceCharityData({
      ...priceCharityData,
      price: {
        ...priceCharityData.price,
        message: '',
        isValid: true,
      },
    });
    return true;
  };

  const backArrowClickHandler = () => {
    if ((enableCharity && !modifyDetails) || showCharity) {
      !modifyDetails ? setenableCharity(false) : setShowCharity(false);
    } else if (confirmPrice) {
      setconfirmPrice(false);
    } else {
      props.goBack();
    }
  };

  const saveSetPriceAndCharity = () => {
    const priceValue = commaToNumberFormatter(priceCharityData.price.value);
    if (checkPriceRequired()) {
      if (parseInt(priceValue) < 500 || confirmPrice) {
        const finalUserDetails = {
          celebrity_details: {
            rate: priceValue,
            weekly_limits: priceCharityData.bookingsLimit
              ? priceCharityData.bookingsLimit
              : 0,
          },
          user_details: {},
        };
        props.updateUserDetails(
          props.userDetails.settings_userDetails.id,
          finalUserDetails,
        );
        setconfirmPrice(false);
      } else {
        setconfirmPrice(true);
      }
    }
  };
  const renderContent = () => {
    return (
      <React.Fragment>
        <Heading>
          {confirmPrice ? props.confirmationTitle : props.title}
        </Heading>
        <Content>
          <SetPriceWrapper.Description error={priceCharityData.price.message}>
            {priceCharityData.price.message
              ? priceCharityData.price.message
              : confirmPrice
              ? props.confirmDescription
              : props.description}
          </SetPriceWrapper.Description>
          <SetPriceWrapper.WrapsInput>
            <TextInput
              error={!!priceCharityData.price.message}
              placeholder={t('common.price')}
              type="text"
              name="price"
              value={`${priceCharityData.price.value !== '' ? '$' : ''}${
                priceCharityData.price.value
              }`}
              onChange={event => saveFormEntries(event, 'price')}
              nativeProps={{ pattern: '\\d*' }}
              InputProps={{
                classes: {
                  error: 'input-error',
                },
              }}
            />
          </SetPriceWrapper.WrapsInput>
          <React.Fragment>
            {confirmPrice ? null : (
              <SetPriceWrapper.Label>
                {priceCharityData.price.value &&
                priceCharityData.price.value > 0 &&
                priceCharityData.price.value < 10000 ? (
                  <React.Fragment>
                    {t('common.profilesec.converted_apple_price')}{' '}
                    <b>
                      $
                      {iosPriceFinder(
                        priceCharityData.price.value,
                        inAppPriceList,
                      )}
                    </b>
                    .{' '}
                  </React.Fragment>
                ) : (
                  ''
                )}
                {convertedApplePrice(
                  commaToNumberFormatter(priceCharityData.price.value),
                  inAppPriceList,
                )}
              </SetPriceWrapper.Label>
            )}
            {!confirmPrice && (
              <React.Fragment>
                <SetPriceWrapper.Description className="bookings-count">
                  {t('common.profilesec.bookings_can_handle')}
                </SetPriceWrapper.Description>
                <TextInput
                  value={priceCharityData.bookingsLimit}
                  fullWidth
                  placeholder={`${
                    priceCharityData.bookingsLimit !== '' ? '' : 0
                  }`}
                  defaultValue={25}
                  onChange={event => saveFormEntries(event, 'bookingsLimit')}
                  nativeProps={{ pattern: '\\d*' }}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        </Content>
        <Layout.ButtonWrapper className="align-center">
          <PrimaryButton
            className="save-button"
            onClick={saveSetPriceAndCharity}
          >
            {confirmPrice ? t('common.profilesec.iam_worth_it') : t('common.save')}
          </PrimaryButton>
        </Layout.ButtonWrapper>
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <BackArrow className="leftArrow" onClick={backArrowClickHandler} />
      {renderContent()}
    </Layout>
  );
};

const mapStateToProps = state => ({
  userDetails: state.userDetails,
  inAppPriceList: state.config.data.in_app_pricing || [],
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  };
}

export default SetPriceAndCharity
