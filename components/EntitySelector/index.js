import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes
} from '@fortawesome/pro-light-svg-icons';
import {
	Description,
} from '../../styles/TextStyled';
import { currencyMap } from './utils';
import {
	Wrap,
	Heading,
	DropHeading,
	DropWrapper,
	DropItem,
	DialogStyled,
	DialogContent,
} from './styled';
import { useRouter } from 'next/router';
import { isEmpty } from '../../src/utils/dataStructures';
import { queryParamUpdater } from '../../src/utils/urlUtils';
import { useMedia } from '../../customHooks/domUtils';
import { parseQueryString } from '../../src/utils/dataformatter';
import Dropdown from '../Dropdown';
import Input from '../TextInput';
import Button from '../SecondaryButton';
import { editGeneralState, useGeneral } from '../../src/context/general';
import { useTranslation } from 'next-i18next';
import cookieCutter from 'cookie-cutter';
import { localesHash } from '../../src/constants/locales';
import { useCookies } from 'react-cookie';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import Image from 'next/image';


const EntitySelector = ({
	// currencyData,
	// entityData,
	// partnerData,
	onModalClose,
	openModal,
	disableCurrDisplay,
	shortView,
	fullView,
	classes,
}) => {
	// const { t } = useTranslation();
	const currencyData = useCurrencyData();
	const { data } = useGetPartner();
	const entityData = data?.partnerData;
	const languageData = data?.languageData;
	const regionSelected = () => {
		if (entityData?.regions) {
			return entityData?.regions.find(region => region.region_id === entityData?.region);
		}
		return {};
	};
	const router = useRouter();
	const [cookies, setCookie, removeCookies] = useCookies(['NEXT_LOCALE']);

	const { t } = useTranslation();
	const currentRegion = regionSelected();
	const currentCurr = {
		currency: currencyData?.abbr,
		currency_symbol: currencyData?.symbol,
		name: `${currencyData?.symbol} (${currencyData?.abbr})`
	};
	const currentLang = languageData;
	const [_, dispatch] = useGeneral();
	const [switcher, setSwitcher] = useState(openModal);
	const [selectedRegion, setSelectedRegion] = useState(currentRegion);
	const [selectedCurr, setSelectedCurr] = useState({});
	const [selectedLang, setSelectedLang] = useState(currentLang);

	const isMobile = useMedia('(max-width: 831px)');

	const onSave = () => {
		const currData = {
			abbr: selectedCurr.currency,
			symbol: selectedCurr.symbol,
			name: selectedCurr.currencyName,
			rate: selectedCurr.rate,
		};
		localStorage.setItem('currencyData', JSON.stringify(currData));
		editGeneralState(dispatch, { payload: currData, key: 'currencyData' });
		const cookie = cookies['NEXT_LOCALE'];
		if (selectedRegion.region_id !== currentRegion.region_id) {
			if (cookie) {
				removeCookies('NEXT_LOCALE');
			}
			setCookie('NEXT_LOCALE', localesHash[selectedRegion.country_code.toLowerCase()], { path: '/' });
			window.location.href = `${window.location.origin}/${localesHash[selectedRegion.country_code.toLowerCase()]}${router.asPath}`;
		} else {
			onModalClose();
		}
	};

	const regionList = useMemo(() => {
		return entityData?.regions ?
			entityData?.regions.sort((a,b) => {
				if(a.entity_name.toLowerCase() < b.entity_name.toLowerCase()) { return -1; }
				else if(a.entity_name.toLowerCase() > b.entity_name.toLowerCase()) { return 1; }
				return 0;
			}) : [];
	}, []);

	const currencyList = useMemo(() => {
		const list = selectedRegion.currencies ? selectedRegion.currencies : [];
		return list.map(curr => currencyMap(curr));
	}, [selectedRegion]);
	useEffect(() => {
		const foundCurr = selectedRegion.currencies ? selectedRegion.currencies.find(curr => curr.code === currencyData?.abbr) : null;
		const defCurr = selectedRegion.currencies && selectedRegion.entities && selectedRegion.entities[0] ? selectedRegion.currencies.find(curr => curr.code === selectedRegion.entities[0].default_currency) : null;
		setSelectedCurr(currencyMap(foundCurr || defCurr || {}));
	}, [selectedRegion, entityData]);

	useEffect(() => {
		setSwitcher(openModal);
	}, [openModal]);

	useEffect(() => {
		if (!switcher) {
			onModalClose();
		}
	}, [switcher]);

	const renderDropFields = ({
		title,
		list,
		selected,
		placeHolder,
		labelKey,
		valueKey,
		onChange,
	}) => {
		return (
			<DropItem>
				<DropHeading>{title}</DropHeading>
				<Dropdown
					rootClass="state-drop"
					selected={selected}
					options={list}
					labelKey={labelKey}
					valueKey={valueKey}
					onChange={onChange}
					placeHolder={placeHolder}
					className="cus-drop"
					secondary
				/>
			</DropItem>
		);
	};
	const liteView = (isMobile && !fullView) || shortView;
	if (entityData?.regions) {
		return (
			<Wrap className={classes.root} liteView={liteView}>
				<DialogStyled
					open={switcher}
					onClose={() => setSwitcher(false)}
					classes={{
						paper: 'paper-root',
					}}
				>
					<DialogContent>
						<FontAwesomeIcon
							className='close-icon'
							icon={faTimes}
							onClick={() => setSwitcher(false)}
						/>
						<Heading>
							{t('common.entitySelector.heading')}
						</Heading>
						<Description>
							{t('common.entitySelector.description')}
						</Description>
						<DropWrapper>
							{
								renderDropFields({
									title: t('common.entitySelector.regionTitle'),
									list: regionList,
									selected: selectedRegion,
									placeHolder: t('common.entitySelector.regionPlaceholder'),
									labelKey: 'entity_name',
									valueKey: 'region_id',
									onChange: (option) => {
										setSelectedRegion(option);
										if (!isEmpty(option.languages)) {
											setSelectedLang(option.languages.find(lang => lang.default));
										}
									},
								})
							}
							{
								!isEmpty(currencyList) &&
                  renderDropFields({
                  	title: t('common.entitySelector.currencyTitle'),
                  	list: currencyList,
                  	selected: selectedCurr,
                  	placeHolder: t('common.entitySelector.currencyPlaceholder'),
                  	labelKey: 'fullName',
                  	valueKey: 'currency',
                  	onChange: setSelectedCurr,
                  })
							}
							{
								!isEmpty(selectedRegion) && !isEmpty(selectedRegion.languages) ? renderDropFields({
									title: t('common.entitySelector.langTitle'),
									list: selectedRegion.languages,
									selected: selectedLang,
									placeHolder: t('common.entitySelector.langPlaceholder'),
									labelKey: 'language',
									valueKey: 'code',
									onChange:  setSelectedLang,
								})
									: null}
						</DropWrapper>
						<Button className='action-btn' onClick={onSave}>
							{t('common.save')}
						</Button>
					</DialogContent>
				</DialogStyled>
				{
					!openModal &&
            <span className='text-container' onClick={() => setSwitcher(true)}>
            	<Image layout='fixed' height={22} width={22} className='region-icon' src={currentRegion.icon} alt='icon' />
            	{liteView ? '' : currentRegion.entity_name}&nbsp;&nbsp;|&nbsp;&nbsp;
            	{liteView ? currentLang.short : currentLang.language}{!disableCurrDisplay ? <React.Fragment>&nbsp;&nbsp;|&nbsp;&nbsp;{currentCurr?.name || ''}</React.Fragment> : ''}
            </span>
				}
			</Wrap>
		);
	}
	return null;
};

EntitySelector.defaultProps = {
	classes: {},
	history: {},
	openModal: false,
	onModalClose: () => {},
	disableCurrDisplay: false,
};

EntitySelector.propTypes = {
	entityData: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	shortView: PropTypes.bool,
	openModal: PropTypes.bool,
	disableCurrDisplay: PropTypes.bool,
	onModalClose: PropTypes.func,
	isLoggedIn: PropTypes.bool.isRequired,
	fullView: PropTypes.bool,
	classes: PropTypes.object,
};

// const mapStateToProps = state => ({
//   entityData: state.entity.data,
//   currencyData: state.entity.currencyData,
//   languageData: state.entity.languageData,
//   isLoggedIn: state.session.isLoggedIn,
// })

export default EntitySelector;
