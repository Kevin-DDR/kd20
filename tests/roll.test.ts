import { roll, ParsingError } from "../src/index";

const checkRange = (value: number, min: number, max: number) => {
  expect(value).toBeGreaterThanOrEqual(min)
  expect(value).toBeLessThanOrEqual(max)
}


test('Roll a single die correctly', () => {
  for(let i = 0; i < 1000; i++) {
    const result = roll('1d6')
    checkRange(result, 1, 6)
  }
})

test('Roll a single fixed value correctly', () => {
  const result = roll('3')
  checkRange(result, 3, 3)
})

test('Roll a negative value or die correctly', () => {
  for(let i = 0; i < 1000; i++) {
    const result = roll('-1d6')
    checkRange(result, -6, -1)
  }

  const result = roll('-3')
  checkRange(result, -3, -3)
})


test('Roll a complex string', () => {
  for(let i = 0; i < 1000; i++) {
    const result = roll('3d6 + 1d4 - 5 - 2d4 + 1')
    checkRange(result, -8, 16)
  }
})

test('Throw an exception for an invalid string', () => {
  expect(() => roll('toto + 1d4')).toThrow(ParsingError)
  expect(() => roll('+f')).toThrow(ParsingError)
  expect(() => roll('3dz')).toThrow(ParsingError)
  expect(() => roll('4d4sss')).toThrow(ParsingError)
})
