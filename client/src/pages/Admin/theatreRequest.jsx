import { Table, App as AntdApp, Button } from "antd";
import { updateTheatre, fetchTheatres } from "../../redux/theatreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const TheatreRequest = () => {
    const dispatch = useDispatch();
    const { data: allData, loading: allLoading, error: allError } = useSelector(state => state.theatre.allTheatres);
    const { data: singleData, loading: singleLoading, error: singleError } = useSelector(state => state.theatre.singleTheatre);

    useEffect(() => {
        dispatch(fetchTheatres({ fetchAllTheatres: true }))
    }, []);

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
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (value) => (
                value === true ? "Approved" : "Blocked/Pending"
            )
        },
        {
            title: "Action",
            render: (_, record) => {
                const isActive = record.isActive;
                const text = isActive ? "Block" : "Approve";
                
                return (
                    <Button onClick={() => dispatch(updateTheatre({ isActive: !isActive, id: record.key }))}>
                        {text}
                    </Button>
                )
            }
        }
    ];

    const dataSource = allData?.theatres.map(theatre => {
            return {
                key: theatre._id,
                name: theatre.name,
                address: theatre.address,
                phone: theatre.phone,
                email: theatre.email,
                isActive: theatre.isActive,
            };
        });
    return (
        <Table columns={columns} dataSource={dataSource} />
    );
};

export default TheatreRequest;