type SubnigditRulesProps = {
  id: number;
};

const name = 'n/jebaniemakpie';
const rules = ['1. Jebać Makpie', '2. Zakaz spamu', '3. Jebać Makpie'];

export default function SubnigditRules({ id }: SubnigditRulesProps) {
  return (
    <>
      <div>
        <div className="text-left font-normal dark:text-white bg-foregroundL dark:bg-foregroundD border-black border-solid drop-shadow-lg border-2 rounded-[5px] py-2 px-2 overflow-hidden mb-2 ">
          <div className="font-bold">
            <p>{name} Rules</p>
          </div>

          <div>
            <hr className="my-5 border-white border-solid border-[1px] w-[100%]"></hr>
          </div>
          <div>
              {rules.map((rule, index) => (
                <p key={index}>{rule}</p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
