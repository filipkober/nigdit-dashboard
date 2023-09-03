import { JoinButton } from '../../atoms/JoinButton';
import DashboardHeader from '../../molecules/DashboardHeader';
import FilteringBar from '../../molecules/FilteringBar';
import PostMedia from '../../molecules/PostMedia';
import PostText from '../../molecules/PostText';
import SubnigditRules from '../../molecules/SubnigditRules';
import DashboardFeed from '../DashboardFeed';
import makpaj from '../../../assets/makpaj.svg';
import TabSelector from '../../molecules/TabSelector';
import { useState } from 'react';
import CreatePostBlock from '../../molecules/CreatePostBlock';

const desc = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat
      Duis aute irure dolor in reprehenderit in voluptate ...
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat
      Duis aute irure dolor in reprehenderit in voluptate
`; //temp

export default function SubnigditDashboard() {
  const [selected, setSelected] = useState<number>(0);
  const content = (
    <div className="ls:w-[50vw] flex flex-col font-['Roboto']">
      <div className="mb-[1vh]">
        <FilteringBar
          clicked={function (cc: number): void {
            throw new Error('Function not implemented.');
          }} changeAlg={function (cc: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      {/* tu będzie map */}
      <div className="px-2">
        <PostText post={{
          id: 0,
          title: '',
          description: undefined,
          votes: 0,
          reports: 0,
          createdAt: new Date(),
          type: 'Text',
          nsfw: false,
          media: undefined,
          comments: undefined,
          owner: {
            id: undefined,
            username: '',
            email: undefined,
            posts: undefined,
            comments: undefined,
            replies: undefined,
            profilePicture: undefined,
            votes: {
              upvotes: {
                posts: [],
                comments: [],
                replies: []
              },
              downvotes: {
                posts: [],
                comments: [],
                replies: []
              }
            },
            aboutMe: undefined,
            provider: '',
            subnigdits: undefined,
            moderates: undefined,
            admin: undefined,
            confirmed: false,
          },
          subnigdit: {
            id: 0,
            name: '',
            description: '',
            createdAt: new Date(),
            reports: 0,
            icon: {
              id: 0,
              name: '',
              alternativeText: '',
              width: 0,
              height: 0,
              ext: '',
              url: '',
              formats: {
                large: undefined,
                thumbnail: undefined
              }
            },
            banner: {
              id: 0,
              name: '',
              alternativeText: '',
              width: 0,
              height: 0,
              ext: '',
              url: '',
              formats: {
                large: undefined,
                thumbnail: undefined
              }
            },
            subscribers: {
              data: {
                attributes: {
                  count: 0
                }
              }
            },
            rules: undefined,
            moderators: [],
            owner: {
              id: 0,
              attributes: {
                username: '',
                email: '',
                posts: undefined,
                comments: undefined,
                replies: undefined,
                profilePicture: undefined,
                votes: {
                  upvotes: {
                    posts: [],
                    comments: [],
                    replies: []
                  },
                  downvotes: {
                    posts: [],
                    comments: [],
                    replies: []
                  }
                },
                aboutMe: undefined,
                provider: '',
                confirmed: false
              }
            },
            name_uid: ''
          }
        }} showReportModal={function (id: number): void {
          throw new Error('Function not implemented.');
        } }     />   
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full">
        <div className="">
          <DashboardHeader />
        </div>

        {/*Mobile View*/}
        <div className="ls:hidden inline">
          <TabSelector
            selected={selected}
            setSelected={setSelected}
            tabs={['Posts', 'Other']}
          />
          {selected === 0 ? (
            content
          ) : (
            <div className="ls:hidden inline">
              <div className="flex flex-col flex-wrap items-center ">
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  <CreatePostBlock subnigditSlug={'gayspiderbrothel'} />
                </div>
                <div className="w-[40vw] min-w-[300px] my-2 mx-2">
                  <SubnigditRules subnigdit={{
                      id: 0,
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
                            height: 0,
                            ext: '',
                            url: '',
                            formats: {
                              large: {
                                url: ''
                              }
                            }
                          }
                        }
                      },
                      iconUrl: '',
                      subscribers: 0,
                      rules: [],
                      name_uid: ''
                    }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/*Desktop View*/}
        <div className="hidden ls:inline">
          <div className="flex flex-row justify-around">
            <div className="w-[20vw] my-2">
              <CreatePostBlock subnigditSlug={'gayspiderbrothel'} />
            </div>
            {content}
            <div className="w-[20vw] my-2">
              <SubnigditRules subnigdit={{
                id: 0,
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
                      height: 0,
                      ext: '',
                      url: '',
                      formats: {
                        large: {
                          url: ''
                        }
                      }
                    }
                  }
                },
                iconUrl: '',
                subscribers: 0,
                rules: [],
                name_uid: ''
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
