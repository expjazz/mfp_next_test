import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { readDataUrl } from 'src/utils/domUtils';
import { getImgResolution } from 'src/utils/imageProcessing';
import { readDataUrl } from 'customHooks/domUtils';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

function BannerUpload(props) {
  const { t } = useTranslation();
  useDisableRefetchOnFocus()
  const onFileChange = async event => {
    const {
      target: { files },
    } = event;
    const result = await getImgResolution(files[0]);
    if (result.width < 1500 || result.height < 300) {
      props.updateToast({
        value: true,
        message:t('star_profile.banner_size'),
        variant: 'error',
        time: 8000,
      });
      return;
    }
    const regex = new RegExp(
      '([a-zA-Z0-9~!@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.jpg|.jpeg|.png)$',
    );
    if (files && files[0] && regex.test(files[0].type.toLowerCase())) {
      const data = await readDataUrl(files[0]);
      props.imageData(data);
    } else {
      props.updateToast({
        value: true,
        message: t('star_profile.image_files'),
        variant: 'error',
      });
    }
  };

  return (
    <input
      ref={props.inputRef}
      accept="image/*"
      id="bannerUpload"
      onChange={onFileChange}
      type="file"
    />
  );
}

BannerUpload.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.object]),
  imageData: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};
BannerUpload.defaultProps = {
  inputRef: null,
};

export default BannerUpload;
