# IS4A Leaderboard Position

[**LIVE**](https://tomashubelbauer.github.io/is4a-leaderboard)

![](https://github.com/tomashubelbauer/is4a-leaderboard/workflows/github-pages/badge.svg)

Displays the current .NET GitHub repositories leaderboard position for the
[Skoruba.IdentityServer4.Admin](https://github.com/skoruba/IdentityServer4.Admin) repository.

Releases a new GitHub release each time the position changes.
Use *Watch Releases* to subscribe.

Remotely, the code runs hourly in a GitHub Actions workflow, see [`main.yml`](.github/workflows/main.yml).

Locally you can run the backend using `npm start` and the frontend using `npm run serve`.

## To-Do

### Generate the HTML output directly and use it for both email and web

Ditch `data.json`, generate the HTML directly and in one file to both embed in the
email notification and serve through GitHub Pages.

### Generate a MarkDown readme section in addition to the email and web

### Calculate the milestones all the way back to the beginning using the GitHub Stars API

### Display the duration between milestones in a human-friendly relative format

E.g.: *2 weeks* after a milestone which was reached two weeks after the one below it.

### Split the position column into two

Either hardcode that or be a bit smarter about it and dynamically calculate position and
star column splits based on the number of elements in each.

### Add rules atop Milestones and Contenders headings

### Delete all releases
