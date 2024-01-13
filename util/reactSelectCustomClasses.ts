export default function getStyle(theme: "dark" | "light") {
    return theme === "dark" ?{
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#1E1E1E',
            borderColor: '#000000',
            '&:hover': {
                borderColor: '#333333',
            },
            boxShadow: 'none',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#bbbbbb',
                cursor: 'pointer',
            },
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#1E1E1E',
            color: '#ffffff',
            borderColor: '#000000',
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: '#ffffff',
        }),
        input: (provided: any, state: any) => ({
            ...provided,
            color: '#ffffff',
        }),
        placeholder: (provided: any, state: any) => ({
            ...provided,
            color: '#ffffff',
        }),
    }  :
    {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#ffffff',
            borderColor: '#000000',
            '&:hover': {
                borderColor: '#333333',
            },
            boxShadow: 'none',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: '#000000',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#000000',
                cursor: 'pointer',
            },
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#ffffff',
            color: '#000000',
            borderColor: '#000000',
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: '#000000',
        }),
        input: (provided: any, state: any) => ({
            ...provided,
            color: '#000000',
        }),
        placeholder: (provided: any, state: any) => ({
            ...provided,
            color: '#000000',
        }),
    }
}

