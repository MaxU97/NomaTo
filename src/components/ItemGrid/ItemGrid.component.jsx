import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import "./itemgrid.scss";
const ItemGrid = ({ items = [] }) => {
  return (
    <div className="item-grid">
      {items.map((item, index) => (
        <ItemThumbnail className="no-margin" item={item}></ItemThumbnail>
      ))}
    </div>
  );
};

export default ItemGrid;
