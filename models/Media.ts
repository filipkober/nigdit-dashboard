type Media = {
  id: number;
  name: string;
  alternativeText: string;
  width: number;
  height: number;
  ext: string;
  url: string;
  formats: {
    large?: {
      url: string;
    },
    thumbnail?: {
      url: string;
    }
  },
};

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

const mediaAdapter = (media: StrapiMedia): Media => {
  return {
    id: media.data.id,
    name: media.data.attributes.name,
    alternativeText: media.data.attributes.alternativeText,
    width: media.data.attributes.width,
    height: media.data.attributes.height,
    ext: media.data.attributes.ext,
    url: media.data.attributes.url,
    formats: media.data.attributes.formats,
  }
};

export default Media;
export { mediaAdapter };
export type { StrapiMedia };

