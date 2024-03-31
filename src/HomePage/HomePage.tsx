import { ItemList } from "../Components/ItemList";
import "./HomePage.css";

export const HomePage = () => {
    const placeholderItems = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return (
        <div className="homepage-container">
            <h1>Home Page</h1>
            <h3>Slide</h3>
            <ItemList title="Car List" items={placeholderItems} />
        </div>
    );
};
