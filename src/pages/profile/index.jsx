import React from "react";

const ProfilePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/pet")
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    console.log(fetchData());
    const weeks = groupDatesByWeeks(allActivities);
    setDatesByWeeks(weeks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
