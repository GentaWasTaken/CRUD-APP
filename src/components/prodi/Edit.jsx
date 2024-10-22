import {useState, useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";

import axios from "axios";

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nama, setNama] = useState(""); 
    const [fakultasList, setFakultasList] = useState([]);
    const [fakultasId, setFakultasId] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchfakultas = async () => {
            try {
                const response = await axios.get(
                  "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
              } catch (ex) {
                setError("Failed to fetch fakultas " + ex.message);
  
            }
        };
        fetchfakultas();
  },[]);

    useEffect(() => {
        axios
            .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
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
        axios.patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, {
            nama: nama,
            fakultas_id: fakultasId
        })
        .then(() => {
            navigate("/prodi");
        })
        .catch((error) => {
            console.error("error updating data: ", error);
            setError("gagal menyimpan data");
        });
    };


    return (
        <div className="mx-2">
            <h2 className="my-2">Edit Prodi</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Prodi</label>
                    <input type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleChange}
                    required />
                </div>
                <div className="mb-3">
            <label className="form-label">
              Fakultas
            </label>
           <select className="form-select" id="fakultasid" 
           value={fakultasId}
           onChange={(e) => setFakultasId(e.target.value)}
           >
            <option value="">Select</option>
            {fakultasList.map((fakultas) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {fakultas.nama}
                </option>
            ))}
           </select>
          </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}