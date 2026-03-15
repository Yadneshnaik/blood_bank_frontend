import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const OrgList = () => {
  const [data, setData] = useState([]);

  // GET ORGANISATION LIST
  const getOrgs = async () => {
    try {
      const res = await API.get("/admin/org-list");

      if (res.data.success) {
        setData(res.data.orgData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrgs();
  }, []);

  // DELETE ORGANISATION
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this organisation?"
      );

      if (!confirmDelete) return;

      const res = await API.delete(`/admin/delete-donar/${id}`);

      if (res.data.success) {
        alert(res.data.message);

        // Update UI without reload
        setData(data.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h3 className="mb-3">Organisation List</h3>

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
                <td>{record.organisationName}</td>
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

            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No Organisations Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrgList;