import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import WhatsappService from 'components/WhatsappService';
import EntitySelector from 'components/EntitySelector';
import {
	faEnvelopeSquare,
	faPhoneVolume,
} from '@fortawesome/pro-light-svg-icons';


import {
	FooterContainer,
	LogoContainer,
	Container,
	GridFooter,
	GridColumn,
	ColumnTitle,
	MultipleColumns,
	Col,
	ImgRow,
	LinkContainer,
	ImgRowStore,
	FooterLink,
} from './styled';
import { getRedirectURL, isVodacom } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const CommFooter = props => {
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const renderFooterLink = (linkData, entityKey) => {
		return entityData?.partnerData?.[entityKey] ? (
			<FooterLink
				href={getRedirectURL(entityData?.partnerData?.[entityKey])}
				target="_blank"
			>
				{linkData.title}
			</FooterLink>
		) : null;
	};

	const renderFooterIcon = (iconData, entityKey) => {
		return entityData?.partnerData?.[entityKey] ? (
			<a href={getRedirectURL(entityData?.partnerData?.[entityKey])} target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={iconData.icon} className="social-icon-footer" />
			</a>
		) : null;
	};

	return (
		<FooterContainer>
			<Container>
				<GridFooter>
					<Link href="/" className="logo-link">
						<LogoContainer className="logo-container">
							<img src={entityData?.partnerData?.logo} alt="logo" />
						</LogoContainer>
					</Link>
					<LinkContainer>
						<GridColumn className="know-container">
							<ColumnTitle>{t('common.about.title1')}</ColumnTitle>
							<MultipleColumns>
								{entityData?.partnerData?.blog_url ||
                entityData?.partnerData?.career_url ||
                entityData?.partnerData?.press_url ? (
										<Col>
											{/* {renderFooterLink(
												{ title: t('common.about.blog') },
												'blog_url',
											)}
											{renderFooterLink(
												{ title: t('common.about.careers') },
												'career_url',
											)} */}
											{!isVodacom() && renderFooterLink(
												{ title: t('common.about.press') },
												'press_url',
											)}
										</Col>
									) : null}
								<Col>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="/terms-service"
									>
										<FooterLink
											target="_blank"
											rel="noopener noreferrer"
										>
											{t('common.about.termsHeading')}
										</FooterLink>
									</Link>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href="/privacy-policy"
										passHref
									>
										<FooterLink
											target="_blank"
											rel="noopener noreferrer"

										>
											{t('common.about.privacyHeading')}
										</FooterLink>
									</Link>
									{entityData?.partnerData?.connect_email ? (
										<FooterLink
											target="_blank"
											rel="noopener noreferrer"
											className="foot-link"
											href={`mailto: ${entityData?.partnerData?.connect_email}`}
										>
											{t('common.about.connect')}
										</FooterLink>
									) : null}
								</Col>
							</MultipleColumns>
						</GridColumn>
						{entityData?.partnerData?.contact_phone ||
            entityData?.partnerData?.contact_whatsapp ? (
								<GridColumn className="know-container second">
									<ColumnTitle>{t('common.questionsCap')}</ColumnTitle>
									<MultipleColumns>
										<Col>
											{entityData?.partnerData?.contact_whatsapp ? (
												<WhatsappService
													number={entityData?.partnerData?.contact_whatsapp}
												>
													{onClick => (
														<span
															className="subText"
															role="presentation"
															onClick={onClick}
														>
															{t('common.contactWhatsapp')}
															<img
																className="what-icon"
																alt="whatsapp"
																src="/images/whatsapp.svg"
																width="35"
																height="35"
															/>
														</span>
													)}
												</WhatsappService>
											) : null}
											{entityData?.partnerData?.contact_phone ? (
												<a
													href={`tel:${entityData?.partnerData?.contact_phone}`}
													className="subText"
												>
													{t('common.contactPhone')}
													<FontAwesomeIcon
														className="phone-icon "
														icon={faPhoneVolume}
													/>
												</a>
											) : null}
										</Col>
									</MultipleColumns>
								</GridColumn>
							) : null}
					</LinkContainer>
					<GridColumn className="icons-container">
						<div className="icons-wrapper">
							<EntitySelector
							/>
						</div>
						{
							!isVodacom() && (

								<ImgRow className="social-media-footer">
									{renderFooterIcon({ icon: faFacebookSquare }, 'facebook_url')}
									{renderFooterIcon({ icon: faTwitterSquare }, 'twitter_url')}
									{renderFooterIcon({ icon: faInstagram }, 'instagram_url')}
									{entityData?.partnerData?.connect_email ? (
										<a href={`mailto:${entityData?.partnerData?.connect_email}`}>
											<FontAwesomeIcon
												icon={faEnvelopeSquare}
												className="social-icon-footer"
											/>
										</a>
									) : null}
								</ImgRow>
							)
						}
						<ImgRowStore>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`}
							>
								<img src={'/images/googleplay.png'} />
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://itunes.apple.com/us/app/starsona/id${process.env.NEXT_PUBLIC_IOS_APP_ID}?ls=1&mt=8`}
							>
								<img src={'/images/applestore.png'} />
							</a>
						</ImgRowStore>
					</GridColumn>
				</GridFooter>
			</Container>
		</FooterContainer>
	);
};


export default CommFooter;
