import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Dropdown from 'components/Dropdown';
// import { useTranslation } from 'next-i18next';
import { Wrap } from './styled';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { getStarName } from 'src/utils/dataToStringFormatter';
import { useRouter } from 'next/router';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
const LangSelector = props => {
	const { data: star } = useGetCelebrityData();
	const { data: loggedUser } = useFetchLoggedUser();
	const router = useRouter();
	const fanPage = router.asPath.includes('fan-manage');
	let languageList;
	if (fanPage) {
		languageList = loggedUser.user?.region_languages || [];
	} else {
		languageList = star?.celebrity_details?.languages || [];
	}
	const setLang = () => {
		if (languageList) {
			return languageList.find(lang => lang.default);
		} else {
			return props.langList?.find(lang => lang.id === props.language.id);
		}
	};

	const { t } = useTranslation();
	const [selected, setSelected] = useState(setLang() || props.starDefaultLang);

	const onLangSelect = option => {
		setSelected(option);
	};

	useEffect(() => {
		if (selected?.language) {
			props.onSelectLang(selected);
		}
	}, [selected.language]);
	const starName = getStarName(
		star?.user?.nick_name,
		star?.user?.first_name,
		star?.user?.last_name
	);
	return languageList.length > 1 ? (
		<Wrap>
			<span className="language-label">
				{t('purchase_flow.select_language')}
			</span>
			<Dropdown
				rootClass="lang-drop-down"
				secondary
				selected={selected}
				options={languageList || props.langList || []}
				labelKey="language"
				valueKey="id"
				onChange={onLangSelect}
				placeHolder={t('common.entitySelector.langPlaceholder')}
				className="lang-dop-cls"
			/>
		</Wrap>
	) : (
		<Wrap>
			{t('purchase_flow.star_language', {
				shortName: starName,
				language: languageList?.[0]?.language || selected?.language || props.langList?.[0]?.language,
			})}
		</Wrap>
	);
};

LangSelector.defaultProps = {
	language: {},
	langList: [],
	starDefaultLang: {},
	starName: '',
	onSelectLang: () => {},
};

LangSelector.propTypes = {
	language: PropTypes.object,
	onSelectLang: PropTypes.func,
	starName: PropTypes.string,
	langList: PropTypes.array,
	starDefaultLang: PropTypes.object,
};

export default LangSelector;
