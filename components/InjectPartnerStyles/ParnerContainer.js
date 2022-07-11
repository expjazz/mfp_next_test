
import InjectPartnerStyles from '.';

function ParnerContainer(props) {
	// if (isBrowser()) {
	return (<InjectPartnerStyles>
		{props.children}
	</InjectPartnerStyles>);
	// }
	// return props.children
}

export default ParnerContainer;
