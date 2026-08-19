//country type, 

export interface Country {
  name: string;
  alpha3Code: string;
  capital?: string;
  region: string;
  population: number;
 
  flags: {
    svg: string;
    png: string;
  }; 
}


// region tpe
export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";


//countryDetail
export interface CountryDetail {
  names: {
    common: string;
  
    native?: {
      [languageCode: string]: {
        common: string;
        official: string;
      };
    };
  };

  codes: {
    alpha_3: string;
  };


  flag: {
    url_svg: string;
    url_png: string;
  };

  region: string;
  subregion?: string;
  population: number;

  capitals?: {
    name: string;
  }[];

  tlds?: string[];

  currencies?: {
    name: string;

  }[];

  languages?: {
    name: string;
  }[];

  borders?: string[];
};



export  interface CountryDetailResponse {
  data: {
    objects: CountryDetail[];
    meta: {
      total: number;
      count: number;
      limit: number;
      offset: number; 
      more: boolean;
    }
  }
}