import React from 'react';
import { useTranslation } from 'react-i18next';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { toggleSignup, useGeneral } from 'src/context/general';

import { useGetPartner } from 'customHooks/reactQueryHooks';


import {
	Container,
	Title,
	RedTitle,
	Description,
	VideoImg,
	GreyTitle,
	InterImg,
	Thumbnail,
	Circle,
	ThumbnailDesc,
	ThumbnailBox,
	ThumbnailUser,
	FunImg,
	ImgPersonal,
	CommerecImg,
	MainBtn,
} from './styled';
import { setSignupFlow } from 'src/context/session';

const ProductDetailElements = () => {
	const { t } = useTranslation();
	const { data: partnerData } = useGetPartner();
	const { isLoggedIn } = useFetchLoggedUser();
	const dispatch = useGeneral()[1];
	return (
		<div className="product-detail">
			<Container className="main-title">
				<Title>
					<p>{t('product_detail.unique_offerings', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}</p>
				</Title>
			</Container>
			<Container className="video">
				<div className="product-blk">
					<RedTitle>
						<p>
							{t('product_detail.video_shoutouts')}
							<br />
						</p>
					</RedTitle>
					<Description className="video">
						<p>{t('product_detail.video_shoutouts_desc', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}</p>
					</Description>
				</div>
				<div className="product-img">
					<VideoImg width="408" height="184" src={'/images/shoutouts.png'} alt="" />
				</div>
			</Container>
			<Container className="inter">
				<div className="product-blk">
					<RedTitle className="inter">
						<p>
							{t('product_detail.interactions')}
							<br />
						</p>
					</RedTitle>
					<GreyTitle>
						<p>
							{t('product_detail.let_chat')}
							<br />
						</p>
					</GreyTitle>
					<Description className="respond">
						<p>
							{t('product_detail.let_chat_desc', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}
						</p>
					</Description>
					<GreyTitle className="social">
						<p>
							{t('product_detail.social_media_interactions')}
							<br />
						</p>
					</GreyTitle>
					<Description className="give">
						<p>
							{t('product_detail.social_desc', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}
						</p>
					</Description>
				</div>
				<div className="product-img">
					<InterImg width="408" height="184" src={'/images/Interactions.png'} alt="" />
				</div>
			</Container>

			<Container className="connect">
				<div className="wrap-image">
					<Thumbnail width="165" height="165" src={'/images/estherku.jpeg'} alt="" />
				</div>
				<div className="comment-box">
					<ThumbnailUser className="mob-hidden">
						<p>
							{t('product_detail.Esther-Ku')}
							<i>
								<span style={{ fontWeight: 'normal' }}>, {t('product_detail.Esther-Ku-proffession')}</span>
							</i>
							<br />
						</p>
					</ThumbnailUser>
					<ThumbnailDesc>
						<p>
							{t('product_detail.Esther-Ku-comments', {siteName:partnerData?.entityData?.siteName})}
							<br />
						</p>
					</ThumbnailDesc>
				</div>
				<div className="show-mob">
					<ThumbnailUser>
						<p>
							{t('product_detail.Esther-Ku')}
							<i>
								<span style={{ fontWeight: 'normal' }}>, {t('product_detail.Esther-Ku-proffession')}</span>
							</i>
							<br />
						</p>
					</ThumbnailUser>
				</div>

			</Container>

			<Container className="fun">
				<div className="product-blk">
					<RedTitle className="fun">
						<p>{t('common.fun_Stuff')}</p>
					</RedTitle>
					<Description className="fun">
						<p>
							{t('product_detail.fun_stuff_desc_1', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}
							<br />
						</p>
						<p>
							{t('product_detail.fun_stuff_desc_2', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}
						</p>
					</Description>
				</div>
				<div className="product-img">
					<FunImg width="408" height="184" src={'/images/Funstuffideas.png'} alt="" />
				</div>
			</Container>
			<Container className="personalized">
				<div className="product-blk">
					<RedTitle className="personal">
						<p>
							{t('common.personalized_merch')}
							<br />
						</p>
					</RedTitle>
					<Description className="personal">
						<p>
							{t('product_detail.personalized_merch_desc_1', {siteName:partnerData?.entityData?.siteName, storeNameSmall:partnerData?.entityData?.storeNameSmall, purchaserPlural:partnerData?.entityData?.purchaserPlural})}
						</p>
						<p>
							{t('product_detail.personalized_merch_desc_2', {purchaserPlural:partnerData?.entityData?.purchaserPlural})}
						</p>
					</Description>
				</div>
				<div className="product-img">
					<ImgPersonal width="408" height="184" src={'/images/Merch.png'} alt="" />
				</div>
			</Container>
			<Container className="commerec">
				<div className="product-blk">
					<RedTitle className="commerec">
						<p>
							{t('common.commercial_requests')}
							<br />
						</p>
					</RedTitle>
					<Description className="commerec">
						<p>
							{t('product_detail.commercial_requests_desc_1')}
						</p>
					</Description>
				</div>
				<div className="product-img">
					<CommerecImg width="408" height="184" src={'/images/commercial.png'} alt="" />
				</div>
			</Container>
			{
				!isLoggedIn &&
        <Container className="btn">
        	<MainBtn
        		onClick={() => {
        			setSignupFlow(dispatch, { role: 'star' });
        			toggleSignup(dispatch, true);
        		}}
        	>
        		{t('product_detail.create_store', {storeNameSmall:partnerData?.entityData?.storeNameSmall})}
        	</MainBtn>
        </Container>
			}
		</div>

	);
};

export default ProductDetailElements;
