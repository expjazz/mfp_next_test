import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { optionList } from './utils';
import { Wrapper, IconWrap, Label, IconLabel, Item } from './styled';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

function Test({children}) { return (<div>{children}</div>);}
function RequestItems({ userId, options, selected, classes, onSelected }) {
	// useEffect(() => {
	//   if (document.getElementById(selected)) {
	//     document.getElementById(selected).focus();
	//     document.getElementById(selected).scrollIntoView();
	//   }
	// });
	const router = useRouter();
	useEffect(() => {
		options.filter(option => option !== 'home').forEach(option => {
			router.prefetch(`/${userId}/${option}`);
		});
	}, []);

	const { t } = useTranslation();
	const Elm = onSelected ? Item : Link;
	if (options.length > 0) {
		return (
			<Wrapper className={classes.root}>
				<div className="scroll">
					{options.map(option => {
						return (
							<Elm
								href={option === 'home' ? `/${userId}/posts` : `/${userId}/${option}`}
								passHref
								key={option}
								id={option}
								shallow={false}
								className="item-link"
								{...(onSelected
									? { onClick: () => onSelected(option, optionList[option]) }
									: {})}
							>
								<IconLabel className={option === selected ? 'active' : ''}>
									<IconWrap className="icon-wrap">
										{optionList[option].cusIcon ? (
											optionList[option].cusIcon
										) : (
											<FontAwesomeIcon icon={optionList[option].icon} />
										)}
									</IconWrap>
									<Label className="label">{optionList[option].label(t)}</Label>
								</IconLabel>
							</Elm>
						);
					})}
				</div>
			</Wrapper>
		);
	}
	return <h1>here</h1>;
}

RequestItems.propTypes = {
	options: PropTypes.array,
	userId: PropTypes.string.isRequired,
	classes: PropTypes.object,
	selected: PropTypes.string,
	onSelected: PropTypes.oneOfType([PropTypes.func, null]),
};
RequestItems.defaultProps = {
	options: [],
	selected: '',
	classes: {},
	onSelected: null,
};

export default RequestItems;
