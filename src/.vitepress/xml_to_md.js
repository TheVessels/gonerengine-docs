// @ts-nocheck

// Converts XML to Markdown.

import * as fs from "node:fs";
import * as path from "node:path";
// import { JSDOM } from "jsdom";
import { parseXml, XmlElement } from "@rgrove/parse-xml";
import Mustache from "mustache";
import { parse } from "node:path";

// Disable escaping
Mustache.escape = (str) => str;

const xmlPath = "src/reference";
const outPath = "src/reference";
const outPathNoSrc = outPath.replace("src/", "/");
// const godotXmlPath = "godot-docs/doc/classes";

const isXml = filename => filename.endsWith(".xml");
const xmlFilenames = fs.readdirSync(xmlPath).filter(isXml);
// const godotXmlFilenames = fs.existsSync(godotXmlPath) ? fs.readdirSync(godotXmlPath).filter(isXml) : [];
const godotDocsUrlStart = "https://docs.godotengine.org/en/stable/classes/"
const ignoreTypes = ["void"];
const ignoreMethods = [
    "_ready", "_process", "_physics_process", "_draw", "_input", "_gui_input", "_enter_tree", "_exit_tree"
];

// Is this class name a standard Godot class?
function isGodotClass(className) {
    // return godotXmlFilenames.includes(className + ".xml");
    // Let's just assume that if it isn't a GonerEngine class, it's a Godot class, for now.
    return true;
}
// Is this class name a standard GonerEngine class?
function isGonerEngineClass(className) {
    return xmlFilenames.includes(className + ".xml");
}

// returns "godot", "gonerengine", or "none"
function getClassType(className) {
    if (ignoreTypes.includes(className)) {
        return "none";
    } else if (isGonerEngineClass(className)) {
        return "goner";
    } else if (isGodotClass(className)) {
        return "godot";
    } else {
        return "none";
    }
}

// Returns null if the class name couldn't be found.
function findClassUrl(className) {
    const classType = getClassType(className);
    if (classType == "goner") {
        return path.join(outPathNoSrc, className);
    } else if (classType == "godot") {
        return godotDocsUrlStart + `class_${className.toLowerCase()}.html`;
    } else {
        return null;
    }
}
// Replaces the class name with a link, if a corresponding URL exists.
function findClass(className) {
    const classUrl = findClassUrl(className);
    if (classUrl == null) {
        return className;
    } else {
        return `[${className}](${classUrl})`
    }
}

function findMethodId(className, methodName) {
    const classType = getClassType(className);

    const hyphenatedMethodName = methodName.replaceAll("_", "-");

    if (classType == "goner") {
        return `method-${hyphenatedMethodName}`;
    } else if (classType == "godot") {
        return `class-${className.toLowerCase()}-method-${hyphenatedMethodName}`;
    } else {
        return null;
    }
}

function stripHeader(xmlStr) {
    return xmlStr.slice(xmlStr.indexOf('?>') + 2);
}

function processSpecificRefTag(tagType, tagContent) {
    if (tagType == "method") {
        const [className, methodName] = tagContent.split(".");

        const classUrl = findClassUrl(className);
        const methodId = findMethodId(className, methodName);
        if (classUrl == null || methodId == null) return `${methodName}`;

        return `[${tagContent}](${classUrl}#${methodId})`
    } else {
        // Just return the content for now.
        return tagContent;
    }
}

function processRefTags(code) {
    let position = 0;
    while (true) {
        const leftIndex = code.indexOf("[", position);
        if (leftIndex == -1) break;
        const rightIndex = code.indexOf("]", leftIndex);
        if (rightIndex == -1) break;
        position = rightIndex + 1;

        const firstTagLetter = code[leftIndex + 1];
        if (firstTagLetter == "/") continue; // it's a closing tag.

        const tagContent = code.slice(leftIndex + 1, rightIndex);
        // This splits tagContent into words, even if there are many spaces between words.
        const tagContentWords = tagContent.split(" ").filter(word => word.length > 0);

        if (tagContentWords.length == 1) {
            // It could be a class reference tag.
            // Let's only allow class names to start with an uppercase letter, for now.
            if (firstTagLetter.toUpperCase() != firstTagLetter) continue;

            // Check if this is a class with a documentation page
            const classUrl = findClassUrl(tagContent);
            if (classUrl == null) continue;

            // Add the url right after the tag.
            code = code.slice(0, rightIndex + 1) + `(${classUrl})` + code.slice(rightIndex + 1);
        } else if (tagContentWords.length == 2) {
            const tagOut = processSpecificRefTag(tagContentWords[0], tagContentWords[1]);
            code = code.slice(0, leftIndex) + tagOut + code.slice(rightIndex + 1);
        }
    }

    return code;
}

function parseBBCode(code) {
    code = code.replaceAll("[i]", "**");
    code = code.replaceAll("[/i]", "**");
    code = code.replaceAll("[b]", "**");
    code = code.replaceAll("[/b]", "**");
    code = code.replaceAll("[code]", "`");
    code = code.replaceAll("[/code]", "`");
    code = code.replaceAll("[codeblock]", "```gdscript");
    code = code.replaceAll("[/codeblock]", "```");
    code = code.replaceAll("[br]", "<br>");
    code = processRefTags(code);
    return code;
}

function getText(elem) {
    return parseBBCode(elem.children[0].text.trim());
}


function parseMethod(method) {
    const obj = {}
    obj.name = method.attributes.name
    obj.method_id = "method-" + method.attributes.name.replaceAll("_", "-");
    obj.static = method.attributes.qualifiers?.includes("static");
    obj.params = [];
    
    for (const child of method.children) {
        if (child.type != "element") continue;

        switch (child.name) {
            case "description":
                obj.description = getText(child);
                break;
            case "return":
                obj.return_type = findClass(child.attributes.type);
            case "param": {
                let param = {};
                let index = parseInt(child.attributes.index);
                param.name = child.attributes.name;
                param.type = findClass(child.attributes.type);
                param.enum = child.attributes.enum;
                obj.params[index] = param;
                break;
            }
        }
    }

    for (let i = 0; i < obj.params.length - 1; i++) {
        obj.params[i].more = true;
    }

    return obj;
}
function parseMethods(methods) {
    const arr = [];

    for (const child of methods.children) {
        if (child.type != "element") continue;
        if (ignoreMethods.includes(child.attributes.name)) continue;
        arr.push(parseMethod(child));
    }

    return arr;
}

/**
 * 
 * @param {string} xmlStr 
 * @param {string} template
 * @returns {string}
 */
function xmlToMarkdown(xmlStr, template) {
    /** @type {any} */
    const clas = parseXml(xmlStr).children[0];
    const view = {};

    view.name = clas.attributes.name;
    view.inherits = findClass(clas.attributes.inherits);

    for (const child of clas.children) {
        if (child.type != "element") continue;

        switch (child.name) {
            case "description":
                view.description = getText(child);
                break;
            case "brief_description":
                view.brief_description = getText(child);
                break;
            case "methods":
                view.methods = parseMethods(child);
                break;
        }
    }

    view.has_methods = view.methods?.length > 0;

    // console.log(clas.);
    // view.inherits = clas.getAttribute("inherits");
    // view.brief_description = clas.getElementsByTagName("brief_description")[0].textContent.trim();
    // console.log(clas.getElementsByTagName("brief_description")[0]);
    // view.description = clas.getElementsByTagName("description")[0].textContent.trim();

    return Mustache.render(template, view);
}

function main() {
    const template = fs.readFileSync("src/.vitepress/xml_to_md_template.md").toString();

    for (const filename of xmlFilenames) {
        console.log("PROCESSING FILE: " + filename);

        const inputName = path.join(xmlPath, filename);
        const outputName = path.join(outPath, path.parse(filename).name + ".md");

        const xml = fs.readFileSync(inputName).toString();
        fs.writeFileSync(outputName, xmlToMarkdown(xml, template));
    }
}

main();
