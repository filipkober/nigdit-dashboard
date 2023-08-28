import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  ChangeEvent,
} from 'react';
import makpaj from '../../../assets/makpaj.svg';
import testimage from '../../../assets/testimage.svg';
import Image from 'next/image';
import Input from '../../atoms/Input';
import TextArea from '../../atoms/TextArea';
import { SubmitHandler, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select';
import UserService from '../../../util/requests/UserService';
import SubnigditService from '../../../util/requests/SubnigditService';
import { SearchUser } from '../../../models/User';
import { debounce } from 'lodash';
import ImageCropModal from '../../molecules/ImageCropModal';
import ImageInput from '../../molecules/ImageInput';
import ErrorMessage from '../../atoms/ErrorMessage';
import emptyBanner from '../../../assets/emptyBanner.png';
import { GenericComponentProps } from '../../../models/GenericComponentProps';
import Subnigdit from '../../../models/Subnigdit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toastDisplay } from '../../atoms/Toast';
import ToastType from '../../../models/ToastType';

//regular string does not work for some reason

type Inputs = {
  icon: string;
  banner: string;
  name: string;
  description: string;
  rules: string[];
  mods: number[];
};

type SubnigditCreationPanelProps = {
  subnigdit?: Subnigdit;
} & GenericComponentProps;

export default function SubnigditCreationPanel({
  subnigdit,
}: SubnigditCreationPanelProps) {
  const editing = !!subnigdit;

  //some banner & icon of subnigdit
  const uploadIcon = (e: any) => {
    document.getElementById('iconUpload')?.click();
  };
  const uploadBanner = (e: any) => {
    document.getElementById('bannerUpload')?.click();
  };

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedIconImage, setCroppedIconImage] = useState<Blob>();
  const [croppedBannerImage, setCroppedBannerImage] = useState<Blob>();
  const [cropType, setCropType] = useState<'icon' | 'banner'>('icon');

  const [unCroppedImage, setUnCroppedImage] = useState('');

  const onCloseCropModal = () => {
    setCropModalOpen(false);
  };

  const setCroppedImage = (croppedImage: Blob, type: 'icon' | 'banner') => {
    if (type === 'icon') {
      setCroppedIconImage(croppedImage);
    } else {
      setCroppedBannerImage(croppedImage);
    }
  };

  const userService = new UserService();
  const subnigditService = new SubnigditService();

  //deletion of subnigdit
  const [destroy, setDestroy] = useState<boolean>(false);
  const btnDefClass =
    'text-white duration-[100ms] text-center font-bold hover:drop-shadow-midget border-black border-solid hover:cursor-pointer font-["Roboto"]';
  function toggleDestruction() {
    console.log('toggled D E S T R U C T I O N');
    setDestroy(!destroy);
  }

  //adding rules
  const [rules, setRules] = useState<string[]>(editing ? (subnigdit.rules ? subnigdit.rules?.map(r => r.rule) : []) : []);
  const [newRule, setNewRule] = useState<string>('');
  const addRule = () => {
    setRules([...rules, newRule]);
    setNewRule('');
  };
  const removeRule = (ruleToDelete: number) => {
    //this is probably not the best way to do it, but it seems to work fine
    setRules(
      rules.filter((rule, index) => {
        return index != ruleToDelete ? rule : null;
      })
    );
    rules.splice(ruleToDelete, 1);
  };
  const handleNewRuleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewRule(event.target.value);
  };

  //adding moderation
  const [mods, setMods] = useState<SearchUser[]>(editing ? subnigdit.moderators.map(m => ({ id: m.id, username: m.attributes.username, avatar: m.attributes.profilePicture })) : []);
  const [userOptions, setUserOptions] = useState<SearchUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchUser>();
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  const addMod = () => {
    if (!selectedUser || mods.includes(selectedUser)) return;
    setMods([...mods, selectedUser]);
  };

  const removeMod = (modToDelete: number) => {
    setMods(
      mods.filter((mod, index) => {
        return index != modToDelete ? mod : null;
      })
    );
    mods.splice(modToDelete, 1);
  };

  const searchUsers = debounce(async (input: string) => {
    const response = await userService.searchUsers(input);
    setUserOptions(response);
    setLoadingUsers(false);
  }, 500);

  const onPickImage = (image: File) => {
    setUnCroppedImage(URL.createObjectURL(image));
    setCropModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({defaultValues: editing ? {
    name: subnigdit.name,
    description: subnigdit.description,
    icon: subnigdit.icon.url,
    banner: subnigdit.banner.url,
  } : undefined});

  const banner = watch('banner');
  const icon = watch('icon');
  const name = watch('name');

  const [iconFile, setIconFile] = useState<File>();
  const [bannerFile, setBannerFile] = useState<File>();

  useEffect(() => {
    if (croppedIconImage) {
      const file = new File([croppedIconImage], 'icon.png', {
        type: croppedIconImage.type,
      });
      setIconFile(file);
    }
  }, [croppedIconImage]);

  useEffect(() => {
    if (croppedBannerImage) {
      const file = new File([croppedBannerImage], 'banner.png', {
        type: croppedBannerImage.type,
      });
      setBannerFile(file);
    }
  }, [croppedBannerImage]);

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCropType('banner');
      onPickImage(e.target.files[0]);
    }
  };

  const handleIconImageChange = (image: File) => {
    setCropType('icon');
    onPickImage(image);
  };

  const debouncedChackName = debounce(async (name: string) => {
    if (name.length < 3) return;
    const response = await subnigditService.checkName(name);
    if (response) {
      setError('name', {
        type: 'manual',
        message: 'This name is already taken',
      });
    } else {
      setError('name', {});
    }
  }, 500);

  useEffect(() => {
    if (name) {
      debouncedChackName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if (!bannerFile || !iconFile) return;
    if(!editing){
      try{
    const sub = await subnigditService.createSubnigdit({
      name: values.name,
      description: values.description,
      icon: iconFile,
      banner: bannerFile,
      rules: rules.map((rule) => rule),
      moderators: mods.map((mod) => mod.id),
    });
    if (sub) {
      console.log('here hehe')
      router.push(`/n/${sub.name_uid}`);
    }
  }
  catch(e){
    toastDisplay(ToastType.Error, "Something went wrong")
  }
  } else {
    // TODO: update subnigdit
  }
  };

  return (
    <>
      <div className="flex flex-row justify-between w-[100%]">
        <div className="tl:w-[22%] w-[0%] bg-[rgba(255,0,0,0)] tl:block hidden p-2">
          <div className="w-[100%] flex flex-row justify-end">
            <div className="w-[95%] max-w-[320px] flex flex-col items-center bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid p-2">
              <p className="w-[100%] ls:h-[9vh] h-[80px] min-h-[45px] max-h-[60px] cs:text-[28px] ls:text-[22px] text-[20px] font-['Roboto'] text-center font-bold">
                Subnigdit {editing ? 'editor' : 'creator'}
              </p>
              <button
                type="button"
                className={`border-[1px] text-[18px] mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-experimentA hover:bg-experimentB rounded-[10px] ${btnDefClass}`}
              >
                <Link href={'/'}>Return</Link>
              </button>
              <button
                type="reset"
                form="subnigditForm"
                className={`border-[1px] text-[18px] mb-[8px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}
                onClick={() => {
                  setCroppedBannerImage(undefined);
                  setCroppedIconImage(undefined);
                  setIconFile(undefined);
                  setBannerFile(undefined);
                  setRules([]);
                  setMods([]);
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                form="subnigditForm"
                className={
                  destroy
                    ? `border-[1px] text-[18px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`
                    : `border-[1px] text-[18px] w-[100%] h-[6vh] min-h-[30px] max-h-[40px] bg-apply hover:bg-applyH rounded-[10px] ${btnDefClass}`
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="tl:w-[56%] w-[100%] bg-[rgba(255,255,0,0)] p-2 flex flex-col items-center">
          <div className="mb-2 p-2 tl:hidden w-[100%] h-[56px] min-h-[40px] max-h-[56px] flex flex-row justify-between bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <button
              type="button"
              className={`border-[1px] text-[18px] w-[100%] mr-2 h-[100%] bg-experimentA hover:bg-experimentB rounded-[10px] ${btnDefClass}`}
            >
              Return
            </button>
            <button
              form="subnigditForm"
              type="reset"
              className={`border-[1px] text-[18px] w-[100%] mr-2 h-[100%] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}
            >
              Clear
            </button>
            <button
              form="subnigditForm"
              type="submit"
              className={
                destroy
                  ? `border-[1px] text-[18px] w-[100%] h-[100%] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`
                  : `border-[1px] text-[18px] w-[100%] h-[100%] bg-apply hover:bg-applyH rounded-[10px] ${btnDefClass}`
              }
            >
              Submit
            </button>
          </div>
          <div className="overflow-hidden w-[100%] tl:w-[50vw] bg-foregroundL dark:bg-foregroundD drop-shadow-midget rounded-[10px] border-black border-[2px] border-solid">
            <form id="subnigditForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="border-b-[0px] border-black h-[15vh] w-[100%] bg-red-900 relative hover:cursor-pointer overflow-hidden hover:drop-shadow-bigChungus drop-shadow-walter">
                <Image
                  src={
                    bannerFile
                      ? URL.createObjectURL(bannerFile)
                      : ((banner && banner.length > 0) ? banner : emptyBanner)
                  }
                  alt="banner"
                  width={1000}
                  height={1000}
                  className="w-[100%] h-[100%] object-cover"
                />
                <a
                  onClick={uploadBanner}
                  className="duration-[100ms] text-transparent hover:text-black dark:hover:text-white bg-transparent hover:bg-[rgba(50,50,50,0.4)] absolute w-[100%] h-[15vh] my-[-15vh] flex items-center justify-center text-[1.25rem] ml:text-[1.5rem] ts:text-[2rem] ls:text-[3rem]"
                >
                  Change banner image
                </a>
                <input
                  hidden
                  type={'file'}
                  id="bannerUpload"
                  accept="image/*"
                  {...{
                    ...register('banner'),
                    onChange: handleBannerImageChange,
                  }}
                />
              </div>
              <ImageInput
                name="icon"
                register={register}
                customOnChange={handleIconImageChange}
                img={iconFile ? URL.createObjectURL(iconFile) : ""}
              />
              <div className="flex flex-wrap justify-between w-[100%]">
                <div className="flex justify-between w-[100%] tl:h-[calc((5vw+12px)*60/100)] h-[calc((5vw+12px)*98/100)]">
                  <div className="flex justify-start w-[calc((14vw+24px)*3*98/100+2vw)] tl:w-[calc((13vw+37px)*3*56/100+1vw)]">
                    {/* ^^^ co tu się dzieje i dlaczego przepuściłem to przez code review */}
                    <div className="basis-1/3"></div>
                    <div className="basis-2/3 p-[1vw] tl:p-[0.5vw]">
                      <Input
                        minLength={3}
                        maxLength={20}
                        name="name"
                        type="text"
                        className="w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)]"
                        placeholder="awesomesubnigdit (max 20)"
                        register={register}
                      />
                      {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                      )}
                    </div>
                  </div>
                  {editing && (
                    <div className="w-[20%] p-[1vw] tl:p-[0.5vw]">
                      {destroy ? (
                        // <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] border-[1px] bg-cancel hover:bg-cancelH rounded-[10px] ${btnDefClass}`}>Cancel</button>
                        <button
                          type="button"
                          onClick={toggleDestruction}
                          className={`w-[100%] h-[90%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] bg-cancel hover:bg-cancelH px-2 rounded-[6px]`}
                        >
                          Cancel
                        </button>
                      ) : (
                        // <button type="button" onClick={toggleDestruction} className={`w-[100%] h-[100%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] border-[1px] bg-delete hover:bg-deleteH rounded-[10px] ${btnDefClass}`}>Delete</button>
                        <button
                          type="button"
                          onClick={toggleDestruction}
                          className={`w-[100%] h-[90%] text-[calc(2vw+5px)] tl:text-[calc(1vw+5px)] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] bg-delete hover:bg-deleteH px-2 rounded-[6px]`}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="w-[100%] h-[150px] p-[1vw] tl:p-[0.5vw]">
                  <div className="w-[100%] h-[100%]">
                    <TextArea
                      name="description"
                      placeholder="The description of your subnigdit... (max 300 characters)"
                      className="w-full h-full"
                      register={register}
                    />
                  </div>
                </div>
                <div className="w-[100%] cs:w-[50%] h-[200px] tl:h-[300px] p-[1vw] tl:p-[0.5vw]">
                  <div className="w-[100%] h-[100%] overflow-hidden rounded-[10px] border-[2px] border-black">
                    <div className="bg-experimentA border-black border-b-[2px] w-[100%] h-[50px] flex justify-center flex-row items-center p-[0.5vw] tl:p-[0.25vw]">
                      <p className="text-[calc(2vw+18px)] tl:text-[calc(1vw+18px)] font-['Roboto'] font-bold text-white">
                        Subnigdit Rules
                      </p>
                    </div>
                    <div className="bg-experimentC w-[100%] h-[calc(100%-90px)] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                      {rules.map((x, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full p-[3px] overflow-hidden flex space-x-1"
                          >
                            <span className="w-[calc(100%-30px)] bg-foregroundD rounded-[5px] px-2">
                              {index + 1}. {x}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                removeRule(index);
                              }}
                              className="bg-delete hover:bg-deleteH h-[25px] w-[25px] rounded-[5px]"
                            >
                              X
                            </button>
                            <div className="h-[25px] w-[5px]"></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-experimentA border-black border-t-[2px] w-[100%] h-[40px] flex p-[0.5vw] tl:p-[0.25vw]">
                      <input
                        value={newRule}
                        placeholder="Do not be racist..."
                        name="newRule"
                        type="text"
                        onChange={handleNewRuleChange}
                        className="w-[83%] h-[100%] mr-[2%] outline-none bg-backgroundL dark:bg-backgroundD border-black border-2 hover:bg-foregroundL dark:hover:bg-highlightD rounded-md p-1"
                      />
                      <button
                        type="button"
                        onClick={addRule}
                        className={`w-[15%] h-[90%] text-[95%] tl:text-[100%] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] cs:w-[50%] h-[200px] tl:h-[300px] p-[1vw] tl:p-[0.5vw]">
                  <div className="w-[100%] h-[100%] overflow-hidden rounded-[10px] border-[2px] border-black">
                    <div className="bg-experimentA border-black border-b-[2px] w-[100%] h-[50px] flex justify-center flex-row items-center p-[0.5vw] tl:p-[0.25vw]">
                      <p className="text-[calc(2vw+18px)] tl:text-[calc(1vw+18px)] font-['Roboto'] font-bold text-white">
                        Moderation
                      </p>
                    </div>
                    <div className="bg-experimentC w-[100%] h-[calc(100%-90px)] overflow-hidden bg-scroll bg-cover scrollbar-thin scrollbar-thumb-[#535353] scrollbar-track-[#2323232a] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                      {mods.map((x, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full p-[3px] overflow-hidden flex space-x-1"
                          >
                            <span className="w-[calc(100%-30px)] bg-foregroundD rounded-[5px] px-2">
                              u/{x.username}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                removeMod(index);
                              }}
                              className="bg-delete hover:bg-deleteH h-[25px] w-[25px] rounded-[5px]"
                            >
                              X
                            </button>
                            <div className="h-[25px] w-[5px]"></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-experimentA border-black border-t-[2px] w-[100%] h-[40px] flex">
                      <div className="w-[83%] max-h-[28px]">
                        <AsyncSelect
                          placeholder="some trusted person..."
                          name="newRule"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              backgroundColor: '#1A1A1B',
                              borderColor: '#000000',
                              maxHeight: '28px !important',
                              outline: 'none',
                              border: '0',
                              '&:hover': {
                                borderColor: '#000000',
                              },
                            }),
                            menu: (provided, state) => ({
                              ...provided,
                              backgroundColor: '#1A1A1B',
                              color: '#FFFFFF',
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: '#1A1A1B',
                              '&:hover': {
                                backgroundColor: '#2C2C2D',
                              },
                              color: '#FFFFFF',
                            }),
                            singleValue: (provided, state) => ({
                              ...provided,
                              color: '#FFFFFF',
                            }),
                          }}
                          onKeyDown={(e: any) => {
                            if (e.target.value.length < 3) return;
                            setLoadingUsers(true);
                            searchUsers(e.target.value);
                          }}
                          onChange={(e: any) => {
                            setSelectedUser(
                              userOptions?.find((x) => x.id === e.value)
                            );
                          }}
                          options={
                            userOptions?.map((opt) => {
                              return {
                                value: opt.id,
                                label: opt.username,
                                icon: opt.profilePicture,
                              };
                            }) || []
                          }
                          menuPortalTarget={document.body}
                          className="color-white"
                          noOptionsMessage={(obj) => {
                            if (obj.inputValue.length < 3)
                              return 'Type at least 3 characters to search users';
                            return loadingUsers
                              ? 'Loading...'
                              : 'No users found';
                          }}
                        />
                      </div>
                      <div className="h-full p-[0.5vw] tl:p-[0.25vw] w-[17%]">
                        <button
                          type="button"
                          onClick={addMod}
                          className={`w-full h-[90%] text-[95%] tl:text-[100%] hover:cursor-pointer shrink-1 font-["Roboto"] dark:text-white active:translate-y-0.5 duration-[10ms] shrink-1 text-center font-bold drop-shadow-buttonImp active:drop-shadow-buttonImpA border-black border-solid border-[1px] hover:bg-experimentB bg-experimentA px-2 rounded-[5px]`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="tl:w-[22%] w-[0%] bg-[rgba(255,0,255,0)] tl:block hidden p-2"></div>
      </div>
      <ImageCropModal
        isOpen={cropModalOpen}
        onClose={onCloseCropModal}
        onCrop={(croppedImage) => {
          if (cropType === 'icon') {
            setCroppedIconImage(croppedImage);
          } else if (cropType === 'banner') {
            setCroppedBannerImage(croppedImage);
          }
          setCropModalOpen(false);
        }}
        image={unCroppedImage}
        aspect={cropType === 'icon' ? 1 : 10 / 3}
      />
    </>
  );
}
