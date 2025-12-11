import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShow } from "../redux/showSlice";
import { Divider, Flex } from "antd";
import dayjs from "dayjs";

const BookinigPage = () => {
    const dispatch = useDispatch();
    const { data: showData, loading: showLoading, error: showError } = useSelector(state => state.show.singleShow);
    const params = useParams();

    useEffect(() => {
        dispatch(getShow({ showId: params.showId }));
    }, [params.showId]);

    console.log("Show Data:", showData);
    return (
        showData &&
        <Flex vertical="true">
            <Flex justify="space-between">
                <Flex vertical="true">
                    <img src={showData.show.movie.poster} alt={showData.show.movie.title} width="200px" height="300px" />
                    <h1>{showData.show.movie.title}</h1>
                </Flex>
                <Flex vertical="true">
                    <h2>Theatre: {showData.show.theatre.name}</h2>
                    <h3>Location: {showData.show.theatre.address}</h3>
                    <h3>Date: {dayjs(showData.show.date).format("YYYY-MM-DD")}</h3>
                    <h3>Time: {showData.show.time}</h3>
                    <h3>Available Seats: {showData.show.totalSeats - showData.show.bookedSeats.length}</h3>
                    <h3>Total Price: ${showData.show.ticketPrice}</h3>
                </Flex>
            </Flex>
            <Divider />
        </Flex>
    );
};

export default BookinigPage;