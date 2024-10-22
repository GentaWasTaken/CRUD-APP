import {useState} from "react";
import axios from "axios";


export default function Create() {
    const [namaFakultas, setNamaFakultas] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        setError("");
        setSuccess("");
      
        if (namaFakultas.trim() === "") {
          setError("Nama Fakultas is required");
          return;
        }
      
        try {
            const response = await axios.post(
              "https://project-apiif-3-b.vercel.app/api/api/fakultas",
              {
                nama: namaFakultas,
              }
            );
          
            if (response.status === 201) {
              setSuccess("Fakultas created successfully!");
              setNamaFakultas("");
            } else {
              setError("Failed to create fakultas");
            }
          } catch (error) {
            setError("An error occurred while creating fakultas " + error.message);
          }
      };
    return (
        <>
            <div className="container mt-5">
            <h2>Create Fakultas</h2>

            {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                {/* Tangani event submit dengan handleSubmit */}
                <label className="form-label">
                    Nama Fakultas
                </label>

                {/* Input untuk nama fakultas dengan class bootstrap */}
                <input
                    type="text"
                    className="form-control"
                    id="namaFakultas"
                    value={namaFakultas}
                    onChange={(e) => setNamaFakultas(e.target.value)}
                    placeholder="Enter Fakultas Name"
                />
                </div>

                <button type="submit" className="btn btn-primary">
                Create
                </button>
            </form>
            </div>
        </>
    );
}