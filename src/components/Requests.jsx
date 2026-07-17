import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className=" my-10">
      <h1 className="text-bold text-center text-2xl">Requests</h1>
      <div className="flex flex-col items-center gap-5 mt-5">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div key={_id}>
              <ul className="list bg-base-200 rounded-box shadow-md mt-2 w-200 ">
                <li className="list-row mx-5 shadow-xl">
                  <div>
                    <img className="size-10 rounded-box" src={photoUrl} />
                  </div>
                  <div>
                    <div>{firstName + " " + lastName}</div>
                    {(age || gender) && (
                      <div className="text-xs uppercase font-semibold opacity-60">
                        {age + ", " + gender}
                      </div>
                    )}
                  </div>
                  <p className="list-col-wrap text-xs ">{about}</p>
                  <div className="card-actions justify-center my-2 ">
                    <button className="btn btn-primary mx-2">Accept</button>
                    <button className="btn btn-error mx-2">Reject</button>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
