type Media = {
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
