import { parse } from "../src/index";

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

test('Parse a complex string', () => {
  const result = parse('3d6 + 1d4 - 5 + 2d4 + 1')
  expect(result).toEqual([
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 6, negative: false },
    { type: 'die', maxValue: 4, negative: false },
    { type: 'fixed', maxValue: -5 },
    { type: 'die', maxValue: 4, negative: false },
    { type: 'die', maxValue: 4, negative: false },
    { type: 'fixed', maxValue: 1 }
  ])
})