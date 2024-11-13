import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between ">
        <a href="" className="flex gap-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#f5385d"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="  font-bold text-2xl text-red-500 ">airbnb</span>
        </a>
        <div className="flex justify-evenly gap-4">
          <div className=" font-bold">Stays</div>
          <div>Experiences</div>
          <div>Online Experiences</div>
        </div>
        <div className="flex items-center  justify-evenly gap-3">
          <div className=" font-medium">Airbnb your home</div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <div className="flex border rounded-full p-3 gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <Link to={"/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fill="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex justify-center">
        <div className=" flex py-2 px-4 gap-20 border rounded-full  shadow-md">
          <div className="">
            <div>Where</div>
            <div>Search destinations</div>
          </div>
          <div className="  border-r-2 "></div>
          <div>
            <div>Check in</div>
            <div>Add dates</div>
          </div>
          <div className="  border-r-2"></div>
          <div>
            <div>Check out</div>
            <div>Add dates</div>
          </div>
          <div className="  border-r-2 "></div>
          <div>
            <div>Who</div>
            <div>Add Guests</div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill=" #f5385d  "
              className="w-10 h-10"
            >
              <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="border-b-2 my-6  "></div>
    </>
  );
};

export default Header;
