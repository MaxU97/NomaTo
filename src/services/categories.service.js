import CarIcon from "../assets/CategoryIcons/car-cat.svg";
import ElecIcon from "../assets/CategoryIcons/elec-cat.svg";
import HomeIcon from "../assets/CategoryIcons/propert-cat.svg";
const categories = [
  {
    id: "elec",
    name: "Electronics",
    icon: ElecIcon,
    subcat: [
      { name: "consoles" },
      { name: "cameras" },
      { name: "hoovers" },
      { name: "vr glasses" },
    ],
    fields: [{ name: "Name" }, { name: "Model" }],
  },
  {
    id: "prop",
    name: "Property",
    icon: HomeIcon,
    subcat: [
      { name: "flats" },
      { name: "houses" },
      { name: "shops" },
      { name: "bunkers" },
    ],
    fields: [
      { name: "TestField1" },
      { name: "TestField2" },
      { name: "TestField3" },
    ],
  },
  {
    id: "notelec",
    name: "NotElec",
    icon: ElecIcon,
    subcat: [
      { name: "flats" },
      { name: "houses" },
      { name: "shops" },
      { name: "bunkers" },
    ],
  },
  {
    id: "auto",
    name: "Auto",
    icon: CarIcon,
    subcat: [
      { name: "легковые" },
      { name: "грузовые" },
      { name: "дом на колесах" },
      { name: "электроавто" },
      { name: "эксклюзивные" },
      { name: "водный транспорт" },
    ],
  },
  {
    id: "nothome",
    name: "NotHome",
    icon: HomeIcon,
    subcat: [
      { name: "легковые" },
      { name: "грузовые" },
      { name: "дом на колесах" },
      { name: "электроавто" },
      { name: "эксклюзивные" },
      { name: "водный транспорт" },
    ],
  },
];

export default categories;
