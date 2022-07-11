import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Container, Title, Desc, CompareBtn } from './styled';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';

const GetPaidSection = () =>  {
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	return (
		<div>
			<Container>
				<Title>
					<p>{t('pricing_layout.main_title')}</p>
				</Title>
				<Desc>
					<p>
						<b>{t('pricing_layout.free_txt', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</b>
					</p>
				</Desc>
				{/* <Link
            href={`/${entityData?.partnerData?.talentsUrlPrefix}/cameo`}
            passHref
          >
            <CompareBtn href={`/${entityData?.partnerData?.talentsUrlPrefix}/cameo`} version="3" subtype="landingpage">
              <div>{t('pricing_layout.how_we_compare')}</div>
            </CompareBtn>
          </Link> */}
			</Container>
		</div>
	);
};

export default GetPaidSection;
