import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-regular-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import DownloadHandler from 'components/DownloadHandler';
import Dropdown from 'components/Dropdown';
import Button from 'components/SecondaryButton';
import { EmptyText, FlexBoxSB } from 'styles/CommonStyled';
import { Description } from 'styles/TextStyled';
// import { getLocalAmount } from 'utils/currencyUtils';
import { options, filterOptions } from './constants';
import {
  Layout,
  Wrapper,
  List,
  DropWrap,
  DialogStyled,
  PlanContent,
} from './styled';
import EarningList from './components/EarningList';
import { useFetchGetPaidList, useFetchPendingList, useGetPartner } from 'customHooks/reactQueryHooks';
import { getEarningsList } from './actions';
import { useGeneral } from 'src/context/general';
import { downloadEarningsCSV, downloadEarningsPDF } from 'src/services/myfanpark/celebActions';

const Earnings = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const [{data: pendingListData, isLoading: penLoading, isFetching: penFetching}, fetchPendingList] = useFetchPendingList()
  const pendingList = {...pendingListData, loading: penLoading || penFetching}
  const [{data: paidListData, isLoading: paidLoading, isFetching: paidFetching}, fetchPaidList] = useFetchGetPaidList()
  const paidList = {...paidListData, loading: paidFetching || paidLoading}
  const [paymentStatus, setPaymentStatus] = useState(options(t)[0]);
  const [historyFilter, setHistoryFilter] = useState(filterOptions(t)[0]);
  const [showPlan, toggPlan] = useState(false);
  const [downloadOption, setDownloadOption] = useState(false)

  const getEarnings = (
    status = paymentStatus.id,
    filter = historyFilter.id,
  ) => {
    if (status === 'all') {
      getEarningsList('pending', filter, 0, true, 20, [], fetchPendingList);
      getEarningsList('paid', filter, 0, true, 20, [], fetchPaidList);
    } else {
      getEarningsList(status, filter, 0, true, 20, [], status === 'pending' ? fetchPendingList : fetchPaidList);
    }
  };

  const fetchMoreEarnings = (offset, refresh) => {
    const prevData = paymentStatus.id === 'pending' ? pendingList.data : paidList.data
    const func = paymentStatus.id === 'pending' ? fetchPendingList : fetchPaidList
    getEarningsList(paymentStatus.id, historyFilter.id, offset, refresh, 20, prevData, func);
  };

  const handlePaymentFilter = option => {
    setPaymentStatus(option);
    getEarnings(option.id);
  };

  const handleHistoryFilter = option => {
    setHistoryFilter(option);
    getEarnings(paymentStatus.id, option.id);
  };

  const downloadCsv = () => {
    downloadEarningsCSV(props.downloadFunc, dispatch, t, entityData?.partnerData)
    setDownloadOption(false)
  };

  const downloadPdf = () => {
    downloadEarningsPDF(props.downloadFunc, dispatch, t, entityData?.partnerData)
    setDownloadOption(false)
  }

  const renderDownBtn = () => {
    return (
      <span className="download-btn" role="presentation" onClick={() => setDownloadOption(true)}>
        <FontAwesomeIcon className="download-icon" icon={faDownload} />
      </span>
    );
  };

  useEffect(() => {
    // if (isEmpty(props.dashBoardData)) {
    //   props.getDashboardData();
    // }
    getEarnings();
  }, []);

  return (
    <Layout>
      {renderDownBtn()}
      <DialogStyled
        open={showPlan}
        onClose={() => toggPlan(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
        <PlanContent>
          <span className="heading">
            {t('common.performance.your_plan_details')}
          </span>
          <span className="small-head">
            {t('common.requests')}
            <Description>
              {t('common.performance.earnings_desc', {
                fees: props.dashBoardData?.request_platform_fee || 0,
              })}
            </Description>
          </span>
          <span className="small-head">
            {t('common.performance.tips')}
            <Description>
              {t('common.performance.earnings_desc', {
                fees: props.dashBoardData?.tip_platform_fee || 0,
              })}
            </Description>
          </span>
          <span className="small-head">
            {t('common.performance.earnings_payouts')}
            <Description>{t('common.performance.third_party')}</Description>
          </span>
          {props.entityData.entity_id === 'STARSONA-US-1' && (
            <Description className="link-desc">
              <Trans i18nKey="common.performance.read_more_stripe">
                <a
                  className="link"
                  target="_blank"
                  href="https://stripe.com/pricing"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
                on Stripe processing fees
              </Trans>
            </Description>
          )}
          <Button className="action-btn" onClick={() => toggPlan(false)}>
            {t('common.close')}
          </Button>
        </PlanContent>
      </DialogStyled>
      <DialogStyled
        open={downloadOption}
        onClose={() => setDownloadOption(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
        <PlanContent>
          <div className="terms-modal confirm-modal">
              <span className="text cus-text">{t('common.download_option')}</span>
              <div className="btn-confirm-wrap">
                <Button onClick={downloadCsv} secondary className="btn-keep">
                  {t('common.download_csv')}
                </Button>
                <Button onClick={downloadPdf}>{t('common.download_pdf')}</Button>
              </div>
            </div>
        </PlanContent>
      </DialogStyled>
      <Wrapper>
        <FlexBoxSB className="flex-start">
          <span
            data-val={t('common.total_earnings')}
            className="earnings headLbl"
          >
            {/* {entity('currencyData').symbol}{numberToDecimalWithFractionTwo(getLocalAmount(props.dashBoardData?.total_earnings), false, false)} */}
            {/* should be pure USD, not the data in local currency */}$
            {numberToDecimalWithFractionTwo(
              props.dashBoardData?.total_earnings || 0,
              false,
              false,
            )}
          </span>
          <span data-val={t('common.pending_pay')} className="payments headLbl">
            {/* {entity('currencyData').symbol}{numberToDecimalWithFractionTwo(getLocalAmount(props.dashBoardData?.pending_payments), false, false)} */}
            {/* Same as above (should be USD) */}$
            {numberToDecimalWithFractionTwo(
              props.dashBoardData?.pending_payments || 0,
              false,
              false,
            )}
          </span>
          <span
            className="info"
            role="presentation"
            onClick={() => toggPlan(true)}
          >
            {t('common.performance.plan_details')}
          </span>
        </FlexBoxSB>
      </Wrapper>

      <Scrollbars
        autoHide
        renderView={scrollProps => (
          <div {...scrollProps} id="earnings-scroll" />
        )}
        renderTrackHorizontal={scrollViewProps => (
          <div {...scrollViewProps} className="track-horizontal" />
        )}
        renderTrackVertical={scrollViewProps => (
          <div {...scrollViewProps} className="track-vertical" />
        )}
      >
        <List>
          <DropWrap>
            <Dropdown
              rootClass="drop-down"
              secondary
              selected={paymentStatus}
              options={options(t)}
              labelKey="title"
              valueKey="id"
              onChange={handlePaymentFilter}
              placeHolder=""
            />

            <Dropdown
              rootClass="drop-down"
              secondary
              selected={historyFilter}
              options={filterOptions(t)}
              labelKey="title"
              valueKey="id"
              onChange={handleHistoryFilter}
              placeHolder=""
            />
          </DropWrap>

          <span className="usd">{t('common.performance.all_in_usd')}</span>

          {paymentStatus.id === 'all' &&
            isEmpty(pendingList.data) &&
            !pendingList.loading &&
            !paidList.loading &&
            isEmpty(paidList.data) && (
              <EmptyText className="empty-msg">
                {t('common.performance.empty_text', {
                  purchaser: props.entityData?.purchaser_plural_name,
                })}
              </EmptyText>
            )}
          {(paymentStatus.id === 'all' || paymentStatus.id === 'pending') &&
            pendingList.data.length !== 0 && (
              <EarningList
                {...props}
                dataList={pendingList?.data || []}
                noDataText={t('common.no_records_found')}
                loading={pendingList.loading}
                status="pending"
                userDetails={props.userDetails}
                stripeUrl={props.stripeUrl}
                noScroll
                toggleBookingModal={props.toggleBookingModal}
              />
            )}
          {paymentStatus.id === 'pending' &&
            pendingList.data.length === 0 &&
            !pendingList.loading && (
              <EmptyText className="empty-msg">
                {t('common.performance.no_pending_payment')}
              </EmptyText>
            )}
          {((paymentStatus.id === 'all' &&
            (paidList.data.length !== 0 ||
              paidList.loading)) ||
            paymentStatus.id === 'paid') && (
            <EarningList
              {...props}
              dataList={paidList?.data || []}
              noDataText={t('common.no_records_found')}
              loading={paidList.loading}
              limit={paidList.limit}
              offset={paidList.offset}
              totalCount={paidList.count}
              fetchData={fetchMoreEarnings}
              status="paid"
              toggleBookingModal={props.toggleBookingModal}
            />
          )}
        </List>
      </Scrollbars>
    </Layout>
  );
};

Earnings.defaultProps = {
  disbursement: {},
};

Earnings.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  dashBoardData: PropTypes.object.isRequired,
  disbursement: PropTypes.object,
  getEarningsList: PropTypes.func.isRequired,
  earningsList: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  stripeUrl: PropTypes.string.isRequired,
  downloadEarnings: PropTypes.func.isRequired,
  entityData: PropTypes.object.isRequired,
};

export default DownloadHandler(Earnings);
