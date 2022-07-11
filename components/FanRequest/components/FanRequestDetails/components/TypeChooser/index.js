import React from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from 'components/ErrorHandler';
import Loader from 'components/Loader';
import { componentList } from './constants';

const TypeChooser = ({ reqType, data, ...props }) => {
	const Component = componentList[reqType];

	const gatFallBack = () => {
		return (
			<div style={{ minHeight: '100vh' }}>
				<Loader />
			</div>
		);
	};
	if (Component) {
		return (
			<ErrorHandler fallback={gatFallBack}>
				<Component {...props} reqType={reqType} />
			</ErrorHandler>
		);
	}
	return null;
};

TypeChooser.defaultProps = {
	reqType: '',
};

TypeChooser.propTypes = {
	reqType: PropTypes.string,
	data: PropTypes.object.isRequired,
};

export default TypeChooser;
