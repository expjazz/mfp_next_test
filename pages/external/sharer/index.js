import React, { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ExternalHeader from 'components/ExternalNavBar';
import ExternalSharer from 'components/ExternalSharer';
import PageTitle from 'components/PageTitle';
import { Container } from 'components/PageStyles/ExternalSharer/styled';

function Sharer() {
	useEffect(() => {
		if (window.FreshworksWidget) {
			window.FreshworksWidget('hide', 'launcher');
		}
	}, []);
	return (
		<div>
			<ExternalHeader />
			<Container>
				<PageTitle>
        Share
				</PageTitle>
				<ExternalSharer
					alwaysActive
					noPopOver
				/>
			</Container>
		</div>
	);
}

export default Sharer;

export async function getStaticProps({locale}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'footer'])),
		},
	};
}