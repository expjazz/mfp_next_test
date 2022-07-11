import React from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import RequestCard from 'components/RequestCard';
// import { accountStatus } from 'src/constants/requestTypes/accountStatus';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { Ul, HeadingH1 } from '../../../styled';
import { PromoWrapper } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { Ul, HeadingH1 } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { useTranslation } from 'next-i18next';
import { locStorage } from 'src/utils/localStorageUtils';

function CommercialShoutout({ commercialList, selected, starData, ...props }) {
  const commercialClick = commercial => () => {
    locStorage.removeItem('req_data');
    props.commercialClick(commercial);
  };
  const { t } = useTranslation();
  return (
    <PromoWrapper>
      <HeadingH1>{t('purchase_flow.commercial.choose_request')}</HeadingH1>
      <Ul>
        {!isEmpty(commercialList) &&
          commercialList.map(commercial => {
            return (
              <RequestCard
                key={commercial.id}
                data={{
                  celbId: starData.userData.id,
                  isStar: props.fanData?.celebrity,
                  type: requestTypesKeys.commercial,
                  rType: 'Commercial',
                  promoDetails: starData.celbData.promocode,
                  // discountObj: starData.celbData.discount,
                  title: commercial.title,
                  image:
                    commercial.sample_image || commercial.sample_image_original,
                  desc: commercial.description,
                  amount: commercial.amount,
                  btnLabel: t('purchase_flow.commercial.request_price'),
                  productId: commercial.id,
                  availability:
                    starData.userData.talent_status === accountStatus.live || starData.userData.talent_status === accountStatus.hidden,
                }}
                onClick={commercialClick(commercial)}
                updateToast={props.updateToast}
              />
            );
          })}
      </Ul>
    </PromoWrapper>
  );
}

CommercialShoutout.propTypes = {
  commercialClick: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  commercialList: PropTypes.array,
  selected: PropTypes.object,
  starData: PropTypes.object.isRequired,
  fanData: PropTypes.object.isRequired,
};

CommercialShoutout.defaultProps = {
  commercialList: [],
  selected: {},
};

export default CommercialShoutout;
