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

  const { milestone: currentPositionMilestone, gap: positionMilestoneGap } = calculateFlooringMilestone(position, 2);
  const positionMilestone = { [currentPositionMilestone]: new Date().toISOString() };
  console.log(`The position milestone is ${currentPositionMilestone}`);
  console.log(`${positionMilestoneGap} to position milestone ${position - positionMilestoneGap}`);
  const positionMilestoneToGo = { milestone: position - positionMilestoneGap, gap: positionMilestoneGap };

  // Find the star contender at the position milestone break to see how many stars to reach them
  const contender = items[positionMilestoneToGo.gap];
  console.log(`At position milestone ${positionMilestoneToGo.milestone}, ${contender.full_name} has ${contender.stargazers_count} stars`);
  positionMilestoneToGo.stars = contender.stargazers_count;

  const { milestone: currentStarsMilestone, gap: starsMilestoneGap } = calculateCeilingMilestone(stars, 2);
  const starsMilestone = { [currentStarsMilestone]: new Date().toISOString() };
  console.log(`The stars milestone is ${currentStarsMilestone}`);
  console.log(`${starsMilestoneGap} to stars milestone ${stars + starsMilestoneGap}`);
  const starsMilestoneToGo = { milestone: stars + starsMilestoneGap, gap: starsMilestoneGap };

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
    positionMilestoneToGo,
    starsMilestones: {
      // Write the calculated milestone first so it gets replaced if it existed
      ...starsMilestone,
      // Preserve all the existing milestones replacing the above one if not new
      ...starsMilestones,
    },
    starsMilestoneToGo
  }, { spaces: 2 });
}()
