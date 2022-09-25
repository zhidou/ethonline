const express = require("express");
var cors = require("cors");
const { Web3Storage, File } = require("web3.storage");
const EpnsAPI = require("@epnsproject/sdk-restapi");
const ethers = require("ethers");

const PK = "b6e989cc7fa386bdefe4a7d02f9d9ab934ccbd67a034318e6ea2ed403e5133dc"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async (to, { title, body }) => {
  try {
    const apiResponse = await EpnsAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: title,
        body: body,
      },
      payload: {
        title: title,
        body: body,
      },
      recipients: `eip155:1:${to}`, // recipient address
      channel: "eip155:1:0x5CA0E8e25eC486928F7C8C35De484235Cbf3eb53", // your channel address
      env: "prod",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;

const store = {
  cid: "bafybeiefu23mlasa32tsblsrvn5dhtmyqlfvf552rd4pdnnbaxo52ylbia",
  cache: {},
};

const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzYkFlY2RkNzYzYUVCRTdiMzBBQjk0Qzc0RDNkZDQwNTE2MDRDNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQwOTAwMzYxOTIsIm5hbWUiOiJwZWVwc29ubCJ9.hJiSD68q1P8ZWRJuhVV1XlHi06zxSm7UFBs289omZSc",
});

function makeJSONFile(obj, name) {
  return new File([Buffer.from([JSON.stringify(obj)])], `${name}.json`);
}

function makeFileObjects() {
  return Object.keys(store.cache).map((k) =>
    makeJSONFile(store.cache[k], `${k}.json`)
  );
}

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId:", userId);
  res.json(store.cache[userId]);
});

app.post("/user/:userId", async (req, res) => {
  console.log("post /user/:userId");
  const { userId } = req.params;
  console.log(req.body);
  store.cache[userId] = req.body;
  const files = makeFileObjects();
  const cid = await client.put(files);
  store.cid = cid;
  console.log("Stored with web3.storage.");
  console.log("cid:", cid);
  res.send("OK");
});

app.post("/notify/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId:", userId);
  sendNotification(userId, req.body).then(() => res.send("OK"));
});

app.listen(port, () => {
  console.log(`peepsonline social server app listening on port ${port}`);
});
