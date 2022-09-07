import { useEffect, useState } from "react"

const CustomInput = () => {
    // założenie: dodać tekst z inputu do tekstu wyświetlanego, przy kliknięciu przycisku
    const [tekst, setTekst] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")

    // useEffect(() => {
    //     setTekst(tekst + inputValue)
    // }, [inputValue])

    const onClick = () => {
        setTekst(tekst + inputValue)
    }

    return (
        <>
        <div><input 
        value={inputValue}
        className="border-solid border-black border-2" 
        placeholder="Podaj tekst"
        onChange={(e) => {setInputValue(e.target.value)}}
        ></input></div>
        <div><button onClick={onClick} className="mr-5">dodaj tekst   </button><button onClick={() => {setTekst("")}} className="hover:ease-in bg-slate-600">   wyczysc tekst</button></div>
        <div>Tekst: <span>{tekst}</span></div>
        </>
    )

}
export default CustomInput