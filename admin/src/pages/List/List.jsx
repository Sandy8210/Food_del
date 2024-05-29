import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminListData } from "../../utills/AdminListData";
import { FaTimes } from "react-icons/fa";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/delete`, {
      id: foodId,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex_col">
      <p>All Foods List</p>
      <div className="list_table">
        <div className="list_table_format title">
          {AdminListData.map((item, index) => (
            <b key={index}>{item.name}</b>
          ))}
        </div>

        {list.map((item, index) => (
          <div key={index} className="list_table_format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              <FaTimes />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
