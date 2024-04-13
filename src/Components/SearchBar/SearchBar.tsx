import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import "./SearchBar.css";

export interface SearchBarProps {
    keywords: string;
    setKeywords: (kwds: string) => void;
    sortOrder: boolean; // true for increasing, false for decreasing
    setSortOrder: (order: boolean) => void;
}

export const SearchBar = (props: SearchBarProps) => {
    const { keywords, setKeywords, sortOrder, setSortOrder } = props;

    return (
        <div className="search-bar-container">
            <div className="keywords-container">
                <div className="keywords-title">Keywords</div>
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                ></input>
            </div>
            <div className="time-order-container">
                <div className="time-order-title">{"Time"}</div>
                <select
                    id="payment"
                    name="payment"
                    value={sortOrder ? "increase" : "decrease"}
                    onChange={(e) =>
                        setSortOrder(e.target.value === "increase")
                    }
                >
                    <option value="decrease">Decrease</option>
                    <option value="increase">Increase</option>
                </select>
                <div className="time-order-icon">
                    <div
                        onClick={() => {
                            setSortOrder(!sortOrder);
                        }}
                    >
                        {sortOrder ? <FaArrowUp /> : <FaArrowDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};
