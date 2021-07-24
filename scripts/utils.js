const fs = require("fs");
const { resolve } = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function getWorkspaces() {
  const { stdout } = await exec("yarn workspaces list --json");

  return JSON.parse(`[${stdout.replace(/\n/g, ",").slice(0, -1)}]`);
}

function isInPackages(name) {
  return fs.existsSync(resolve(__dirname, `../packages/${name}`));
}

async function validateWorkspaces(names) {
  const workspacePaths = (await getWorkspaces())
    .map(workspace => workspace.location)
    .filter(path => path !== ".");

  const invalidPaths = [];

  names.forEach(name => {
    if (isInPackages(name)) return;
    if (!workspacePaths.includes(name)) invalidPaths.push(name);
  });

  if (invalidPaths.length) {
    console.log(`These workspaces ${invalidPaths} doesn't exists`);
    process.exit(1);
  }
}

module.exports = {
  getWorkspaces,
  validateWorkspaces,
  isInPackages,
  exec,
};
