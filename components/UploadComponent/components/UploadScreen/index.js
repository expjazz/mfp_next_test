import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { status } from 'src/constants/upload';
import Button from 'components/SecondaryButton';
// import {
//   toggleFullView,
//   toggleUploadBar,
// } from 'store/shared/actions/handleResumeUpload';
import {
  UploadBar,
  LeftCol,
  RightCol,
} from './styled';
import { useGeneral } from 'src/context/general';

const UploadScreen = (props) => {
  const [state, dispatch] = useGeneral()
  const {
    showUploadBar,
    pendingQueue,
    completedQueue,
    totalPercent,
    fullUploadView
  } = state.resumableUpload

  const { t } = useTranslation();
  const [showBar, toggBar] = useState(showUploadBar);

  useEffect(() => {
    if (fullUploadView) {
      toggBar(false);
    } else if (!pendingQueue.length && !completedQueue.find(file => file.status === status.failed)) {
      props.toggleUploadBar(false);
    } else {
      toggBar(true);
    }
  }, [fullUploadView, pendingQueue, completedQueue])

  const uploadFail = !pendingQueue.length && completedQueue.find(file => file.status === status.failed);

  return showBar &&(
    <React.Fragment>
      <UploadBar uploadFail={uploadFail} className={props.classes.root} totalPercent={totalPercent}>
        <LeftCol>
          {
            pendingQueue.length > 0 &&
              <span className='head'>
                {t('common.current_upload', {length:pendingQueue.length})}
              </span>
          }
          <p className='description'>
            {
              uploadFail ?
                t('common.upload_failed')
              : t('common.upload_progress')
            }
          </p>
        </LeftCol>
        <RightCol>
          <Button className='view-btn' onClick={() => props.toggleFullView(true)} secondary>
            {t('common.view')}
          </Button>
        </RightCol>
      </UploadBar>
    </React.Fragment>
  )
}

UploadScreen.defaultProps = {
  classes: {},
}

UploadScreen.propTypes = {
  classes: PropTypes.object,
}

// const mapStateToProps = state => ({
//   showUploadBar: state.resumableUpload.showUploadBar,
//   pendingQueue: state.resumableUpload.pendingQueue,
//   completedQueue: state.resumableUpload.completedQueue,
//   totalPercent: state.resumableUpload.totalPercent,
//   fullUploadView: state.resumableUpload.fullUploadView,
// })

// const mapDispatchToProps = dispatch => ({
//   toggleFullView: state => dispatch(toggleFullView(state)),
//   toggleUploadBar: state => dispatch(toggleUploadBar(state)),
// })

export default UploadScreen
