import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const config = defineConfig({
  title: "GonerEngine Docs",
  description: "An in-development modders guide",
  base: "/gonerengine-docs/",
  vite: {
    configFile: "vite.config.js",
  },
  markdown: {
    languageAlias: {
      gml: "python",
    },
  },
  themeConfig: {
    logo: "/img/logo.png",
    socialLinks: [
      // You can add any icon from simple-icons (https://simpleicons.org/):
      { icon: "github", link: "https://github.com/TheVessels/GonerEngine" },
      { icon: "discord", link: "https://discord.gg/2Ea2bpQGq5" },
    ],
    editLink: {
      pattern: "https://github.com/TheVessels/gonerengine-docs/edit/master/src/:path",
      text: "Edit this page on GitHub",
    },
  },
});

const sidebarConfig = {
  documentRootPath: "/src",
  collapsed: true,
  collapseDepth: 3,
  useTitleFromFileHeading: true,
  includeRootIndexFile: false,
  includeFolderIndexFile: true,
};

export default withSidebar(config, sidebarConfig);
