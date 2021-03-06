import { useQuery } from "react-query";
import { ITrash, useAppState } from "../components/AppContext";
import { appStateToLocalStorage } from "../lib/localStorage";
import {
  transformEvent,
  mapGarbageToItem,
} from "../lib/transformCalendarEvent";
import { Item } from "../Views/Main";

const filteredItemsByGargabeType = (
  items: Item[],
  selectedTrash: ITrash[]
): Item[] =>
  items.filter((i) =>
    selectedTrash.map((t) => mapGarbageToItem(t, i)).includes(true)
  );

const fetchEvents = (url: string, selectedTrash: ITrash[]) => () => {
  return fetch(url)
    .then((res) => res.json())
    .then(({ events }) => {
      const items = filteredItemsByGargabeType(
        transformEvent(events),
        selectedTrash
      );
      return items;
    })
    .catch(() => {
      return [];
    });
};

export const fetchAndTranslate = () => {
  const { state } = useAppState();
  const { selectedTrash } = state;
  const { cityId, streetId } = state.location;
  const baseUrl = "https://w54k0cafpa.execute-api.eu-central-1.amazonaws.com";
  const url =
    baseUrl +
    `/v1/events?locationId=${cityId}&streetId=${streetId ? streetId : cityId}`;

  return useQuery<Item[], Error>(
    ["fetchData", url, selectedTrash],
    fetchEvents(url, selectedTrash),
    {
      onSuccess: () => appStateToLocalStorage(state),
      onError: (e: Error) => {
        console.log("Error couldnt fetch data ", e);
        console.log("The fetched url was ", url);
      },
      retry: 25,
      retryDelay: 500,
    }
  );
};
