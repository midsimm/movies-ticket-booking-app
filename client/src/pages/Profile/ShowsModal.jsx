import { Modal, Button, Table, Form, Input, DatePicker, Select, Flex, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMovies } from "../../redux/movieSlice";
import { getAllShowsForTheatreId, addShowByTheatreId, updateShow, deleteShow } from "../../redux/showSlice";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


const ShowsModal = ({isModalOpen, closeModal, theatreId}) => {
    const ShowModalStateConst = {
        LIST: "list",
        ADD: "add",
        EDIT: "edit",
        DELETE: "delete",
    };
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(ShowModalStateConst.LIST);
    const [form] = Form.useForm();
    const {data, error, loading } = useSelector(state => state.movie.allMovies)
    const { data: showsData, error: showsError, loading: showsLoading } = useSelector(state => state.show.allShows);
    const moviesList = data?.movies;
    const showsList = showsData?.shows;
    const [selectedShow, setSelectedShow] = useState(null);

    useEffect(() => {
        if(!data && loading === false && isModalOpen) {
            dispatch(fetchAllMovies());
        };
    }, [isModalOpen]);

    useEffect(() => {
        if(!showsData && showsLoading === false && isModalOpen) {
            dispatch(getAllShowsForTheatreId({theatreId: theatreId}));
        }
    }, [isModalOpen])

    const ShowForm = () => {
        const onFinish = (values) => {
            modalState === ShowModalStateConst.EDIT ? 
                dispatch(updateShow({...values, date: values.date.format("YYYY-MM-DD"), showId: selectedShow.key, movie: movieOptions.filter(movie => movie.label === selectedShow.movie)[0].value})) :
                dispatch(addShowByTheatreId({...values, date: values.date.format("YYYY-MM-DD"), theatre: theatreId}));

            setModalState(ShowModalStateConst.LIST);
        };

        const movieOptions = moviesList?.map(movie => {
            return { label : movie.title, value: movie._id}  
        }) || [];

        const timeOptions = [
            {label: "10:00", value: "10:00"},
            {label: "14:00", value: "14:00"},
            {label: "19:00", value: "19:00"}
        ];

        const onMovieChange = (movie) => {
            console.log(movie);
        };
        const onTimeChange = (time) => {
            console.log(time);
        }

        if(modalState === ShowModalStateConst.EDIT && selectedShow) {
            form.setFieldsValue({ ...selectedShow, date: dayjs(selectedShow.date)});
        }
        return (
            <>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Show name"
                        name="name"
                        rules={[{required: true, missing: "Missing show name"}]}
                    >
                        <Input type="text" placeholder="Enter show name"/>
                    </Form.Item>
                    <Form.Item
                        label="Movie name"
                        name="movie"
                        rules={[{required: true, missing: "Missing movie name"}]}
                    >
                        <Select 
                            options={movieOptions}
                            onChange={onMovieChange}  
                            placeholder="Select a movie"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Show date"
                        name="date"
                        rules={[{type: "object", required: true, message: "Missing date"}]}
                    >
                        <DatePicker 
                            placeholder="Select a date"
                            disabledDate={current => current && current < dayjs().startOf("day")}
                            />
                    </Form.Item>
                    <Form.Item
                        label="Show time"
                        name="time"
                        rules={[{required: true, missing: "Missing time"}]}
                    >
                        <Select 
                            options={timeOptions}
                            onChange={onTimeChange}
                            placeholder="Select a time"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ticket price"
                        name="ticketPrice"
                        rules={[
                            {type: "number", required: true, missing: "Missing ticket price"},
                            {validator: (_, value) => {
                                if(!value) return Promise.resolve(); // the required rules handles this
                                if(isNaN(value)) return Promise.reject("Enter a valid number");
                                if(Number(value) <= 0) return Promise.reject("Enter a positive number");

                                return Promise.resolve();
                            }}
                        ]}
                    >
                        <InputNumber placeholder="Enter ticket price" min={1} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item
                        label="Total seats"
                        name="totalSeats"
                        rules={[
                            {type: "number", required: true, missing: "Missing total seats"},
                            {validator: (_, value) => {
                                if(!value) return Promise.resolve(); // the required rules handles this
                                if(isNaN(value)) return Promise.reject("Enter a valid number");
                                const num = Number(value)
                                if(num <= 0) return Promise.reject("Enter a positive number");
                                if(!Number.isInteger(num)) return Promise.reject("Decimals not allowed")
                                return Promise.resolve();
                            }}
                        ]}
                    >
                        <InputNumber placeholder="Enter total seats" min={1} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            {modalState === ShowModalStateConst.ADD ? "Add show" : "Update show"}
                        </Button>
                    </Form.Item>
                </Form>
                <Button
                    onClick={() => setModalState(ShowModalStateConst.LIST)}
                >
                    Go back
                </Button>
            </>
        );
    };

    const ShowList = () => {
        const columns = [
            {
                title: "Name",
                dataIndex: "name",
            },
            {
                title: "Date",
                dataIndex: "date",
            },
            {
                title: "Time",
                dataIndex: "time",
            },
            {
                title: "Movie",
                dataIndex: "movie",
            },
            {
                title: "Ticket Price",
                dataIndex: "ticketPrice",
            },
            {
                title: "Total Seats",
                dataIndex: "totalSeats",
            },
            {
                title: "Booked Seats",
                dataIndex: "bookedSeats",
            },
            {
                title: "Action",
                render: (_, record) => {
                    return (
                        <Flex gap="8px">
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setSelectedShow(record);
                                    setModalState(ShowModalStateConst.EDIT);
                                }}
                            />
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => {
                                    setSelectedShow(record);
                                    setModalState(ShowModalStateConst.DELETE);
                                }}
                            />
                        </Flex>
                    );
                }
            }
        ];

        const dataSource = showsList?.map(show => {
            return {
                key: show._id,
                name: show.name,
                date: dayjs(show.date)?.format("YYYY-MM-DD"),
                time: show.time,
                movie: show.movie?.title,
                totalSeats: show.totalSeats,
                bookedSeats: show.bookedSeats?.length,
                ticketPrice: show.ticketPrice,
            }
        }) ?? [];
        

        return (
            <>
                <Button
                    type="primary"
                    onClick={() => setModalState(ShowModalStateConst.ADD)}
                >
                    Add show
                </Button>
                <Table 
                    columns={columns}
                    dataSource={dataSource}
                />
            </>
        );
    };

    const DeleteShow =() => {
        return (
            <>
                <h1>Delete show</h1>
                <p>Deleting the show is an irreversible action. Proceed with caution!</p>
                <Button 
                    danger
                    type="primary"
                    style={{display: "block"}}
                    onClick={() =>  {
                        dispatch(deleteShow({showId: selectedShow.key}));
                        setModalState(ShowModalStateConst.LIST);
                    }}
                >
                    Delete show
                </Button>
                <Button
                    onClick={() => setModalState(ShowModalStateConst.LIST)}
                >
                    Go back
                </Button>
            </>
        )
    }

    let modalTitle, modalContent;
    if(modalState === ShowModalStateConst.ADD) {
        modalTitle = "Add show";
        modalContent = <ShowForm />;
    } else if(modalState === ShowModalStateConst.EDIT) {
        modalTitle = "Edit show";
        modalContent = <ShowForm />;
    } else if(modalState === ShowModalStateConst.DELETE) {
        modalTitle = "Delete show";
        modalTitle = <DeleteShow />;
    } else {
        modalTitle = "List of shows";
        modalContent = <ShowList />;
    }


    return (
        <Modal
            open={isModalOpen}
            width={1200}
            onCancel={closeModal}
            title={modalTitle}
            footer={null}
        >
            {
                modalContent
            }
        </Modal>
    );
};

export default ShowsModal;