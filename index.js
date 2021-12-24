import express from "express";
import * as fs from "fs/promises";
import fetch from "node-fetch";
const app = express();

let fidgets = [];

app.listen(3000, async () => {
  console.log("connecting at port 8000");
  fidgets = await fs.readdir("./fidgets");
});
app.use(express.static("public"));

function compareStrings(a, b) {
  let sum = 0;
  for (let i = 0; i < b.length; i++) {
    if (a.charAt(i) != b.charAt(i)) continue;
    if (i - 1 < 0) {
      sum++;
      continue;
    }
    if (a.charAt(i - 1) != b.charAt(i - 1)) continue;
    sum++;
  }

  return sum;
}

function closestFile(path) {
  let closestPath = "";

  let totalSum = 0;

  // take out chunks of the path
  for (let i = 0; i < fidgets.length; i++) {
    const name = fidgets[i].slice(0, fidgets[i].length - 4);
    // console.log(name);
    if (path.length >= name.length) {
      for (let j = 0; j < path.length; j++) {
        const chunk = path.substring(j, j + name.length);
        const sum = compareStrings(chunk, name);
        if (sum == name.length) {
          console.log("found something", chunk);
          return fidgets[i];
        }
        if (sum < totalSum) continue;
        console.log(chunk);
        totalSum = sum;
        closestPath = fidgets[i];
      }
    } else {
      // actually slice out chunks from the fidget path (the one that we are looping through right now));
      for (let j = 0; j < name.length; j++) {
        const chunk = name.substring(j, j + path.length);
        const sum = compareStrings(chunk, path);
        if (sum == path.length) {
          console.log("found something", chunk);
          return fidgets[i];
        }
        if (sum < totalSum) continue;
        totalSum = sum;
        closestPath = fidgets[i];
      }
    }
  }

  return closestPath;
}

app.get("/getFidget/:name", (req, res) => {
  const { name } = req.params;

  const i = Math.floor(Math.random() * fidgets.length);

  const realName = closestFile(name);

  console.log("sending somthing");
  console.log(`${realName}`);
  res.sendFile(`${realName}`, {
    root: "./fidgets",
  });
});

app.get("/getFidget/", (req, res) => {
  const i = Math.floor(Math.random() * fidgets.length);

  console.log("sending somthing");
  console.log(`${fidgets[i]}`);
  res.sendFile(`${fidgets[i]}`, {
    root: "./fidgets",
  });
});
