import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import Input from 'components/TextInput';
import Button from 'components/SecondaryButton';
// import { toggleRegCollector } from 'store/shared/actions/toggleModals';
import { Close } from 'styles/CommonStyled';
import { validateEmail } from 'src/utils/dataformatter';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
// import { regCollector } from 'services/userRegistration';
import { DialogStyled, ModalContainer, Top, Bottom } from './styled';
import { useRouter } from 'next/router';
import { locStorage } from 'src/utils/localStorageUtils';
import { generalLoader, toggleRegCollector, updateToast, useGeneral } from 'src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { regCollectorAction } from 'src/services/myfanpark';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

function RegistrationCollector(props) {
	const router = useRouter();
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	const [state, dispatch] = useGeneral();
	const [email, setValue] = useState('');
	const [error, setEmailError] = useState('');
	const [timeUp, setTimeup] = useState(false);
	const { data: fanData } = useFetchLoggedUser();
	const loaderAction = payload => generalLoader(dispatch, payload);
	const closeHandler = () => {
		toggleRegCollector(dispatch, false);
	};

	useEffect(() => {
		if (fanData) {
			toggleRegCollector(dispatch, false);
		}
	}, []);

	const onSubmit = () => {
		if (validateEmail(email)) {
			setEmailError(true);
		} else {
			loaderAction(true);
			regCollectorAction({ email })
				.then(res => {
					if (res.success) {
						toggleRegCollector(dispatch, false);
					}
					loaderAction(false);
				})
				.catch(err => {
					updateToast(dispatch, {
						value: true,
						message: err.response.data.error.message,
						variant: 'error',
						global: true
					});
					loaderAction(false);
				});
		}
	};

	const inputChange = ({ target: { value } }) => {
		setValue(value);
	};

	const onKeyDown = ({ keyCode }) => {
		if (keyCode === 13) {
			onSubmit();
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setTimeup(true);
		}, 60000);
	}, []);

	useEffect(() => {
		locStorage.setItem('regCollector', true);
	}, []);

	// if (
	//   isEmpty(entityData?.partnerData) ||
	//   !timeUp ||
	//   ['/terms-service', '/privacy-policy'].includes(
	//     router?.pathname,
	//   )
	// ) {
	//   return null;
	// }

	if (!!fanData || !timeUp || router.asPath.includes('/external')) {
		return null;
	}

	return (
		<DialogStyled
			open
			onClose={closeHandler}
			disableBackdropClick={false}
			classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
		>
			<ModalContainer>
				<Top>
					<h1>{t('common.inbox_some_love')}</h1>
					<Trans i18nKey="common.reg_collector">
						<p>Leave us your email and get</p>
						<span className="offer">
							<span>10</span>
							<span className="off">
								<span className="percent">%</span>
								<span className="off-text">OFF</span>
							</span>
						</span>
						<p>your next purchase!*</p>
					</Trans>
				</Top>
				<Bottom>
					<div className="input-wrapper">
						<Input
							inputProps={{
								defaultProps: {
									email,
									onChange: inputChange,
									error,
									onKeyDown,
								},
								labelObj: {
									label: t('common.emailHead'),
									errorMsg: error ? t('common.validEmailError') : null,
								},
							}}
						/>
						<Button className="submit-btn" onClick={onSubmit}>
							{t('common.submitButton')}
						</Button>
					</div>
					<p>{t('common.exclude_bookings')}</p>
				</Bottom>
			</ModalContainer>
			<Close className="close" onClick={closeHandler} />
		</DialogStyled>
	);
}

RegistrationCollector.propTypes = {
	toggleRegCollector: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

export default RegistrationCollector;

// connect(
//   state => ({
//     entityData: state.entity.data,
//   }),
//   dispatch => ({
//     toggleRegCollector: value => dispatch(toggleRegCollector(value)),
//     updateToast: errorObject => dispatch(updateToast({ ...errorObject })),
//     loaderAction: value => dispatch(loaderAction(value)),
//   }),