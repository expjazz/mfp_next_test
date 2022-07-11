
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Page404Styled from '../components/PageStyles/page404/styled';
import { localeEntity } from '../src/services/entities/localeEntity';
import { getEntity } from '../src/services/myfanpark';
import Button from '../components/SecondaryButton';
import { isEmpty } from 'src/utils/dataStructures';
export default function Custom404(props) {
	const { t } = useTranslation();
	return (
		<Page404Styled>
			<Page404Styled.Image src="/images/404_face.png" alt="404 image" />
			<Page404Styled.Content>
				<Page404Styled.MainHeading>
					{t('common.404.heading')}
				</Page404Styled.MainHeading>
				<Page404Styled.Description>
					{t('common.404.description')}
				</Page404Styled.Description>
				<Page404Styled.ActionSection>
					<a href="/" passHref>
						<a>
							<Button className="action-btn" secondary>
								{t('common.404.startOver')}
							</Button>
						</a>
					</a>
					{/* <Button className="action-btn" secondary onClick={openHelp}>
            {t('common.account_settings.contactsupport')}
          </Button> */}
				</Page404Styled.ActionSection>
			</Page404Styled.Content>
			<Page404Styled.LogoWrap>
				<a href="/">
					<a>
						<Page404Styled.Logo src={props.entityData.logo} />
					</a>
				</a>
			</Page404Styled.LogoWrap>
		</Page404Styled>
	);
}

export async function getStaticProps({locale, params}) {
	const site = process.env.devMode !== 'production' && (process.env.ENV === 'staging' || process.env.ENV === 'dev') ? 'staging.ttwithme.com' : 'myfanpark.com';
	console.log('env var inside error: ', process.env.ENV, site);
	const { partnerData, currencyData, languageData } = await getEntity(site, 'en-US');
	return {
		props: {
			entityData: partnerData,
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		}
	};

}