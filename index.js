window.addEventListener('load', async () => {
  const response = await fetch('data.json');
  const json = await response.json();
  document.getElementById('positionSpan').textContent = json.position;
  document.getElementById('contenderA').textContent = json.contenderName;
  document.getElementById('contenderA').href = json.contenderUrl;
  document.getElementById('gapSpan').textContent = json.gap;
});
