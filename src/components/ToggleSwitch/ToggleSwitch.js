import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch() {
    return (
        <div class="toggle-switch">
            <label class="toggle-switch__label" for="toggleSwitch">
                Короткометражки
            </label>
            <input
                type="checkbox"
                class="toggle-switch__checkbox"
                name="toggleSwitch"
                id="toggleSwitch"
            />
        </div>
    );
}

export default ToggleSwitch;
