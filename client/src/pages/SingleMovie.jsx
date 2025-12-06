import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const SingleMovie = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.movie.singleMovie);

    useEffect(() => {
        console.log(params);
        dispatch(getMovie({_id: params.id}));
    }, []);

    if(loading) {
        return <Spin fullscreen/>;
    }

    const movie = data?.movie;
    return (
        movie ? <>
            <Flex vertical={true}>
                <img src={movie.poster} height="300px" width="200px" />
                <h3>{movie.title}</h3>
                <div>{movie.description}</div>
                <div>Language: {movie.language.join(", ")}</div>
                <div>Genre: {movie.genre.join(", ")}</div>
                <div>Duration: {movie.duration} minutes</div>
                <div>Release date: {dayjs(movie.releaseDate).format("YYYY-MM-DD")}</div>
            </Flex>
        </> : null
    );
};

export default SingleMovie;
