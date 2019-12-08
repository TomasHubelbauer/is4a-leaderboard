const fetch = require('node-fetch');
const fs = require('fs-extra');
const { calculateFlooringMilestone, calculateCeilingMilestone } = require('milestone');

void async function () {
  // Download the current star count for IS4A
  const repositoryResponse = await fetch('https://api.github.com/repos/skoruba/IdentityServer4.Admin');
  const { stargazers_count: stars } = await repositoryResponse.json();
  console.log(`The repository has ${stars}★`);

  // Search for .NET repositories which have more than that in ascending order to be able to find the gap on the first page of search results
  const searchResponse = await fetch(`https://api.github.com/search/repositories?q=language:csharp+stars:>${stars}&sort=stars&order=asc`);
  const { total_count: position, items } = await searchResponse.json();
  console.log(`That puts it at #${position}`);

  const { stargazers_count: contenderStars } = items.find(item => item.stargazers_count > stars);
  const contenders = items
    .filter(({ stargazers_count: stars }) => stars === contenderStars)
    .map(({ full_name: name, html_url: link }) => ({ name, link }))
    ;

  const gap = contenderStars - stars;
  console.log(`The contender${contenders.length > 1 ? 's' : ''} ${contenders.length > 1 ? 'have' : 'has'} ${contenderStars}★`);
  console.log(`That's ${gap} more star${gap > 1 ? 's' : ''} to go`);

  const { positionMilestones, starsMilestones } = await fs.readJson('data.json');

  const positionMilestone = { [calculateFlooringMilestone(position, 2)]: new Date().toISOString() };
  console.log(`The position milestones is ${calculateFlooringMilestone(position, 2)}`);
  const starsMilestone = { [calculateCeilingMilestone(stars, 2)]: new Date().toISOString() };
  console.log(`The stars milestones is ${calculateCeilingMilestone(stars, 2)}`);

  await fs.writeJson('data.json', {
    position,
    stars,
    gap,
    contenders,
    positionMilestones: {
      // Write the calculated milestone first so it gets replaced if it existed
      ...positionMilestone,
      // Preserve all the existing milestones replacing the above one if not new
      ...positionMilestones,
    },
    starsMilestones: {
      // Write the calculated milestone first so it gets replaced if it existed
      ...starsMilestone,
      // Preserve all the existing milestones replacing the above one if not new
      ...starsMilestones,
    },
  }, { spaces: 2 });
}()
