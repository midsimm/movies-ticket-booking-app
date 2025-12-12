import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShow } from "../redux/showSlice";
import { Divider, Flex, Button } from "antd";
import dayjs from "dayjs";
import { makePayment, bookShow} from "../redux/bookingSlice";
import StripeCheckout from "react-stripe-checkout";

const BookShow = () => {
    const dispatch = useDispatch();
    const { data: showData, loading: showLoading, error: showError } = useSelector(state => state.show.singleShow);
    const { data: paymentData, loading: paymentLoading, error: paymentError } = useSelector(state => state.booking.payment);
    const { data: bookingData, loading: bookingLoading, error: bookingError } = useSelector(state => state.booking.newBooking);
    const params = useParams();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        dispatch(getShow({ showId: params.showId }));
    }, [params.showId]);

    useEffect(() => {
        // Reset selected seats when show data changes
        setSelectedSeats([]);
    }, [showData]);

    const Seat = ({ key, seatNumber, isBooked }) => {
        return (
            <Button
                style={{ width: "8px", height: "8px" }}
                key={key}
                onClick={() => {
                    if (isBooked) return;
                    if (selectedSeats.includes(seatNumber)) {
                        setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
                    } else {
                        setSelectedSeats([...selectedSeats, seatNumber]);
                    }
                }}
                disabled={isBooked}
                className={isBooked ? "booked-seat" : selectedSeats.includes(seatNumber) ? "selected-seat" : "available-seat"}
            >
                {seatNumber}
            </Button>
        );
    };

    const RowSeating = ({ key, rowNumber, colLength }) => {
        return (
            <Flex gap="4px" key={key}>
                {[...Array(colLength)].map((_, index) => {
                    const seatNumber = rowNumber * colLength + index + 1;
                    const isBooked = showData.show.bookedSeats.includes(seatNumber);
                    return <Seat key={seatNumber} seatNumber={seatNumber} isBooked={isBooked} />
                })}
            </Flex>
        );
    };

    const ShowSeats = () => {
        const totalSeats = showData.show.totalSeats;

        const columns = 20; // Number of seats per row
        const rows = Math.ceil(totalSeats / columns);

        return (
            <Flex vertical="true" gap="8px">
                {
                    [...Array(rows)].map((_, rowIndex) => (
                        <RowSeating key={rowIndex} rowNumber={rowIndex} colLength={columns} />
                    ))
                }
            </Flex>
        );
    };

    const onToken = async (token) => {
        const paymentResponse = await dispatch(makePayment(
            {
                token: token,
                amount: selectedSeats.length * showData.show.ticketPrice * 100
            }
        )).unwrap();

        if (paymentResponse.success) {
            const bookingResponse = await dispatch(bookShow(
                {
                    show: params.showId,
                    transactionId: paymentResponse.data,
                    seats: selectedSeats,
                }
            )).unwrap();

            if (bookingResponse.success) {
                navigate('/profile/');
            }
        }
    };

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
            <Flex vertical="true" align="center" gap="16px">
                <ShowSeats />
                <>
                    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}>
                        <h1>Selected seats: {selectedSeats.join(", ")}</h1>
                        <h2>Total Price: ${selectedSeats.length * showData.show.ticketPrice}</h2>
                    </div>

                    {selectedSeats.length > 0 && (
                        <StripeCheckout
                            token={onToken}
                            amount={selectedSeats.length * showData.show.ticketPrice * 100}
                            stripeKey="pk_test_51SdDWYDgnElqI3ET71XhODiAFD6t9FlbUu4EH4ZqvfHTs7hXV9QldC8VRrsaQqotMR1g20FITauyM38K7h9uzMVZ008p3pRUCh"
                        >
                            {/* Use this one in some situation=> pk_test_eTH82XLklCU1LJBkr2cSDiGL001Bew71X8  */}
                            <div className="max-width-600 mx-auto">
                                <Button type="primary" shape="round" size="large" block>
                                    Pay Now
                                </Button>
                            </div>
                        </StripeCheckout>
                    )}
                </>
            </Flex>
        </Flex>
    );
};

export default BookShow;