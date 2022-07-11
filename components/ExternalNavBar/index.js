import { useGetPartner } from 'customHooks/reactQueryHooks';
import Image from 'next/image';
import React from 'react';
import { Loading } from 'styles/CommonStyled';
import { Container, HeaderSection } from './styled';
function ExternalHeader() {
	const { data: entityData, isLoading } = useGetPartner();

	if (isLoading) {
		return <Loading />;
	}
	return (
		<Container>
			<HeaderSection>
				<Image
					// layout='fill'
					height={32}
					width={200}
					className="starsona-logo"
					isSuperSport={entityData?.partnerData?.entity_id === 'SUPERSPORT-ZA-1'}
					src={
						entityData?.partnerData?.logo_reverse || entityData.logo
					}
					alt={'t\''}
				/>
			</HeaderSection>
		</Container>
	);
}

export default ExternalHeader;