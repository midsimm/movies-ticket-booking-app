import { Modal, Form, Button, Input } from "antd";
import { useState } from "react";
import { addTheatre } from "../../redux/theatreSlice";
import { useDispatch } from "react-redux";

const TheatreList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(addTheatre(values));
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={openModal}>Add theatre</Button>
            <Modal
                open={isOpen}
                title="Add a new theatre"
                onCancel={closeModal}
                okButtonProps={{style: {display: "none"}}}
                cancelButtonProps={{type: "primary"}}
                cancelText="Close"
            >
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Theatre name"
                        rules={[{ required: true, message: "Theatre name is missing!"}]}
                    >
                        <Input type="text" placeholder="Enter theatre name"/>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Theatre address"
                        rules={[{ required: true, message: "Theatre address is missing!"}]}
                    >
                        <Input.TextArea rows={3} placeholder="Enter theatre address"/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Theatre phone number"
                        rules={[
                            { required: true, message: "Theatre phone number is missing!"}
                        ]}
                    >
                        <Input type="text" placeholder="Enter theatre phone number"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Theatre email"
                        rules={[{ required: true, message: "Theatre email is missing!"}]}
                    >
                        <Input type="text" placeholder="Enter theatre email"/>
                    </Form.Item>
                    <Form.Item style={{display: "flex", justifyContent: "center"}}>
                        <Button type="primary" htmlType="submit">
                            Add theatre
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TheatreList;