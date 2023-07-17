import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export function useSearch() {
	const [search, setSearch] = useState('');
	const [error, setError] = useState(null);
	const isFirstInput = useRef(true);

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === '';
			return;
		}

		if (search === '') {
			setError('No se puede buscar una película vacía');
			return;
		}

		if (search.length < 3) {
			setError('La búsqueda debe tener al menos 3 caracteres');
			return;
		}

		setError(null);
	}, [search]);

	return { search, setSearch, error, isFirstInput };
}
