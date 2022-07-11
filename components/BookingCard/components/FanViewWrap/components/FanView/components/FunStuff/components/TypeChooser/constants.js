// import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import VideoCall from '../VideoCall';
import VideoRecording from '../VideoRecording';
import AudioRecord from '../AudioRecord';
import FileUpload from '../FileUpload';
import ExternalLink from '../ExternalLink';
import TextResponse from '../TextResponse';
import ImageCapture from '../UploadAndTakePicture';
import { deliveryMethods } from '../../../../../../../../../../src/constants/requestTypes/funTypes';

export const componentList = {
  [deliveryMethods.videoCalls]: VideoCall,
  [deliveryMethods.file]: FileUpload,
  [deliveryMethods.text]: TextResponse,
  [deliveryMethods.video]: VideoRecording,
  [deliveryMethods.link]: ExternalLink,
  [deliveryMethods.image]: ImageCapture,
  [deliveryMethods.audio]: AudioRecord,
}
