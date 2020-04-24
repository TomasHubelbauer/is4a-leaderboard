window.addEventListener('load', async () => {
  const response = await fetch('data.json');
  const json = await response.json();
  document.getElementById('positionA').textContent = json.position;
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

  contendersSpan.append(document.createTextNode(` (${json.stars + json.gap}\u00A0★)`));

  const positionMilestonesDiv = document.getElementById('positionMilestonesDiv');
  const positionMilestoneGapP = document.createElement('p');
  const positionMilestoneGapStrong = document.createElement('strong');
  positionMilestoneGapStrong.textContent = json.positionMilestoneToGo.milestone;
  positionMilestoneGapP.append(positionMilestoneGapStrong);
  positionMilestoneGapP.append(` ${json.positionMilestoneToGo.gap} — `);
  const contenderA = document.createElement('a');
  contenderA.href = `https://tomashubelbauer.github.io/net-ecosystem-review/#${json.positionMilestoneToGo.milestone}`;
  contenderA.textContent = `${json.positionMilestoneToGo.stars - json.stars} ★`;
  contenderA.title = `${json.positionMilestoneToGo.name} (${json.positionMilestoneToGo.stars} ★)`;
  positionMilestoneGapP.append(contenderA);
  positionMilestoneGapP.append(` — to go`);
  positionMilestonesDiv.append(positionMilestoneGapP);
  const positionMilestones = Object.keys(json.positionMilestones).sort((a, b) => a.localeCompare(b));
  for (const positionMilestone of positionMilestones) {
    const milestoneP = document.createElement('p');
    const milestoneStrong = document.createElement('strong');
    milestoneStrong.textContent = positionMilestone;
    milestoneP.append(milestoneStrong);
    milestoneP.append(' ', new Date(json.positionMilestones[positionMilestone]).toLocaleDateString());
    positionMilestonesDiv.append(milestoneP);
  }

  const starsMilestonesDiv = document.getElementById('starsMilestonesDiv');
  const starsMilestoneGapP = document.createElement('p');
  const starsMilestoneGapStrong = document.createElement('strong');
  starsMilestoneGapStrong.textContent = json.starsMilestoneToGo.milestone;
  starsMilestoneGapP.append(starsMilestoneGapStrong);
  starsMilestoneGapP.append(` ${json.starsMilestoneToGo.gap} ★ to go`);
  starsMilestonesDiv.append(starsMilestoneGapP);
  const starsMilestones = Object.keys(json.starsMilestones).sort((a, b) => b.localeCompare(a));
  for (const starsMilestone of starsMilestones) {
    const milestoneP = document.createElement('p');
    const milestoneStrong = document.createElement('strong');
    milestoneStrong.textContent = starsMilestone;
    milestoneP.append(milestoneStrong);
    milestoneP.append(' ', new Date(json.starsMilestones[starsMilestone]).toLocaleDateString());
    starsMilestonesDiv.append(milestoneP);
  }

  const delayMinutes = ~~((new Date() - new Date(json.dateAndTime)) / 1000 / 60);
  document.getElementById('realtimeP').textContent = `(accurate as of ${delayMinutes ? `${delayMinutes} m ago` : 'now'})`;

  const realtimeResponse = await fetch('https://api.github.com/repos/skoruba/IdentityServer4.Admin');
  const realtimeJson = await realtimeResponse.json();
  if (json.stars !== realtimeJson.stargazers_count) {
    document.getElementById('starsSpan').textContent = json.stars;
  }
});
