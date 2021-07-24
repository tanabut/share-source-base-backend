const concurrently = require("concurrently");

const { validateWorkspaces, isInPackages } = require("./utils");

async function build(...args) {
  await validateWorkspaces(args);

  const paths = args
    // .filter(name => !["client", "cms-client"].includes(name))
    .map(name => (isInPackages(name) ? `packages/${name}` : name));

  const commands = {
    // client: {
    //   name: "client-build",
    //   command: "yarn workspace share-source-base/client run build",
    // },
    // "cms-client": {
    //   name: "cms-client-build",
    //   command: "yarn workspace share-source-base/cms-client run build",
    // },
    "the-rest": {
      name: "build-the-rest",
      command: `tsc --build --force ${
        paths.length > 1 ? `{${paths.join(",")}}` : paths[0]
      }/tsconfig.build.json`,
    },
  };

  const tasks = [];

  // if (args.includes("client")) {
  //   tasks.push(commands.client);
  // }
  // if (args.includes("cms-client")) {
  //   tasks.push(commands["cms-client"]);
  // }

  if (paths.length > 0) {
    tasks.push(commands["the-rest"]);
  }

  return concurrently(tasks, {
    killOthers: ["failure", "success"],
    restartTries: 1,
  }).then(
    () => {
      console.log("Done");
      process.exit(0);
    },
    err => {
      console.log("Failed ", err);
      process.exit(1);
    },
  );
}

build(...process.argv.slice(2));
