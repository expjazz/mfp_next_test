

// celbDetails: state.userDetails.settings_celebrityDetails,
// userDetails: state.userDetails.settings_userDetails,
// saved: state.commonReducer.confirmSave,
// entityData: state.entity.data,
// disbursement: state.userDetails.settings_celebrityDetails.disbursement,
// deliveryTypes: state.config.data.fun_stuff_delivery,
// elasticEndPoint: state.config.data.elastic_search_endpoint,import React, { useEffect, useState, lazy, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import Modal from 'components/Modal';
import MoboList from 'components/MoboList';
import MenuList from 'components/MenuList';
// import { useMedia } from 'customHooks/domUtils';
import { TextConstants } from './Constants/TextConstants';
import { Layout, ContentWrapper, MWrap, ModalContainer } from './styled';
import { getLinks } from './Constants/Constants';
import { isEmpty } from 'src/utils/dataStructures';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useEffect } from 'react';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import PromotionalTools from './PromotionalTools';
import ProductDiscounts from './ProductDiscounts';
import Charity from './Charity';
import TricksTips from './TricksTips/TricksTips.Components';
import Global from './Global';
import Collab from './Collab';

// const PromoTool = lazy(() =>
//   retry(() =>
//     import('components/Promote/PromotionalTools/'),
//   ),
// );

// const ProductDiscounts = lazy(() =>
//   retry(() =>
//     import('components/Promote/ProductDiscounts'),
//   ),
// );

// const Charity = lazy(() =>
//   retry(() => import('components/Promote/Charity')),
// );

// const Global = lazy(() =>
//   retry(() => import('components/Promote/Global')),
// );

// const Collab = lazy(() =>
//   retry(() => import('components/Promote/Collab')),
// );

// const TricksTips = lazy(() =>
//   retry(() =>
//     import('components/Promote/TricksTips/'),
//   ),
// );
// const PostPromote = lazy(() =>
//   retry(() =>
//     import('components/Promote/PostPromote'),
//   ),
// );

const Promote = props => {
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const disbursement = userData?.celebrity_details.disbursement;
	const router = useRouter();
	const { slug } = router.query;
	const { t } = useTranslation();
	const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
	const webView = useMediaQuery('(min-width: 1280px)');
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [showModalBack, setModalBack] = useState(true);
	const [hideHeader, toggHeader] = useState(false);

	const goBack = () => {
		router.back();
	};

	const modalClose = () => {
		router.push('/manage/promote', undefined, { shallow: true });
	};

	const getComponent = component => {
		if (isModalView) {
			return (
				<Modal open onClose={modalClose}>
					<ModalContainer>
						{showModalBack && (
							<BackHeader
								backHandler={modalClose}
								closeHandler={modalClose}
								label={
									router.asPath === '/manage/promote'
										? t('common.menu')
										: t('promote_page.Promote')
								}
								noHelp
							/>
						)}
						{component}
					</ModalContainer>
				</Modal>
			);
		}
		return component;
	};

	const Wrap = webView || isModalView ? MWrap : React.Fragment;

	const redirect = webView && router.asPath === '/manage/promote' ? true : false;

	const getLabel = () => {
		if (router.asPath === '/manage/promote') {
			return t('common.menu');
		} else if (
			router.asPath.includes('/manage/promote/tips&tricks/')
		) {
			return t('common.tips_tricks');
		}
		return t('promote_page.Promote');
	};

	const handleRightClick = () => {
		if (router.asPath === '/manage/promote/post-promote') {
			props.history.push(`/${userData?.user.user_id}`);
		}
	};

	const getRightLabel = () => {
		if (router.asPath === '/manage/promote/post-promote') {
			return t('common.viewStore', {store: entityData?.partnerData?.partner_name});
		}
	};

	useEffect(() =>{

		if (redirect)
			router.push(

				getLinks({
					t,
					entityData: entityData?.partnerData,
					adminApproved: userData?.user.talent_status === 'live' || userData?.user.talent_status === 'paused',
					fullPlan:
          (disbursement && disbursement.starsona_cut === 18) ||
          entityData?.partnerData.entity_id !== 'STARSONA-US-1',
					allowPosts: false,
				})[0].url, undefined, { shallow: true }
			);
	}, [redirect]);


	return (
		<Layout showMenu={router.asPath === '/manage/promote'}>
			{(showModalBack || !isMobile) && !hideHeader && (
				<BackHeader
					backHandler={isMobile ? goBack : null}
					label={getLabel()}
					rightLabel={isMobile ? getRightLabel() : ''}
					rightLabelClick={handleRightClick}
					heading={
						isMobile
							? t('promote_page.heading', { name: entityData?.partnerData?.partner_name })
							: ''
					}
					headerCls="header-label"
					noHelp
				/>
			)}
			<ContentWrapper>
				{getLinks({
					t,
					entityData: entityData?.partnerData,
					adminApproved: userData?.celebrity_details.admin_approved,
					fullPlan:
            (disbursement && disbursement.starsona_cut === 18) ||
            entityData?.partnerData.entity_id !== 'STARSONA-US-1',
					allowPosts: false,
				}) &&
          getLinks({
          	t,
          	entityData: entityData?.partnerData,
          	adminApproved: userData?.celebrity_details.admin_approved,
          	fullPlan:
              (disbursement && disbursement.starsona_cut === 18) ||
              entityData?.partnerData.entity_id !== 'STARSONA-US-1',
          	allowPosts: false,
          }).length > 0 && (
					<Wrap>
						{!isMobile && (
							<React.Fragment>
								<Heading className="main-heading">
									{t('promote_page.heading', {
										name: entityData?.partnerData?.storeNameSmall,
									})}
								</Heading>
								<MenuList
									shallow
									links={getLinks({
										t,
										entityData: entityData?.partnerData,
										adminApproved: userData?.celebrity_details.admin_approved,
										fullPlan:
                        (disbursement &&
                          disbursement.starsona_cut === 18) ||
                        entityData?.partnerData.entity_id !== 'STARSONA-US-1',
										allowPosts: false,
									})}
									classNames={{ root: 'menu-layout' }}
								/>
							</React.Fragment>
						)}
						{isMobile &&
                router.asPath === '/manage/promote' && (
							<MoboList
								links={getLinks({
									t,
									entityData: entityData?.partnerData,
									adminApproved: userData?.celebrity_details.admin_approved,
									fullPlan:
                        (disbursement &&
                          disbursement.starsona_cut === 18) ||
                        entityData?.partnerData.entity_id !== 'STARSONA-US-1',
									allowPosts: false,
								})}
							/>
						)}
					</Wrap>
				)}

				{!isEmpty(userData?.celebrity_details) && (
					<>
						{
							slug[1] === 'promo-share' && getComponent(
								<ErrorHandler>
									<PromotionalTools
										{...props}
									/>
								</ErrorHandler>
							)
						}
						{
							slug[1] === 'discount' && getComponent(
								<ErrorHandler>
									<ProductDiscounts
										{...props}
										modalBackHandler={setModalBack}
									/>
								</ErrorHandler>
							)
						}

						{
							slug[1] === 'fundraiser' && getComponent(
								<ErrorHandler>
									<Charity
										modalBackHandler={setModalBack}
										{...props}
										titleCharity={TextConstants(t).CHARITY.titleCharity}
										subtitleCharity={TextConstants(t).CHARITY.subtitleCharity}
										titleFund={TextConstants(t).CHARITY.titleFund}
										subtitleFund={TextConstants(t).CHARITY.subtitleFund}
									/>
								</ErrorHandler>,
							)
						}
						{
							slug[1] === 'tips&tricks' && getComponent(
								<ErrorHandler>
									<TricksTips
										{...props}
										modalBackHandler={setModalBack}
									/>
								</ErrorHandler>
							)
						}

						{
							slug[1] === 'global' && getComponent(
								<ErrorHandler>
									<Global
										{...props}
										modalBackHandler={setModalBack}
									/>
								</ErrorHandler>
							)
						}

						{
							slug[1] === 'partner' && getComponent(
								<ErrorHandler>
									<Collab
										{...props}
										modalBackHandler={setModalBack}
									/>
								</ErrorHandler>
							)
						}
					</>
				)}
			</ContentWrapper>
		</Layout>
	);
};

Promote.propTypes = {
	history: PropTypes.object.isRequired,
	celbDetails: PropTypes.object,
	entityData: PropTypes.object.isRequired,
};
Promote.defaultProps = {
	celbDetails: {},
};

export default Promote;


{/* <Switch>
            <Route
              path="/manage/promote/post-promote"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <PostPromote
                      modalBackHandler={setModalBack}
                      hideHeader={toggHeader}
                      {...propsChildren}
                      {...props}
                    />
                  </ErrorHandler>,
                )
              }
            />
            {userData?.celebrity_details.admin_approved ? (
              <Route
                path="/manage/promote/promo-share"
                render={propsChildren =>
                  getComponent(
                    <ErrorHandler>
                      <PromoTool
                        modalBackHandler={setModalBack}
                        {...propsChildren}
                        {...props}
                      />
                    </ErrorHandler>,
                  )
                }
              />
            ) : null}
            <Route
              path="/manage/promote/discount"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <ProductDiscounts
                      modalBackHandler={setModalBack}
                      {...propsChildren}
                      {...props}
                    />
                  </ErrorHandler>,
                )
              }
            />
            <Route
              path="/manage/promote/fundraiser"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <Charity
                      modalBackHandler={setModalBack}
                      {...propsChildren}
                      {...props}
                      titleCharity={TextConstants(t).CHARITY.titleCharity}
                      subtitleCharity={TextConstants(t).CHARITY.subtitleCharity}
                      titleFund={TextConstants(t).CHARITY.titleFund}
                      subtitleFund={TextConstants(t).CHARITY.subtitleFund}
                    />
                  </ErrorHandler>,
                )
              }
            />

            <Route
              path="/manage/promote/tips&tricks"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <TricksTips
                      modalBackHandler={setModalBack}
                      {...propsChildren}
                      {...props}
                    />
                  </ErrorHandler>,
                )
              }
            />

            <Route
              path="/manage/promote/global"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <Global
                      modalBackHandler={setModalBack}
                      {...propsChildren}
                      {...props}
                    />
                  </ErrorHandler>,
                )
              }
            />

            <Route
              path="/manage/promote/partner"
              render={propsChildren =>
                getComponent(
                  <ErrorHandler>
                    <Collab
                      modalBackHandler={setModalBack}
                      {...propsChildren}
                      {...props}
                    />
                  </ErrorHandler>,
                )
              }
            />
          </Switch> */}