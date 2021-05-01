import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAppState } from "../components/AppContext";
import transformEvent from "../lib/transformCalendarEvent";
import { Item } from "../Views/Main";

export const fetchAndTranslate = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { state } = useAppState();
  const { cityId, streetId } = state.location;
  const baseUrL = "https://www.bad-berleburg.de/output/abfall_export.php";
  const url = `${baseUrL}?csv_export=1&mode=vcal&ort=${cityId}&strasse=${
    streetId ? streetId : cityId
  }&1vJ=2021`; // Parameter vMo (von Monat) and bMo (bis Monat) might be helpful here at some point

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((txt) => setItems(transformEvent(txt)));
  }, [url]);

  return items;
};
