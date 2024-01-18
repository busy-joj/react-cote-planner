import React, { useEffect, useState } from "react";
import axios from "axios";
import Contribution from "../../components/Contribution";
import Table from "../../components/Table";

const ProfilePage = () => {
  const [fetchSolvedProblem, setFetchSolvedProblem] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/pet")
        .then((res) => {
          setFetchSolvedProblem(res.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[1200px] my-0 mx-auto pt-5">
      <Contribution fetchSolvedProblem={fetchSolvedProblem} />
      <Table fetchSolvedProblem={fetchSolvedProblem} />
    </div>
  );
};

export default ProfilePage;
