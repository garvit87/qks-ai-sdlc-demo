// Static export so the site can be served from GitHub Pages.
// BASE_PATH is set by the pipeline: "/qks-ai-sdlc-demo" for live, "/qks-ai-sdlc-demo/test" for the test environment.
const basePath = process.env.BASE_PATH || "";
export default {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_ENV_LABEL: process.env.ENV_LABEL || "LOCAL" },
};
