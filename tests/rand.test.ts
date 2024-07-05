import { parse, getRandomIntForTests,rand, total, minPossibleValue, maxPossibleValue } from "../src/index";

const checkRange = (value: number, min: number, max: number) => {
  expect(value).toBeGreaterThanOrEqual(min)
  expect(value).toBeLessThanOrEqual(max)
}

const parseAndRand = (value: string) => {
  const parsed = parse(value)
  return rand(parsed)
}

test('Random number generator should return between 0 and max', () => {
  for(let i = 0; i < 1000; i++) {
    const result = getRandomIntForTests(5)
    checkRange(result, 0, 5)
  }
})

test('Rand a single die correctly', () => {
  for(let i = 0; i < 1000; i++) {
    const result = parseAndRand('1d6')
    checkRange(result[0].value, 1, 6)
  }
})

test('Rand a single fixed value correctly', () => {
  const result = parseAndRand('3')
  checkRange(result[0].value, 3, 3)
})

test('Rand a negative value or die correctly and match with total()', () => {
  for(let i = 0; i < 1000; i++) {
    const result = parseAndRand('-1d6')
    checkRange(result[0].value, -6, -1)
    expect(result[0].value).toBe(total(result))
  }

  const result = parseAndRand('-3')
  checkRange(result[0].value, -3, -3)
  expect(result[0].value).toBe(total(result))

})


test('Rand a complex string', () => {
  for(let i = 0; i < 1000; i++) {
    const result = parseAndRand('3d6 + 1d4 - 5 - 2d4 + 1')
    checkRange(total(result), -8, 16)
  }
})

test('maxPossibleValue and minPossibleValue should be accurate', () => {
  let parsedArray = parse('3d6 + 1d4 - 5 - 2d4 + 1')
  expect(minPossibleValue(parsedArray)).toBe(-8)
  expect(maxPossibleValue(parsedArray)).toBe(16)

  parsedArray = parse('')
  expect(minPossibleValue(parsedArray)).toBe(0)
  expect(maxPossibleValue(parsedArray)).toBe(0)
})