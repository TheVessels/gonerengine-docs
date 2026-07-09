// @ts-nocheck

// Converts XML to Markdown.

import * as fs from "node:fs";
import * as path from "node:path";
// import { JSDOM } from "jsdom";
import { parseXml, XmlElement } from "@rgrove/parse-xml";
import Mustache from "mustache";
import { parse } from "node:path";

let xmlFilenames = [];

// Disable escaping
Mustache.escape = (str) => str;

// const parseFromString = DomParser.parseFromString;

/**
 * 
 * @param {string} xmlStr 
 */
function stripHeader(xmlStr) {
    return xmlStr.slice(xmlStr.indexOf('?>') + 2);
}

function processRefTags(code) {
    let position = 0;
    while (true) {
        let leftIndex = code.indexOf("[", position);
        if (leftIndex == -1) break;
        let rightIndex = code.indexOf("]", leftIndex);
        if (rightIndex == -1) break;
        position = rightIndex + 1;

        let firstTagLetter = code[leftIndex + 1];
        if (firstTagLetter == "/") continue; // it's a closing tag.
        // Let's only allow tags that start with an uppercase letter, for now.
        if (firstTagLetter.toUpperCase() != firstTagLetter) continue;

        let tagContent = code.slice(leftIndex + 1, rightIndex);
        // Check if this is a class with a documentation page
        if (!xmlFilenames.includes(tagContent + ".xml")) continue;

        let url = `/reference/${tagContent}.md`

        // Add the url right after the tag.
        code = code.slice(0, rightIndex + 1) + `(${url})` + code.slice(rightIndex + 1);
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
    code = processRefTags(code);
    return code;
}

function getText(elem) {
    return parseBBCode(elem.children[0].text.trim());
}


function parseMethod(method) {
    const obj = {}
    obj.name = method.attributes.name
    obj.static = method.attributes.qualifiers?.includes("static");
    obj.params = [];
    
    for (const child of method.children) {
        if (child.type != "element") continue;

        switch (child.name) {
            case "description":
                obj.description = getText(child);
                break;
            case "return":
                obj.return_type = child.attributes.type;
            case "param": {
                let param = {};
                let index = parseInt(child.attributes.index);
                param.name = child.attributes.name;
                param.type = child.attributes.type;
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
    view.inherits = clas.attributes.inherits;

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

if (fs.existsSync("src/reference")) {
    const template = fs.readFileSync("src/.vitepress/xml_to_md_template.md").toString();
    xmlFilenames = fs.readdirSync("src/reference").filter(filename => filename.endsWith(".xml"));

    for (const filename of xmlFilenames) {
        console.log("PROCESSING FILE: " + filename);

        const inputName = path.join("src/reference", filename);
        const outputName = path.join("src/reference", path.parse(filename).name + ".md");

        const xml = fs.readFileSync(inputName).toString();
        fs.writeFileSync(outputName, xmlToMarkdown(xml, template));
    }
}
