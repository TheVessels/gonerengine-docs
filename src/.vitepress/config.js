import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const config = defineConfig({
    title: "GonerEngine Docs",
    description: "An in-development modders guide",
    base: "/gonerengine-docs/",
    vite: {
        configFile: "vite.config.js"
    },
    markdown: {
        languageAlias: {
            gml: "python"
        },
    },
    themeConfig: {
        logo: "/img/logo.png"
    }
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