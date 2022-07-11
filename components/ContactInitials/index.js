import React from 'react';
import { Container } from './styled';
import PropTypes from 'prop-types';
function ContactInitials({children, color}) {
	return (
		<Container color={color}>{children}</Container>
	);
}

export default ContactInitials;
ContactInitials.propTypes = {
	color: PropTypes.string,
	children: PropTypes.node.isRequired,
};

ContactInitials.defaultProps = {
	color: Math.floor(Math.random()*16777215).toString(16),
};