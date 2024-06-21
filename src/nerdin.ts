import scrapeJobListings from "./scraper";

const nerdinParams: ScraperParams = {
    url: 'https://www.nerdin.com.br/vagas?CodigoCidade=0&CodigoPlataforma=33,132,133&CodigoVaga=&CodigoEmpresa=0',
    containerSelector: 'div[id^="divVagaConteudo"]',
    titleSelector: 'span > b',
    descriptionSelector: 'span:not([style="font-size:18px; color:#226EB7"])',
    linkSelector: 'a[href^="vaga"]',
    fullContainerSelector: '#divListaVagas',
    companyName:'',
    location:'',
    searchTerms: ['']
};

const nerdim = (debug:boolean)=>{

    scrapeJobListings(nerdinParams,debug).then(jobListings => {
        console.log('Nerdin Job Listings:');
        jobListings.forEach((job: { title: any; description: any; jobLink: any; }) => {
            console.log(`Title: ${job.title}`);
            console.log(`Link: https://www.nerdin.com.br/${job.jobLink}`);
            console.log('---');
        });
    });
}

export {nerdim};
    