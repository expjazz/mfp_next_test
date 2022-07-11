import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { getLocalAmount, getUSDAmount } from 'utils/currencyUtils';
// import { getLocalAmount, getUSDAmount } from '../../../../src/utils/currencyUtils'
import { numberToDecimalWithFractionTwo } from '../../../../src/utils/dataformatter';
import { TextInput } from '../../../TextField';
import SecondaryButton from '../../../SecondaryButton';
import ToolTip from '../../../ToolTip';
import TippingStyled from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { isVodacom } from 'customHooks/domUtils';

const Tipping = props => {
	const [getLocalSymbol, getLocalAmount, getUSDAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const inputRef = useRef(null);
	const [tip, setTip] = useState('');
	const [showCustomTip, toggleCustomTip] = useState(false);

	const changeCustomTipState = state => () => {
		toggleCustomTip(state);

	};

	useEffect(() => {
		if (showCustomTip && isVodacom()) {
			inputRef.current.scrollIntoView();
		}
	}, [showCustomTip]);

	const onTipClick = tipValue => () => {
		if (tipValue) {
			changeCustomTipState(false)();
			props.onTipping(tipValue);
		}
	};

	const onKeyDown = event => {
		if (event.keyCode === 13) {
			onTipClick(getUSDAmount(event.target.value))();
		}
	};

	const onTipChange = event => {
		const pattern = /(?=.*\d)^\$?(([1-9]\d{0,3}(,\d{3})*)|0)?(\.\d{1,2})?$/;
		if (
			event.target.value !== '0' &&
      (pattern.test(event.target.value) || event.target.value === '')
		) {
			setTip(event.target.value);
		}
	};

	return (
		<TippingStyled className="tip-container">
			<ToolTip title={t('common.tipRequired')}>
				<span className="action-title">{t('common.additionalTip')}</span>
			</ToolTip>
			<ul className="tipping-list">
				{props.tipAmounts &&
          props.tipAmounts.map((tipValue, index) => (
          	<li
          		className="tipping-item"
          		id={`tip ${tipValue}`}
          		key={index}
          		onClick={onTipClick(tipValue)}
          		role="presentation"
          	>
          		{getLocalSymbol()}
          		{numberToDecimalWithFractionTwo(
          			getLocalAmount(tipValue),
          			false,
          			false,
          		)}
          	</li>
          ))}
				<li
					className="tipping-item"
					onClick={changeCustomTipState(true)}
					role="presentation"
				>
					{t('common.custom')}
				</li>
			</ul>
			{showCustomTip && (
				<TippingStyled.CustomTipWrapper>
					<div className="custom-tip-wrapper" ref={inputRef}>
						<span className="currency">{getLocalSymbol()} </span>
						<TextInput
							InputProps={{
								disableUnderline: true,
								classes: {
									root: 'input-root',
									multiline: 'input-textarea',
								},
							}}
							value={tip}
							onKeyDown={onKeyDown}
							onChange={onTipChange}
							nativeProps={{ pattern: '\\d*' }}
						/>
					</div>
					<SecondaryButton onClick={onTipClick(getUSDAmount(tip))}>
						{t('common.submitButton')}
					</SecondaryButton>
				</TippingStyled.CustomTipWrapper>
			)}
		</TippingStyled>
	);
};

Tipping.defaultProps = {
	onTipping: () => {},
};

Tipping.propTypes = {
	tipAmounts: PropTypes.array.isRequired,
	onTipping: PropTypes.func,
	currencyData: PropTypes.object.isRequired,
};


export default Tipping;
