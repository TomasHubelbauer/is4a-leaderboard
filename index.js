window.addEventListener('load', async () => {
  const response = await fetch('data.json');
  const json = await response.json();
  document.getElementById('positionSpan').textContent = '#' + json.position;
  document.getElementById('gapSpan').textContent = json.gap;
  
  const contendersSpan = document.getElementById('contendersSpan');
  contendersSpan.innerHTML = '';
  
  let counter = 0;
  for (let contender of json.contenders) {
    const contenderA = document.createElement('a');
    contenderA.textContent = contender.name;
    contenderA.href = contender.link;
    contendersSpan.append(contenderA);
    contendersSpan.append(document.createTextNode(counter === json.contenders.length - 1 ? '' : (counter === json.contenders.length - 2 ? ' and ' : ', ')));
    counter++;
  }
});
