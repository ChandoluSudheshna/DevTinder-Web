import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">No Connections Found</h1>;

  return (
    <div className=" my-10">
      <h1 className="text-bold text-center text-2xl">My Connections</h1>
      <div className="flex flex-col items-center gap-5 mt-5">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div key={_id}>
              <ul className="list bg-base-200 rounded-box shadow-md mt-2 w-200 ">
                <li className="list-row mx-5 shadow-xl">
                  <div>
                    <img className="size-10 rounded-box" src={photoUrl} />
                  </div>
                  <div>
                    <div>{firstName + " " + lastName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age && gender && age + ", " + gender}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">{about}</p>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
