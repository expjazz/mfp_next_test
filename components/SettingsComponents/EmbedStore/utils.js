import {
  checkValues,
  previewUrl,
} from './constants';

export const getProductList = (checkList) => {
  let checkValArray = [];
  const checkArray = Object.keys(checkList).filter(key => checkList[key]).map(checkKey => (
    checkValues.find(checkVal => checkVal.label === checkKey)?.value
  ))
  // debugger
  checkArray.forEach(checkVal => {
    const checkSplit = checkVal.split(',');
    if (checkSplit.length > 0) {
      checkSplit.forEach(checkItem => {
        checkValArray = [...checkValArray, checkItem];
      })
    } else {
      checkValArray = [...checkValArray, checkVal];
    }
  })
  return checkValArray;
}

export const generatePreviewUrl = (apiKey, colorCode, selectedFont) => {
  if (apiKey) {
    return `${previewUrl}/?apiKey=${apiKey}&font=${selectedFont}&buttonColor=${colorCode}`
  }
  return false
}

export const generateCode = ({
  api_key: apiKey,
  color,
  font = null,
  css = ''
}) => {
  return ({
    script: `
      <script>
      (function (w, d, s, o, f, js, fjs) {
          w[o] =
              w[o] ||
              function () {
                  (w[o].q = w[o].q || []).push(arguments);
              };
          (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
          js.id = o;
          js.src = f;
          js.async = 1;
          fjs.parentNode.insertBefore(js, fjs);
      })(window, document, "script", "_hw", "https://starsona-widget.s3.amazonaws.com/widget/widget.js");
      _hw("init", {
          element: "starsona-store",
          apiKey: '${apiKey}',
          font: '${font || ''}',
          buttonColor: '${color}',
          css: \`${css}\`
      });
    </script>
    `,
    html: '<div id="starsona-store"></div>',
    content: `
      (function (w, d, s, o, f, js, fjs) {
          w[o] =
              w[o] ||
              function () {
                  (w[o].q = w[o].q || []).push(arguments);
              };
          (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
          js.id = o;
          js.src = f;
          js.async = 1;
          fjs.parentNode.insertBefore(js, fjs);
      })(window, document, "script", "_hw", "https://starsona-widget.s3.amazonaws.com/widget/widget.js");
      _hw("init", {
          element: "starsona-store",
          apiKey: '${apiKey}',
          font: '${font || ''}',
          buttonColor: '${color}',
          css: \`${css}\`
      });
    `
  })
}
