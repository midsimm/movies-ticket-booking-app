import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie } from "../../redux/movieSlice";


const DeleteMovieModal = ({ selectedMovie, setSelectedMovie, isModalOpen, openModal, closeModal }) => {
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector(state => state.movie.singleMovie);

    return (
        <Modal
            title="Delete movie"
            open={isModalOpen}
            okText="Delete"
            onCancel={closeModal}
            onOk={async () => {
                const result = await dispatch(deleteMovie({_id: selectedMovie}));
                if(deleteMovie.fulfilled.match(result)) {
                    closeModal();
                    setSelectedMovie(null);
                }
            }}
            okButtonProps={{
                autoFocus: true, 
                danger: true,
                loading: loading
            }}
        >
            Warning: Once you delete this movie the action is irreversible.
        </Modal>
    );
};

export default DeleteMovieModal;