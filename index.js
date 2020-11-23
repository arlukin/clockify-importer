#!/usr/bin/env node

const { readFileSync } = require("fs");
const axios = require("axios");
const rateLimit = require("axios-rate-limit");

const rawFile = readFileSync("test.json");
const jsonFile = JSON.parse(rawFile);
const WORKSPACE_ID = "xxx";
const PROJECT_ID = "XXX";
const X_API_KEY = "XXX";

const http = rateLimit(axios.create(), { maxRPS: 2 });

function convert(row) {
  return {
    start: row.timeInterval.start,
    billable: false,
    description: row.description,
    projectId: PROJECT_ID,
    taskId: null,
    end: row.timeInterval.end,
    tagIds: null,
    customFields: null,
  };
}

function post(data) {
  return http({
    method: "post",
    baseURL: "https://api.clockify.me",
    url: `/api/v1/workspaces/${WORKSPACE_ID}/time-entries`,
    headers: { "X-Api-Key": X_API_KEY },
    data,
  })
    .then(function (response) {
      console.log(response.data.description);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
      console.log(data);
    });
}

jsonFile.forEach((data) => {
  post(convert(data));
  //console.log(convert(data));
});
