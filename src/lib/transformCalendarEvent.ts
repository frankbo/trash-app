import { parseString } from "cal-parser";
import { Item } from "../Views/Main";

const getTimestamp = (weirdDate: string | undefined): number => {
  try {
    return new Date(weirdDate).getTime();
  } catch (error) {
    console.log("Not a valid time", weirdDate);
    console.log("Error", error);
  }
};

const normalizeEvents = (events: any) => {
  return events.map((event) => {
    return {
      categories: event.categories.value,
      location: event.location.value,
      summary: event.summary.value,
      uid: event.uid.value,
      class: event.class.value,
      dtstart: getTimestamp(event.dtstart.value),
      dtstamp: event.dtstamp.value,
      description: event.description.value,
    };
  });
};

const transformEvent = (eventAsString: string): Item[] => {
  const events = parseString(eventAsString).events;
  const normaizedEvent = normalizeEvents(events);
  return normaizedEvent
    .sort((a, b) => a.dtstart - b.dtstart)
    .map((v) => {
      if (v.summary.toLowerCase().includes("bio")) {
        return { ...v, kind: "brown" };
      }
      if (v.summary.toLowerCase().includes("papier")) {
        return { ...v, kind: "blue" };
      }
      if (v.summary.toLowerCase().includes("gelbe")) {
        return { ...v, kind: "yellow" };
      }
      if (v.summary.toLowerCase().includes("rest")) {
        return { ...v, kind: "black" };
      }
      if (v.summary.toLowerCase().includes("sperrige")) {
        return { ...v, kind: "green" };
      }
      return { ...v, kind: undefined };
    });
};

export default transformEvent;
