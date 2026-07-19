// Passenger/cPanel entry point. Runs the Next.js standalone server produced
// by `next build` (output: "standalone"). Not used by Vercel, which runs
// its own build/serve pipeline and ignores this file.
process.env.PORT = process.env.PORT || "3000";

require("./.next/standalone/server.js");
