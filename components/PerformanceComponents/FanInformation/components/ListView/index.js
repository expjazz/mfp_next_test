import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import PropTypes from 'prop-types';
import { List, Col, Li, ListEle, ColWrap } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

const ListView = ({ list, selectionView, isFollowView, onClick }) => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const getListDate = listItem => {
    if (selectionView) {
      return listItem.created_date;
    } else if (isFollowView) {
      return listItem.followed_date;
    }
    return listItem.purchased_date || listItem.followed_date;
  };

  const onListClick = listItem => () => {
    if (listItem.purchaser || selectionView) {
      onClick(listItem);
    }
  };

  const renderFanType = listItem => {
    if (listItem.purchaser && !isFollowView) {
      return `${t('common.purchaser')}${listItem.follower ? `/${t('common.follower')}` : ''}`;
    }
    return t('common.follower');
  };

  return (
    <List>
      {list.map(listItem => (
        <Li>
          <ListEle>{moment(getListDate(listItem)).format('M/D/YYYY')}</ListEle>
          <ColWrap>
            <Col>
              <ListEle
                onClick={onListClick(listItem)}
                highlight={listItem.purchaser || selectionView}
              >
                {listItem.name || listItem.request_type}
              </ListEle>
              {!selectionView && (
                <ListEle className="follower">
                  {renderFanType(listItem)}
                </ListEle>
              )}
            </Col>
            <Col>
              {selectionView ? (
                <ListEle>
                  {t('common.paid')}: {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(listItem.amount), false, false)}
                </ListEle>
              ) : (
                <React.Fragment>
                  <ListEle isEmail>{listItem.email}</ListEle>
                  {listItem.purchaser && !isFollowView && (
                    <ListEle>
                      {t('common.performance.lifetime_value')}{' '}
                      {getLocalSymbol()}
                      {numberToDecimalWithFractionTwo(
                        getLocalAmount(listItem.total_bookings_amount),
                        true,
                        false,
                      )}
                    </ListEle>
                  )}
                </React.Fragment>
              )}
            </Col>
          </ColWrap>
        </Li>
      ))}
    </List>
  );
};

ListView.defaultProps = {
  list: [],
  isFollowView: false,
  onClick: () => {},
  selectionView: false,
};

ListView.propTypes = {
  list: PropTypes.array,
  isFollowView: PropTypes.bool,
  onClick: PropTypes.func,
  selectionView: PropTypes.bool,
};

export default ListView;
