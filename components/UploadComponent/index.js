import React from 'react';
import { toggleFullView, toggleUploadBar, useGeneral } from 'src/context/general';
import UploadScreen from './components/UploadScreen';

const UploadComponent = (props) => {
  const [state, dispatch] = useGeneral()
  const localToggleUploadBar = payload => toggleUploadBar(dispatch, payload)

  return state.resumableUpload.showUploadBar ? (
    <UploadScreen {...props} toggleUploadBar={localToggleUploadBar} toggleFullView={payload => toggleFullView(dispatch, payload)} />
  ) : null
}

const mapStateToProps = state => ({
  showUploadBar: state.resumableUpload.showUploadBar,
})

export default UploadComponent
