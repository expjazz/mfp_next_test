import React, { useContext } from 'react';
// import ShareButton from 'components/ShareButton';
// import { useTranslation } from 'next-i18next';
// import { getShortName } from 'src/utils/dataToStringFormatter';
import { ShareContent } from './constants';
import { ShareWrap } from './styled';
import ShareButton from 'components/ShareButton';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { useTranslation } from 'next-i18next';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

const SharePage = (props) => {
  const { buttonLabel = '', buttonClass = '' } = props
  // const { starDetails } = useContext(StarContext);
  const router = useRouter()
  const { data: celebrityData } = useGetCelebrityData()
  const starName = getShortName(
    props.star?.nick_name || celebrityData?.user?.nick_name,
    props.star?.first_name || celebrityData?.user?.first_name,
  );
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  return (
    <ShareWrap>
      <ShareButton
        secondary
        buttonText={buttonLabel || t('common.sharePage')}
        classes={{
          button: `share-btn ${buttonClass}`,
        }}
        shareUrl={`https://${router.query.site}/${props.star?.user_id || celebrityData?.user?.user_id}`}
        content={ShareContent(
          starName,
          `https://${router.query.site}/${props.star?.user_id || celebrityData?.user?.user_id}`,
          entityData
        )}
      />
    </ShareWrap>
  );
};

export default SharePage;
