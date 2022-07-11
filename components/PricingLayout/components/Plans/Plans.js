import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import {
	Container,
	Starsona,
	Desc,
	Activate,
	Percentage,
	SubTitle,
	Plus,
	PlusTwo,
	PlusTwoFeatures,
	ClassicFeatures,
	ClassicDesc,
	Receives,
	Classic,
	ClassicPlusFeatures,
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Plans = props => {
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	return (
		<Container>
			{entityData?.partnerData?.entity_id === 'STARSONA-US-1' && (
				<div className="base-plan">
					<Starsona>
						<p>
							<span className="highlights">{entityData?.partnerData?.partner_name} </span>
						</p>
					</Starsona>
					<div className="discount-box">
						<SubTitle>
							<p>
								{t('pricing_layout.site_receives', {
									siteName: entityData?.partnerData?.partner_name,
								})}
								<br />
							</p>
						</SubTitle>
						<Percentage>
							<p>
								<span className="highlights">
									<span style={{ 'font-family': 'Gilroy-bold' }}>18%</span>
								</span>
							</p>
						</Percentage>
					</div>

					<Desc>
						<p>
							<Trans i18nKey="pricing_layout.site_earnings" values={{tipPercent: entityData?.partnerData?.tip_percentage}}>
                of earnings generated from your <br />
								<span className="highlights">
									{entityData?.partnerData?.tip_percentage}
								</span>{' '}
                of tips
							</Trans>{' '}
							<br />
						</p>
					</Desc>
					<Activate>{t('pricing_layout.activate_products')}</Activate>

					<Plus>
						<p>{t('pricing_layout.video_shoutouts')}</p>
						<p>{t('pricing_layout.direct_messages')}</p>
						<p>{t('pricing_layout.commercial_requests')}</p>
					</Plus>
					<PlusTwo>{t('pricing_layout.plus_txt')}</PlusTwo>
					<PlusTwoFeatures>
						<p>{t('pricing_layout.social_media_interactions')}</p>
						<p>{t('pricing_layout.fun_stuff_items')}</p>
						<p>{t('pricing_layout.personalized_merch')}</p>
					</PlusTwoFeatures>
				</div>
			)}

			<div className="classic-plan">
				<Classic>
					<p>
						<span style={{ color: 'rgb(255, 255, 255)' }}>
							<span style={{ color: 'rgb(85, 85, 85)' }}>
								{entityData?.partnerData?.partner_name}
							</span>
							<br />
						</span>
					</p>
				</Classic>
				<div className="discount-box">
					<Receives>
						<p>
							{t('pricing_layout.site_receives', {
								siteName: entityData?.partnerData?.partner_name,
							})}
							<br />
						</p>
					</Receives>
					<Percentage className="right-perc">
						<p>
							<span style={{ color: 'rgb(153, 153, 153)' }}>
								<span
									style={{
										'font-family': 'Gilroy-bold',
										color: entityData?.partnerData?.cta_color,
									}}
								>
                  25%
								</span>
							</span>
						</p>
					</Percentage>
				</div>

				<ClassicDesc>
					<p>
						<span style={{ color: 'rgb(158, 158, 158)' }}>
							<Trans i18nKey="pricing_layout.site_earnings" values={{tipPercent: entityData?.partnerData?.tip_percentage}}>
                of earnings generated from your <br />
								<span className="highlights">
									{entityData?.partnerData?.tip_percentage}
								</span>{' '}
                of tips
							</Trans>
							<br />
						</span>
					</p>
				</ClassicDesc>
				{entityData?.partnerData?.entity_id === 'STARSONA-US-1' && (
					<ClassicFeatures>
						<p>{t('pricing_layout.use_less')}</p>
					</ClassicFeatures>
				)}
				<ClassicPlusFeatures>
					<p>{t('pricing_layout.choose_from')}</p>
					<ul>
						<li>{t('pricing_layout.video_shoutouts')}</li>
						<li>{t('pricing_layout.direct_messages')}</li>
						<li>{t('pricing_layout.commercial_requests')}</li>
						<li>{t('pricing_layout.social_media_interactions')}</li>
						<li>{t('pricing_layout.fun_stuff_items')}</li>
						<li>{t('pricing_layout.personalized_merch')}</li>
					</ul>
				</ClassicPlusFeatures>
			</div>
		</Container>
	);
};



export default Plans;
