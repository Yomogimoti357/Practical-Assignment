import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBase =
  repositoryName && !repositoryName.endsWith(".github.io")
    ? `/${repositoryName}/`
    : "/";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : "/",
  build: {
    rollupOptions: {
      input: {
        home: `${projectRoot}/index.html`,
        articles: `${projectRoot}/articles.html`,
      },
    },
  },
});
