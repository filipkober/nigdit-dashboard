import { StrapiPost } from "./Post";

const examplePostObject: StrapiPost = {
    id: 0,
    attributes: {
      Title: '',
      Description: '',
      Votes: 0,
      Reports: 0,
      createdAt: new Date(),
      Type: 'Text',
      nsfw: false,
      owner: {
        data: {
          id: 0,
          attributes: {
            username: '',
            email: '',
          },
        },
      },
      subnigdit: {
        data: {
          id: 0,
          attributes: {
            name: '',
            description: '',
            createdAt: new Date(),
            reports: 0,
            icon: {
              data: {
                id: 0,
                attributes: {
                  name: '',
                  alternativeText: '',
                  width: 0,
                  height:0,
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
          }
        }
      }
    },
}