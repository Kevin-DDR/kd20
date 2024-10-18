import { parse, ParsingError } from "../src/index";

test('Parse a single die correctly', () => {
  const result = parse('1d6')
  expect(result).toEqual([{ type: 'die', maxValue: 6, negative: false }])
})

test('Parse a single fixed value correctly', () => {
  const result = parse('3')
  expect(result).toEqual([{ type: 'fixed', maxValue: 3 }])
})

test('Parse a negative value or die correctly', () => {
  const result = parse('-1d6')
  expect(result).toEqual([{ type: 'die', maxValue: 6, negative: true }])

  const result2 = parse('-3')
  expect(result2).toEqual([{ type: 'fixed', maxValue: -3 }])
})

test('Parse d20 (implicit 1d20)', () => {
  const result = parse('d20')
  expect(result).toEqual([{ type: 'die', maxValue: 20, negative: false }])
})

test('Parse a complex string', () => {
  const result = parse('3d6 + 1d4 - 5 - 2d4 + 1')
  expect(result).toEqual([
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 4, negative: false },
    { type: 'fixed', maxValue: -5 },
    { type: 'die', maxValue: 4, negative: true },
    { type: 'die', maxValue: 4, negative: true },
    { type: 'fixed', maxValue: 1 }
  ])
})

test('Throw an exception for an invalid string', () => {
  expect(() => parse('')).toThrow(ParsingError)
  expect(() => parse('toto + 1d4')).toThrow(ParsingError)
  expect(() => parse('+f')).toThrow(ParsingError)
  expect(() => parse('3dz')).toThrow(ParsingError)
  expect(() => parse('4d4sss')).toThrow(ParsingError)
  expect(() => parse('dd20')).toThrow(ParsingError)
  expect(() => parse('2dd20')).toThrow(ParsingError)
  expect(() => parse('2d')).toThrow(ParsingError)
  expect(() => parse('2dd')).toThrow(ParsingError)
  expect(() => parse('2d   2d')).toThrow(ParsingError)
  expect(() => parse('d1d4')).toThrow(ParsingError)
})

