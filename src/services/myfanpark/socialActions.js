import React, { useEffect } from 'react';
import { generalLoader, updateToast } from 'src/context/general';
import cmsAPI from 'src/lib/cmsApi';
import { cmsFetch } from '../fetch';

export const connectSocialChannel = (socialData, onSuccess=()=>{}, onError=()=>{}, dispatch = () => {}) => {
  generalLoader(dispatch, true)
  cmsFetch.post(cmsAPI.socialChannels, {
    social_channel: {
      ...socialData,
    }
  })
  .then((res) => {
    generalLoader(dispatch, false);
    onSuccess(res);
  }).catch(e => {
    generalLoader(dispatch, false);
    onError(e)
  })
}

export const getConnectedChannels = (onSuccess=() => {}, onError=() => {}, dispatch = () => {}) => {
  generalLoader(dispatch, true);
  cmsFetch(cmsAPI.socialChannels)
  .then((resp) => {
    generalLoader(dispatch, false);
    if (resp.data && resp.data.data) {
      onSuccess(resp.data.data)
    } else {
      onSuccess([]);
    }
  }).catch(e => {
    generalLoader(dispatch, false);
    onError(e);
  })
}

export const deleteConnectChannel = (channelId, onSuccess=()=>{}, onError=()=>{}, dispatch = () => {}) => {
  generalLoader(dispatch, true);
  cmsFetch.delete(`${cmsAPI.socialChannels}/${channelId}`)
  .then((res) => {
    generalLoader(dispatch, false);
    onSuccess(res);
  }).catch(e => {
    generalLoader(dispatch, false);
    onError(e)
  })
}


export const useFacebookLogin = () => {

  const loginHandler = (fbData, onResponse = () => {}) => {
    window.FB.login(
      response => {
        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              locale: 'en_US',
              fields: 'name, email,first_name,last_name,picture',
            },
            res => {
              onResponse({...res, ...response});
            },
          );
        }
      },
      { scope: fbData.permissions, return_scopes: true },
    );
  }

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_fbId,
        cookie: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FB_AUTH_VERSION,
      });
      window.FB.getLoginStatus = response => {
        if (response.status === 'connected') {
          // connected
        } else {
          // user is not authorized
        }
      };
    };
    ((d, s, id) => {
      let js = null;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return ({ loginHandler })
}
