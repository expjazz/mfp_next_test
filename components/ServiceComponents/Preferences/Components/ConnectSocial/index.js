import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading, Description, LinkText } from 'styles/TextStyled';
import ConnectedChannel from './components/ConnectedChannel';
import { socialList } from './constants';
import { Container } from '../../../styled';
import { Wrap } from './styled';
import { connectSocialChannel, deleteConnectChannel, getConnectedChannels, useFacebookLogin } from 'src/services/myfanpark/socialActions';
import { useGeneral } from 'src/context/general';

const ConnectSocial = ({
  entityData,
  updateToast,
  deleteChannel,
}) => {
  const [state, dispatch] = useGeneral()
  const [channels, setChannels] = useState([]);
  const { t } = useTranslation();

  const { loginHandler: FBLoginHandler } = useFacebookLogin();

  const fetchChannels = () => {
    getConnectedChannels((resp) => {
      setChannels(resp.filter(soc => soc.attributes.social_network !== 'myfanpark'))
    }, () => {}, dispatch)
  }

  const onDeleteChannel = (id) => {
    deleteConnectChannel(id, () => {
      fetchChannels()
      updateToast({
        value: true,
        message: "Social network disconnected",
        variant: 'success',
      })
    }, () => {}, dispatch)
  }

  const onChannelClick = (social) => () => {
    switch(social.type) {
      case 'facebook':
        FBLoginHandler({
          permissions: social.permissions,
        }, (res) => connectSocialChannel({
          token: res.authResponse.accessToken,
          channel_name: res.name,
          social_network: social.type,
          metadata: res,
        }, fetchChannels, () => {}, dispatch))
      break;
      case 'instagram':
        FBLoginHandler({
          permissions: social.permissions,
        }, (res) => connectSocialChannel({
          token: res.authResponse.accessToken,
          channel_name: res.name,
          social_network: social.type,
          metadata: res,
        }, fetchChannels, () => {}, dispatch))
      break;
      default:
        return null;
    }
  }

  useEffect(() => {
    fetchChannels();
  }, [])

  return (
    <Container>
      <Wrap className="content-wrapper">
        <Heading className="inner-head">
          {t('services.connectSocial.heading')}
        </Heading>
        <Description className="note-padding">
          {t('services.connectSocial.description')}
        </Description>
        <ul className='social-list'>
          {socialList(t).map(soc => (
            <li role='presentation' className='social-ele'
              onClick={onChannelClick(soc)}>
              <FontAwesomeIcon className='soc-icon' icon={soc.icon} />
              <span className='soc-name'>
                {soc.name}
              </span>
            </li>
          ))}
        </ul>
        {
          channels.map(channel => (
            <ConnectedChannel
              {...props}
              channel={channel}
              entityData={entityData}
              deleteChannel={onDeleteChannel}
              t={t}
            />
          ))
        }
        {/* <Link className='promote-link' to='/manage/promote/post-promote'>
          <LinkText>{t('services.connectSocial.promoteLink')}</LinkText>
        </Link> */}
      </Wrap>
    </Container>
  )
}

ConnectSocial.propTypes = {
  connectSocial: PropTypes.func.isRequired,
  getChannels: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  deleteChannel: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  entityData: state.entity.data,
})

const mapDispatchToProps = dispatch => ({
  connectSocial: (socialData, onSuccess, onError) => dispatch(connectSocialChannel(socialData, onSuccess, onError)),
  getChannels: (onSuccess, onError) => dispatch(getConnectedChannels(onSuccess, onError)),
  deleteChannel: (channelId, onSuccess, onError) => dispatch(deleteConnectChannel(channelId, onSuccess, onError)),
})

export default ConnectSocial
