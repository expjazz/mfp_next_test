import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Heading } from 'styles/TextStyled';
import EarningsList from './earnings';
import { Container } from '../styled';
import { Wrap } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Earnings = props => {
  const { t } = useTranslation();
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  return (
    <Container>
      <Wrap>
        <Heading className="title">{t('common.earnings')}</Heading>
        <EarningsList {...props} />
      </Wrap>
    </Container>
  );
};

Earnings.propTypes = {};

Earnings.defaultProps = {};

export default Earnings;
