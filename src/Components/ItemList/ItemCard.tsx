import "./ItemCard.css";

export interface ItemCardProps {
    name?: string;
    id?: string;
    description?: string;
    price?: number;
    image?: string;
}

const ImgUrl =
    "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS18,$PN01,$WS91,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=1300,500,300,300&";

export const ItemCard = (props: ItemCardProps) => {
    const {
        name = "Title",
        id = "123",
        description = "a description about xxxxxxx",
        price = "123",
        image = ImgUrl,
    } = props;
    console.log("ItemCard", id);
    return (
        <div className="item-card-container">
            <a href="/" className="item-link">
                <div className="item-cover-container">
                    <img src={image} alt={name} className="item-cover" />
                </div>

                <div className="item-title-container">
                    <div className="item-title-content">{name}</div>
                </div>
                <div className="item-desp-container">
                    <div className="item-desp-content">{description}</div>
                </div>
                <div className="item-price-container">
                    <div className="item-price-content">{price}</div>
                </div>
            </a>
        </div>
    );
};

// TODO: Add a link to the item page
