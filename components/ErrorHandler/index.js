import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Error } from './styled';
import Loader from '../Loader';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: {} };
	}

	static getDerivedStateFromError(e) {
		return { hasError: true, error: e };
	}

	render() {
		if (this.state.hasError) {
			if (this.state.error.name === 'ChunkLoadError') {
				window.location.reload(true);
			}
			return this.props.errorRender ? this.props.errorRender() : <Error>Loading failed! Please reload.</Error>;
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	errorRender: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool,
	]).isRequired,
};

const RenderComponent = ({ children, fallback, errorRender }) => {
	return (
		<ErrorBoundary errorRender={errorRender}>
			{children}
		</ErrorBoundary>
	);
};

RenderComponent.defaultProps = {
	fallback: false,
	errorRender: false,
};

RenderComponent.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool,
	]),
	errorRender: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool,
	])
};

export default RenderComponent;
