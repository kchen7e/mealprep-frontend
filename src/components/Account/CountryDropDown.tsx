import React from "react";
import {Dropdown} from "antd";
import {CountryOptions} from "../../static/static";

const CountryDropDown = () => (
    <Dropdown
        name="country"
        clearable
        fluid
        search
        selection
        options={CountryOptions}
        placeholder="Select Country"
    />
);

export default CountryDropDown;
