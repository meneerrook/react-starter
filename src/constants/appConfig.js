
const env = process.env;

const appName = "Starter App";
const appShortName = "stra";

const appConfig = {
    name: appName,
    shortName: appShortName,
    version: env.REACT_APP_VERSION,
    cacheName: `${appShortName}cache_v${env.REACT_APP_VERSION}`,
};

export default appConfig;