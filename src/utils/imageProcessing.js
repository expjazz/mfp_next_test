import EXIF from 'exif-js';

export const getExifData = file => {
  return new Promise((resolve, reject) => {
    EXIF.getData(file, function getExif() {
      const exif = EXIF.getTag(this, 'Orientation');
      switch (exif) {
        case 3:
          resolve(3);
          break;
        case 4:
          resolve(4);
          break;
        case 5:
          resolve(5);
          break;
        case 6:
          resolve(6);
          break;
        case 7:
          resolve(7);
          break;
        case 8:
          resolve(8);
          break;
        default:
          resolve(9);
      }
    });
  });
};

export const imageRotation = (originalFile, exif) => {
  const image = new Image();
  image.style.imageOrientation = 'none';
  image.src = window.URL.createObjectURL(originalFile);
  return new Promise(resolve => {
    image.onload = () => {
      if (CSS && CSS.supports('image-orientation', 'none')) {
        resolve(originalFile);
      } else {
        const canvas = document.createElement('canvas');
        const { width, height } = image;
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        switch (exif) {
          case 2:
            ctx.translate(height, 0);
            ctx.scale(-1, 1);
            break;

          case 3:
            ctx.translate(width, height);
            ctx.rotate((180 * Math.PI) / 180);
            break;

          case 4:
            ctx.translate(0, height);
            ctx.scale(1, -1);
            break;

          case 5:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate((90 * Math.PI) / 180);
            ctx.scale(1, -1);
            break;

          case 6:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate(0, -height);
            break;

          case 7:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.translate(-width, height);
            ctx.scale(1, -1);
            break;

          case 8:
            canvas.width = height;
            canvas.height = width;
            ctx.translate(0, width);
            ctx.rotate((-90 * Math.PI) / 180);
            break;
          default:
            break;
        }
        ctx.drawImage(image, 0, 0, width, height);
        let newFile;
        canvas.toBlob(file => {
          newFile = file;
          resolve(newFile);
        }, originalFile.type);
      }
    };
  });
};

export const getVideoDimensions = file => {
  return new Promise(resolve => {
    const video = document.createElement('video');
    video.addEventListener(
      'loadedmetadata',
      () => {
        const height = video.videoHeight;
        const width = video.videoWidth;
        resolve({
          height,
          width,
        });
      },
      true,
    );
    video.src = window.URL.createObjectURL(file);
  });
};

export const getImgResolution = async file => {
  if (file.type.includes('video/')) {
    const result = await getVideoDimensions(file);
    return result;
  }
  const img = new Image();
  img.src = window.URL.createObjectURL(file);
  return new Promise(resolve => {
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      window.URL.revokeObjectURL(img.src);
      resolve({ width, height });
    };
  });
};
