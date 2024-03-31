import { ItemCard, ItemCardProps } from "./ItemCard";
import "./ItemList.css";

export interface ItemListProps {
    title: string;
    items: ItemCardProps[];
}

export const ItemList = (props: ItemListProps) => {
    const { title, items } = props;
    return (
        <div className="item-list-container">
            <h2 className="item-list-title">{title}</h2>
            <div className="items-container">
                {items.map((item, index) => {
                    return <ItemCard key={`item-${index}`} {...item} />;
                })}
            </div>
        </div>
    );
};
