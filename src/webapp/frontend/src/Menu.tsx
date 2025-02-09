import React from "react";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const menuItems = [
    { id: "home", label: "Home", link: "/" },
    { id: "list", label: "List", link: "/list" },
    { id: "add", label: "Add", link: "/add" },
  ];
  const navigate = useNavigate();

  return (
    <ul className="flex space-x-4">
      {menuItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => {
              navigate(item.link);
            }}
            className={`px-3 py-2 rounded-md bg-blue-700`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
