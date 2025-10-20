import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";
import { NormalizedProduct } from "./openfoodfacts-types";

export interface SearchState {
  query: string;
  results: NormalizedProduct[];
  loading: boolean;
  error: string | null;
}

export interface ProductItemProps {
  product: NormalizedProduct;
  index: number;
  onPress: (product: NormalizedProduct) => void;
}

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  inputRef?: React.RefObject<TextInput>;
}

