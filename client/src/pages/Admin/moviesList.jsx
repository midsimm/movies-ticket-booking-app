
import AddMovieModal from "./addMovieModal";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "../../redux/movieSlice";
import MoviesTable from "./moviesTable";
import DeleteMovieModal from "./deleteMovieModal";


const MoviesList = () => {
    const dispatch = useDispatch();
    const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false);
    const [isDeleteMovieModalOpen, setIsDeleteMovieModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        dispatch(fetchAllMovies());
    }, []);

    return (
        <>
            <Button type="primary" onClick={() => {
                setIsAddMovieModalOpen(true);
                setIsEditMode(false);
                form.resetFields();
            }}>
                Add movie
            </Button>
            <MoviesTable setSelectedMovie={setSelectedMovie} form={form} openAddMovieModal={() => setIsAddMovieModalOpen(true)} openDeleteMovieModal={() => setIsDeleteMovieModalOpen(true)} setIsEditMode={setIsEditMode}/>
            <AddMovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} isEditMode={isEditMode} form={form} isModalOpen={isAddMovieModalOpen} openModal={() => setIsAddMovieModalOpen(true)} closeModal={() => setIsAddMovieModalOpen(false)} />
            <DeleteMovieModal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} isModalOpen={isDeleteMovieModalOpen} openModal={() => setIsDeleteMovieModalOpen(true)} closeModal={() => setIsDeleteMovieModalOpen(false)} />
        </>
    );
};

export default MoviesList;