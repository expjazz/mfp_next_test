import React, { lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { retry } from 'services/lazyLoad';
import ErrorHandler from 'components/ErrorHandler';
import Pay from './Payment';
import { HeadingH2 } from '../../../../styled';
import { Container, Left, Right } from '../styled';
import dynamic from 'next/dynamic';

// const TermsQA = lazy(() =>
//   retry(() => import('./TermsQA')),
// );

const TermsQA = dynamic(() => import('./TermsQA'))

function Payment(props) {
  const { t } = useTranslation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <Container>
      <Left>
        <HeadingH2 >{t('purchase_flow.qa.terms.title')}</HeadingH2>
        <ErrorHandler>
          <TermsQA />
        </ErrorHandler>
      </Left>
      <Right>
        <Pay
          hasDis={props.hasDis}
          promoDet={props.promoDet}
          finalPrice={props.finalPrice}
          fanData={props.fanData}
          starData={props.starData}
          bookingId={props.bookingId}
          zeroPayment={props.zeroPayment}
          onOptileFail={props.setStep}
        />
      </Right>
    </Container>
  );
}

Payment.propTypes = {
  fanData: PropTypes.object.isRequired,
  starData: PropTypes.object.isRequired,
  bookingId: PropTypes.string,
  zeroPayment: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
};

Payment.defaultProps = {
  bookingId: '',
};

export default Payment;
