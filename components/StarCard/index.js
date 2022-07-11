import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Rating from 'react-rating';
import Link from 'next/router';
import { FlexBoxSB, Card } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faComment,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faLightStar } from '@fortawesome/pro-light-svg-icons';
import { faTv } from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import FundProgress from 'components/FundProgress';
import {
  numberToCommaFormatter,
  numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import {
  Layout,
  SummaryItem,
  Label,
  Value,
  Summary,
  ValueDescription,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useMediaQuery } from '@material-ui/core';

const StarCard = ({ data, page, starsonaCut, starCut, hiddenProps }) => {
  const { data: entityData } = useGetPartner()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 1279px)');
  const renderCut = () => {
    return (
      <span className="earningPercentage">
        {t('common.view_plan', {
          siteName: entityData?.partnerData?.partner_name,
          cut: starsonaCut,
          rest: starsonaCut !== 25 ? t('common.processing_fees') : '',
        })}
      </span>
    );
  };
  return (
    <Layout page={page} className="customStar-layout">
      <Card className="cardLayout">
        <section className="earnings-wrap">
          {!hiddenProps.hideEarnings && (
            <FlexBoxSB className="flex-start">
              <span
                data-val={t('common.total_earnings')}
                className="earnings headLbl"
              >
                <Link href="/manage/performance/earnings">
                  {getLocalSymbol()}
                  {numberToDecimalWithFractionTwo(
                    getLocalAmount(data.total_earnings),
                    false,
                    false,
                  )}
                </Link>
              </span>
              <span
                data-val={t('common.pending_pay')}
                className="payments headLbl"
              >
                <Link href="/manage/performance/earnings">
                  {getLocalSymbol()}
                  {numberToDecimalWithFractionTwo(
                    getLocalAmount(data.pending_payments),
                    false,
                    false,
                  )}
                </Link>
              </span>
            </FlexBoxSB>
          )}
          {!isMobile && !hiddenProps.hideCut && renderCut()}
        </section>

        <Summary className="summary-wrap">
          <SummaryItem className="summary-item">
            <span className="label">
              <FontAwesomeIcon className="detail-icon" icon={faPlay} />
              <Label>{t('common.req')}</Label>
            </span>
            <span className="value-wrapper">
              <Value className="value">
                {data.total_booking_count}
                {!hiddenProps.hideVideoPercentage && (
                  <ValueDescription className="val-desc">
                    {' '}
                    (
                    {t('common.completion_rate', {
                      value: data.completed_percentage || 0,
                    })}
                    )
                  </ValueDescription>
                )}
              </Value>
            </span>
          </SummaryItem>
          <SummaryItem className="summary-item">
            <span className="label">
              <FontAwesomeIcon
                icon={faComment}
                className="detail-icon commenticon"
              />
              <Label>{t('common.comments')}</Label>
            </span>
            <Value className="value">{data.total_comment_count}</Value>
          </SummaryItem>
          <SummaryItem className="summary-item">
            <span className="label">
              <FontAwesomeIcon className="detail-icon" icon={faHeart} />
              <Label>{t('common.reactions')}:</Label>
            </span>
            <Value className="value">{data.total_reaction_video_count}</Value>
          </SummaryItem>
          <SummaryItem className="rating-wrap">
            <span className="label">
              <FontAwesomeIcon className="detail-icon" icon={faStar} />
              <Label className="rating-label">{t('common.rating')}:</Label>
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
                <span className="no-rate">{t('common.no_rating_yet')}</span>
              )}
            </span>
          </SummaryItem>
          {page === 'dashboard' && (
            <SummaryItem className="summary-item">
              <span className="label">
                <FontAwesomeIcon className="detail-icon" icon={faTv} />
                <Label>{t('common.views')}</Label>
              </span>
              <span className="align-mobileview">
                <span>
                  <Value className="value">
                    {t('common.view_count', {
                      total_views:data.total_views,
                      recent_views:data.recent_views,
                    })}
                  </Value>
                </span>
              </span>
            </SummaryItem>
          )}
          {page === 'dashboard' && !isEmpty(data.fund_raiser) && (
            <SummaryItem className="summary-item column">
              <span className="fundraiser-heading">
                {t('common.fundraiser_for', {
                  charity: data.fund_raiser.charity,
                  start_date: moment(data.fund_raiser.start_date).format(
                    'M/D/YY',
                  ),
                  end_date: moment(data.fund_raiser.end_date).format('M/D/YY'),
                })}
              </span>
              <FundProgress
                classes={{
                  root: 'fund-progress',
                  goalRoot: 'fund-raiser-text',
                }}
                goal={data.fund_raiser.goal_amount}
                goalText={`$${numberToCommaFormatter(
                  data.fund_raiser.achieved_amount,
                )}/$${numberToCommaFormatter(data.fund_raiser.goal_amount)}`}
                acheived={data.fund_raiser.achieved_amount}
              />
            </SummaryItem>
          )}
          {isMobile && !hiddenProps.hideCut && renderCut()}
        </Summary>
      </Card>
    </Layout>
  );
};

StarCard.propTypes = {
  data: PropTypes.object,
  hiddenProps: PropTypes.object,
};

StarCard.defaultProps = {
  data: {},
  hiddenProps: {},
};

export default StarCard;
