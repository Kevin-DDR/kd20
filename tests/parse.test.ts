import { parse } from "../src/parser";

test('Parse a single die correctly', () => {
  const result = parse('1d6')
  expect(result).toEqual([{ type: 'die', maxValue: 6, negative: false }])
})