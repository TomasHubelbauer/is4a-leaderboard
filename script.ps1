# Download the current star count for IS4A
$stargazersCount = Invoke-WebRequest -UseBasicParsing "https://api.github.com/repos/skoruba/IdentityServer4.Admin" | ConvertFrom-Json | Select-Object -ExpandProperty stargazers_count
# Search for .NET repositories which have more than than
$totalCount = Invoke-WebRequest -UseBasicParsing "https://api.github.com/search/repositories?q=language:csharp+stars:>$stargazersCount&sort=stars&order=desc" | ConvertFrom-Json | Select-Object -ExpandProperty total_count
# Resolve the final leaderboard position - the number of repositories before IS4A + 1 (for itself)
Write-Output $($totalCount + 1)
