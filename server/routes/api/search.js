const express = require("express");
const router = express.Router();
const redis = require("redis");
const { promisify } = require("util");
const axios = require("axios").default;

// Connect to Redis Server
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});
client.on("connect", function(error) {
  console.log("Redis Connected...");
});

client.on("error", function(error) {
  // console.error(error);
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

router.get("/:item", async (req, res) => {
  try {
    const item = req.params.item;
    const itemData = await GET_ASYNC(item);
    if (itemData) {
      console.log("Cached Result");
      res.status(200).json(JSON.parse(itemData));
    } else {
      const config = {
        method: "get",
        url: "https://api.api-ninjas.com/v1/nutrition?query=" + item,
        headers: { "x-api-key": "YvhBqBIk3QXKCxVOQ78PfwuvImRk052WNeRFe3jv" },
      };
      const response = await axios(config);

      const saveResult = await SET_ASYNC(
        item,
        JSON.stringify(response.data[0])
      );
      res.status(200).json(response.data[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

module.exports = router;
