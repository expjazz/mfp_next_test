import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import { Description } from 'styles/TextStyled';
import { Layout, Image, Content, Heading } from './styled';

const ListCard = ({image, heading, onClick, description, isIdeas}) => {
  return (
    <Layout isIdeas={isIdeas} image={image} onClick={onClick}>
      {
        image &&
          <Image isIdeas={isIdeas} src={image} alt={heading} />
      }
      <Content isIdeas={isIdeas} image={image}>
        <Heading isIdeas={isIdeas}>{heading}</Heading>
        <Description>
          <HTMLEllipsis
            unsafeHTML={dompurify.sanitize(description)}
            maxLine='2'
            ellipsis='...'
            basedOn='letters'
          />
        </Description>
      </Content>
    </Layout>
  )
}

ListCard.defaultProps = {
  onClick: () => {},
  heading: '',
  description: '',
  image: '',
  isIdeas: false,
}

ListCard.propTypes = {
  onClick: PropTypes.func,
  heading: PropTypes.string,
  description: PropTypes.string,
  isIdeas: PropTypes.bool,
  image: PropTypes.string,
}

export default ListCard;
