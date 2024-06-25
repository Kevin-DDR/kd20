# kd20
Simple dice roller which can handle complex die sequences.

[Link to the npm package](https://www.npmjs.com/package/kd20?activeTab=readme)

## Install
`npm i kd20`
or
`yarn add kd20`

## Usage
```
import { parse, rand, total, ParsedBlock, RandomizedBlock } from 'kd20'

const stringToParse = '1d4+4 + 2d6 - 1d4'
const parsedValue = parse(stringToParse)      // Returns an array of Object representing each die and fixed value to randomize
const randomizedValue = rand(parsedValue)     // Returns an array of Object similar to before, this time with an extra field for each Object containing the randomized value
const total = total(randomizedValue)          // Returns the total value of the parsed string
```

## TODO
- [ ] Add tests for each method
- [ ] Throw an exception when string is incorrect
- [ ] Provide a method to run `parse`, `rand` and `total` in one go.

## License
KD20 © 2024 by Kévin DONIN DE ROSIERE is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
