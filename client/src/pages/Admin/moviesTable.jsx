import { Table, Button } from "antd";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const MoviesTable = ({ setSelectedMovie, form, openAddMovieModal, openDeleteMovieModal, setIsEditMode }) => {
    const { data: singleMovieData, loading: singleMovieLoading, error: singleMovieError } = useSelector((state) => state.movie.singleMovie);
    const { data: allMoviesData, loading: allMoviesLoading, error: allMoviesError } = useSelector((state) => state.movie.allMovies)

    const columns = [
        {
            title: "Poster",
            key: "poster",
            dataIndex: "poster",
            render: (poster) => <img src={poster} style={{width: "80px", height: "100px"}}/>
        },
        {
            title: "Title",
            key: "title",
            dataIndex: "title"
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
            ellipsis: true,
        },
        {
            title: "Duration (in mins)",
            key: "duration",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            key: "genre",
            dataIndex: "genre",
            render: (genre) => genre.join(", "),
        },
        {
            title: "Language",
            key: "language",
            dataIndex: "language",
            render: (language) => language.join(", "),
        },
        {
            title: "Release date",
            key: "releaseDate",
            dataIndex: "releaseDate",
            render: (releaseDate) => new Date(releaseDate).toLocaleDateString()
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <span style={{display: "flex", gap: "4px"}}>
                    <Button 
                        onClick={() => {
                            setIsEditMode(true);
                            setSelectedMovie(record.key);
                            openAddMovieModal();
                            form.setFieldsValue({
                                ...record,
                                releaseDate: dayjs(record.releaseDate)
                            });
                        }} 
                        type="primary" 
                        icon={<EditOutlined />} />
                    <Button 
                        onClick={() => {
                            setSelectedMovie(record.key);
                            openDeleteMovieModal();
                        }}
                        type="primary" 
                        danger 
                        icon={<DeleteOutlined/>} 
                        />
                </span>
            )
        }
    ];
    let dataSource;
    if(allMoviesData) {
        dataSource = allMoviesData?.movies.map(movie => {
            return {
                key: movie._id,
                poster: movie.poster,
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                language: movie.language,
                duration: movie.duration,
                releaseDate: movie.releaseDate,
            };
        });
    }
    return (
        <Table 
            columns={columns}
            dataSource={dataSource}
            loading={singleMovieLoading || allMoviesLoading}
        />
    );
};

export default MoviesTable;