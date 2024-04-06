import { ItemList } from "../../Components/ItemList";
import { Slides } from "../../Components/Slides";
import { useSelector, useDispatch } from "react-redux";
import { addCars } from "../../Slice";
import "./HomePage.css";
import React, { useEffect } from "react";
import { RootState } from "../../store";
import { CarItem } from "../../Interface";

export const HomePage : React.FC<{}> = () => {
    const carList = useSelector((state: RootState) => state.cars.carList);
    const dispatch = useDispatch();

    const defalutSlideUrls = [
        {
            url: "https://digitalassets-secure.tesla.com/image/upload/f_auto,q_auto/xufyfcvqhmq36szytod7.jpg",
            caption: "Caption Text 1",
        },
        {
            url: "https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-X-Desktop-LHD",
            caption: "Caption Text 2",
        },
        {
            url: "https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-SolarRoof-Desktop-Global",
            caption: "Caption Text 3",
        },
    ];

    useEffect(() => {
        const fetchCars = async () => {
            fetch("http://localhost:8000/all-listings")
                .then((res) => res.json())
                .then((data: CarItem[]) => {
                    dispatch(addCars(data));
                });
        };
        fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="homepage-container">
            <Slides slideList={defalutSlideUrls} />
            <ItemList title="Car List" items={carList} />
        </div>
    );
};
