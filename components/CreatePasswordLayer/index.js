import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const CreatePassword = dynamic(() => import('components/CreatePassword'));

function CreatePasswordLayer({children}) {
	const firstRender = useRef(true);
	const { data: fanData } = useFetchLoggedUser();
	const router = useRouter();
	const avoid = ['bio', 'shoutout', 'chat', 'social','fun', 'live', 'merch', 'commercial', 'thankyou', 'tip'];

	useEffect(() => {
		if (fanData?.user && firstRender.current) {
			// firstRender.current = false
		}
	}, [fanData]);
	const toAvoidBool = avoid.find(path => router.asPath.includes(path));
	if (fanData?.user && !fanData?.user.has_password && !toAvoidBool && firstRender.current) {
		return (
			<>
				<CreatePassword />
				{children}
			</>
		);
	}
	return children;
}

export default CreatePasswordLayer;
