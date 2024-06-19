"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require('puppeteer');
const scrapeJobListings = (_a) => __awaiter(void 0, [_a], void 0, function* ({ url, containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }) {
    try {
        console.log(url);
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: 'networkidle2' });
        const jobListings = yield page.evaluate(({ containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }) => {
            const fullContainer = document.querySelector(fullContainerSelector);
            if (!fullContainer) {
                return [];
            }
            const jobContainers = fullContainer.querySelectorAll(containerSelector);
            console.log(`Número de containers encontrados: ${jobContainers.length}`);
            const jobs = [];
            jobContainers.forEach(container => {
                const titleElement = container.querySelector(titleSelector);
                const descriptionElement = container.querySelector(descriptionSelector);
                const linkElement = container.querySelector(linkSelector);
                const title = titleElement ? titleElement.innerHTML.trim() : '';
                const description = descriptionElement ? descriptionElement.innerHTML.trim() : '';
                const link = linkElement ? linkElement.getAttribute('href') : 'No link available';
                if (searchTerms.some(term => title.includes(term) || description.includes(term))) {
                    jobs.push({
                        title,
                        description,
                        jobLink: link
                    });
                }
            });
            return jobs;
        }, { fullContainerSelector, containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms });
        yield browser.close();
        return jobListings;
    }
    catch (error) {
        console.error(`Error accessing the page: ${error}`);
        return [];
    }
});
exports.default = scrapeJobListings;
