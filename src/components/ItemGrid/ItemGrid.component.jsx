import PopularItemSkeleton from "../../skeletons/PopularItemsSkeleton/PopularItemSkeleton.component";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import "./itemgrid.scss";
const ItemGrid = ({ items = [], showName }) => {
  return (
    <div className="item-grid">
      {items.length
        ? items.map(item => (
            <ItemThumbnail key={item.id} className="no-margin" item={item} showName></ItemThumbnail>
          ))
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return <PopularItemSkeleton></PopularItemSkeleton>;
          })}
    </div>
  );
};

export default ItemGrid;
