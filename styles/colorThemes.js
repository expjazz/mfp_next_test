const colorThemes = {
	darkGrey: '#333',
	v3GrayBg: '#2C2A30',
	v3LightGray: '#999999',
	greyishBrown: '#555555',
	boldBrown: '#5d5d5d',
	bold2: '#5a5a5a',
	lightBrown: '#b1b1b1',
	brown: '#6a6a6a',
	brownGrey: '#999999',
	lightGreyTwo: '#9b9b9b',
	brownGreyTwo: '#aaaaaa',
	notfColor: '#7c7c7c',
	normalGrey: '#777777',
	headerGrey: '#e1e1e1',
	borderGrey: '#d0d0d0',
	veryLightPink: '#cccccc',
	verifyGreen: '#1c6c50',
	veryLightPinkTwo: '#eaeaea',
	white: '#f6f6f6',
	lightDarK: '#565657',
	orangePink: '#ff6c58',
	flatBlue: '#2f839d',
	starViolet: '#615195',
	darkViolet: '#5e5391',
	paleSkyBlue: '#cee8f0',
	lightGrey: '#797979',
	paleBlue: '#42a3c1',
	twilight: '#8174aa',
	fadedOrange: '#ff953c',
	pale: '#ffead8',
	mango: '#ffb12a',
	lightOrange: '#fff4eb',
	greyBackground: '#f5f5f5',
	paleGrey: '#E6E6E6',
	lightGreyAlternate: '#eee',
	lightBlack: '#3c3c3c',
	inputColor: '#b7b7b7',
	videoSeek: '#b6b6b6',
	pureWhite: '#fff',
	red: '#F57868',
	placeHolder: '#b7b7b7',
	green: '#63af18',
	switchGreen: '#339B26',
	errorRed: '#990000',
	dashButtonGrey: '#707070',
	textAreaBorder: '#e0e0e0',
	greyAlternate: '#888888',
	paleYellow: '#F8B12A',
	darkYellow: '#F6953C',
	successGreen: '#02d295',
	inputColorSecondary: 'rgb(85, 85, 85)',
	msgBubble: '#E9F4F8',
	errorBackground: '#fae5e5',
	confirmBackground: '#e8fae5',
	exclamationWarn: '#ffa000',
	flatPink: '#ed1561',
	flatViolet: '#0c329b',
	customBlack: '#121212',
	customGrey: '#979797',
	headBlue: '#12308d',
	linkBlue: '#0c329b',
	arrow: '#bbb',
	superSportLightGray: '#e7e8ea',
	superSportDarkBlue: '#103464',
	superSportRed: '#cc0102'
};

export const getColorThemes = entityDet => {
	return {
		...colorThemes,
		...(entityDet.primary_color
			? {
				orangePink: entityDet.primary_color,
				fadedOrange: entityDet.primary_color,
				lightOrange: entityDet.primary_color,
			}
			: {}),
		...(entityDet.cta_color
			? {
				flatBlue: entityDet.cta_color,
				paleSkyBlue: entityDet.cta_color,
				paleBlue: entityDet.cta_color,
			}
			: {}),
		...(entityDet.accent_color
			? {
				starViolet: entityDet.accent_color,
				darkViolet: entityDet.accent_color,
				twilight: entityDet.accent_color,
			}
			: {}),
		...(entityDet.error_messages
			? {
				errorRed: entityDet.error_messages,
			}
			: {}),
		...(entityDet.confirmation
			? {
				verifyGreen: entityDet.confirmation,
			}
			: {}),
		...(entityDet.error_background
			? {
				errorBackground: entityDet.error_background,
			}
			: {}),
		...(entityDet.confirmation_background
			? {
				confirmBackground: entityDet.confirmation_background,
			}
			: {}),
		...(entityDet.caution
			? {
				exclamationWarn: entityDet.caution,
			}
			: {}),
		entity: {
			...(entityDet.primary_color
				? {
					orangePink: entityDet.primary_color,
					fadedOrange: entityDet.primary_color,
					lightOrange: entityDet.primary_color,
				}
				: {}),
			...(entityDet.cta_color
				? {
					flatBlue: entityDet.cta_color,
					paleSkyBlue: entityDet.cta_color,
					paleBlue: entityDet.cta_color,
				}
				: {}),
			...(entityDet.accent_color
				? {
					starViolet: entityDet.accent_color,
					darkViolet: entityDet.accent_color,
					twilight: entityDet.accent_color,
				}
				: {}),
			...(entityDet.chat_bubbles
				? {
					msgBubble: entityDet.chat_bubbles,
				}
				: {}),
			...(entityDet.error_messages
				? {
					errorRed: entityDet.error_messages,
				}
				: {}),
			...(entityDet.confirmation
				? {
					verifyGreen: entityDet.confirmation,
				}
				: {}),
			...(entityDet.error_background
				? {
					errorBackground: entityDet.error_background,
				}
				: {}),
			...(entityDet.confirmation_background
				? {
					confirmBackground: entityDet.confirmation_background,
				}
				: {}),
			...(entityDet.caution
				? {
					exclamationWarn: entityDet.caution,
				}
				: {}),
		},
		default: {
			orangePink: '#ff6c58',
			flatBlue: '#2f839d',
			starViolet: '#615195',
			darkViolet: '#5e5391',
			paleSkyBlue: '#cee8f0',
			paleBlue: '#42a3c1',
			twilight: '#8174aa',
			fadedOrange: '#ff953c',
			lightOrange: '#fff4eb',
			verifyGreen: '#1c6c50',
			errorBackground: '#fae5e5',
			confirmBackground: '#e8fae5',
			exclamationWarn: '#ffa000',
			errorRed: '#990000',
			msgBubble: '#E9F4F8',
		},
	};
};

export { colorThemes };
