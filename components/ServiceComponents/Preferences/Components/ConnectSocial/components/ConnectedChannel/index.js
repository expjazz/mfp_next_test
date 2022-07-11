import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  faEllipsisH
} from '@fortawesome/pro-light-svg-icons';
import { socialDet } from '../../constants';
import { ConnectListItem, FontIcon, PopStyled } from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const ConnectedChannel = ({
  channel,
  deleteChannel,
  t,
}) => {
  const { data: entityData } = useGetPartner()
  const [selectChannel, setChannel] = useState(null);
  const dropRef = useRef(null);

  return (
    <React.Fragment>
      <PopStyled
        open={Boolean(selectChannel)}
        anchorEl={dropRef.current}
        classes={{
          paper: 'drop-root',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setChannel(null)}
      >
        <span
          role='presentation'
          className='drop-option'
          onClick={() => deleteChannel(selectChannel.id)}
        >
          {t('common.disconnect')}
        </span>
      </PopStyled>
      <ConnectListItem key={`${channel.id}-${channel.attributes.user_id}`}>
        <span className='left-section'>
          {
            socialDet(t)[channel.attributes.social_network] ?
              <FontIcon className='social-icon' icon={socialDet(t)[channel.attributes.social_network].icon} />
            : null
          }
          <span className='social-det'>
            <span className='social-name'>{channel.attributes.social_network}</span>
            <span className='channel-name'>{channel.attributes.channel_name}</span>
          </span>
        </span>
        <span className='right-section'>
          <span className='connect-text'>{t('common.connected')} {channel.attributes.connected_at ? moment(channel.attributes.connected_at).format(entityData?.partnerData?.base_date_format) : null}</span>
          <span ref={dropRef}>
            <FontIcon
              className='ellipsis'
              icon={faEllipsisH}
              onClick={() => setChannel(selectChannel ? null : channel)}
            />
          </span>
        </span>
      </ConnectListItem>
    </React.Fragment>
  )
}

ConnectedChannel.propTypes = {
  channel: PropTypes.object.isRequired,
  deleteChannel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default ConnectedChannel;
