import { ThemeProvider } from '@emotion/react';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useEffect } from 'react';
import { axiosFetch } from 'src/services/fetch';
import { colorThemes, getColorThemes } from 'styles/colorThemes';

function InjectPartnerStyles({children}) {
	const { data } =  useGetPartner();
	if (data?.partnerData) {
		//Setting up entity headers for the whole app
		if (!axiosFetch.defaults.headers['entity-id']) {
			axiosFetch.defaults.headers['entity-id'] = data?.partnerData?.entity_id;
			axiosFetch.defaults.headers['entity-token'] = data?.partnerData?.public_token;
		}
	}
	useEffect(() => {
		axiosFetch.defaults.headers['entity-id'] = data?.partnerData?.entity_id;
		axiosFetch.defaults.headers['entity-token'] = data?.partnerData?.public_token;
	}, [data?.partnerData]);
	return (
		<ThemeProvider theme={data?.partnerData ? getColorThemes(data.partnerData) : colorThemes}>
			{children}
		</ThemeProvider>
	);
}

export default InjectPartnerStyles;
