import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../redux/movieSlice";

const AddMovieModal = ({ selectedMovie, setSelectedMovie, isModalOpen, openModal, closeModal, isEditMode, form }) => {
    const dispatch = useDispatch();
    const modalTitle = isEditMode ? "Update the movie" : "Add a new movie";
    const buttonText = isEditMode ? "Update" : "Add";

    const onFinish = (values) => {
        values.releaseDate = values.releaseDate.toDate();
        console.log(values);
        isEditMode ? dispatch(updateMovie({...values, _id: selectedMovie})) : dispatch(addMovie(values));
        setSelectedMovie(null);
        closeModal();
    };

    return (
        <Modal 
            title={modalTitle}
            open={isModalOpen} 
            onCancel={closeModal}
            okButtonProps={{style: {"display": "none"}}}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    name="title"
                    label="Movie title"
                    rules={[{required: true, message: "Missing movie title"}]}
                >
                    <Input type="text" placeholder="Enter movie title" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Movie description"
                    rules={[{required: true, message: "Missing movie description"}]}
                >
                    <Input.TextArea placeholder="Enter movie description" />
                </Form.Item>
                <Form.Item
                    name="poster"
                    label="Movie poster"
                    rules={[{required: true, message: "Missing movie poster"}]}
                >
                    <Input type="text" placeholder="Enter movie poster url" />
                </Form.Item>
                <Form.Item
                    name="releaseDate"
                    label="Movie release date"
                    rules={[{required: true, message: "Missing movie release date"}]}
                >
                    <DatePicker className="w-100"/>
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="Movie duration"
                    rules={[{required: true, message: "Missing movie duration"}]}
                >
                    <Input type="text" placeholder="Enter movie duration in minutes" />
                </Form.Item>
                <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[{required: true, message: "Missing movie genre"}]}
                >
                    <Select 
                        placeholder="Select atleast one genre" 
                        mode="multiple" 
                        options={[
                            {"label": "Action", "value": "action"},
                            {"label": "Comedy", "value": "comedy"},
                            {"label": "Horror", "value": "horror"},
                            {"label": "Adult", "value": "adult"}
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="language"
                    label="Language"
                    rules={[{required: true, message: "Missing movie language"}]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select atleast one language"
                        options={[
                            {label: "Punjabi", value: "punjabi"},
                            {label: "Hindi", value: "hindi"},
                            {label: "English", value: "english"},
                            {label: "Tamil", value: "tamil"}
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {buttonText}
                    </Button>
                    <button type="submit" style={{display: "none"}} />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddMovieModal;