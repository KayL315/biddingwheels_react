import { ItemList } from "../Components/ItemList";
import { Slides } from "../Components/Slides";
import "./HomePage.css";

export const HomePage = () => {
    const placeholderItems = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const defalutSlideUrls = [
        {
            url: "https://via.placeholder.com/800x300?text=Slide%201",
            caption: "Caption Text 1",
        },
        {
            url: "https://via.placeholder.com/800x300?text=Slide%202",
            caption: "Caption Text 2",
        },
        {
            url: "https://via.placeholder.com/800x300?text=Slide%203",
            caption: "Caption Text 3",
        },
    ];
    return (
        <div className="homepage-container">
            <Slides slideList={defalutSlideUrls} />
            <ItemList title="Car List" items={placeholderItems} />
        </div>
    );
};
