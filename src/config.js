const common = {
  chromeVersion: 60,
};

const config = {
  local: {
    ...common,
    apiServer: "http://localhost:8080",
  },
  dev: {
    ...common,
  },
  prod: {
    ...common,
  },
};

const deploy = preval`
const deploy = process.env.DEPLOY || "local";
module.exports = deploy;
`;
console.log("Deploy target:", deploy);

export default {
  ...config[deploy],
  deploy,
};
