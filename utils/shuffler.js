export const shuffler = (
  length,
  scope = 'a-z A-Z 0-9 alphabets ALPHABETS numbers abc ABC 123',
  extra = ''
) => {
  const abc = 'qwertyuiopasdfghjklzxcvbnm'
  const ABC = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const num = '1234567890'

  let characters = ''

  if (
    scope.includes('a-z') ||
    scope.includes('alphabets') ||
    scope.includes('abc')
  ) {
    characters += abc
  }

  if (
    scope.includes('A-Z') ||
    scope.includes('ALPHABETS') ||
    scope.includes('ABC')
  ) {
    characters += ABC
  }

  if (
    scope.includes('0-9') ||
    scope.includes('numbers') ||
    scope.includes('123')
  ) {
    characters += num
  }

  if (extra) {
    characters += extra
  }

  let randomStr = ''

  for (let i = 0; i < length; i++) {
    randomStr += characters[Math.floor(Math.random() * characters.length)]
  }

  return randomStr
}
