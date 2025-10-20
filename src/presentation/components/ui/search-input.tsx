import React, { forwardRef } from "react";
import { Platform, TextInput, TextInputProps } from "react-native";
import { InputStyles } from "../styles/input-styles";

interface SearchInputProps extends Omit<TextInputProps, "style"> {
  // Zusätzliche Props hier wenn nötig
}

export const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ value, onChangeText, placeholder, ...props }, ref) => {
    if (Platform.OS === "ios") {
      return null;
    }

    return (
      <TextInput
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        style={InputStyles.searchInput}
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
