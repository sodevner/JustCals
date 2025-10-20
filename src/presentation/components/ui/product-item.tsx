import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ProductItemProps } from "../../../core/types/search";
import { calculateServingNutrition } from "../../../core/utils/nutrition-calculations";
import { getNutritionGradeColor } from "../../../core/utils/nutrition-grade";
import { ProductItemStyles as styles } from "../styles/product-item-styles";

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => onPress(product)}
    >
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <Text
            style={styles.productName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.product_name}
          </Text>
          {product.nutrition_grade && (
            <View
              style={[
                styles.nutritionGrade,
                {
                  backgroundColor: getNutritionGradeColor(
                    product.nutrition_grade
                  ),
                },
              ]}
            >
              <Text style={styles.nutritionGradeText}>
                {product.nutrition_grade.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.brandAndServingContainer}>
          <Text
            style={styles.productBrand}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {product.brand}
          </Text>
          <Text style={styles.servingText}>{product.serving_size}</Text>
        </View>

        <View style={styles.nutritionContainer}>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateServingNutrition(
                  product.energy_kcal,
                  product.serving_size
                )}
              </Text>
              <Text style={styles.nutritionLabel}>kcal</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateServingNutrition(
                  product.carbohydrates_g,
                  product.serving_size
                )}
              </Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateServingNutrition(
                  product.protein_g,
                  product.serving_size
                )}
              </Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {calculateServingNutrition(product.fat_g, product.serving_size)}
              </Text>
              <Text style={styles.nutritionLabel}>Fett</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
