type ScraperParams = {
    url: string;
    containerSelector: string;
    titleSelector: string;
    descriptionSelector: string;
    linkSelector: string;
    searchTerms: string[];
    fullContainerSelector:string,
    companyName?:string,
    location?:string
  }
  