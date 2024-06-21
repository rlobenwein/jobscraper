const puppeteer = require('puppeteer');


const scrapeJobListings = async (
    { url, containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }: ScraperParams, debug: boolean) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        if (debug) {
            console.log(`Navigating to URL: ${url}`);
        }
        await page.goto(url, { waitUntil: 'networkidle2' });
        if (debug) {
            console.log(`Page loaded: ${url}`);
        }

        const jobListings = await page.evaluate(({ containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }: ScraperParams) => {
            const fullContainer = document.querySelector(fullContainerSelector);
            if (!fullContainer) {
                if (debug) {
                    console.log(`Full container not found with selector: ${fullContainerSelector}`);
                }
                return [];
            }
            const jobContainers = fullContainer.querySelectorAll(containerSelector);
            if (debug) {
                console.log(`Number of job containers found: ${jobContainers.length}`);
            }
            const jobs: { title: any; description: any; jobLink: string | null; }[] = [];

            jobContainers.forEach((container, index) => {
                const titleElement = container.querySelector(titleSelector);
                const descriptionElement = container.querySelector(descriptionSelector);
                const linkElement = container.querySelector(linkSelector);

                const title = titleElement ? titleElement.innerHTML.trim() : '';
                const description = descriptionElement ? descriptionElement.innerHTML.trim() : '';
                const link = linkElement ? linkElement.getAttribute('href') : 'No link available';
                if (debug) {
                    console.log(`Job container ${index + 1}:`);
                    console.log(`  Title: ${title}`);
                    console.log(`  Description: ${description}`);
                    console.log(`  Link: ${link}`);
                }

                if (searchTerms.some(term => title.includes(term) || description.includes(term))) {
                    jobs.push({
                        title,
                        description,
                        jobLink: link
                    });
                }
                if (debug) {
                    console.log(`Job matches search terms:`);
                    console.log(`  Title: ${title}`);
                    console.log(`  Description: ${description}`);
                    console.log(`  Link: ${link}`);
                }
            });

            return jobs;
        }, { fullContainerSelector, containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms });
        if(debug) {
            console.log(`Job listings scraped: ${jobListings.length} jobs found`);
        }
        await browser.close();
        return jobListings;
    } catch (error) {
        console.error(`Error accessing the page: ${error}`);
        return [];
    }
};

export default scrapeJobListings;
