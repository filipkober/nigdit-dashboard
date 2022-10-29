import SubnigditRulesType from "../../../models/SubnigditRulesType";

type SubnigditRulesProps = {
  rules?: SubnigditRulesType;
};

const name = 'n/jebaniemakpie';
const ruless = ['Jebać Makpie', 'Zakaz spamu', 'Jebać Makpie'];

export default function SubnigditRules({ rules = {name: name, rules: ruless} }: SubnigditRulesProps) {
  return (
    <>
      <div>
        <div className="text-left font-normal dark:text-white bg-foregroundL dark:bg-foregroundD border-black border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
          <div className="font-bold">
            <p>{rules.name} Rules</p>
          </div>

          <div>
            <hr className="my-5 border-white border-solid border-[1px] w-[100%]"></hr>
          </div>
          <ol className="ml-4">
            {rules.rules.map((rule: string, index: number) => (
              <li className=" list-decimal" key={index}>{rule}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
