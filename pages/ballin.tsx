import type { NextPage } from 'next'

type valuesType = {
  name: string,
  lastName: string,
  age: number,
  creditCard: {
    nr: number,
    expDate: string,
    cvv: number
  },
  real: boolean,
  sayHello: () => void,
  items: string[]
}

const Ballin: NextPage = () => {

  // rozsmarowanie
  // załóżmy że mamy ochotę stworzyć tablicę z istniejącej tablicy i 2 nowych elementów
  const initArray = ["a","b","c","d","e","f","g","h","i"]
  // używając ... rozsmarowujemy tablicę na wszystkie elementy
  const newArray = [...initArray, "j", "k", "l"] // ...initArray to to samo co "a","b","c","d","e","f","g","h","i",
  const badExample = [initArray, "j", "k", "l"] // ta tabela wygląda tak: [["a","b","c","d","e","f","g","h","i"], "j", "k", "l"]
  // wniosek: rozsmarowanie wypakowuje nam wartości z tablicy

  //rozpakowanie
  // załóżmy że importujemy ogromny obiekt z kądś, nazwijmy go values
  const values: valuesType = {
    name: "Filip",
    lastName: "Kober",
    age: 16,
    creditCard: {
      nr: 1234_5678_9101_1121, // to to samo co 1234567891011121 tylko czytelniejsze
      expDate: "01/23",
      cvv: 666
    },
    real: true,
    sayHello: () => {console.log("Hello my name is Filip")},
    items: ["knife","hot-dog","phone"]
  }
  // załóżmy teraz że do naszej funkcji jest przekazywany obiekt values
  function somethingCool(values: valuesType) {
    // załóżmy że potrzebujemy z values tylko 2 wartości: name i items
    // błędne podejście:
    const nameA = values.name;
    const itemsA = values.items;
    const creditCardA = values.creditCard;
    // poprawnie jest użyć rozpakowania. W klamrach wybieramy nazwy atrybutów obiektu, które chcemy przypisać do zmiennej
    const {name, items, creditCard, age} = values;
    // jest to dobre, ponieważ gdy w przyszłości chcemy skorzystać z innych atrybutów wypisujemy je po przecinku w klamrach zamiast definiować nowe zmienne
    // podobnie wygląda to z tablicami
    // jeżeli potrzebujemy tylko pierwsze kilka elementów z tablicy wypisujemy nazwy zmiennych do których chcemy je przypisać w kwadratowych nawiasach
    const [tfhgfh, ddsafghdas, cokolwiek] = items
    // teraz do zmiennej index0 jest przypisany element o inexie 0 z items, analogicznie z index1
  }
  // z rozsmarowania i rozpakowania powinniśmy korzystać jak najczęściej


  return (
    <p>Hello world</p>
  )
}

export default Ballin
