  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import Spinner from "../components/shared/Spinner";
  import Layout from "../components/shared/Layout/Layout";
  import Modal from "../components/shared/modal/Modal";
  import API from "../services/API";
  import moment from "moment";

  const HomePage = () => {
    const { loading, error, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Get Blood Records
    const getBloodRecords = async () => {
      try {
        const res = await API.get("/inventory/get-inventory");

        if (res.data.success) {
          setData(res.data.inventory);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getBloodRecords();
    }, []);

    return (
      <Layout>
        {user?.role === "admin" && navigate("/admin")}
        {error && <span>{alert(error)}</span>}

        {loading ? (
          <Spinner />
        ) : (
          <div className="container">

            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i>
              Add Inventory
            </h4>

            <table className="table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Inventory Type</th>
                  <th>Quantity</th>
                  <th>Donor Email</th>
                  <th>Time & Date</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal />

          </div>
        )}
      </Layout>
    );
  };

  export default HomePage;