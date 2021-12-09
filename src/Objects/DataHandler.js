const axios = require("axios").default;

export const fetchCards = async (columnid) => {
  try {
    let data = await axios.get("http://localhost:3010/cards", {
      params: {
        columnid: columnid,
      },
    });
    if (data.data !== null) {
      return data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

export const updCards = async (newTitle, newText, newTag) => {
  try {
    const thisCreateDate = new Date();
    let res = await axios.post("http://localhost:3010/cards", {
      title: newTitle,
      text: newText,
      tags: newTag,
      curDate: thisCreateDate,
      columnid: 0,
    });
    return res.data.id;
  } catch (err) {
    console.log(err);
  }
};

export const getColumns = async () => {
  try {
    let data = await axios.get("http://localhost:3010/columns");
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCards = async (id) => {
  try {
    let res = axios.delete(`http://localhost:3010/cards/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const setCompleted = async (id) => {
  try {
    let res = axios.patch(`http://localhost:3010/cards/${id}`, {
      columnid: 1,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updCard = async (id, newTitle, newText, newTag, newDate) => {
  try {
    let res = axios.patch(`http://localhost:3010/cards/${id}`, {
      title: newTitle,
      text: newText,
      tags: newTag,
      curDate: newDate,
    });
  } catch (err) {
    console.log(err);
  }
};
