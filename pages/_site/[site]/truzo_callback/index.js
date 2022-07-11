import TruzoWrapper from 'components/TruzoWrapper/TruzoWrapper';
import React from 'react';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';

function TruzoCallback() {
	return (
		<TruzoWrapper />
	);
}

export default TruzoCallback;

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths,
		fallback: 'blocking'
	};
}

export async function getStaticProps() {
	return {
		props: {


		},
	};
}