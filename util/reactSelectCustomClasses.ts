export const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'var(--backgroundL)',
        borderColor: '#000000',
        '&:hover': {
            borderColor: '#000000',
        },
        boxShadow: 'none',
        color: '#ffffff'
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'var(--backgroundL)',
        color: '#000000',
        '&:hover': {
            backgroundColor: 'var(--foregroundL)',
            color: '#000000',
        },
    }),
    menu: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'var(--backgroundL)',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: 'var(--foregroundL)',
            color: '#ffffff',
        },
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
}  