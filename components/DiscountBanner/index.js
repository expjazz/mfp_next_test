import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { DescriptionP } from 'styles/TextStyled';
import { getProdList } from './utils';
import { useGeneralPromocode, useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import {
	Wrap,
	Pop,
	MainTitle,
	DiscountTitle,
	DiscountHeading,
	SmallDescription,
} from './styled';
import { useRouter } from 'next/router';

const DiscountBanner = (props) => {
	const { data: partnerData } = useGetPartner();
	const { data: celebrityData } = useGetCelebrityData();
	let discount = celebrityData?.celebrity_details.discount;
	const router = useRouter();
	const isCelebPage = !!router?.query?.celebrityId;
	// TO DO remove testing line
	// const generalPromocode = [{'id':'vbmZ20dY','code':'VODAPAY15','type':'percentage','discount':'15.00','auto_load':true,'valide_to':'2022-07-31','local_discount':null,'name':'KICKOFF'}];
	const { data: generalPromocode } = useGeneralPromocode();
	const promocode = isEmpty(celebrityData?.celebrity_details.promocode) ? celebrityData?.celebrity_details.promocode : generalPromocode?.[generalPromocode?.length - 1];
	const { dateFormat } = partnerData?.partnerData;
	const { t } = useTranslation();
	const [showDetails, toggDetails] = useState(false);
	const popRef = useRef(null);
	const rootRef = useRef(null);

	const onWindowClick = (event) => {
		if (popRef.current &&
      !popRef.current.contains(event.target) &&
      !rootRef.current.contains(event.target)) {
			toggDetails(false);
		}
	};

	useEffect(() => {
		window.addEventListener('click', onWindowClick);
		return () => {
			window.removeEventListener('click', onWindowClick);
		};
	}, []);

	if (isEmpty(discount) && isEmpty(promocode)) {
		return null;
	}

	const value = discount?.discount || promocode?.discount;
	const productType = discount?.product_type || [{id: 'All products', label: 'All products', related_request_type: [1, 2, 3, 4, 5, 6, 7, 8, 9]}];
	const activeTo = discount?.active_to || promocode.valide_to;
	const title = discount?.title || promocode?.name || 'KICKOFF 15%';
	const description = discount?.description || promocode?.description || '';
	return (
		<Wrap className='promocodeBanner' ref={rootRef} onClick={() => toggDetails(!showDetails)} bgColor={props.bgColor}>
			{
				showDetails &&
          <Pop ref={popRef} zIndex={isCelebPage ? 100 : 1}>
          	<Trans
          		i18nKey='common.discountBanner.popupText'
          		values={{
          			discountPercent: parseFloat(value).toFixed(0),
          			productList: getProdList(productType, t),
          			endDate: moment(activeTo).format(dateFormat),
          			title: title,
          			description: description,
          		}}
          	>
          		<DiscountTitle>
          			{parseFloat(value).toFixed(0)}%
                Off{' '}
          		</DiscountTitle>
          		<DiscountHeading>
          			{title}
          		</DiscountHeading>
          		{
          			description && (

          		<DescriptionP>
          			{description}
          		</DescriptionP>
          			)
          		}
          		<SmallDescription>
                Valid on {getProdList(productType, t)}. Ends on {moment(activeTo).format(dateFormat)}
          		</SmallDescription>
          	</Trans>
          </Pop>
			}
			<MainTitle>
				{
					t('common.discountBanner.bannerText', {
						discountPercent: parseFloat(value).toFixed(0),
						description: productType  && productType.length <=1 && productType[0].label !== 'All products' ? productType[0].label
							: t('common.discountBanner.selectExp')
					})
				}
			</MainTitle>
			<span className='view-details'>
				{t('common.view_details')}
			</span>
		</Wrap>
	);
};

DiscountBanner.defaultProps = {
	discount: {},
	dateFormat: 'MM/DD/YYYY'
};

DiscountBanner.propTypes = {
	discount: PropTypes.object,
	dateFormat: PropTypes.string,
};

const mapStateToProps = state => ({
	dateFormat: state.entity.data.base_date_format,
});

export default DiscountBanner;
