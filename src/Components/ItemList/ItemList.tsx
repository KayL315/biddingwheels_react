import { ItemCard } from "./ItemCard";
import { CarItem } from "../../Interface";
import "./ItemList.css";

export interface ItemListProps {
    title: string;
    items: CarItem[];
}

export const ItemList = (props: ItemListProps) => {
    const { title, items } = props;
    return (
        <div className="item-list-container">
            <h2 className="item-list-title">{title}</h2>
            <div className="items-container">
                {items.map((item, index) => {
                    return <div className="items-details" key={`items-${index}`}><ItemCard key={index} {...item} /></div>;
                })}
            </div>
        </div>
    );
};
