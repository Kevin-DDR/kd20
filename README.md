# kd20
Simple dice roller which can handle complex die sequences.

[npm package](https://www.npmjs.com/package/kd20?activeTab=readme)
[demo](https://www.kddr.fr/app/d20)

## Install
`npm i kd20`

or

`yarn add kd20`

## Usage
```ts
import { parse, rand, total, ParsingError, minPossibleValue, maxPossibleValue } from 'kd20'
import type { ParsedBlock, RandomizedBlock } from 'kd20'


const stringToParse = '1d4+4 + 2d6 - 1d4'
try {
  const parsedValue = parse(stringToParse)      // Returns an array of Object representing each die and fixed value to randomize
  const randomizedValue = rand(parsedValue)     // Returns an array of Object similar to before, this time with an extra field for each Object containing the randomized value
  const total = total(randomizedValue)          // Returns the total value of the parsed and randomized string

  const minimum = minPossibleValue(parsedValue) // Returns the lowest possible total value
  const maximum = maxPossibleValue(parsedValue) // Returns the highest possible total value

} catch (e) {
  if (e instanceof ParsingError) {
    // The string to parse isn't valid
    console.log(e.message)
  }
}

```

## TODO
- [X] Add tests for each method
- [X] Throw an exception when string is incorrect
- [ ] Provide a method to run `parse`, `rand` and `total` in one go.

## License
KD20 © 2024 by Kévin DONIN DE ROSIERE is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
