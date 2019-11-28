const fetch = require('node-fetch');
const fs = require('fs-extra');

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

  const { milestones } = await fs.readJson('data.json');

  let milestone;
  if (position > 100) {
    const digits = Math.ceil(Math.log10(position + 1));
    const magnitude = Math.pow(10, digits - 2);
    milestone = ~~(position / magnitude) * magnitude;
    if (!milestones || !milestones[milestone]) {
      console.log('Reached a new milestone,', milestone);
    }
  }

  if (milestone) {
    milestone = { [milestone]: new Date().toISOString() };
  }

  await fs.writeJson('data.json', {
    position,
    stars,
    gap,
    contenders,
    milestones: {
      // Write the calculated milestone first so it gets replaced if it existed
      ...milestone,
      // Preserve all the existing milestones replacing the above one if not new
      ...milestones
    }
  }, { spaces: 2 });
}()
