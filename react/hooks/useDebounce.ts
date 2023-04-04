import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(handler)
	}, [value, delay])

	return debouncedValue
}

// Usage:
const [query, setQuery] = useState('')
const debounceSearch = useDebounce
