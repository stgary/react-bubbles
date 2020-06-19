import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axiosWithAuth()
    .get('/api/colors/')
    .then(res => {
        setColorList(res.data, ...colorList)
    })
    .catch(err => console.log(err))
  }, [refresh]);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} refresh={refresh} setRefresh={setRefresh} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;