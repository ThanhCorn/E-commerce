import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getContactById,
  resetState,
  updateContact,
} from "../features/contact/contactSlice";
import { IContact } from "../@types/custom-types";

const ViewContact = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contactById } = useSelector((state: RootState) => state.contacts);

  useEffect(() => {
    if (id) {
      dispatch(getContactById(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const setContactStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value; // Get the selected value from the event
    console.log(selectedValue, contactById?._id);
    const data: IContact = { ...contactById, status: selectedValue };
    console.log(data);
    if (contactById?._id) {
      dispatch(updateContact({ id: contactById._id, data: data }));
      setTimeout(() => {
        navigate(-1);
      }, 200);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-5">View Contact</h3>
        <button
          onClick={goBack}
          className="px-2 py-2 border border-gray-300 rounded-md"
        >
          Go back
        </button>
      </div>
      <div className="bg-white px-5 py-5">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Name:</h3>
          <p className="text-lg font-normal">{contactById?.name}</p>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Phone:</h3>
          <a href="tel" className="text-lg font-normal text-blue-500 underline">
            {contactById?.phone}
          </a>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Email:</h3>
          <a
            href={`mailto:{contactById?.email}`}
            className="text-lg font-normal  text-blue-500 underline"
          >
            {contactById?.email}
          </a>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Comment:</h3>
          <p className="text-lg font-normal">{contactById?.comment}</p>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Status:</h3>
          <p className="text-lg font-normal">{contactById?.status}</p>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-lg font-semibold">Change Status:</h3>
          <div className="">
            <select
              name=""
              id=""
              defaultValue="default"
              onChange={setContactStatus}
              className="border border-gray-300 px-2 py-2 rounded-md"
            >
              <option value="default" selected>
                Selected Status
              </option>

              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
