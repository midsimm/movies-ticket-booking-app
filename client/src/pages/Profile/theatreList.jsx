import { Modal, Form, Button, Input, App as AntdApp, Spin, Table } from "antd";
import { useState, useEffect, useMemo } from "react";
import { addTheatre, deleteTheatre, fetchTheatres, updateTheatre } from "../../redux/theatreSlice";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteTheatreModal from "./DeleteTheatreModal";

const TheatreList = () => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => {
        setTheatre(null);
        form.resetFields();
        setIsOpen(true);
    }
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.theatre.singleTheatre);
    const { data: tableData, loading: tableLoading, error: tableError } = useSelector(state => state.theatre.allTheatres);
    const { message } = AntdApp.useApp();
    const [theatre, setTheatre] = useState(null);

    useEffect(() => {
        if(error) {
            message.error("Operation failed.")
        } else if(data) {
            message.success("Operation successful.")
        }
    }, [data, error]);

    useEffect(() => {
        dispatch(fetchTheatres({fetchAllTheatres: false}));
    }, []);

    const dataSource = useMemo(() => {
        if(tableData) {
            return tableData?.theatres.map((theatre => {
                return {
                    key: theatre._id,
                    name: theatre.name,
                    address: theatre.address,
                    email: theatre.email,
                    phone: theatre.phone,
                    isActive: theatre.isActive
                }
            }));
        }
    }, [tableData]);

    if(loading) {
        return (
            <Spin fullscreen />
        );
    }

    const updateTheatreRecord = (record) => {
        openModal();
        setTheatre(record);
        form.setFieldsValue(record);
    };

    const deleteTheatreRecord = (record) => {
        setTheatre(record);
        setIsDeleteModalOpen(true);
    };

    const handleTheatreDelete = () => {
        if(theatre) {
            dispatch(deleteTheatre({...theatre, id: theatre.key}));
            setTheatre(null);
            setIsDeleteModalOpen(false);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (value) => value === true ? "Active" : "Pending/Blocked"
        },
        {
            title: "Action",
            render: (_, record) => (
                <span style={{display: "flex", gap: "8px"}}>
                    <Button 
                        type="primary"
                        onClick={() => updateTheatreRecord(record)}
                        icon={<EditOutlined />}
                    />
                    <Button 
                        type="primary"
                        danger
                        onClick={() => deleteTheatreRecord(record)}
                        icon={<DeleteOutlined />}
                    />
                </span>
            )
        }
    ];

    const handleSubmit = (values) => {
        theatre ? dispatch(updateTheatre({...values, id: theatre.key})) : dispatch(addTheatre(values));
        setTheatre(null);
        form.resetFields();
        closeModal();
    };

    return (
        <>
            <Button type="primary" onClick={openModal}>Add theatre</Button>
            <Modal
                open={isOpen}
                title={theatre ? "Update theatre" : "Add a new theatre"}
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
                            {theatre ? "Update theatre" : "Add theatre"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <DeleteTheatreModal handleTheatreDelete={handleTheatreDelete} isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}/>
            <Table 
                columns={columns}
                dataSource={dataSource}
            />

        </>
    );
};

export default TheatreList;