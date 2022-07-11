import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Button from 'components/SecondaryButton';
import { PlaceholderWrap, PlaceholderText, PlaceholderImg} from './styled';

const EmptyPlaceholder = ({
  text,
  buttonText,
  imageURL,
}) => {
  return (
    <PlaceholderWrap>
      {imageURL && <PlaceholderImg src={imageURL} />}
      <PlaceholderText>
        {text}
      </PlaceholderText>
      <Link href='/browse-stars'>
        <a>
          <Button secondary>
            {buttonText}
          </Button>
        </a>
      </Link>
    </PlaceholderWrap>
  )
}

EmptyPlaceholder.defaultProps = {
  text: '',
  buttonText: '',
  imageURL: '',
}

EmptyPlaceholder.propTypes = {
  text: PropTypes.string,
  buttonText: PropTypes.string,
  imageURL: PropTypes.string,
}

export default EmptyPlaceholder;
