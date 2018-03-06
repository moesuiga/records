const fs = require('fs');
const path = require('path');
const axios = require('axios');

const user = 'moesuiga';
const repo = 'records';
const urlIssues = `https://api.github.com/repos/${user}/${repo}/issues`

axios.get(urlIssues).then(res => {
  if (res.status === 200) {
    const { data } = res;

    const issues = [];
    data.forEach(issue => {
      issues.push({
        number: issue.number,
        title: issue.title,
        body: issue.body
      });
    });

    writeFiles(issues);
  } else {
    console.log(res.status, res.statusText);
  }
})

function writeFiles(datas) {
  if (!Array.isArray(datas)) {
    datas = [datas];
  }
  datas.forEach(data => {
    const filePath = path.resolve(__dirname, 'issues', `${data.number}-${data.title}.md`);
    fs.writeFile(filePath, data.body, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`${filePath} write over.`)
      }
    })
  })
}
