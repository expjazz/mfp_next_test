import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import { Description, Heading } from 'styles/TextStyled';
import Button from 'components/SecondaryButton';
import { Layout, Wrapper, ListHeading, Content } from './styled';
import { referralProgram } from './constants';
import ReferralList from './components/ReferralList';
import { useGetPartner, useReferralData } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const ReferralProgram = props => {
  const { data: userData, isStar } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const [{data: refData, isLoading}, fetchReferralData] = useReferralData()
  const referralData = {
    ...refData,
    loading: isLoading
  }
  const { t } = useTranslation();
  const data = {
    code: userData?.user.promo_code,
  };
  useEffect(() => {
    fetchReferralData(0, true, refData?.data);
  }, []);
  const referralLink = `${window.location.origin}/signup?referral=${data.code}`;

  const copyLink = (copyData, label) => {
    copy(copyData);
    props.updateToast({
      value: true,
      message: t('star_settings.referral.copied', {
        type: label === 'link' ? 'Link' : 'Code',
      }),
      variant: 'success',
      global: false,
    });
  };
  const referralList = () => {
    return (
      <ReferralList
        customLoader
        dataList={referralData.data}
        noDataText=""
        loading={referralData.loading}
        offset={referralData.offset}
        fetchData={(offset, refresh) =>
          fetchReferralData(offset, refresh, refData?.data)
        }
        totalCount={referralData.count}
        limit={referralData.limit}
      />
    );
  };

  return (
    <Layout isStar={isStar}>
      <Heading className="inner-head">
        {t('star_settings.referral.heading')}
      </Heading>
      <Content>
        <Wrapper>
          <Content.DetailsWrapper>
            <Content.Item>
              <Content.Label>
                {t('star_settings.referral.pending_pay')}
              </Content.Label>
              <Content.Value>
                {referralData.pendingPayments}
              </Content.Value>
            </Content.Item>
            <Content.Item>
              <Content.Label>{t('common.total_earnings')}</Content.Label>
              <Content.Value className="color-orange">
                {referralData.totalEarnings}
              </Content.Value>
            </Content.Item>
            <Content.Item>
              <Content.Label>
                {t('star_settings.referral.last_payments')}
              </Content.Label>
              <Content.Value>{referralData.lastPayment}</Content.Value>
            </Content.Item>
          </Content.DetailsWrapper>
        </Wrapper>
      </Content>
      <Description>
        <strong className="bold-code">
          {referralProgram(entityData?.partnerData).description}
          {data.code}
        </strong>
        <p>
          {referralProgram(entityData?.partnerData).remainingDescription}{' '}
          <a
            className="link"
            href="/terms-service"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('star_settings.referral.terms_of_service')}
          </a>{' '}
          {referralProgram(entityData?.partnerData).readMore}
        </p>
      </Description>
      <Content.ButtonWrapper>
        <Button
          secondary
          className="button"
          onClick={() => copyLink(referralLink, 'link')}
        >
          {t('common.copy_link')}
        </Button>
        <Button
          secondary
          className="button"
          onClick={() => copyLink(data.code, 'code')}
        >
          {t('common.copy_code')}
        </Button>
        <a
          href={`mailto:?body=${encodeURIComponent(
            (referralProgram(entityData?.partnerData)).emailBody,
          )}${encodeURIComponent(referralLink)}`}
        >
          <Button secondary className="button">
            {t('common.send_email')}
          </Button>
        </a>
      </Content.ButtonWrapper>
      {referralData.data.length > 0 && (
        <React.Fragment>
          <ListHeading>
            {t('star_settings.referral.stars_in_my_network')}
          </ListHeading>
          {referralList()}
        </React.Fragment>
      )}
    </Layout>
  );
};

ReferralProgram.propTypes = {
  history: PropTypes.object.isRequired,
  referralData: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  isStar: PropTypes.bool.isRequired,
  configData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  fetchReferralData: PropTypes.func.isRequired,
};

export default ReferralProgram;
