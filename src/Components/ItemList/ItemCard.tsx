import "./ItemCard.css";
import { CarItem } from "../../Interface";
import { useNavigate } from "react-router-dom";

const ImgUrl =
    "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS18,$PN01,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=1300,500,300,300&";

export const ItemCard = (props: CarItem) => {
    const { listid, make, highestBid, image = ImgUrl, description } = props;

    let navigate = useNavigate();

    return (
        <div className="item-card-container">
            <div
                className="item-link"
                onClick={() => {
                    navigate(`/list/${listid}`);
                }}
            >
                <div className="item-cover-container">
                    <img src={image} alt={description} className="item-cover" />
                </div>

                <div className="item-title-container">
                    <div className="item-title-content">{make}</div>
                </div>
                <div className="item-desp-container">
                    <div className="item-desp-content">{description}</div>
                </div>
                <div className="item-price-container">
                    <div className="item-price-content">{`${highestBid} up`}</div>
                </div>
            </div>
        </div>
    );
};

// TODO: Add a link to the item page
