type Media = {
  id: number;
  name: string;
  alternativeText: string;
  width: number;
  height: number;
  ext: string;
  url: string;
  formats: {
    large: {
      url: string;
    }
  }
};

//Olo, ty gruby geju, zachowuj spójność - atrybuty tylko do typów z napisem strapi
type StrapiMedia = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      width: number;
      height: number;
      ext: string;
      url: string;
      formats: {
        large: {
          url: string;
        }
      }
    };
  };
};

export const emptyMedia: Media = {
  id: -1,
  name: '',
  alternativeText: '',
  width: 0,
  height: 0,
  ext: '',
  url: '',
  formats: {
    large: {
      url: '',
    }
  }
}
export const emptyStrapiMedia: StrapiMedia = {
  data: {
    id: -1,
    attributes: {
      name: '',
      alternativeText: '',
      width: 0,
      height: 0,
      ext: '',
      url: '',
      formats: {
        large: {
          url: '',
        }
      }
    }
  }
}
export default Media;
export type { StrapiMedia };
