// 2d8 - 1d6 +4 +2 -1
interface DieBlock {
  type: 'die'
  negative: boolean
}

interface FixedBlock {
  type: 'fixed'
}

export type ParsedBlock = {
  maxValue: number
} & (DieBlock | FixedBlock)

export type RandomizedBlock = {
  maxValue: number
  value: number
} & (DieBlock | FixedBlock)

export const parse = (s: string): ParsedBlock[] => {
  const string = s.replaceAll(' ', '').replaceAll('+', '+(plus)').replaceAll('-', '+(minus)')
  const splitS = string.split('+')
  const res: ParsedBlock[] = []
  splitS.filter(cell => cell !== '').forEach(cell => {
    cell = cell.toLowerCase()
    cell = cell.replaceAll('(plus)', '+').replaceAll('(minus)', '-')
    if (cell.includes('d')) {
      if(cell[0] === 'd') cell = '1' + cell
      const splitString = cell.split('d')
      if(
        isNaN(+splitString[0]) ||
        isNaN(+splitString[1]) ||
        splitString.length !== 2 ||
        splitString[0] === '' ||
        splitString[1] === ''
      ) throw new ParsingError(cell)
      const isNegative = splitString[0][0] === '-'
      if (isNegative) {
        splitString[0] = splitString[0].substring(1)
      }
      for (let i = 0; i < parseInt(splitString[0]); i++) {
        res.push({
          type: 'die',
          maxValue: parseInt(splitString[1]),
          negative: isNegative
        })
      }
    } else {
      if(isNaN(parseInt(cell))) throw new ParsingError(cell)
      res.push({
        type: 'fixed',
        maxValue: parseInt(cell)
      })
    }
  })
  return res
}
/**
 * 
 * @param max The maximum value possible (included)
 * @returns A value between 0 and max (included)
 */
function getRandomInt (max: number) {
  return Math.floor(Math.random() * max)
}

export const getRandomIntForTests = (max: number) => {
  return getRandomInt(max)
}

export const rand = (a: ParsedBlock[]) => {
  const res: RandomizedBlock[] = []
  a.forEach(cell => {
    const newBlock = { ...cell, value: 0 }

    let randomValue = 0
    switch (cell.type) {
      case 'fixed':
        newBlock.value = cell.maxValue
        break
      case 'die':
        randomValue = getRandomInt(cell.maxValue) + 1
        if (cell.negative) {
          newBlock.value = -randomValue
        } else {
          newBlock.value = randomValue
        }
    }
    res.push(newBlock)
  })
  return res
}

export const total = (a: RandomizedBlock[]) => {
  let res = 0
  a.forEach(cell => {
    res += cell.value
  })
  return res
}

export const roll = (s: string) => {
  const parsedValue = parse(s)      
  const randomizedValue = rand(parsedValue)
  return total(randomizedValue)     
}

export const maxPossibleValue = (a: ParsedBlock[]) => {
  let res = 0
  a.forEach(cell => {
    if(cell.type === 'die'){
      res += !cell.negative ? cell.maxValue : -1 
    }else if(cell.type ==='fixed') {
      res += cell.maxValue
    }
  })
  return res
}

export const minPossibleValue = (a: ParsedBlock[]) => {
  let res = 0
  a.forEach(cell => {
    if(cell.type === 'die'){
      res += cell.negative ? -cell.maxValue : 1 
    }else if(cell.type ==='fixed') {
      res += cell.maxValue
    }
  })
  return res
}

export class ParsingError extends Error {
  constructor(string: string) {
    super(`Invalid die sequence: "${string}" is not a die type (ex: 3d6) nor a fixed value (ex: -2)`)
    this.name = "ParsingError"
  }
}