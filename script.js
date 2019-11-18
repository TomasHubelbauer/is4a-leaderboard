const fetch = require('node-fetch');
const fs = require('fs-extra');

void async function () {
  // Download the current star count for IS4A
  const repositoryResponse = await fetch('https://api.github.com/repos/skoruba/IdentityServer4.Admin');
  const repositoryJson = await repositoryResponse.json();
  console.log(`The repository has ${repositoryJson.stargazers_count} stars.`);

  // Search for .NET repositories which have more than that in ascending order to be able to find the gap on the first page of search results
  const searchResponse = await fetch(`https://api.github.com/search/repositories?q=language:csharp+stars:>${repositoryJson.stargazers_count}&sort=stars&order=asc`);
  const searchJson = await searchResponse.json();
  console.log(`There are ${searchJson.total_count} repositories ahead of it.`);

  const nextRepository = searchJson.items.find(item => item.stargazers_count > repositoryJson.stargazers_count);
  const starDifference = nextRepository.stargazers_count - repositoryJson.stargazers_count;
  console.log(`The next repository has ${nextRepository.stargazers_count} stars. That's ${starDifference} more star${starDifference > 1 ? 's' : ''} to go.`);

  const contenders = searchJson.items
    .filter(item => item.stargazers_count === nextRepository.stargazers_count)
    .map(item => ({ name: item.full_name, link: item.html_url, stars: item.stargazers_count }))
  ;
  
  await fs.writeJson('data.json', {
    position: searchJson.total_count,
    stars: repositoryJson.stargazers_count,
    gap: starDifference,
    contenders
  }, { spaces: 2 });
  
  await fs.writeFile('data.txt', searchJson.total_count);
}()
