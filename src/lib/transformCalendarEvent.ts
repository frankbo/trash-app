import { ITrash } from "../components/AppContext";
import { Item } from "../Views/Main";

const transformEvent = (events: ReadonlyArray<Omit<Item, "kind">>): Item[] => {
  return events.map((v) => {
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

const mapGarbageToItem = (trash: ITrash, item: Item): boolean => {
  if (!trash.isChecked) {
    return false;
  }

  switch (trash.id) {
    case "1.2":
      return item.kind == "brown";
    case "1746.1":
      return item.kind == "yellow";
    case "1.6":
      return item.kind == "blue";
    case "1.1":
      return item.kind == "black";
    case "1.5":
      return item.kind == "white";
    case "1.4":
      return item.kind == "green";
    default:
      return false;
  }
};

export { transformEvent, mapGarbageToItem };
