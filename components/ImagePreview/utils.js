export const getImageDims = (width, height) => {

  const viewporthWidth = window.innerWidth;
  const viewporthHeight = window.innerHeight;
  const imageWidth = width;
  const imageHeight = height;
  const padding = .1;
  
  let adaptedHeight = height;
  let adaptedWidth = width
  
  const tooTall = imageHeight > viewporthHeight;
  const tooWide = imageWidth > viewporthWidth;
  
  const aspectRatio = imageWidth / imageHeight;
  if(tooWide && tooTall)
  {
      // Figure out if it's better to scale on height or width by 
      if((imageWidth / viewporthWidth) > (imageHeight / viewporthHeight))
      {
          adaptedWidth = (1.0 - padding) * viewporthWidth;
          adaptedHeight = adaptedWidth / aspectRatio;
      }
      else
      {
          adaptedHeight = (1.0 - padding) * viewporthHeight;
          adaptedWidth = adaptedHeight * aspectRatio;
      }
  }
  else if(tooWide)
  {
      adaptedWidth = (1.0 - padding) * viewporthWidth;
      adaptedHeight = adaptedWidth / aspectRatio;
  }
  else if(tooTall)
  {
      adaptedHeight = (1.0 - padding) * viewporthHeight;
      adaptedWidth = adaptedHeight * aspectRatio;
  }
  else
  {
      adaptedWidth = imageWidth;
      adaptedHeight = imageHeight;
  }
    return ({ width: adaptedWidth, height: adaptedHeight });
  }
  