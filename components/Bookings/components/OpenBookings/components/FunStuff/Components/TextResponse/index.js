import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import TextArea from 'components/TextArea';
import Button from 'components/SecondaryButton';
import StatusDisplay from 'components/StatusDisplay';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { FlexCenter } from 'styles/CommonStyled';
import { Description } from 'styles/TextStyled';
import { totalCharCount } from './constants';
import { statusHeading, statusDescription } from '../../constants';
import { CharCount } from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const TextResponse = ({ bookId, completeStatus, updateStatusVal, completeUpload }) => {
  const { t } = useTranslation();
  const [response, updateResponse] = useState('');
  const { data: entityData } = useGetPartner()
  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const clearStates = () => {
    updateResponse('');
  };

  const onComplete = () => {
    completeUpload({
      celebrity_reply: response
    })
  }

  useEffect(() => {
    clearStates();
  }, [bookId]);

  return (
    <React.Fragment>
      <section className="flex-col req-sec">
        <span className="sub-head">{statusHeading}</span>
        <Description className="text note">{statusDescription}</Description>
        <StatusDisplay
          key={bookId}
          list={getStatusList(completeStatus)}
          onSelect={updateStatusVal}
          selected={getDelivStatus(completeStatus)}
        />
      </section>
      <section className="flex-col">
        <span className="sub-head">{t('open_bookings.text_response')}</span>
        <Description className="text note">{t('open_bookings.chara_limit')}</Description>
        <TextArea
          autoSize
          inputProps={{
            onChange: responseChange,
            value: response,
            maxLength: totalCharCount,
            placeholder:t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
            className: 'textarea',
          }}
        />
        <CharCount>
          {t('common.char_remains',{length:totalCharCount - response.length})}
        </CharCount>
        <FlexCenter className="buttons">
          <Button
            className="fun-btns"
            onClick={onComplete}
            disabled={!response.trim('').length}
            isDisabled={!response.trim('').length}
          >
           {t('open_bookings.completeOrder')}
          </Button>
        </FlexCenter>
      </section>
    </React.Fragment>
  );
};

TextResponse.propTypes = {
  bookId: PropTypes.string.isRequired,
  completeStatus: PropTypes.string.isRequired,
  updateStatusVal: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
};

export default TextResponse;
