import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Contribution from "@/components/Contribution";
import Table from "@/components/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [fetchSolvedProblem, setFetchSolvedProblem] = useState();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8080/pet?id=${userState.userID}`)
        .then((res) => {
          const data = res.data;
          const newData = data.reduce((acc, cur) => {
            let existingIndex = acc.findIndex(
              (obj) =>
                obj.problemNum === cur.problemNum &&
                obj.language === cur.language
            );
            if (existingIndex >= 0) {
              acc[existingIndex].solvedTime.push(cur.solvedTime);
            } else {
              acc.push({
                problemNum: cur.problemNum,
                problemLink: cur.problemLink,
                language: cur.language,
                solvedTime: new Array(cur.solvedTime),
              });
            }
            return acc;
          }, []);
          setFetchSolvedProblem(newData);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[1200px] my-0 mx-auto pt-[60px]">
      <Contribution fetchSolvedProblem={fetchSolvedProblem} />
      <Table fetchSolvedProblem={fetchSolvedProblem} />
    </div>
  );
};

export default ProfilePage;
