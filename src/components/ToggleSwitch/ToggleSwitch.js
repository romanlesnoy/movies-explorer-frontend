import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
    return (
        <div className="toggle-switch">
            <label className="toggle-switch__label">
                Короткометражки
            </label>
            <input
                type="checkbox"
                className="toggle-switch__checkbox"
                name="toggleSwitch"
                id="toggleSwitch"
            />
        </div>
    );
}

export default ToggleSwitch;
