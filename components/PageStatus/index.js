import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
import ButtonSwitch from 'components/Switch';
import Modal from 'components/Modal';
import { Label } from 'styles/TextStyled';
import ProfileActive from './ProfileActive';
import { Wrapper } from './styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

function PageStatus(props) {
  const { t } = useTranslation();
  const [activateFlg, setActivateFlg] = useState(false);
  const { data: userData } = useFetchLoggedUser()
  const handleChecked = value => {
    if (!value) {
      setActivateFlg(true);
    } else {
      props.updateUserDetails(userData?.user.id, {
        celebrity_details: {
          activation_date: null,
          talent_status: accountStatus.live
        },
        user_details: {},
      });
    }
  };

  const submitSuccess = () => {
    setActivateFlg(false);
  };
  return (
    <React.Fragment>
      <Wrapper>
        <Label className="profile-status">{t('common.page_status')}</Label>
        <ButtonSwitch
          handleChecked={handleChecked}
          value={userData?.user.talent_status !== accountStatus.paused}
        />
      </Wrapper>
      {activateFlg && (
        <Modal open={activateFlg}>
          <ProfileActive
            {...props}
            modalClose={() => setActivateFlg(false)}
            submitSuccess={submitSuccess}
          ></ProfileActive>
        </Modal>
      )}
    </React.Fragment>
  );
}

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
// });

// const mapDispatchToProps = dispatch => ({
//   updateUserDetails: (id, obj) => {
//     dispatch(updateUserDetails(id, obj, null, false));
//   },
// });

export default PageStatus
