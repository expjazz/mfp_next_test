import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { faEnvelopeSquare } from '@fortawesome/pro-light-svg-icons';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AboutContainer, AboutWrapper, Anchor, IconWrapper, StoreIcon, StoreIconWrapper } from 'components/PageStyles/About/styled';
import { Heading } from 'styles/TextStyled';
import HeaderV3 from 'components/HeaderV3';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { getRedirectURL } from 'customHooks/domUtils';
import { getEntity } from 'src/services/myfanpark';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';

function AboutPage() {
	const { t } = useTranslation();
	const router = useRouter();
	const onBackClick = () => {
		router.back();
	};
	const { data: entityData } = useGetPartner();

	const renderFooterIcon = (iconData, entityKey) => {
		return entityData?.partnerData[entityKey] ? (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={getRedirectURL(entityData?.partnerData[entityKey])}
			>
				<FontAwesomeIcon icon={iconData.icon} className="social-icon-footer" />
			</a>
		) : null;
	};

	const renderFooterLink = (linkData, entityKey) => {
		return entityData?.partnerData[entityKey] ? (
			<Anchor
				target="_blank"
				rel="noopener noreferrer"
				className="foot-link"
				href={getRedirectURL(entityData?.partnerData[entityKey])}
			>
				{linkData.title}
			</Anchor>
		) : null;
	};

	return (
		<AboutWrapper>
			<HeaderV3
				desktopSearch
				showBack
				onBackClick={onBackClick}
				smallEntitySelect
			/>
			<AboutContainer>
				<Heading>{t('common.about.heading')}</Heading>
				<section className="link-wrapper">
					<div className="link-sec">
						<div className="link-col">
							<div className="title">{t('common.about.title1')}</div>
							<div className="two-col">
								{/* <div className="link-row-col">
                  {entityData?.partnerData['blog_url'] ||
                  entityData?.partnerData['career_url'] ||
                  entityData?.partnerData['press_url'] ? (
                    <React.Fragment>
                      {renderFooterLink(
                        { title: t('common.about.blog') },
                        'blog_url',
                      )}
                      {renderFooterLink(
                        { title: t('common.about.careers') },
                        'career_url',
                      )}
                      {renderFooterLink(
                        { title: t('common.about.press') },
                        'press_url',
                      )}
                    </React.Fragment>
                  ) : null}
                </div> */}
								<div className="link-row-col">
									<Link href="/terms-service" passHref target="_blank">
										<Anchor
											target="_blank"
											rel="noopener noreferrer"
											href="/terms-service"
										>
											{t('common.about.termsHeading')}
										</Anchor>
									</Link>
									<Link passHref href="/privacy-policy" target="_blank">
										<Anchor
											target="_blank"
											rel="noopener noreferrer"
											href="/privacy-policy"
										>
											{t('common.about.privacyHeading')}
										</Anchor>
									</Link>
								</div>
							</div>
						</div>

						<div className="link-col">
							<div className="title">{t('common.about.title2')}</div>
							<div className="link-row">
								{entityData?.partnerData['connect_email'] ? (
									<Anchor
										target="_blank"
										rel="noopener noreferrer"
										href={`mailto: ${entityData?.partnerData['connect_email']}`}
									>
										{t('common.about.connect')}
									</Anchor>
								) : null}
							</div>
						</div>
					</div>
				</section>
				<span className="icon-wrapper">
					<IconWrapper>
						{renderFooterIcon({ icon: faFacebookSquare }, 'facebook_url')}
						{renderFooterIcon({ icon: faTwitterSquare }, 'twitter_url')}
						{renderFooterIcon({ icon: faInstagram }, 'instagram_url')}
						{entityData?.partnerData['connect_email'] ? (
							<a href={`mailto: ${entityData?.partnerData['connect_email']}`}>
								<FontAwesomeIcon
									icon={faEnvelopeSquare}
									className="social-icon-footer"
								/>
							</a>
						) : null}
					</IconWrapper>
					{true && (
						<StoreIconWrapper>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`}
							>
								<StoreIcon
									alt="play store icon"
									src="assets/images/playstore-download.svg"
								/>
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://itunes.apple.com/us/app/starsona/id${process.env.NEXT_PUBLIC_IOS_APP_ID}?ls=1&mt=8`}
							>
								<StoreIcon
									alt="app store icon"
									src="assets/images/appstore-download.svg"
								/>
							</a>
						</StoreIconWrapper>
					)}
				</span>
			</AboutContainer>
		</AboutWrapper>
	);
}

export default AboutPage;

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths,
		fallback: 'blocking'
	};
}

export async function getStaticProps({locale, params: { site }}) {

	const queryClient = new QueryClient();


	await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale));
	return {
		props: {
			locale,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
	};
}
