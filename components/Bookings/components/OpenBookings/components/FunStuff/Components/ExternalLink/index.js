import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Button from 'components/SecondaryButton';
import TextArea from 'components/TextArea';
import StatusDisplay from 'components/StatusDisplay';
import { TextInput } from 'components/TextField';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { FlexCenter } from 'styles/CommonStyled';
import { Description } from 'styles/TextStyled';
import { completeURL } from 'src/constants/regex/urlRegex';
import { heading } from './constants';
import { initialState, linkReducer } from './reducers';
import { statusHeading, statusDescription } from '../../constants';
import { CharCount } from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const ExternalLink = ({
  bookId,
  completeStatus,
  updateStatusVal,
  completeUpload,
}) => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [response, updateResponse] = useState('');
  const [state, dispatch] = useReducer(linkReducer, initialState);

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const onLinkChange = event => {
    dispatch({ type: 'linkUpdate', link: event.target.value });
  };

  const onComplete = () => {
    const link = state.link.trim('');
    if (completeURL.test(link)) {
      completeUpload({
        external_link: state.link,
        celebrity_reply: response,
      });
    } else {
      dispatch({ type: 'errorUpdate', error: t('common.valid_url') });
    }
  };

  return (
    <React.Fragment>
      <div className="flex-col req-sec">
        <span className="sub-head">{statusHeading}</span>
        <Description className="text note">{statusDescription}</Description>
        <StatusDisplay
          key={bookId}
          list={getStatusList(completeStatus)}
          onSelect={updateStatusVal}
          selected={getDelivStatus(completeStatus)}
        />
      </div>
      <div className="flex-col">
        <span className="sub-head">{t('open_bookings.provide_link',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name})}</span>
        <div className="note">
          <TextInput
            label={state.error.length ? state.error : 'External Link'}
            onChange={onLinkChange}
            value={state.link}
            error={state.error.length}
            InputProps={{
              classes: { error: 'error-field', input: 'input-field' },
            }}
            InputLabelProps={{
              classes: {
                shrink: 'input-label-shrink',
                root: 'float-label',
              },
            }}
            nativeProps={{ type: 'text' }}
          />
        </div>
        <TextArea
          autoSize
          inputProps={{
            onChange: responseChange,
            value: response,
            placeholder: t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
            className: 'textarea',
          }}
        />
        <CharCount>{t('common.char_remains',{length:500 - response.length})}</CharCount>
        <FlexCenter className="buttons">
          <Button
            className="fun-btns"
            onClick={onComplete}
            disabled={!state.link.length || state.error.length}
            isDisabled={!state.link.length || state.error.length}
          >
           {t('open_bookings.completeOrder')}
          </Button>
        </FlexCenter>
      </div>
    </React.Fragment>
  );
};

ExternalLink.propTypes = {
  bookId: PropTypes.string.isRequired,
  completeStatus: PropTypes.string.isRequired,
  updateStatusVal: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
};

export default ExternalLink;
