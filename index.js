window.addEventListener('load', async () => {
  const response = await fetch('data.json');
  const json = await response.json();
  document.getElementById('positionSpan').textContent = json.position;
  document.getElementById('gapSpan').textContent = json.gap;
  
  const contendersSpan = document.getElementById('contendersSpan');
  contendersSpan.innerHTML = '';
  for (let contender of json.contenders) {
    const contenderA = document.createElement('a');
    contenderA.textContent = contender.name;
    contenderA.href = contender.link;
    contendersSpan.append(contenderA);
    contendersSpan.append(document.createTextNode(', '));
  }
});
