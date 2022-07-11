import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
import ToolTip from 'components/ToolTip';
// import { withScroll } from 'services/withScroll';
import PaymentItem from '../PaymentItem';
import { ListWrapper, Heading, SubHeading } from '../../styled';
import { CardItem, Table, TableHead } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { withScroll } from 'components/withScroll';

const EarningList = props => {
  const getLocalAmount = value => value;
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 1279px)');
  const getList = data => {
    return data.map(payment => {
      return (
        <PaymentItem
          {...props}
          isMobile={isMobile}
          data={payment}
          key={payment.id}
          toggleBookingModal={props.toggleBookingModal}
        />
      );
    });
  };

  const renderList = (status, data) => {
    return (
      <CardItem>
        {!isMobile && (
          <Table>
            {[
              t('common.dateHeading'),
              t('common.item'),
              t('common.status'),
              t('common.price'),
            ].map(tableHead => (
              <TableHead className={tableHead}>{tableHead}</TableHead>
            ))}
          </Table>
        )}
        {status === 'pending'
          ? getList(data)
          : data.earning_list.map(payItem => getList([payItem]))}
      </CardItem>
    );
  };

  const getAccordion = (heading, status, data, subheading) => {
    return (
      <ExpansionPanel
        defaultExpanded
        classes={{ root: 'collapse-root', expanded: 'collapse-exp' }}
      >
        <ExpansionPanelSummary
          classes={{
            root: 'collapse-head',
            content: 'expanded',
            expandIcon: 'fontawesome-icons',
          }}
          expandIcon={
            <FontAwesomeIcon icon={faChevronDown} className="collapse-arrow" />
          }
        >
          {heading}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: 'collapse-details' }}>
          {subheading}
          {renderList(status, data)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  const getHeading = payment => {
    return (
      <Heading padding="22px">
        {t('common.paid_payments')}
        <p className="sub-head">
          <span className="bold-value">
            {' '}
            {/* {entity('currencyData').symbol} */}$
            {numberToDecimalWithFractionTwo(
              getLocalAmount(payment.total_amount),
              false,
              false,
            )}{' '}
          </span>
          <span className="medium-value">
            (
            {moment(payment.fulfillment_date || payment.created_date).format(
              'MM/DD/YY',
            )}
            ){' '}
          </span>
        </p>
      </Heading>
    );
  };

  const getView = (data, status) => {
    if (isMobile) {
      if (status === 'pending') {
        const heading = (
          <Heading padding="22px">{t('common.pending_payments')}</Heading>
        );
        if (props.userDetails.stripe_user_id == null) {
          const subheading = (
            <SubHeading>
              {/* {earningList.pendingPayments}&nbsp; */}
              {/* <SubHeading.Link href={props.stripeUrl}>
                Click here
              </SubHeading.Link>{' '}
              to set up your Stripe account. */}
            </SubHeading>
          );
          return getAccordion(heading, status, data, subheading);
        }
        return getAccordion(heading, status, data);
      }
      return data.map(payment => {
        const heading = getHeading(payment);
        return getAccordion(heading, status, payment);
      });
    }
    if (status === 'pending') {
      const heading = (
        <Heading
          padding={props.userDetails.stripe_user_id == null ? '10px' : '22px'}
        >
          <ToolTip
            title={t('common.payout_title', { siteName: props.entityData?.partner_name })}
          >
            <span>{t('common.pending_payments')}</span>
          </ToolTip>
        </Heading>
      );
      return (
        <ListWrapper>
          {heading}
          {props.userDetails.stripe_user_id == null && (
            <SubHeading>
              {/* {earningList.pendingPayments}&nbsp; */}
              {/* <SubHeading.Link href={props.stripeUrl}>
                Click here
              </SubHeading.Link>{' '}
              to set up your Stripe account. */}
            </SubHeading>
          )}
          {renderList('pending', data)}
        </ListWrapper>
      );
    }
    return data.map(payment => {
      const heading = getHeading(payment);
      return (
        <ListWrapper key={payment.id}>
          {heading}
          {renderList('paid', payment)}
        </ListWrapper>
      );
    });
  };
  return getView(props.dataList, props.status);
};

EarningList.propTypes = {};

export default withScroll(EarningList);
