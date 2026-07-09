// @ts-nocheck

// Converts XML to Markdown.

import * as fs from "node:fs";
import * as path from "node:path";
// import { JSDOM } from "jsdom";
import { parseXml, XmlElement } from "@rgrove/parse-xml";
import Mustache from "mustache";
import { parse } from "node:path";

// const parseFromString = DomParser.parseFromString;

/**
 * 
 * @param {string} xmlStr 
 */
function stripHeader(xmlStr) {
    return xmlStr.slice(xmlStr.indexOf('?>') + 2);
}

function getText(elem) {
    return elem.children[0].text.trim();
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

    for (const filename of fs.readdirSync("src/reference")) {
        console.log("FILENAME: " + filename);

        if (!filename.endsWith(".xml")) continue;

        const inputName = path.join("src/reference", filename);
        const outputName = path.join("src/reference", path.parse(filename).name + ".md");

        const xml = fs.readFileSync(inputName).toString();
        fs.writeFileSync(outputName, xmlToMarkdown(xml, template));
    }
}
