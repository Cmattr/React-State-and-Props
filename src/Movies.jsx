import React, { useState } from 'react';

const Movies = () => {
    const [movies, setMovies] = useState([
        { title: "Fellowship of the Ring", description: "A young hobbit embarks on an epic journey to destroy the One Ring.", genre: "Fantasy", showDetails: false },
        { title: "Monty Python and the Holy Grail", description: "A comedic retelling of the legend of King Arthur and his knights.", genre: "Comedy", showDetails: false },
        { title: "Kung-Pow", description: "A kung-fu parody film featuring a martial artist seeking revenge for his parents' death.", genre: "Action", showDetails: false }
    ]);
    const [newMovie, setNewMovie] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [view, setView] = useState("list");
    const [showAll, setShowAll] = useState(true);
    const [filterGenre, setFilterGenre] = useState("Action");

    const addMovie = () => {
        if (newMovie.trim() !== "" && newDescription.trim() !== "" && newGenre.trim() !== "") {
            setMovies([...movies, { title: newMovie, description: newDescription, genre: newGenre, showDetails: false }]);
            setNewMovie("");
            setNewDescription("");
            setNewGenre("");
        }
    };

    const removeMovie = (index) => {
        const updatedMovies = movies.filter((_, i) => i !== index);
        setMovies(updatedMovies);
    };

    const toggleDetails = (index) => {
        const updatedMovies = movies.map((movie, i) => 
            i === index ? { ...movie, showDetails: !movie.showDetails } : movie
        );
        setMovies(updatedMovies);
    };

    const filteredMovies = showAll ? movies : movies.filter(movie => movie.genre === filterGenre);

    return (
        <div>
            <h2>Favorite Movies</h2>
            <div>
                <input
                    type="text"
                    value={newMovie}
                    onChange={(e) => setNewMovie(e.target.value)}
                    placeholder="Add a new movie"
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Add a description"
                />
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add a genre"
                />
                <button onClick={addMovie}>Add Movie</button>
            </div>
            <div>
                <button onClick={() => setView("list")}>List View</button>
                <button onClick={() => setView("grid")}>Grid View</button>
            </div>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? `Show Only ${filterGenre} Movies` : 'Show All Movies'}
                </button>
            </div>
            {view === "list" ? (
                <ul>
                    {filteredMovies.map((movie, index) => (
                        <li key={index}>
                            <span onClick={() => toggleDetails(index)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{movie.title}</span>
                            <button onClick={() => removeMovie(index)}>Remove</button>
                            {movie.showDetails && <p>{movie.description}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {filteredMovies.map((movie, index) => (
                        <div key={index} style={{ margin: 10, border: "1px solid black", padding: 10 }}>
                            <span onClick={() => toggleDetails(index)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{movie.title}</span>
                            <button onClick={() => removeMovie(index)}>Remove</button>
                            {movie.showDetails && <p>{movie.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;