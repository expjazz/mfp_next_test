import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import i18n from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import BoxStyled from './styled';

const CommentBox = props => {
	const { t } = useTranslation();
	const [inputVal, setInputVal] = useState(props.value || '');

	useEffect(() => {
		setInputVal(props.value);
	}, [props.value]);

	const onInputChange = event => {
		if (
			event.target.value.length <= props.maxLength ||
      props.maxLength === -1
		) {
			setInputVal(event.target.value);
			props.onChange(event.target.value);
		}
	};

	const onSubmit = () => {
		if (inputVal.trim() !== '') {
			props.onSubmit(inputVal.trim());
			if (!props.value) setInputVal('');
		}
	};

	const onKeyChange = event => {
		if (event.keyCode === 13) {
			onSubmit();
		}
	};

	return (
		<BoxStyled.Wrapper className={props.classes.root}>
			{props.maxLength && props.maxLength > 0 && (
				<BoxStyled.Reminder>
					{ t('common.remCharacters', { count: props.maxLength - (inputVal?.length || 0)}) }
				</BoxStyled.Reminder>
			)}
			<BoxStyled className={props.classes.inputWrapper}>
				<BoxStyled.Input
					value={inputVal}
					className={props.classes.input}
					onChange={onInputChange}
					onKeyUp={onKeyChange}
					placeholder={props.placeholder}
				/>
				{!props.notSend && (
					<FontAwesomeIcon
						className={`message-icon ${props.classes.icon}`}
						icon={faTelegramPlane}
						onClick={onSubmit}
					/>
				)}
			</BoxStyled>
		</BoxStyled.Wrapper>
	);
};

CommentBox.defaultProps = {
	classes: {},
	onChange: () => {},
	onSubmit: () => {},
	value: undefined,
	maxLength: -1,
	thresholdLimit: 0,
	placeholder: i18n.t('common.addComment'),
	notSend: false,
};

CommentBox.propTypes = {
	classes: PropTypes.object,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	value: PropTypes.string,
	maxLength: PropTypes.number,
	thresholdLimit: PropTypes.number,
	placeholder: PropTypes.string,
	notSend: PropTypes.bool,
};

export default CommentBox;
