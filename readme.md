# https://clockify.me/ time entry importer

Import time entries to your clockify.me workspace. (Written in nodejs/js)

```bash

curl -H "content-type: application/json" -H "X-Api-Key: XXX" -X GET https://api.clockify.me/api/v1/workspaces/<workspace-id>/user/<user-id>/time-entries | jq > test.json

# modify index.js with your workspace/project-ids
yarn
./index.js
```

Documentation from clockify.me
https://clockify.me/developers-api#tag-Time-entry
