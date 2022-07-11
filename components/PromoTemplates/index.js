import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import { Layout } from './styled';

const PromoTemplate = props => {
  const temRef = useRef(null);

  useEffect(() => {
    if (
      props.template_style &&
      temRef.current &&
      temRef.current.getElementsByClassName('profile-pic')[0]
    ) {
      const styles = JSON.parse(props.template_style);
      Object.keys(styles).forEach(key => {
        temRef.current.getElementsByClassName('profile-pic')[0].style[key] =
          styles[key];
      });
    }
  }, [temRef, props.template]);
  return (
    <Layout
      ref={temRef}
      className="template-card"
      selected={props.selected}
      dangerouslySetInnerHTML={{
        // __html: dompurify.sanitize(props.template)
        __html: props.template,
      }}
    />
  );
};

PromoTemplate.propTypes = {
  template: PropTypes.string.isRequired,
  template_style: PropTypes.string,
  selected: PropTypes.bool,
};

PromoTemplate.defaultProps = {
  template_style: null,
  selected: false,
};
export default PromoTemplate;
