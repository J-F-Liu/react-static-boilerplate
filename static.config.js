// This file is used to configure:
// - static-site generation
// - Document shell (index.html)
// - ...tons of other things!

// Get started at httsp://react-static.js.org
import path from "path";
import React from "react";

export default {
  maxThreads: 1, // Remove this when you start doing any static generation
  plugins: [
    [
      "react-static-plugin-source-filesystem",
      {
        location: path.resolve("./src/pages"),
      },
    ],
    "react-static-plugin-styled-components",
    "react-static-plugin-reach-router",
  ],
  devServer: {
    port: 4210,
  },
  Document: ({ Html, Head, Body, children, state: { siteData, renderMeta } }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
};
