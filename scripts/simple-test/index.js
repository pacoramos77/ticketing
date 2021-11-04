process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const url = "https://ticketing.com";
const cookie =
  "express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TldZd1pXUmhPRFU0T0RSak9ERTVZakptTVdZNU15SXNJbVZ0WVdsc0lqb2laVzFoYVd4QVpXMWhhV3d1WTI5dElpd2lhV0YwSWpveE5qTXpOakl3T1RnNGZRLmEtdVQ5SnVHSVBoX2hxY2xFMlRLamRBZ0t6X2o0MlJsdUNBVzdLcVdZUkkifQ==; path=/; secure; httponly";

const doRequest = async (number) => {
  console.log(`process ${number}`);
  console.time(`process ${number}`);

  const { data } = await axios.post(
    `${url}/api/tickets`,
    { title: "ticket", price: 5 },
    { headers: { cookie } }
  );

  await axios.put(
    `${url}/api/tickets/${data.id}`,
    { title: "ticket", price: 10 },
    { headers: { cookie } }
  );

  await axios.put(
    `${url}/api/tickets/${data.id}`,
    { title: "ticket", price: 15 },
    { headers: { cookie } }
  );
  console.timeEnd(`process ${number}`);
};

(() => {
  for (let i = 0; i < 10; i++) {
    doRequest(i);
  }
})();
