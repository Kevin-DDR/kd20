# kd20
Simple dice roller which can handle complex die sequences.

[NPM package](https://www.npmjs.com/package/kd20?activeTab=readme)

[Demo](https://www.kddr.fr/app/d20)

## Install
`npm i kd20`

or

`yarn add kd20`

## Simple usage
```ts
import { roll, ParsingError } from 'kd20'

const stringToParse = '1d4+4 + 2d6 - 1d4'
try {
  // Parses and randomizes the string and returns the value
  const result = roll(stringToParse)

} catch (e) {
  if (e instanceof ParsingError) {
    // The string to parse isn't valid
    console.log(e.message)
  }
}

```

## Other methods



```ts
import { parse, rand, total, ParsingError, minPossibleValue, maxPossibleValue } from 'kd20'
import type { ParsedBlock, RandomizedBlock } from 'kd20'


const stringToParse = '1d4+4 + 2d6 - 1d4'
try {
  // Returns an array of ParsedBlock representing each die and fixed value to randomize
  const parsedValue = parse(stringToParse)
  // Returns an array of RandomizedBlock. Those are similar to ParsedBlock but with an extra field containing the randomized value
  const randomizedValue = rand(parsedValue)
  // Returns the total value of the parsed and randomized string
  const total = total(randomizedValue)

  const minimum = minPossibleValue(parsedValue) // Returns the lowest possible total value
  const maximum = maxPossibleValue(parsedValue) // Returns the highest possible total value

} catch (e) {
  if (e instanceof ParsingError) {
    // The string to parse isn't valid
    console.log(e.message)
  }
}

```

## License
KD20 © 2024 by Kévin DONIN DE ROSIERE is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
