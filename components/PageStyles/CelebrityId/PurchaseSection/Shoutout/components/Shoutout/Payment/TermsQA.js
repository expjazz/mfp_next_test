import React, { useState } from 'react';
import { LinkText } from 'styles/TextStyled';
import { useTranslation } from 'next-i18next';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const TermsQA = () => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const [more, setMore] = useState(false);
  const onMore = () => {
    setMore(!more);
  };

  return (
    <React.Fragment>
      <p className="terms">
        {t('purchase_flow.event.terms.para1', {siteName:entityData?.partnerData.partner_name})}
        <LinkText onClick={onMore} className="more-link">
          {more ? 'less' : 'more'}
        </LinkText>
      </p>
      {more && (
        <React.Fragment>
          <p className="terms">
            {t('purchase_flow.event.terms.para2', {siteName:entityData?.partnerData.partner_name})}
          </p>
          <p className="terms">
            {t('purchase_flow.event.terms.para3', {siteName:entityData?.partnerData.partner_name})}
          </p>
          <p className="terms">
            {t('purchase_flow.event.terms.para4', {siteName:entityData?.partnerData.partner_name})}
          </p>
          <p className="terms">
            {t('purchase_flow.event.terms.para5', {siteName:entityData?.partnerData.partner_name})}
          </p>
          <p className="terms">
            {t('purchase_flow.event.terms.para6', {siteName:entityData?.partnerData.partner_name})}
          </p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TermsQA;
