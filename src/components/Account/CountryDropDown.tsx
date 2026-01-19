// CountryDropDown.tsx
import React from "react";
import { Select } from "antd";
import { CountryOptions } from "../../static/constants";
import type { CountryOption } from "../../static/Type";

interface CountryDropDownProps {
    value: string | undefined;
    onChange: (value: string) => void;
  }

// Convert country code to flag emoji
const getFlagEmoji = (countryCode: string): string => {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

const CountryDropDown: React.FC<CountryDropDownProps> = ({ value, onChange }) => (
    <Select
      placeholder="Select Country"
      showSearch
      allowClear
      style={{ width: "100%" }}
      options={CountryOptions as CountryOption[]}
      value={value}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      optionRender={(option) => (
        <span>
          {getFlagEmoji(option.data.flag)} {option.data.label}
        </span>
      )}
      labelRender={(props) => {
        const country = CountryOptions.find((c) => c.value === props.value);
        if (!country) return props.label;
        return (
          <span>
            {getFlagEmoji(country.flag)} {country.label}
          </span>
        );
      }}
    />
  );

export default CountryDropDown;