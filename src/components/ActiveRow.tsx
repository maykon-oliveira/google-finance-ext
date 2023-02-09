import React, { ChangeEvent } from "react";
import { Active } from "../chrome-content/types";

type ActiveRowType = {
    name: string;
    color: string;
    low: number;
    currentPrice: number;
    hight: number;
    tracking: boolean;
    reachedOut: boolean;
    onChange: (active: Active) => void;
};

function ActiveRow({
    name,
    color,
    low,
    currentPrice,
    hight,
    tracking,
    reachedOut,
    onChange,
}: ActiveRowType) {
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const active: any = {
            name,
            color,
            low,
            currentPrice,
            hight,
            tracking,
            reachedOut,
        };
        active[e.target.name] = Number(e.target.value);
        onChange(active);
    }

    function handleOnTrackingChange(e: ChangeEvent<HTMLInputElement>) {
        onChange({
            name,
            color,
            low,
            currentPrice,
            hight,
            reachedOut,
            tracking: e.target.checked,
        });
    }

    return (
        <li className="active-li">
            <div className="tracking">
                <input
                    type="checkbox"
                    checked={tracking}
                    onChange={handleOnTrackingChange}
                />
            </div>
            <div className={`active-row ${!tracking ? "not-tracking" : ""}`}>
                <div className="active-name" style={{ backgroundColor: color }}>
                    {name}
                </div>
                <div className="active-price-container">
                    <div>
                        <input
                            className="active-price-input"
                            value={low}
                            name="low"
                            onChange={handleOnChange}
                            type="number"
                            min="0"
                            step=".01"
                        />
                    </div>
                    <div className="active-price">R${currentPrice}</div>
                    <div>
                        <input
                            className="active-price-input"
                            value={hight}
                            name="hight"
                            onChange={handleOnChange}
                            type="number"
                            min="0"
                            step=".01"
                        />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default ActiveRow;
