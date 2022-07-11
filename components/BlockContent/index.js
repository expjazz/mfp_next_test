import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/pro-light-svg-icons';
import BlockStyled from './styled';
import { useVisibility } from '../../customHooks/domUtils';

const BlockContent = ({ title, heading, onClick, image, classes, imageLazy, playIcon, ...props }) => {
  const [rootNode, setRootNode] = useState(null);
  const visible = useVisibility(rootNode);

  return (
    <BlockStyled ref={setRootNode} className={classes.root} onClick={onClick}>
      <BlockStyled.AvatarImage className={classes.image} imageURL={visible || !imageLazy ? image : ''}>
        { playIcon ? <FontAwesomeIcon className='play-icon' icon={faPlayCircle} /> : null }
      </BlockStyled.AvatarImage>
      <BlockStyled.Title className={classes.title}>
        {title}
      </BlockStyled.Title>
      <BlockStyled.Heading className={classes.heading}>
        {heading}
      </BlockStyled.Heading>
    </BlockStyled>
  )
}

BlockContent.defaultProps = {
  image: '',
  title: '',
  heading: '',
  onClick: () => {},
  classes: {},
  playIcon: false,
}

BlockContent.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  heading: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.object,
  playIcon: PropTypes.bool,
}

export default BlockContent;
