import { ItemCard } from "./ItemCard";
import { CarItem } from "../../Interface";
import "./ItemList.css";

export interface ItemListProps {
    title: string;
    items: CarItem[];
    keywords: string;
    sortOrder: boolean; // true for increasing, false for decreasing
}

export const ItemList = (props: ItemListProps) => {
    const { title, items, keywords, sortOrder } = props;

    // compare string date with format 2024-04-19T00:00:00
    const compareDate = (date1: string, date2: string) => {
        return new Date(date1).getTime() - new Date(date2).getTime();
    };

    const filteredItems = items
        .filter((item) => {
            if (keywords === "") return true;
            return item.description
                .toLowerCase()
                .includes(keywords.toLowerCase());
        })
        .sort((item1, item2) => {
            if (sortOrder) {
                return compareDate(
                    item1.biddingDeadline,
                    item2.biddingDeadline
                );
            } else {
                return compareDate(
                    item2.biddingDeadline,
                    item1.biddingDeadline
                );
            }
        });

    return (
        <div className="item-list-container">
            <h2 className="item-list-title">{title}</h2>
            <div className="items-container">
                {filteredItems.length === 0 && <div>No items found</div>}
                {filteredItems.map((item, index) => {
                    return (
                        <div className="items-details" key={`items-${index}`}>
                            <ItemCard key={index} {...item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
