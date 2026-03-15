import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonarList = () => {
  const [data, setData] = useState([]);

  // GET Donor Records
  const getDonars = async () => {
    try {
      const res = await API.get("/admin/donar-list");

      if (res.data.success) {
        setData(res.data.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this donor?"
      );

      if (!confirmDelete) return;

      const res = await API.delete(`/admin/delete-donar/${id}`);

      if (res.data.success) {
        alert(res.data.message);

        // update list without reload
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h3 className="mb-3">Donor List</h3>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>
                  {record.name
                    ? record.name
                    : `${record.organisationName} (ORG)`}
                </td>

                <td>{record.email}</td>

                <td>{record.phone}</td>

                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DonarList;