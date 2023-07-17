import { useState, useRef } from 'react';
import './App.css';

import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';
import { useEffect } from 'react';

import debounce from 'just-debounce-it';
import { useCallback } from 'react';

function App() {
	const [sort, setSort] = useState(false);
	const { search, setSearch, error, isFirstInput } = useSearch();
	const { movies, loading, getMovies } = useMovies({ search, sort });

	const debouncedgetMovies = useCallback(
		debounce((search) => {
			console.log('search', search);
			getMovies({ search });
		}, 300),
		[getMovies]
	);
	const handleSubmit = (event) => {
		event.preventDefault();
		getMovies({ search });
	};

	const handleChange = (event) => {
		const newSearch = event.target.value;
		setSearch(event.target.value);
		debouncedgetMovies(newSearch);
	};

	const handleSort = () => {
		setSort(!sort);
	};
	useEffect(() => {
		console.log('new getMovies received');
	}, [getMovies]);

	return (
		<div className='page'>
			<header>
				<h1>Buscador de Películas</h1>
				<form className='form' onSubmit={handleSubmit}>
					<input
						ref={isFirstInput}
						onChange={handleChange}
						value={search}
						name='query'
						type='text'
						id='search'
						placeholder='Avengers, Matrix, Spiderman'
					/>
					<input
						type='checkbox'
						name='sort'
						id='sort'
						onChange={handleSort}
						value={sort}
					/>
					<button type='submit'> Buscar </button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>

			<main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
		</div>
	);
}

export default App;
