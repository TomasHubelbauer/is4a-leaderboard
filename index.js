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

  const positionMilestonesDiv = document.getElementById('positionMilestonesDiv');
  for (const positionMilestone in json.positionMilestones) {
    const milestoneDiv = document.createElement('p');
    const milestoneStrong = document.createElement('strong');
    milestoneStrong.textContent = positionMilestone;
    positionMilestonesDiv.append(milestoneStrong);
    positionMilestonesDiv.append(document.createTextNode(' ' + new Date(json.positionMilestones[positionMilestone]).toLocaleDateString()));
    positionMilestonesDiv.append(milestoneDiv);
  }

  const starsMilestonesDiv = document.getElementById('starsMilestonesDiv');
  for (const starsMilestone in json.starsMilestones) {
    const milestoneDiv = document.createElement('p');
    const milestoneStrong = document.createElement('strong');
    milestoneStrong.textContent = starsMilestone;
    starsMilestonesDiv.append(milestoneStrong);
    starsMilestonesDiv.append(document.createTextNode(' ' + new Date(json.starsMilestones[starsMilestone]).toLocaleDateString()));
    starsMilestonesDiv.append(milestoneDiv);
  }
});
