const validDniNifLetters = 'TRWAGMYFPDXBNJZSQVHLCKET'
const nieRegExp = new RegExp(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/)
const dniRegExp = new RegExp(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/)

function isDniValid(dni: string): boolean {
  if (!nieRegExp.test(dni) && !dniRegExp.test(dni)) return false

  const nie = dni
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2')
  const letter = dni.substr(-1)
  const letterIndex = parseInt(nie.substr(0, 8)) % 23

  return validDniNifLetters.charAt(letterIndex) === letter
}
