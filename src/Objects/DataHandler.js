const axios = require("axios").default;

/* TÄMÄ TIEDOSTO SISÄLTÄÄ JSON-SERVERIN KANSSA KÄYTETTÄVIÄ ERILAISIA AXIOS POHJAISIA KUTSUJA */

/*TÄLLÄ HAETAAN HAKUSIVUSTOLTA KORTTEJA HALUTULLA HAKUSANALLA.
JSON-SERVERILLÄ EI OLE OR-QUERYJÄ, JOTEN HAETAAN KAIKISTA MAHDOLLISISTA PARAMETREISTÄ HALUTULLA HAKUSANALLA. POISTETAAN HAUSTA KUITENKIN NE, JOTKA ON MERKATTU VALMIIKSI */
export const fetchSearchFilter = async (searchTag) => {
  try {
    let data = await axios.get("http://localhost:3010/cards", {
      params: {
        q: searchTag,
        isCompleted: 0,
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

/*TÄLLÄ HAETAAN, KUN PAINETAAN PÄÄSIVULLA TAGIA. HAETAAN KAIKKI KORTIT JOISSA ON KÄYTÖSSÄ SAMA TAGI, MUTTA EI MERKATTU VALMIIKSI */
export const fetchTagFilter = async (tag) => {
  try {
    let data = await axios.get("http://localhost:3010/cards", {
      params: {
        tags: tag,
        isCompleted: 0,
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

/*TÄTÄ KÄYTETÄÄN PÄÄSIVULLA KOLUMNIEN KORTTIEN HAKEMISEEN. PARAMETRI COLUMNID ON SE, MIKÄ KOLUMNISSA ON VALITTUNA.
ENSIKSI HAETAAN KOLUMNIT LISTASTA KYSEISEN KOLUMNIN JÄRJESTYS, SITTEN KYSEISET KORTIT, SEN JÄLKEEN KORTIT JÄRJESTETÄÄN HAETTUUN JÄRJESTYKSEEN JA LÄHETETÄÄN PÄÄSIVULLE*/
export const fetchCards = async (columnid) => {
  try {
    const columns = await axios.get(
      `http://localhost:3010/columns/${columnid}`
    );
    let data = await axios.get("http://localhost:3010/cards", {
      params: {
        columnid: columnid,
      },
    });

    if (data.data !== null) {
      if (columns.data.order !== null) {
        var newOrder = data.data;
        newOrder.sort(
          (a, b) =>
            columns.data.order.indexOf(a.id) - columns.data.order.indexOf(b.id)
        );
      }
      return newOrder;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

/*TÄTÄ KÄYTETÄÄN KUN LUODAAN UUSI KORTTI JA PAINETAAN MODALISTA LUO NÄPPÄINTÄ.
KERÄTÄÄN DATA KASAAN JA LUODAAN POST-KOMENNOLLA UUSI KORTTI KORTIT-LISTAAN. */
export const updCards = async (newTitle, newText, newTag, newColumnid) => {
  try {
    let res = await axios.post("http://localhost:3010/cards", {
      title: newTitle,
      text: newText,
      tags: newTag,
      curDate: new Date().toLocaleString(),
      columnid: newColumnid,
      isCompleted: 0,
    });
    return res.data.id;
  } catch (err) {
    console.log(err);
  }
};

/*TÄTÄ KÄYTETÄÄN KUN POISTETAAN KORTTI PAINAMALLA PUNAISTA POISTA KORTTI NÄPPÄINTÄ.
YKSINKERTAINEN DELETE-KOMENTO RIITTÄÄ, JA HALUTTU KORTTI HAETAAN ID:LLÄ */
export const deleteCards = async (id) => {
  try {
    let res = axios.delete(`http://localhost:3010/cards/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
/*TÄTÄ KÄYTETÄÄN KUN MERKATAAN KORTTI VALMIIKSI PAINAMALLA VIHREÄÄ TEHTÄVÄ VALMIS NÄPPÄINTÄ.
YKSINKERTAINEN PATCH-KOMENTO RIITTÄÄ, JOSSA VAIHDETAAN COLUMNIN ID 0 (VALMIIT-KOLUMNI JA ISCOMPLETED MERKATAAN 1)JA HALUTTU KORTTI HAETAAN ID:LLÄ */
export const setCompleted = async (id) => {
  try {
    let res = axios.patch(`http://localhost:3010/cards/${id}`, {
      columnid: 0,
      isCompleted: 1,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

/*KUN KORTTIA PÄIVITETÄÄN JA MODALISTA PAINETAAN TALLENNA NÄPPÄINTÄ, TULLAAN TÄHÄN FUNKTIOON, JOSSA HAETAAN HALUTTU KORTTI ID:N AVULLA JA PÄIVITETTÄÄN PATCH-KOMENNOLLA SEN TIEDOT */
export const updCard = async (
  id,
  newTitle,
  newText,
  newTag,
  newDate,
  newColumnid
) => {
  console.log("HERE3");
  try {
    axios.patch(`http://localhost:3010/cards/${id}`, {
      title: newTitle,
      text: newText,
      tags: newTag,
      curDate: newDate,
      columnid: newColumnid,
    });
  } catch (err) {
    console.log(err);
  }
};

//PÄIVITETÄÄN KORTIN KOLUMNIN ID KUN SIIRRETÄÄN KORTTIA KOLUMISTA TOISEEN
export const updColumnId = async (newId, id) => {
  try {
    axios.patch(`http://localhost:3010/cards/${id}`, {
      columnid: newId,
    });
  } catch (err) {
    console.log(err);
  }
};

/*TÄLLÄ LUODAAN UUSI KOLUMNI KUN COLUMNHANDLERISSA PAINETAAN LUO-NÄPPÄINTÄ*/
export const setColumn = async (newName) => {
  try {
    let res = await axios.post("http://localhost:3010/columns", {
      name: newName,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

/*TÄLLÄ HAETAAN KAIKKI KOLUMNIT-LISTASTA LÖYTYVÄT ERI KOLUMNIVAIHTOEHDOT TÄTÄ KÄYTETÄÄN MM. MAINPAGELLA, COLUMNHANDLERISSA JA MODALISSA */
export const getColumns = async () => {
  try {
    let data = await axios.get("http://localhost:3010/columns");
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

/*TÄLLÄ POISTETAAN COLUMNHANDLERISSA POISTA-NÄPPÄINTÄ KÄYTTÄEN HALUTTU KOLUMNI. HALUTTU KOLUMNI ETITÄÄN ID:N AVULLA */
export const deleteColumn = async (id) => {
  try {
    await axios.delete(`http://localhost:3010/columns/${id}`);
    let reset = await setDefaultColumn(id); //JOS LÖYTYY KORTTEJA TÄLLÄ ID:LLÄ, VAIHDETAAN NE OSOITTAMAAN UUDET-KOLUMNIIN
    return reset;
  } catch (err) {
    console.log(err);
  }
};

/*KUN POISTETAAN KOLUMNI JONKA ID:LLÄ LÖYTYY KORTTEJA, NIIN VAIHDETAAN NIITTEN COLUMNID UUDET-KOLUMNIIN JOTTA NE JÄÄVÄT VIELÄ KÄYTETTÄVIKSI. */
const setDefaultColumn = async (id) => {
  let cards = await fetchCards(id);

  cards.forEach((card) => {
    try {
      axios.patch(`http://localhost:3010/cards/${card.id}`, {
        columnid: 1,
      });
    } catch (err) {
      console.log(err);
    }
    return "DONE";
  });
};

/*TÄLLÄ PÄIVITETÄÄN KORTTIEN JÄRJESTYS KOLUMNIEN SISÄLLÄ. TÄTÄ KUTSUTAAN MAINPAGELLA AINA KUN SIELLÄ MUUTTUU JÄRJESTYS. HAETAAN HALUTTU KOLUMNI ID:N AVULLA JA ORDERARRAY SISÄLTÄÄ HALUTUN UUDEN JÄRJESTYKSEN. */
export const updOrder = async (id, orderArray) => {
  try {
    axios.patch(`http://localhost:3010/columns/${id}`, {
      order: orderArray,
    });
  } catch (err) {
    console.log(err);
  }
  return "Success";
};

export const fetchColState = async (colName) => {
  try {
    const curCol = await axios.get(`http://localhost:3010/curState/${colName}`);
    return curCol.data.curCol;
  } catch (err) {
    console.log(err);
  }
};

export const udpColState = async (colName, newId) => {
  try {
    await axios.patch(`http://localhost:3010/curState/${colName}`, {
      curCol: newId,
    });
  } catch (err) {
    console.log(err);
  }
};
