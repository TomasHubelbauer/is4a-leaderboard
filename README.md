# IS4A Leaderboard Position

[**LIVE**](https://tomashubelbauer.github.io/is4a-leaderboard)

![](https://github.com/tomashubelbauer/is4a-leaderboard/workflows/github-pages/badge.svg)

Displays the current .NET GitHub repositories leaderboard position for the
[Skoruba.IdentityServer4.Admin](https://github.com/skoruba/IdentityServer4.Admin) repository.

Releases a new GitHub release each time the position changes.
Use *Watch Releases* to subscribe.

Remotely, the code runs daily in a GitHub Actions workflow, see [`main.yml`](.github/workflows/main.yml).

Locally you can run the backend using `npm start` and the frontend using `npm run serve`.

## To-do

### Replay the stars from the API to generate old milestones.

### Fix incorrect milestone calculation

385 will become 380 instead of 390. The fix is probably to calculate as it is
now but then add `Math.pow(10, magnitude - 1)` at the end. That should be enough
to fix it.
