import { DateTime } from 'luxon'

interface IMonth {
  month: number
  year: number
}

export const getDaysInMonth = (month: number, year: number): number => {
  return DateTime.local(year, month).daysInMonth
}

export const getFirtsWeekdayOfMonth = (month: number, year: number): number => {
  return DateTime.local(year, month, 1).weekday
}

export const getDatesInMonthDisplay = (month: number, year: number): string[] => {
  const daysInMonth = getDaysInMonth(month, year)
  const firstWeekday = getFirtsWeekdayOfMonth(month, year)
  const prev = getPrevMonthYear(month, year)
  const prevDaysInMonth = getDaysInMonth(prev.month, prev.year)
  const monthDates = []

  for (let i = firstWeekday - 1; i >= 1 ; i--) {
    monthDates.push(DateTime.utc(prev.year, prev.month, (prevDaysInMonth + 1) - i).toISO())
  }

  for (let i = 1; i <= daysInMonth; i++) {
    monthDates.push(DateTime.utc(year, month, i).toISO())
  }

  if (monthDates.length < 42) {
    const daysToAdd = 42 - monthDates.length
    const next = getNextMonthYear(month, year)

    for (let i = 1; i <= daysToAdd; i++) {
      monthDates.push(DateTime.utc(next.year, next.month, i).toISO())
    }
  }

  return monthDates
}

export const getPrevMonthYear = (month: number, year: number): IMonth => {
  if (month === 1) return { month: 12, year: year - 1 }
  return { month: month - 1, year }
}

export const getNextMonthYear = (month: number, year: number): IMonth => {
  if (month === 1) return { month: month + 1, year }
  if (month === 12) return { month: 1, year: year + 1 }
  return { month: month + 1, year }
}

export const getSpecificDate = (day: number, month: number, year: number): string => {
  return DateTime.utc(year, month, day).toISO()
}

export const getDayOfMonth = (date: string, locale: string): number => {
  return DateTime.fromISO(date, { locale }).day
}

export const getMonth = (date: string, locale: string): number => {
  return DateTime.fromISO(date, { locale }).month
}

export const getYear = (date: string, locale: string): number => {
  return DateTime.fromISO(date, { locale }).year
}

export const getReadableWeekday = (date: string, locale: string): string => {
  return DateTime.fromISO(date, { locale }).weekdayLong
}

export const getReadableMonth = (date: string, locale: string): string => {
 return DateTime.fromISO(date, { locale }).monthLong
}

export const getDate = (date: string, locale: string): string => {
  return DateTime.fromISO(date, { locale }).toLocaleString(DateTime.DATE_SHORT)
}

export const getDateLong = (date: string, locale: string): string => {
  return DateTime.fromISO(date, { locale }).toLocaleString(DateTime.DATE_HUGE)
}

export const isDateCurrentDay = (selectedDate: string, comparingDate: string, locale: string): boolean => {
  const selectedDateString = getSpecificDate(
    getDayOfMonth(selectedDate, locale),
    getMonth(selectedDate, locale),
    getYear(selectedDate, locale)
  )
  const comparingDateString = getSpecificDate(
    getDayOfMonth(comparingDate, locale),
    getMonth(comparingDate, locale),
    getYear(comparingDate, locale)
  )

  return selectedDateString === comparingDateString
}

export const isDateCurrentMonth = (selectedDate: string, comparingDate: string, locale: string): boolean => {
  return getMonth(selectedDate, locale) === getMonth(comparingDate, locale)
}

export const getCurrentWeekDayNumbers = (date: string, locale: string): number[] => {
  const weekNumber = DateTime.fromISO(date, { locale }).weekday
  const month = getMonth(date, locale)
  const year = getYear(date, locale)
  const displayMonthDays = getDatesInMonthDisplay(month, year)
  const dateIndex = displayMonthDays.findIndex(monthDate => {
    return getDayOfMonth(monthDate, locale) === getDayOfMonth(date, locale)
  })
  const weekDaysNumbers = []

  for (let i = dateIndex - (weekNumber - 1); i <= dateIndex; i++) {
    weekDaysNumbers.push(getDayOfMonth(displayMonthDays[i], locale))
  }

  for (let j = dateIndex + 1; weekDaysNumbers.length !== 7; j++) {
    weekDaysNumbers.push(getDayOfMonth(displayMonthDays[j], locale))
  }

  return weekDaysNumbers
}

export const getWeekDayNumber = (date: string, locale: string): number => {
  return DateTime.fromISO(date, { locale }).weekday
}
