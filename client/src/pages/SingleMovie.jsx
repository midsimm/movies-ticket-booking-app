import { DatePicker, Divider, Flex, Space, Spin } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie } from "../redux/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllShowsByTheatre } from "../redux/showSlice";
import dayjs from "dayjs";
import TheatreWithShows from "../components/TheatresWithShows";

const SingleMovie = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector(state => state.movie.singleMovie);
    const { data: allShowsByTheatreData, loading: allShowsByTheatreLoading, error: allShowsByTheatreError } = 
        useSelector(state => state.show.allShowsByTheatre);

    useEffect(() => {
        console.log(params);
        dispatch(getMovie({_id: params.id}));
        dispatch(getAllShowsByTheatre({movie: params.id, date: params.date}));
    }, [params.id, params.date]);

    useEffect(() => {
        if(params.date && dayjs(params.date) <= dayjs().startOf("day")) {
            // navigate to current date
            navigate(`/movie/${params.id}/${dayjs().format("YYYY-MM-DD")}`);
        }
    }, []);

    if(loading) {
        return <Spin fullscreen/>;
    }

    const movie = data?.movie;
    const showsByTheatre = allShowsByTheatreData?.shows;
    return (
        movie &&  showsByTheatre ? <>
            <Flex vertical={true}>
                <img src={movie.poster} height="300px" width="200px" />
                <h3>{movie.title}</h3>
                <div>{movie.description}</div>
                <div>Language: {movie.language.join(", ")}</div>
                <div>Genre: {movie.genre.join(", ")}</div>
                <div>Duration: {movie.duration} minutes</div>
                <div>Release date: {dayjs(movie.releaseDate).format("YYYY-MM-DD")}</div>
            </Flex>
            <Divider />
            <DatePicker 
                disabledDate={(current) => current && current < dayjs().startOf('day')}
                defaultValue={params.date ? dayjs(params.date) : dayjs()}
                onChange={(date, dateString) => {
                    navigate(`/movie/${params.id}/${dateString}`);
                }}
                style={{marginBottom: "16px"}}
            />
            <Space direction="vertical" height="8px"/>
            <TheatreWithShows 
                data={allShowsByTheatreData}
            />
        </> : null
    );
};

export default SingleMovie;
