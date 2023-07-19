import PopularItemSkeleton from "../../skeletons/PopularItemsSkeleton/PopularItemSkeleton.component";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail.component";
import "./itemgrid.scss";
const ItemGrid = ({ items = [] }) => {
  return (
    <div className="item-grid">
      {items.length
        ? items.map(item => (
            <ItemThumbnail key={item.id} className="no-margin" item={item}></ItemThumbnail>
          ))
        : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
            return <PopularItemSkeleton key={index}></PopularItemSkeleton>;
          })}
    </div>
  );
};

export default ItemGrid;
