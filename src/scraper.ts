const puppeteer = require('puppeteer');


const scrapeJobListings = async ({ url, containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }: ScraperParams) => {
    try {
        console.log(url)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const jobListings = await page.evaluate(({ containerSelector, titleSelector, descriptionSelector, linkSelector, searchTerms, fullContainerSelector }: ScraperParams) => {
            const fullContainer = document.querySelector(fullContainerSelector);
            if (!fullContainer) {
                return [];
            }

            const jobContainers = fullContainer.querySelectorAll(containerSelector);
            console.log(`Número de containers encontrados: ${jobContainers.length}`);
            const jobs: { title: any; description: any; jobLink: string | null; }[] = [];

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
        await browser.close();
        return jobListings;
    } catch (error) {
        console.error(`Error accessing the page: ${error}`);
        return [];
    }
};

export default scrapeJobListings;
