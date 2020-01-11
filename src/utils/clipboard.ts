export const copyToClipboard = (item: string): void => {
  // copy to clipboard
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = item;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  document.body.removeChild(copyFrom);
}
