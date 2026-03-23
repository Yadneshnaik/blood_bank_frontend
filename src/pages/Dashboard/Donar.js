import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Donar = () => {
  const [data, setData] = useState([]);
  const [editingDonor, setEditingDonor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // GET DONORS
  const getDonars = async () => {
    try {
      const res = await API.get("/inventory/get-donars");

      if (res.data.success) {
        setData(res.data.donars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);


  return (
    <Layout>
      <div className="container">

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.name || record.organisationName + " (ORG)"}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </Layout>
  );
};

export default Donar;