import {useState, useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

import axios from "axios";

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
            .then((response) => {
                setNama(response.data.result.nama);
            })
            .catch((error) => {
                console.error("error fetching data : " ,error);
                setError("data tidak ditemukan : ");
            });

    }, [id]);

    const handleChange = (e) => {
        setNama(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, {nama})
        .then(() => {
            navigate("/fakultas");
        })
        .catch((error) => {
            console.error("error updating data : " ,error);
            setError("gagal menyimpan data : ");
        });
    };
    return (
        <div className="mx-2">
            <h2 className="my-2">Edit fakultas</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Fakultas</label>
                    <input type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleChange}
                    required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
    

}