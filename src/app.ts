import scrapeJobListings from './scraper';


// const nerdinParams: ScraperParams = {
//     url: 'https://www.nerdin.com.br/vagas?CodigoCidade=0&CodigoPlataforma=33,132,133&CodigoVaga=&CodigoEmpresa=0',
//     containerSelector: 'div[id^="divVagaConteudo"]',
//     titleSelector: 'span > b',
//     descriptionSelector: 'span:not([style="font-size:18px; color:#226EB7"])',
//     linkSelector: 'a[href^="vaga"]',
//     fullContainerSelector: '#divListaVagas',
//     companyName:'',
//     location:'',
//     searchTerms: ['']
// };

// scrapeJobListings(nerdinParams).then(jobListings => {
//     console.log('Nerdin Job Listings:');
//     jobListings.forEach((job: { title: any; description: any; jobLink: any; }) => {
//         console.log(`Title: ${job.title}`);
//         //console.log(`Description: ${job.description}`);
//         console.log(`Link: https://www.nerdin.com.br/${job.jobLink}`);
//         console.log('---');
//     });
// });

const indeedParams: ScraperParams = {
    url: 'https://br.indeed.com/empregos?q=full+stack&sc=0kf%3Aattr%284826W%7CAP3T4%7CEHNJH%252COR%29%3B&vjk=c98c327ee20c81cb',
    containerSelector: '#mosaic-provider-jobcards > ul > li:nth-child(1)',
    titleSelector: 'h2',
    descriptionSelector: 'span:not([style="font-size:18px; color:#226EB7"])',
    linkSelector: '/html/body/main/div/div[2]/div/div[5]/div/div[1]/div[5]/div/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[1]/h2/a',
    fullContainerSelector: '#mosaic-jobResults',
    companyName:'//*[@id="mosaic-provider-jobcards"]/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[2]/div/div[1]',
    location: '/html/body/main/div/div[2]/div/div[5]/div/div[1]/div[5]/div/ul/li[1]/div/div/div/div/div/table/tbody/tr/td[1]/div[2]/div/div[2]',
    searchTerms: ['.NET']
};

scrapeJobListings(indeedParams).then(jobListings => {
    console.log('Indeed Job Listings:');
    jobListings.forEach((job: { title: any; description: any; jobLink: any; }) => {
        console.log(`Title: ${job.title}`);
        //console.log(`Description: ${job.description}`);
        console.log(`Link: ${job.jobLink}`);
        console.log('---');
    });
});

