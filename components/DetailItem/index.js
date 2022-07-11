import React from 'react';
import PropTypes from 'prop-types';
// import ToolTip from 'components/ToolTip';
import { DetailHead, DetailDesc, DetailWrap } from './styled';
import ToolTip from 'components/ToolTip';

const DetailItem = ({ heading, descTooltip, description, classes }) => (
  <DetailWrap className={classes.root}>
    <DetailHead className={classes.detailHead}>
      {heading}:
    </DetailHead>
    <ToolTip title={descTooltip}>
      <DetailDesc className={classes.detailDesc}>
        {description.split('\n').map((item, i) => {
        return <span className='description-para' key={i}>{item}</span>;
        })}
      </DetailDesc>
    </ToolTip>
  </DetailWrap>
)

DetailItem.defaultProps = {
  heading: '',
  description: '',
  classes: {},
  descTooltip: '',
}

DetailItem.propTypes = {
  descTooltip: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  classes: PropTypes.object,
}

export default DetailItem;
