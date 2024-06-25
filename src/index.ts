// 2d8 - 1d6 +4 +2 -1
export interface ParsedBlock {
  type: 'fixed' | 'die'
  maxValue: number
  negative?: boolean
}

export interface RandomizedBlock {
  type: 'fixed' | 'die'
  maxValue: number
  negative?: boolean
  value: number
}

export const parse = (s: string): ParsedBlock[] => {
  const string = s.replaceAll(' ', '').replaceAll('+', '+(plus)').replaceAll('-', '+(minus)')
  const splitS = string.split('+')
  const res: ParsedBlock[] = []
  splitS.filter(cell => cell !== '').forEach(cell => {
    cell = cell.toLowerCase()
    cell = cell.replaceAll('(plus)', '+').replaceAll('(minus)', '-')
    if (cell.includes('d')) {
      const tmp = cell.split('d')
      const isNegative = tmp[0][0] === '-'
      if (isNegative) {
        tmp[0] = tmp[0].substring(1)
      }
      for (let i = 0; i < parseInt(tmp[0]); i++) {
        res.push({
          type: 'die',
          maxValue: parseInt(tmp[1]),
          negative: isNegative
        })
      }
    } else {
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
