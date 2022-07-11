import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dropdown from 'components/Dropdown';
import Button from 'components/SecondaryButton';
import { Heading } from 'styles/TextStyled';
// import { updateUserDetails as updateUser } from 'store/shared/actions/saveSettings';
import { Layout, Wrap, DropWrapper, DropHeading, DropItem } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
const LangSelector = props => {
	const { data: userData } = useFetchLoggedUser();
	const { data: entityData } = useGetPartner();
	const [selectedLang, setSelectedLang] = useState({});

	const { t } = useTranslation();

	useEffect(() => {
		if (!isEmpty(userData?.user?.region_languages)) {
			setSelectedLang(
				userData?.user?.region_languages.find(
					lang => lang.code.toLowerCase() === userData?.user?.default_lang?.toLowerCase(),
				) || {},
			);
		}
	}, [userData?.user?.region_languages.length]);

	const onSave = () => {
		props.updateUser(
			userData?.user?.id,
			{
				celebrity_details: {},
				user_details: {
					default_lang: selectedLang.code.replace('_', '-'),
				},
			},
			() => {},
			false,
			false,
		);
	};

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

	return (
		<Layout className="set-wrap">
			<Wrap>
				<Heading className="inner-head">{props.heading}</Heading>
				<DropWrapper>
					{!isEmpty(userData?.user?.region_languages) &&
            renderDropFields({
            	title: t('common.entitySelector.langTitle'),
            	list: userData?.user?.region_languages,
            	selected: selectedLang,
            	placeHolder: t('common.entitySelector.langPlaceholder'),
            	labelKey: 'language',
            	valueKey: 'code',
            	onChange: setSelectedLang,
            })}
				</DropWrapper>
				<Button className="action-btn" onClick={onSave}>
					{t('common.save')}
				</Button>
			</Wrap>
		</Layout>
	);
};

LangSelector.propTypes = {
	userDetails: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired,
};

LangSelector.defaultProps = {};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails.settings_userDetails,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   updateUser: (id, obj, callback, globToast, noToast) =>
//     dispatch(updateUser(id, obj, callback, globToast, noToast)),
// });

export default LangSelector;
