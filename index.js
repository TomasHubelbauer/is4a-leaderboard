window.addEventListener('load', async () => {
  const response = await fetch('data.json');
  const json = await response.json();
  document.getElementById('positionSpan').textContent = json.position;
  document.getElementById('gapSpan').textContent = json.gap;
  document.getElementById('starsSpan').textContent = json.stars;

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

  contendersSpan.append(document.createTextNode(` (${json.stars + json.gap} ★)`));

  if (json.milestones) {
    const milestonesDiv = document.getElementById('milestonesDiv');
    for (const milestone in json.milestones) {
      const milestoneDiv = document.createElement('p');
      const milestoneStrong = document.createElement('strong');
      milestoneStrong.textContent = milestone;
      milestoneDiv.append(milestoneStrong);
      milestoneDiv.append(document.createTextNode(' ' + new Date(json.milestones[milestone]).toLocaleDateString()));
      milestonesDiv.append(milestoneDiv);
    }
  }
});
