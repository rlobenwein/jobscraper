import scrapeJobListings from "./scraper";

const indeedParams: ScraperParams = {
    url: 'https://br.indeed.com/empregos?q=full+stack&sc=0kf%3Aattr%284826W%7CAP3T4%7CEHNJH%252COR%29%3B&vjk=c98c327ee20c81cb',
    containerSelector: '/html/body/main/div/div[2]/div/div[5]/div/div[1]/div[5]',
    titleSelector: 'h2',
    descriptionSelector: 'span:not([style="font-size:18px; color:#226EB7"])',
    linkSelector: '/html/body/main/div/div[2]/div/div[5]/div/div[1]/div[5]/div/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[1]/h2/a',
    fullContainerSelector: '#mosaic-jobResults',
    companyName:'//*[@id="mosaic-provider-jobcards"]/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[2]/div/div[1]',
    location: '/html/body/main/div/div[2]/div/div[5]/div/div[1]/div[5]/div/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[2]/div/div[2]',
    searchTerms: ['.NET']
};

const indeed = async () => {

    scrapeJobListings(indeedParams).then(jobListings => {
        console.log('Indeed Job Listings:');
        jobListings.forEach((job: { title: any; description: any; jobLink: any; }) => {
            console.log(`Title: ${job.title}`);
            console.log(`Link: ${job.jobLink}`);
            console.log('---');
        });
    });
}

export {indeed};
