import React, { useMemo } from 'react';
import { deliveryMethods } from '../../../../../src/constants/requestTypes/funTypes';
import { getActiveOptions } from '../../utils';
import { Wrap } from './styled';
import { useRouter } from 'next/router';
import RequestItems from '../../../../RequestItems';
const ReqList = ({
  showHome,
  showActive = true,
  activeServices,
  hasSuggestions,
  digitalGoodsList,
}) => {
  const router = useRouter()
  const userId = router.query.celebrityId
  const prodName = router.asPath.split('/')
  const reqType = prodName.length > 2 ? prodName[2] : '';

  const services = useMemo(() => {
    let liveItem = null;
    let funItem = null;
    if (digitalGoodsList?.length) {
      liveItem = digitalGoodsList.find(
        fun => fun.delivery_method === deliveryMethods.videoCalls,
      );
      funItem = digitalGoodsList.find(
        fun => fun.delivery_method !== deliveryMethods.videoCalls,
      );
    }
    const serviceList = getActiveOptions(activeServices, liveItem, funItem);
    return serviceList.map(prod => prod.label);
  }, [digitalGoodsList?.length, userId, activeServices]);

  return (
    <Wrap>
      <RequestItems
        classes={{
          root: 'request-items',
        }}
        options={[
          ...(showHome ? ['home'] : []),
          ...services,
          // ...(hasSuggestions ? ['suggest'] : []),
        ]}
        selected={showActive ? reqType : ''}
        userId={userId}
      />
    </Wrap>
  );
};

// const mapStateToProps = state => ({
//   activeServices:
//     state.starDetails.celebDetails.celebrityDetails.activeServices,
// });

export default ReqList;
