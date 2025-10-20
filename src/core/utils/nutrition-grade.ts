export const getNutritionGradeColor = (grade: string): string => {
  const colors: { [key: string]: string } = {
    a: "#4CAF50",
    b: "#8BC34A",
    c: "#FFC107",
    d: "#FF9800",
    e: "#F44336",
  };
  return colors[grade.toLowerCase()] || "#757575";
};

export const getNutritionGradeText = (grade: string): string => {
  const texts: { [key: string]: string } = {
    a: "Sehr gut",
    b: "Gut",
    c: "Mittel",
    d: "Schlecht",
    e: "Sehr schlecht",
  };
  return texts[grade.toLowerCase()] || "Unbekannt";
};