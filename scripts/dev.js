const concurrently = require("concurrently");

const { validateWorkspaces, isInPackages } = require("./utils");

async function dev(...args) {
  await validateWorkspaces(args);

  const tasks = [];

  // if (args.includes("client")) {
  //   tasks.push({
  //     name: "client-dev",
  //     command: "yarn workspace @retail-fc/client run dev",
  //   });
  // }
  // if (args.includes("cms-client")) {
  //   tasks.push({
  //     name: "cms-client-dev",
  //     command: "yarn workspace @retail-fc/cms-client run dev",
  //   });
  // }

  const entries = args; //.filter(name => !["client", "cms-client"].includes(name));

  if (entries.length > 0) {
    const paths = entries.map(name =>
      isInPackages(name) ? `packages/${name}` : name,
    );
    const envArgs = entries.map(name => `-e .env.${name}.local`).join(" ");

    tasks.push(
      {
        name: "watch-ts",
        command: `tsc --build --force --watch --verbose ${paths.join(" ")}`,
      },
      {
        name: "watch-js",
        command: `dotenv ${envArgs} -- nodemon ${
          paths.length > 1 ? `{${paths.join(",")}}` : paths[0]
        }/dist -q --source-map`,
      },
    );
  }

  return concurrently(tasks, {
    killOthers: ["failure", "success"],
    restartTries: 3,
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

dev(...process.argv.slice(2));
