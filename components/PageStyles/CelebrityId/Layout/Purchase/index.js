import OutterLoader from 'components/OutterLoader';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { isEmpty } from 'src/utils/dataStructures';

import StarShowLayoutContainer from '../StarShowLayoutContainer';
import { ContentWrap, Wrap, Layout } from './styled';

function PurchaseStarLayout(props) {
	const router = useRouter();

	// const { partnerData } = pageProps
	useEffect(() => {
		if (props.error) {
			router.push('/404');
		}
	}, [props.error, router]);
	if (router.isFallback || isEmpty(router.query) || !router.query?.celebrityId) {
		return <OutterLoader />;
	}

	if (props.error) {
		return null;
	}
	return (
		<StarShowLayoutContainer {...props}>
			<Layout>
				<Wrap>
					<ContentWrap>
						{props.children}
					</ContentWrap>
				</Wrap>
			</Layout>
		</StarShowLayoutContainer>
	);
}

export default PurchaseStarLayout;
