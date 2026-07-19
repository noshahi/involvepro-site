// next build --output=standalone does not copy public/ or .next/static
// into .next/standalone/. Passenger serves server.js directly (no `next start`),
// so these must be placed alongside the standalone server manually.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standaloneDir = path.join(root, ".next", "standalone");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

copyDir(path.join(root, "public"), path.join(standaloneDir, "public"));
copyDir(
  path.join(root, ".next", "static"),
  path.join(standaloneDir, ".next", "static")
);

console.log("Copied public/ and .next/static into .next/standalone/");
