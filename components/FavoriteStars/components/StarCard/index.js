import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useVisibility } from 'customHooks/domUtils';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
	starProfessionsFormater,
	getStarName,
} from 'src/utils/dataToStringFormatter';
import ToolTip from 'components/ToolTip';
import { Image } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import { Layout, NewLbl, Content } from './styled';
import { useVisibility } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

const StarCard = ({ star, ...props }) => {
	const { data: entityData } = useGetPartner();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const [rootNode, setRootNode] = useState(null);
	const visible = useVisibility(rootNode);
	const { t } = useTranslation();

	const onCloseClick = starItem => event => {
		event.stopPropagation();
		props.onCloseClick(starItem);
	};

	const onView = data => () => {
		props.onPrimaryBtnClick(data);
	};

	const getUserImage = () => {
		if (visible) {
			const profileImg =
        star.profileImage ||
        (star.avatar_photo &&
          (star.avatar_photo.thumbnail_url || star.avatar_photo.image_url));
			return profileImg;
		}
		return '';
	};

	return (
		<Layout>
			{star.recent && <NewLbl>{t('fan_general_list.new')}</NewLbl>}
			<Image
				className="star-img"
				ref={setRootNode}
				image={getUserImage()}
			/>
			<Content>
				<span
					title={
						star.celebrity_profession &&
            starProfessionsFormater(star.celebrity_profession)
					}
					className="professions"
				>
					{star.celebrity_profession &&
            starProfessionsFormater(star.celebrity_profession)}
				</span>
				<span
					title={getStarName(star.nick_name, star.first_name, star.last_name)}
					className="star-nm"
				>
					{getStarName(star.nick_name, star.first_name, star.last_name)}
				</span>

				<span>
					<span>
						{' '}
						{t('common.starting_at_text')} {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(star.lowest_price), false, false)}
					</span>
					<span className="sep">|</span>
					<LinkText onClick={onView(star)}>{t('common.viewPage')}</LinkText>
				</span>
			</Content>
			<ToolTip title={`Remove this ${entityData?.partnerData?.talentSingle} from your favorites list`}>
				<FontAwesomeIcon
					className="close-btn"
					icon={faTimes}
					onClick={onCloseClick(star)}
				/>
			</ToolTip>
		</Layout>
	);
};

StarCard.propTypes = {
	star: PropTypes.object.isRequired,
	onCloseClick: PropTypes.func.isRequired,
	onPrimaryBtnClick: PropTypes.func.isRequired,
};

export default StarCard;
