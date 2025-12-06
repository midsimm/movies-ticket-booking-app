import { Input, Card, Typography, Space, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../redux/movieSlice";
import { useEffect } from "react";
import dayjs from "dayjs";

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.movie.allMovies);
    const movies = data?.movies;

    useEffect(() => {
        dispatch(fetchAllMovies());
    }, []);

    const selectMovieHandler = (movieId) => {
        navigate(`/movie/${movieId}/${dayjs().format("YYYY-MM-DD")}`);
    };

    return (
        <>
            <Space direction="vertical" size="middle" style={{width: "100%"}}>
                <Input.Search placeholder="Search a movie name" type="text" />
                <Flex wrap="wrap" gap="8px">
                    {
                        movies?.map(movie => {
                            return (
                                <Card
                                    hoverable
                                    cover={<img src={movie.poster} />}
                                    onClick={() => selectMovieHandler(movie._id)}
                                    style={{
                                        width: "200px",
                                        height: "300px",
                                        display: "inline-block",
                                        objectFit: "cover"
                                    }}
                                >
                                    <Card.Meta title={movie.title} />
                                </Card>
                            );
                        })
                    }
                </Flex>
            </Space>
        </>
    );
};

export default HomePage;