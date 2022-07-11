import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import Button from 'components/SecondaryButton';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
import Input from 'components/TextInput';
import PlacesAutoComplete from 'components/PlacesAutoComplete';
import { Layout, Wrapper, CharCount } from './styled';
import { StripeScriptLoader } from 'src/services/myfanpark/lazyLoad';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const Bio = props => {
  const router = useRouter()
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const getTownDetails = (key, data) => {
    return {
      address: data[`${key}_town`] || '',
      location: { lat: data[`${key}_latitude`], lon: data[`${key}_longitude`] },
    };
  };

  const [description, setdescription] = useState(
    userData?.celebrity_details?.description
      ? userData?.celebrity_details?.description
      : '',
  );
  const [headline, setHeadline] = useState(
    userData?.celebrity_details?.headline
      ? userData?.celebrity_details?.headline
      : '',
  );
  const [dob, setDob] = useState(
    userData?.user?.date_of_birth
      ? moment(userData?.user?.date_of_birth)
      : '',
  );
  const [home, setHomeTown] = useState(
    getTownDetails(
      'home',
      userData?.celebrity_details?.location,
    ),
  );
  const [current, setCurrentTown] = useState(
    getTownDetails(
      'current',
      userData?.celebrity_details?.location,
    ),
  );

  const [notSaved, setNotSaved] = useState(false);

  const onTextChange = event => {
    setdescription(event.target.value);
    props.confirmSave({ saved: false, route: 'bio' });
  };

  const onheadlineChange = event => {
    setHeadline(event.target.value);
    props.confirmSave({ saved: false, route: 'bio' });
  };

  const onDobChange = date => {
    setDob(date);
    props.confirmSave({ saved: false, route: 'bio' });
  };

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.goBack();
    }
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.goBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const onLocSelect = type => (address, location) => {
    if (type === 'home') {
      setHomeTown({ address, location });
    } else {
      setCurrentTown({ address, location });
    }
    props.confirmSave({ saved: false, route: 'bio' });
  };

  const onAddressChange = type => value => {
    if (type === 'home') {
      setHomeTown({ ...home, address: value });
    } else {
      setCurrentTown({ ...current, address: value });
    }
    props.confirmSave({ saved: false, route: 'bio' });
  };

  const onSuccess = () => {
    props.confirmSave({ saved: true, route: '' });
  };

  const saveBio = () => {
    const finalUserDetails = {
      celebrity_details: {
        description,
        headline,
        location: {
          home_town:
            home.address !== null
              ? {
                  town: home.address,
                  lat: home.location ? home.location.lat : null,
                  lon: home.location ? home.location.lon : null,
                }
              : null,
          current_town:
            current.address !== null
              ? {
                  town: current.address,
                  lat: current.location ? current.location.lat : null,
                  lon: current.location ? current.location.lon : null,
                }
              : null,
        },
      },
      user_details: {
        date_of_birth: dob ? moment(dob).format('MM/DD/YYYY') : null,
      },
    };
    props.updateUserDetails(
      userData?.user?.id,
      finalUserDetails,
      onSuccess,
    );
  };

  const renderLocAuto = (data, key, label) => {
    return (
      <PlacesAutoComplete
        value={data.address}
        onAddressChange={onAddressChange(key)}
        autoCompleteOptions={{
          types: ['(cities)'],
          fields: ['geometry', 'formatted_address', 'address_components'],
        }}
        textInputProps={{
          label,
        }}
        onPlaceSelect={onLocSelect(key)}
      />
    );
  };

  return (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/profile/bio"
        confirmSave={props.confirmSave}
      />

      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}
      <Layout>
        <BackHeader
          backHandler={backHandler}
          label={t('common.design')}
          closeHandler={backHandler}
          noHelp
        />
        <Scrollbars
          autoHide
          renderView={scrollProps => <div {...scrollProps} id="bio-scroll" />}
        >
          <Heading className="nm-heading">{t('common.bio')}</Heading>
          <Description className="desc">
            {t('common.profilesec.bio_desc', {
              purchaser: entityData?.partnerData?.purchaser_plural_name,
            })}
          </Description>
          <div className="input-wrapper">
            <Wrapper className="headline-wrapper">
              <Input
                multiline
                rowsMax={10000}
                inputProps={{
                  defaultProps: {
                    value: headline,
                    onChange: onheadlineChange,
                  },
                  nativeProps: {
                    maxLength: 100,
                  },
                  labelObj: {
                    label: 'Quote',
                  },
                  mInputProps: {
                    classes: {
                      notchedOutline: 'multiline-input',
                      input: 'multiline-filed',
                      rest: {},
                    },
                    InputProps: {
                      classes: {
                        root: 'multiline-outline',
                        notchedOutline: 'notchedOutline',
                        focused: 'focused',
                        input: 'input-field',
                      },
                    },
                  },
                }}
              />
              <CharCount>
                {t('common.char_remains', { length: 100 - headline.length })}
              </CharCount>
            </Wrapper>
            <Wrapper className="bio-wrapper">
              <Input
                multiline
                rowsMax={10000}
                inputProps={{
                  defaultProps: {
                    value: description,
                    onChange: onTextChange,
                  },
                  nativeProps: {
                    maxLength: 1000,
                  },
                  labelObj: {
                    label: t('common.bio'),
                  },
                  mInputProps: {
                    classes: {
                      notchedOutline: 'multiline-input',
                      input: 'multiline-filed',
                      rest: {},
                    },
                    InputProps: {
                      classes: {
                        root: 'multiline-outline',
                        notchedOutline: 'notchedOutline',
                        focused: 'focused',
                        input: 'input-field',
                      },
                    },
                  },
                }}
              />
              <CharCount>
                {t('common.char_remains', {
                  length:
                    1000 - description.length < 0
                      ? 0
                      : 1000 - description.length,
                })}
              </CharCount>
            </Wrapper>
            <StripeScriptLoader
              uniqueId="google-maps"
              script={`https://maps.googleapis.com/maps/api/js?key=${process.
                env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places`}
              loader=""
            >
              <React.Fragment>
                <Wrapper className="info-wrapper top-pad">
                  {renderLocAuto(home, 'home', t('common.home_town'))}
                </Wrapper>
                <Wrapper className="info-wrapper">
                  {renderLocAuto(current, 'current', t('common.current_town'))}
                </Wrapper>
              </React.Fragment>
            </StripeScriptLoader>
            <Wrapper className="info-wrapper">
              <DatePicker
                dateFormat={
                  userData?.user?.date_of_birth_format
                }
                // dateFormat="MM-DD-YYYY"
                peekNextMonth
                showYearDropdown
                showMonthDropdown
                dropdownMode="scroll"
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                customInput={
                  <Input
                    inputProps={{
                      labelObj: {
                        label: t('common.dob'),
                      },
                      nativeProps: {
                        readOnly: true,
                      },
                    }}
                  />
                }
                customInputRef="dt"
                popperPlacement="top"
                selected={dob}
                onChange={onDobChange}
                maxDate={moment()}
              />
            </Wrapper>
            <FlexCenter className="align-center">
              <Button className="save-button" onClick={saveBio}>
                {t('common.save')}
              </Button>
            </FlexCenter>
          </div>
        </Scrollbars>
      </Layout>
    </React.Fragment>
  );
};

Bio.defaultProps = {
  goBack: () => {},
};

Bio.propTypes = {
  userDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userDetails: state.userDetails,
  dateFormat: state.entity.data.base_date_format,
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserDetails: (id, obj, onSuccess) =>
      dispatch(updateUserDetails(id, obj, onSuccess, false)),
  };
}

export default Bio
