import { StrapiPost } from "./Post";

const examplePostObject: StrapiPost = {
    id: 0,
    attributes: {
      title: '',
      description: '',
      votes: 0,
      reports: 0,
      createdAt: new Date(),
      type: 'Text',
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
            },
            subscribers: {
              data: {
                attributes: {
                  count: 0
                }
              }
            },
            name_uid: '',
          }
        }
      }
    },
}