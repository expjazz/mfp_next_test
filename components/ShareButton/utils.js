export const getTwitterText = (text, url) => {
  const urlLength = url ? url.length : 0;
  const newText = text ? text.slice(0, 280 - urlLength - 5) : text;
  return text && text.length + urlLength > 280 ? `${newText}...` : newText;
}
