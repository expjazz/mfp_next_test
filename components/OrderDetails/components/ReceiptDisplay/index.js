import React from 'react';
import PropTypes from 'prop-types';
import DetailItem from 'components/DetailItem';
import { ReceiptStyled } from './styled';

const ReceiptDisplay = ({ receiptArray, detailClasses }) => {
  return (
    <ReceiptStyled>
      {
        receiptArray.map(receipt => receipt.data ? (
          <DetailItem
            classes={{
              root: detailClasses.root,
              detailHead: detailClasses.title,
              detailDesc: detailClasses.description
            }}
            heading={receipt.title}
            descTooltip={receipt.tooltip}
            description={receipt.data}
          />
        ) : null)
      }
    </ReceiptStyled>
  )
}

ReceiptDisplay.defaultProps = {
  receiptArray: [],
  detailClasses: {
    root: '',
    title: '',
    description: '',
  }
}

ReceiptDisplay.propTypes = {
  receiptArray: PropTypes.array,
  detailClasses: PropTypes.object,
}

export default ReceiptDisplay;
