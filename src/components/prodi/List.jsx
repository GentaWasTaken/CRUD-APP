import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
export default function List() {
  const [prodi, setProdi] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        setProdi(response.data.result);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDelete = (id, nama) => {
    Swal.fire({
        title: "Apakah anda yakin?",
        text: `Anda akan menghapus fakultas ${nama}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if(result.isConfirmed) {
          axios.delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
        .then(() => {
          setProdi(prodi.filter((f)=> f.id !== id));
          Swal.fire(
            "Deleted!",
            `Fakultas ${nama} berhasil dihapus.`,
            "success"
          );
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
      }
    })
  }
  return (
    <>
    <h1>List fakultas</h1>
       <NavLink to="/prodi/create" className="btn btn-primary my-4 mx-2">Tambah Prodi</NavLink>
       <table className="table table-striped">
         <thead>
             <tr>
                 <th scope="col">nama prodi</th>
                 <th scope="col">nama fakultas</th>
                 <th scope="col">Action</th>
             </tr>
         </thead>
         <tbody>
         {prodi.map((prodi) => (
                 <tr key={prodi.id}>
                     <td>{prodi.nama}</td>
                     <td>{prodi.fakultas.nama}</td>
                     <div className="btn-group" role ='group' aria-label="Action buttons">
                     <td><NavLink to={`/prodi/edit/${prodi.id}`} className="btn btn-warning">Edit</NavLink></td>
                     <button onClick={() => handleDelete(prodi.id, prodi.nama)} className="btn btn-danger">Delete</button>
                     </div>
                     
                 </tr>
             ))}
             
         </tbody>

         </table>
    </>
  );
}
