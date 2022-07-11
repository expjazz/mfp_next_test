import React, { useState } from 'react';
// import { isEmpty, cloneDeep } from 'lodash';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import ColorPicker from 'components/ColorPicker';
import FontPicker from 'components/FontPicker';
import { pageColors, pageFonts } from 'src/services/pageDesign';
import { Layout } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { useQueryClient } from 'react-query';

const StarDropdown = props => {
  const { t } = useTranslation();
  const queryClient = useQueryClient()
  const { userDetails } = props.curUserData;
  const { celebDetails } = props.curUserData;
  const { user: loggedinUserDetails } = props.logedinUserData;
  const {
    celebrity_details: loggedinCelbDetails,
  } = props.logedinUserData;

  const [selectedColor, setSelectedColor] = useState(
    !isEmpty(celebDetails && celebDetails.page_color)
      ? celebDetails.page_color
      : {},
  );

  const [selectedFont, setSelectedFont] = useState(
    !isEmpty(celebDetails && celebDetails.page_font)
      ? celebDetails.page_font
      : {},
  );

  const updateStore = (key, data) => {
    const celData = cloneDeep(celebDetails);
    const lUserData = cloneDeep(userDetails);
    celData[key] = data;
    const obj = {
      user: lUserData,
      celebrity_details: celData
    }
    queryClient.setQueryData(["loggedUser"], obj)
    const userData = queryClient.getQueryData(['loggedUser'])
    queryClient.setQueryData(['getCelebDetails', lUserData.user_id, !!userData?.user], obj)

    // props.updateCelebDetails({
    //   userDetails,
    //   celebrityDetails: celData,
    // });
    // props.updateUserDetails({
    //   userDetails: loggedinUserDetails,
    //   celbDetails: lUserData,
    // });
  };

  const colorChange = selected => {
    props.loaderAction(true);
    const result = pageColors('post', { ...selected });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.status === 'success') {
          setSelectedColor(selected);
          updateStore('page_color', selected);
          props.updateToast({
            value: true,
            message: t('common.updatedSuccessfully'),
            variant: 'success',
          });
        } else {
          props.updateToast({
            value: true,
            message: t('common.update_failed'),
            variant: 'error',
          });
        }
      })
      .catch((e) => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.update_failed'),
          variant: 'error',
        });
      });
  };

  const fontChange = selected => {
    props.loaderAction(true);
    const result = pageFonts('post', { ...selected });
    result
      .then(res => {
        props.loaderAction(false);
        if (res.status === 'success') {
          setSelectedFont(selected);
          updateStore('page_font', selected);
          props.updateToast({
            value: true,
            message: t('common.updatedSuccessfully'),
            variant: 'success',
          });
        } else {
          props.updateToast({
            value: true,
            message: t('common.update_failed'),
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('common.update_failed'),
          variant: 'error',
        });
      });
  };

  return (
    <Layout className="drop-wrapper" minimalView={props.minimalView}>
      <ColorPicker
        options={[]}
        onChange={colorChange}
        labelKey="id"
        valueKey="id"
        selected={selectedColor}
        className="color-dropdown"
        default={[]}
      />
      <FontPicker
        options={[]}
        onChange={fontChange}
        labelKey="id"
        valueKey="id"
        selected={selectedFont}
        label={userDetails && userDetails.first_name.substring(0, 5)}
        default={[]}
      />
    </Layout>
  );
};


StarDropdown.propTypes = {
  minimalView: PropTypes.bool,
  curUserData: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateProfilePhoto: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateCelebDetails: PropTypes.func.isRequired,
  logedinUserData: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
};

export default StarDropdown;
