import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import URLS from "../utils/urls/urls";
import axios from "../Axios/axiosInstance";

const PlacePage = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({
    title: "",
    address: "",
    description: "",
    perks: {},
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    guestCount: "",
  });
  const [link, setLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [myPlaces, setMyPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = async () => {
    try {
      const response = await axios.get(URLS.places);
      if (response.data.statusCode == "200") {
        setMyPlaces(response.data.data);
      }
    } catch (e) {
      console.log("Something went wrong!", e);
    }
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const body = { ...place, photos: addedPhotos };
    try {
      const response = await axios.post(URLS.places, body);
      if (response.data.statusCode == "201") {
        console.log("Posted data successfully");
        navigate(-1);
      }
    } catch (e) {
      console.log("Something went wrong!", e);
    }
  };

  const addPhotoByLink = async (e) => {
    const body = { link };
    e.preventDefault();
    const { data: fileName } = await axiosInstance.post(
      URLS.uploadByLink,
      body
    );
    setAddedPhotos((prev) => [...prev, fileName]);
    setLink("");
  };

  const uploadPhoto = async (e) => {
    const data = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const response = await axiosInstance.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    const { data: fileNames } = response;
    console.log(fileNames);
    setAddedPhotos((prev) => [...prev, ...fileNames]);
  };

  return (
    <>
      {myPlaces &&
        myPlaces.map((place) => {
          return (
            <Link
              to={"/account/places/" + place._id}
              className=" cursor-pointer flex gap-4 mt-4 min-h-40  bg-gray-100 p-4  rounded-2xl"
            >
              <div className=" max-w-64  bg-gray-300 grow shrink-0 ">
                {place.photos.length > 0 && (
                  <img
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt=""
                  />
                )}
              </div>
              <div className=" grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          );
        })}
      <div className="text-center mt-4">
        <Link
          to="/account/places/new"
          className="inline-flex align-middle gap-1 rounded-full bg-pink-500 text-white mt-2 py-2 px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add new place
        </Link>
      </div>
      {action === "new" && (
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-xl my-2">Title</label>
              <p className="text-sm text-gray-500">
                Title for you place. should be short and catchy as in
                advertisement
              </p>
              <input
                type="text"
                placeholder="title, for example My favourite pet"
                value={place.title}
                onChange={(e) => setPlace({ ...place, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xl my-2">Address</label>
              <p className="text-sm text-gray-500">Address to this place</p>
              <input
                type="text"
                placeholder="address"
                value={place.address}
                onChange={(e) =>
                  setPlace({ ...place, address: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xl my-2">Photos</label>
              <p className="text-sm text-gray-500">more=better</p>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                placeholder="Add using a link ...jpg"
                className="!m-0"
              />
              <button
                onClick={addPhotoByLink}
                className=" px-4 rounded-full text-white bg-gray-500 shadow-md "
              >
                Add&nbsp;Photo
              </button>
            </div>

            <div className=" mt-4 grid  gap-2 grid-cols-3 md:grid-cols-4">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => {
                  return (
                    <div key={index} className="h-32 flex ">
                      <img
                        src={"http://localhost:4000/uploads/" + link}
                        alt={link}
                        className=" rounded-2xl w-full object-cover"
                      />
                    </div>
                  );
                })}
              <label className=" h-32 flex cursor-pointer items-center gap-1 justify-center border bg-tranparent rounded-2xl text-gray-600 ">
                <input
                  type="file"
                  onChange={uploadPhoto}
                  placeholder="photo"
                  multiple
                  className="hidden"
                  id="photo"
                  name="photo"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Upload
              </label>
            </div>
            <div className="mt-2">
              <label className=" text-xl ">Description</label>
              <p className="text-sm text-gray-500">Description of the place</p>
              <textarea
                placeholder="Enter description about place"
                className=" outline-none w-full border my-2 py-2 px-3 rounded-2xl shadow-md "
                value={place.description}
                onChange={(e) =>
                  setPlace({ ...place, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className=" text-xl my-2">Perks</label>
              <p className="text-sm text-gray-500 mb-2">
                Select all the perks of your place
              </p>
              <div className=" grid grid-cols-4 gap-3">
                <label className="flex items-center gap-2 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    name="wifi"
                    className="cursor-pointer w-5 h-5"
                    value={place.perks?.wifi}
                    onChange={(e) => {
                      setPlace({
                        ...place,
                        perks: { ...place.perks, wifi: e.target.checked },
                      });
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                    />
                  </svg>

                  <span>Wifi</span>
                </label>
                <label className="flex gap-2 items-center p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    name="tv"
                    className="cursor-pointer w-5 h-5"
                    value={place.perks?.tv}
                    onChange={(e) => {
                      setPlace({
                        ...place,
                        perks: { ...place.perks, tv: e.target.checked },
                      });
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>

                  <span>TV</span>
                </label>
                <label className="flex gap-2 items-center p-3 border rounded-lg ">
                  <input
                    type="checkbox"
                    name="pets"
                    className="cursor-pointer w-5 h-5"
                    value={place.perks?.pets}
                    onChange={(e) => {
                      setPlace({
                        ...place,
                        perks: { ...place.perks, pets: e.target.checked },
                      });
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>

                  <span>Pets</span>
                </label>
                <label className="flex gap-2 items-center p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    name="freeParking"
                    className="cursor-pointer w-5 h-5"
                    value={place.perks?.freeParking}
                    onChange={(e) => {
                      setPlace({
                        ...place,
                        perks: {
                          ...place.perks,
                          freeParking: e.target.checked,
                        },
                      });
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>

                  <span>Free parking spots</span>
                </label>
              </div>
            </div>
            <div>
              <label className=" text-xl my-2">Extra Info</label>
              <p className="text-sm text-gray-500 mb-2">house rules, etc</p>
              <textarea
                placeholder="Enter description about place"
                className=" outline-none w-full border my-2 py-2 px-3 rounded-2xl shadow-md "
                value={place.extraInfo}
                onChange={(e) => {
                  setPlace({ ...place, extraInfo: e.target.value });
                }}
              />
            </div>
            <div>
              <label className=" text-xl my-2">Check in & Out time</label>
              <p className="text-sm text-gray-500 mb-2">
                Add check in and out time, rember to keep some time window for
                cleaning rooms
              </p>
              <div className=" grid sm:grid-cols-3 gap-4">
                <div>
                  <h3>Check in time</h3>
                  <input
                    type="text"
                    placeholder="11:00"
                    value={place.checkIn}
                    onChange={(e) => {
                      setPlace({ ...place, checkIn: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <h3>Check Out time</h3>
                  <input
                    type="text"
                    placeholder="12:00"
                    value={place.checkOut}
                    onChange={(e) => {
                      setPlace({ ...place, checkOut: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <h3>Max number of guests</h3>
                  <input
                    type="text"
                    placeholder="3"
                    value={place.guestCount}
                    onChange={(e) => {
                      setPlace({ ...place, guestCount: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className=" rounded-full bg-blue-300 py-2 px-4 mt-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PlacePage;
