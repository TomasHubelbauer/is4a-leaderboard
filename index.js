window.addEventListener('load', async () => {
  const response = await fetch('position.num');
  const text = await response.text();
  document.getElementsByTagName('span')[0].textContent = text;
});
