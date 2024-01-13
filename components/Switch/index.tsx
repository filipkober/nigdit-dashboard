type SwitchProps = {
  className?: string,
  onClick?: (e?: React.MouseEvent<MouseEvent | HTMLDivElement>) => void,
  isSet: boolean,
  setIsSet: (isSet: boolean) => void,
}
export default function Switch({className, isSet, setIsSet}: SwitchProps) {
  return (
    <div className={className  || ""}>
            <div className="flex">
                <label className="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isSet}
                        readOnly
                    />
                    <div
                        onClick={(e) => {
                            setIsSet(!isSet);
                        }}
                        className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white dark:peer-checked:after:border-black after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white dark:after:bg-backgroundD after:border-gray-300 dark:after:border-gray-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                        ON
                    </span>
                </label>
            </div>
        </div>
  )
}
