import React from "react";
import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
}

// LandingPage.getInitialProps = async (context) => {
//   const client = buildClient(context);
//   const { data } = await client.get(`/api/users/currentuser`);

//   console.log("LandingPage.getInitialProps", { data });
//   return {
//     pageProps,
//     ...data,
//   };
// };
export default LandingPage;
