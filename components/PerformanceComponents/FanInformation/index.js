import React, { useState, useReducer, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import { Scrollbars } from 'react-custom-scrollbars';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import Pagination from 'components/Pagination';
import Loader from 'components/Loader';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import DownloadHandler from 'components/DownloadHandler';

import { EmptyText } from 'styles/CommonStyled';
import ListView from './components/ListView';
import { dataReducer, initialState } from './reducers';
import { typeList } from './constants/typeList';
import { historyList } from './constants/historyList';
import { Container } from '../styled';
import { Wrap, ConciseView, ScrollWrap } from './styled';
import { toggleBookingModal, useGeneral } from 'src/context/general';
import { capitalize } from '@material-ui/core';
import { downloadFanDetails, getFanDetails } from 'src/services/myfanpark/celebActions';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

const FanInformation = props => {
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const [filterType, setFilType] = useState(typeList[0]);
  const [histType, setHistType] = useState(historyList[0]);
  const [mainList, mainDispatch] = useReducer(dataReducer, initialState);
  const [purList, purDispatch] = useReducer(dataReducer, initialState);
  const [selected, setSelected] = useState({});

  const setDrop = type => value => {
    if (type === 'filt') {
      setFilType(value);
    } else {
      setHistType(value);
    }
  };

  const fetchData = async (offset, refresh = false) => {
    const dispatchFunc = selected.id ? purDispatch : mainDispatch;
    const limit = selected.id ? purList.limit : mainList.limit;
    dispatchFunc({ type: 'start', refresh });
    try {
      const resp = await getFanDetails(
        offset,
        limit,
        !selected.id
          ? {
              fanType: filterType.value,
              time: histType.value,
            }
          : { id: selected.id },
      );
      if (resp) {
        dispatchFunc({
          type: 'success',
          data: resp.fan_details || resp.request_details,
          offset,
          count: resp.count,
        });
      }
    } catch (e) {
      dispatchFunc({ type: 'end' });
    }
  };

  const onListClick = (listItem = {}) => {
    if (selected.id && listItem.id) {
      toggleBookingModal(
        dispatch,
        true,
        { id: listItem.id },
        true,
        t('common.performance.faninfo_back_lbl', {
          purchaser: props.entityData?.purchaser_singular_name,
        }),
      );
    } else {
      window.scrollTo(0, 0);
      props.modalBackHandler(!listItem.id);
      setSelected(listItem);
    }
  };

  const onNextPage = low => {
    fetchData(low, true);
  };

  const renderPaginatedView = listData => {
    return (
      <React.Fragment>
        <Pagination
          classes={{ root: 'pagination-wrapper', pageDisplay: 'page-display' }}
          offset={listData.offset}
          count={listData.dataCount}
          limit={listData.limit}
          dataLoading={listData.loading}
          onChange={onNextPage}
        />
        {listData.loading && <Loader class="loader" />}
        {!listData.loading && !listData.dataList.length ? (
          <EmptyText>{t('common.performance.no_data_comment')}</EmptyText>
        ) : null}
        {!listData.loading && listData.dataList.length ? (
          <ScrollWrap selected={selected.id}>
            <Scrollbars
              autoHide
              renderView={scrollProps => (
                <div {...scrollProps} id="fan-info-scroll" />
              )}
            >
              <ListView
                isFollowView={filterType.value === 'followers'}
                selectionView={Boolean(selected.id)}
                onClick={onListClick}
                list={listData.dataList}
              />
            </Scrollbars>
          </ScrollWrap>
        ) : null}
      </React.Fragment>
    );
  };

  const download = () => {
    downloadFanDetails(dispatch)(filterType.value, histType.value, props.downloadFunc);
  };

  useEffect(() => {
    if (selected.id) {
      fetchData(0, true);
    }
  }, [selected.id]);

  useEffect(() => {
    fetchData(0, true);
  }, [filterType.value, histType.value]);

  return (
    <Container>
      {selected.id && (
        <BackHeader
          backHandler={onListClick}
          label={t('common.performance.faninfo_back_lbl', {
            purchaser: capitalize(props.entityData?.purchaser_singular_name),
          })}
          rootClass="child-back-header"
        />
      )}
      <Wrap selectedId={selected.id}>
        <Heading className="title">
          {selected.id
            ? t('common.performance.purchase_from', {
                name: selected.name,
              })
            : t('common.performance.purchaser_data', {
                purchaser: capitalize(props.entityData?.purchaser_singular_name),
              })}
          {!selected.id && (
            <FontAwesomeIcon
              className="download-icon"
              onClick={download}
              icon={faDownload}
            />
          )}
        </Heading>
        {selected.id ? (
          <ConciseView>
            <article className="col">
              <span className="head">
                {t('common.performance.total_value')}
              </span>
              <span className="bold">
                {getLocalSymbol()}
                {numberToDecimalWithFractionTwo(
                  selected.total_amount,
                  true,
                  false,
                )}
              </span>
            </article>
            <article className="col">
              <span>{selected.name}</span>
              {selected.email}
            </article>
          </ConciseView>
        ) : (
          <React.Fragment>
            <Dropdown
              rootClass="drop-down"
              secondary
              selected={filterType}
              options={typeList}
              labelKey="label"
              valueKey="value"
              onChange={setDrop('filt')}
              placeHolder={t('common.selectReqType')}
            />
            <Dropdown
              rootClass="drop-down"
              secondary
              selected={histType}
              options={historyList}
              labelKey="label"
              valueKey="value"
              onChange={setDrop('hist')}
              placeHolder={t('common.selectReqType')}
            />
          </React.Fragment>
        )}
        {renderPaginatedView(selected.id ? purList : mainList)}
      </Wrap>
    </Container>
  );
};

FanInformation.propTypes = {
  downloadFanDetails: PropTypes.func.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
};

FanInformation.defaultProps = {};

// const mapDispatchToProps = dispatch => ({
//   downloadFanDetails: (fanType, timeLim, download) =>
//     dispatch(downloadFanDetails(fanType, timeLim, download)),
//   toggleBookingModal: (state, bookingData, starMode, backLabel) =>
//     dispatch(toggleBookingModal(state, bookingData, starMode, backLabel)),
// });

export default DownloadHandler(FanInformation)
