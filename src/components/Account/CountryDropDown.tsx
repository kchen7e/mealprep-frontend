import React from "react";
import { Select } from "antd";
import { CountryOptions } from "../../static/constants";

const CountryDropDown = ({ value, onChange }) => (
    <Select
        placeholder="Select Country"
        showSearch
        allowClear
        style={{ width: '100%' }}
        options={CountryOptions}
        value={value}
        onChange={onChange}
        filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
    />
);

export default CountryDropDown;
