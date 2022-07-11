import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../SecondaryButton';
// import RateDisplay from 'components/RateDisplay';
// import { DescriptionP, HeadingH2 } from 'styles/TextStyled';
// import AlertSoldOut from 'components/AlertSoldOut';
// import { useVisibility } from 'customHooks/domUtils';
import { Wrapper, SubHead } from './styled';
import { DescriptionP, HeadingH2 } from '../../styles/TextStyled';
import RateDisplay from '../RateDisplay';
import AlertSoldOut from '../AlertSoldOut';
import { useVisibility } from '../../customHooks/domUtils';
import Image from 'next/image';

function RequestCard(props) {
	const { data, onClick, soldOut } = props;
	const [rootNode, setRootNode] = useState(null);
	const visible = useVisibility(rootNode);

	return (
		<Wrapper
			className="req-card-li"
			ref={setRootNode}
			onClick={
				!soldOut && !props.disableButton && !data.isStar && data.availability
					? onClick
					: () => {}
			}
			clickable={!soldOut && !props.disableButton && !data.isStar}
		>
			<div className="flex-align">
				<SubHead className={`sub-head ${!data.image ? 'no-image' : ''}`}>{data.subHead}</SubHead>
				{data.image && visible && (
					<picture>
						{
							data.webpImage &&
                <source srcSet={data.webpImage} type="image/webp" />
						}
						<source srcSet={data.image} type="image/jpeg" />
						<Image
							width={100}
							height={100}
							objectFit="cover"
							objectPosition={'center'}
							className="image card-image"
							src={data.image}
							priority
						/>
					</picture>
				)}
				<HeadingH2 className="heading">{data.title}</HeadingH2>
				{data.amount && (
					<RateDisplay
						type={data.type}
						rate={data.amount}
						promoDetails={data.promoDetails}
						rType={data.rType}
						discountObj={data.discountObj}
					/>
				)}
				<DescriptionP className="card-desc">{data.desc}</DescriptionP>
			</div>
			{(!soldOut || data.isStar) && (
				<Button
					className="start-btn"
					disabled={props.disableButton || data.isStar || !data.availability}
					isDisabled={props.disableButton || data.isStar || !data.availability}
				>
					{data.btnLabel}
				</Button>
			)}
			{soldOut && !data.isStar && (
				<AlertSoldOut
					celbId={data.celbId}
					type={data.type}
					productId={data.productId}
					updateToast={props.updateToast}
					fanEmail={data.fanEmail}
				/>
			)}
		</Wrapper>
	);
}

RequestCard.propTypes = {
	onClick: PropTypes.func.isRequired,
	updateToast: PropTypes.func,
	data: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	soldOut: PropTypes.bool,
	disableButton: PropTypes.bool,
	fanEmail: PropTypes.string,
};
RequestCard.defaultProps = {
	soldOut: false,
	disableButton: false,
	updateToast: () => {},
	fanEmail: '',
};

export default RequestCard;
