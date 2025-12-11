import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

const TheatreWithShows = ({ data }) => {
    const navigate = useNavigate();

    const goToShowBooking = (showId) => {
        navigate(`/booking/${showId}`);
    };
    
    return (
        <Flex vertical={true} gap="16px">
            {
                Object.entries(data?.shows).map(([theatreName, showsList]) => (
                    <Flex key={theatreName} style={{width: "480px"}} gap="32px" align="center">
                        <span style={{width: "200px"}}>
                            {theatreName}
                        </span>
                        <Flex gap="16px">
                            {showsList.map(show => (
                                <Button 
                                    key={show._id}
                                    onClick={() => goToShowBooking(show._id)}
                                    >
                                    {show.time}
                                </Button>
                            ))}
                        </Flex>
                    </Flex>
                ))
            }
        </Flex>
    );
};

export default TheatreWithShows;