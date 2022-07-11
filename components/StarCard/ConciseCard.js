import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import Rating from 'react-rating';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { getLocalAmount } from 'utils/currencyUtils';
import { faStar as faLightStar } from '@fortawesome/pro-light-svg-icons';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
  Layout,
  SummaryItem,
  Label,
  Value,
  Summary,
  ValueDescription,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';


const ConciseCard = ({ data, hiddenProps, celebDetails }) => {
  const getLocalAmount = value => value
  const getLocalSymbol = () => '$'
  // const [getLocalSymbol, ] = useGetLocalAmount()
  const { t, ready } = useTranslation();
  return ready && (
    <Layout className="customStar-layout">
      <Card className="cardLayout consice-layout">
        <section className="earnings-wrap">
          {!hiddenProps.hideEarnings && (
            <FlexBoxSB className="flex-start">
              <span
                data-val={`${t('dashboard.conciseCard.totalEarnings')}:`}
                className="earnings headLbl consice-lbl"
              >
                <Link href="/manage/performance/earnings">
                  <a>
                    {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(data.total_earnings || 0), false, false)}
                  </a>
                </Link>
              </span>
              <span
                data-val={`${t('dashboard.conciseCard.pendingPayments')}:`}
                className="payments headLbl consice-lbl"
              >
                <Link href="/manage/performance/earnings">
                <a>
                  {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(data.pending_payments || 0), false, false)}
                </a>
                </Link>
              </span>
            </FlexBoxSB>
          )}
        </section>

        <Summary className="summary-wrap consice-summary">
          <SummaryItem className="summary-item">
            <span className="label">
              <Label>{t('common.requests')}:</Label>
            </span>
            <span className="value-wrapper">
              <Value className="value">
                {data.total_booking_count}
                {!hiddenProps.hideVideoPercentage && (
                  <ValueDescription className="val-desc">{` (${data.completed_percentage ||
                    0}% ${t('dashboard.conciseCard.completionRate')})`}</ValueDescription>
                )}
              </Value>
            </span>
          </SummaryItem>
          <SummaryItem className="summary-item">
            <span className="label">
              <Label>{t('dashboard.conciseCard.views')}:</Label>
            </span>
            <span className="align-mobileview">
              <span>
                <Value className="value">
                  {t('dashboard.conciseCard.viewsValue', {
                    totalVal:data.total_views,
                    recentViews:data.recent_views,
                  })}
                </Value>
              </span>
            </span>
          </SummaryItem>
          <SummaryItem className="rating-wrap">
            <span className="label">
              <Label className="rating-label">{t('dashboard.conciseCard.rating')}</Label>
            </span>
            <span className="rating label">
              <Rating
                className="rate"
                emptySymbol={
                  <FontAwesomeIcon className="rating-star" icon={faLightStar} />
                }
                fullSymbol={
                  <FontAwesomeIcon className="rating-star" icon={faStar} />
                }
                fractions={2}
                initialRating={data.rating}
                readonly
              />
              {data.rating === '0.00' && (
                <span className="no-rate">{t('dashboard.conciseCard.noRating')}</span>
              )}
            </span>
          </SummaryItem>
          {celebDetails.recent_activity_count > 0 && (
            <SummaryItem>
              <Link href="/manage/recent-activity" className="recent-link">
                <a>
                  <LinkText className="recent-link">
                    {t('open_bookings.recentActivity')} ({celebDetails.recent_activity_count})
                  </LinkText>
                </a>
              </Link>
            </SummaryItem>
          )}
        </Summary>
      </Card>
    </Layout>
  );
};

ConciseCard.propTypes = {
  data: PropTypes.object,
  hiddenProps: PropTypes.object,
  celebDetails: PropTypes.object,
};

ConciseCard.defaultProps = {
  data: {},
  hiddenProps: {},
  celebDetails: {},
};

export default ConciseCard;
