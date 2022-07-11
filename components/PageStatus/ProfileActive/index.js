import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import Input from 'components/TextInput';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import Button from 'components/SecondaryButton';
import { Layout } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
  //   alertData: state.commonReducer.alertData,
  //   dateFormat: state.entity.data.base_date_format,
  //   userDetails: state.userDetails.settings_userDetails,
const ProfileActive = props => {
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const dateFormat = entityData?.partnerData?.base_date_format
  const userDetails = userData?.user
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const onChange = dt => {
    setDate(dt);
  };
  const onSubmit = () => {
    props.updateUserDetails(userDetails.id, {
      celebrity_details: {
        activation_date: `${moment.utc(date).format('YYYY-MM-DD')}`,
        talent_status: accountStatus.paused,
      },
      user_details: {},
    });
    props.submitSuccess();
  };
  return (
    <Layout>
      <BackHeader
        className="closeBtn"
        closeHandler={props.modalClose}
        id="id_close"
      />
      <Heading className="heading">{t('common.pageStatusHeading')}</Heading>
      <div className="dt-wrap">
        <DatePicker
          dateFormat={dateFormat}
          withPortal
          minDate={moment()}
          customInput={
            <Input
              inputProps={{
                nativeProps: { readOnly: true },
                labelObj: {
                  label: dateFormat,
                },
              }}
            />
          }
          customInputRef="dt"
          popperPlacement="bottom"
          selected={date}
          onChange={dt => onChange(dt, 'date')}
        />
        <FontAwesomeIcon icon={faCalendarAlt} className="cal-icon" />
      </div>
      <Button
        className="active-btn"
        onClick={onSubmit}
        disabled={!moment(date).isValid()}
        isDisabled={!moment(date).isValid()}
      >
        {t('common.submitButton')}
      </Button>
    </Layout>
  );
};

ProfileActive.propTypes = {
  modalClose: PropTypes.func.isRequired,
  submitSuccess: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

export default ProfileActive

  // state => ({
  //   alertData: state.commonReducer.alertData,
  //   dateFormat: state.entity.data.base_date_format,
  //   userDetails: state.userDetails.settings_userDetails,
  // }),
  // dispatch => ({
  //   updateUserDetails: (id, obj) => {
  //     dispatch(updateUserDetails(id, obj, null, false));
  //   },
  // }),