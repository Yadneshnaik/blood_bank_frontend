import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospitals = () => {
  const [data, setData] = useState([]);

  // GET HOSPITAL RECORDS
  const getHospitals = async () => {
    try {
      const res = await API.get("/inventory/get-hospitals");

      if (res.data.success) {
        setData(res.data.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <div className="container">
        <h3 className="mb-3">Hospitals</h3>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No Hospitals Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Hospitals;