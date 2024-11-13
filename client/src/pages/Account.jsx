import { Link, useParams } from "react-router-dom";
import PlacePage from "./placePages";

const Account = () => {
  const MY_ACCOUNT = [
    {
      id: 1,
      name: "My profile",
      href: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "My bookings",
      href: "bookings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "My accommodations",
      href: "places",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  let { subpage } = useParams();
  if (subpage == undefined) {
    subpage = "";
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6 bg-gray-100 rounded-full";
    if (type == subpage) {
      classes += " !bg-red-500 text-white";
    }

    return classes;
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        {MY_ACCOUNT.map(({ id, name, href, icon }) => {
          return (
            <Link
              key={id}
              className={linkClasses(href)}
              to={`/account/${href}`}
            >
              <div className="flex  ">
                <div className="mr-2">{icon}</div>
                <div>{name}</div>
              </div>
            </Link>
          );
        })}
      </nav>
      {subpage == "places" && <PlacePage />}
    </div>
  );
};

export default Account;
