import React, { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { getExifData, imageRotation } from '../../../../utils/imageProcessing';
import { Reaction, ReactionInput, ReactionTitle } from './styled';
import { getExifData, imageRotation } from '../../../../src/utils/imageProcessing';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const ReactionUpload = props => {
  useDisableRefetchOnFocus()
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { data: entityData } = useGetPartner()
  const onFileChange = () => {
    const { files } = inputRef.current;
    const allowedExtensions = /((\.mp4)|(\.MOV)|(\.jpeg)|(\.jpg)|(\.png))$/i;
    const allowedTypes = /((mp4)|(MOV)|(quicktime)|(jpeg)|(jpg)|(png))$/i;
    const imageExtensions = /((jpeg)|(jpg)|(png))$/i;
    if (!allowedExtensions.exec(inputRef.current.value)) {
      // this.setState({ filesError: 'Incorrect file format' });
    } else {
      Array.from(files).forEach(file => {
        let reactionFile = {};
        const getFile = async result => {
          reactionFile = {
            fileData: file,
            extension: imageExtensions.exec(file.type)
              ? file.type.split('/')[1]
              : 'mp4',
            fileType: imageExtensions.exec(file.type) ? 'image' : 'video',
          };
          if (reactionFile.fileType === 'image') {
            const exifData = await getExifData(reactionFile.fileData);
            const correctedFile = await imageRotation(file, exifData);
            reactionFile.fileData = correctedFile;
            reactionFile.fileURL = window.URL.createObjectURL(correctedFile);
          }
          props.getReactionFile(reactionFile);
        };
        if (allowedTypes.exec(file.type)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = getFile;
        }
      });
      inputRef.current.value = '';
    }
  };

  const onReactionClick = () => {
    if (!props.isLoggedIn) {
      props.toggleLogin(true, {noRedirect: true});
    } else {
      inputRef.current.click();
    }
  };

  return (
    <Reaction>
      <ReactionInput
        type="file"
        ref={inputRef}
        accept=".png, .jpeg, .jpg, .mp4, .MOV"
        onChange={onFileChange}
      />
      <ReactionTitle>
        {t('common.love_reaction', {talentPlural: entityData?.partnerData?.talent_plural_name})}
      </ReactionTitle>
      <span className="btn-wrp">
        <button className="action-btn" onClick={onReactionClick}>
          {t('common.uploadReaction')}
        </button>
      </span>
    </Reaction>
  );
};

ReactionUpload.propTypes = {
  getReactionFile: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default ReactionUpload;
