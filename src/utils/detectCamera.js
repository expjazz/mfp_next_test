export const detectUserMedia = () => {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}
