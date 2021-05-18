import { useEffect, useState } from "react";
import { useAppState } from "../components/AppContext";
import { setAppConfig } from "../lib/localStorage";
import transformEvent from "../lib/transformCalendarEvent";
import { Item } from "../Views/Main";

export const fetchAndTranslate = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { state } = useAppState();
  const { cityId, streetId } = state.location;
  const baseUrL = "https://www.bad-berleburg.de/output/abfall_export.php";
  const garbageTypes = state.selectedTrash.reduce(
    (acc, trash) =>
      trash.isChecked
        ? {
            arrIdx: acc.arrIdx + 1,
            types: acc.types.concat(`&abfart[${acc.arrIdx}]=${trash.id}`),
          }
        : acc,
    { types: "", arrIdx: 0 }
  );

  const url = `${baseUrL}?csv_export=1&mode=vcal${
    garbageTypes.types
  }&ort=${cityId}&strasse=${streetId ? streetId : cityId}&1vJ=2021`; // Parameter vMo (von Monat) and bMo (bis Monat) might be helpful here at some point

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((txt) => setItems(transformEvent(txt)))
      .then(() => setAppConfig(state))
      .catch((e) => {
        console.log("Error couldnt fetch data ", e);
        console.log("The fetched url was ", url);
      });
  }, [url]);

  return items;
};
