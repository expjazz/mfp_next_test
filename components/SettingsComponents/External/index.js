import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import { generateCode, getProductList } from 'components/SettingsComponents/EmbedStore/utils';
import { isEmpty } from 'src/utils/dataStructures';
import Loader from 'components/Loader';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { handleExternal } from 'src/services/myfanpark/celebActions';
import { useQuery } from 'react-query';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

function External(props) {
  const { t } = useTranslation();
  const [checkList, setCheckList] = useState({});

  const [apiKey, setApiKey] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [state, dispatch] = useGeneral()
  const [css, setCss] = useState('')
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const callApi = async type => {
    const prodArray = getProductList(checkList);
    loaderAction(true);
    try {
      const resp = await handleExternal(
        type === 'list'
        ? {}
        : {
              request_type: prodArray,
              font: selectedFont.value,
              color: colorCode,
              css,
            },
      );
      loaderAction(false)
      if (resp && resp.api_data && resp.api_data.api_key) {
        if (type !== 'list') {
          localUpdateToast({
            value: true,
            message: t('common.saved_successfull'),
            global: false,
            variant: 'success'
          })
        }
        return resp.api_data
      }
    } catch (e) {
      localUpdateToast({
        value: true,
        message:
        type === 'list'
        ? t('common.failed_settings')
        : t('common.failed_update_settings'),
        variant: 'error',
        global: false,
      });
    }
    loaderAction(false);
  };

  const { data: userData } = useFetchLoggedUser()

  const { data } = useQuery(['external', userData?.user?.email], () => callApi('list'), {
    initialData: {}
   })


  const code = isEmpty(data) ? {script: '', html: '', content: ''} : generateCode(data)
  return (
    <div>

{
  !code.content && <Loader />
}
  <Head>

    <script
      id='external-script'
      dangerouslySetInnerHTML={{__html: code?.content}}
    />
  </Head>
    <div id="starsona-store">

    </div>

    </div>
  )
}

export default External
