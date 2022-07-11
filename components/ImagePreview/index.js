import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import CloseIcon from 'components/CloseIcon';
import { getImageDims } from './utils';
import { DialogStyled, PreviewContainer, ImageEl } from './styled';
import CloseIcon from '../CloseIcon';

function ImagePreview(props) {

	const [dims, updateDims] = useState({
		width: null,
		height: null,
	});

	useEffect(() => {
		const img = new Image();
		img.onload = function() {
			updateDims({
				...getImageDims(this.width, this.height),
			});
		};
		img.src = props.src;
	}, []);

	return (
		<DialogStyled
			classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
			open={props.open}
			onClose={props.onClose}
		>
			<PreviewContainer>
				<div className="img-wrapper scrollbar" id="img-scroll">
					<ImageEl dims={dims} src={props.src} className="bg-img" alt="" role="presentation" />
				</div>
				<CloseIcon
					onClick={props.onClose}
					className="pre-close"
				/>
			</PreviewContainer>
		</DialogStyled>
	);
}

ImagePreview.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	src: PropTypes.string.isRequired,
};

export default ImagePreview;
