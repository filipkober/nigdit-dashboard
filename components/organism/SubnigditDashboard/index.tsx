import { useEffect, useState } from 'react';
import { StrapiSubnigdit } from '../../../models/Subnigdit';
import SubnigditService from '../../../util/requests/SubnigditService';
import CreatePostBlock from '../../molecules/CreatePostBlock';
import DashboardHeader from '../../molecules/DashboardHeader';
import FilteringBar from '../../molecules/FilteringBar';
import PostText from '../../molecules/PostText';
import SubnigditRules from '../../molecules/SubnigditRules';
import TabSelector from '../../molecules/TabSelector';

//description must be downloaded in useEffect
//same as rules
//filtering without suhbscribed button, replace with create post
//add options to feed alg

export default function SubnigditDashboard()
{
  const subnigditService = new SubnigditService();
  const [selected, setSelected] = useState<number>(0);
  const [thisSubnigdit, setThisSubnigdit] = useState<StrapiSubnigdit | null>(null);
  const [joined, setJoined] = useState<boolean>(false);

  useEffect(() => {
    let address = window.location.pathname
    const split = address.split('/');
    const subnigditName = split[split.length - 1];
    subnigditService.getBySlug(subnigditName,true)
    .then(
      (response) => {
        console.log(response)
        subnigditService.checkSubnigdit(response[0].id.toString())
        .then(
          (response2) => {
            setThisSubnigdit(response[0]);
            setJoined(response2)
          }
        )
      }
    )
  }, []);

  function joinThisSub(id: string)
  {
    subnigditService.joinSubnigdit(id)
    .then(
      (response) => {
        console.log(response)
      }
    )
  }
  
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
      <div className="">
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
              data: []
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
          {
            thisSubnigdit === null ? (""):(
              <DashboardHeader subnigdit={thisSubnigdit} joinSubnigdit={joinThisSub} joinedAlready={joined}/>
            )
          }
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
