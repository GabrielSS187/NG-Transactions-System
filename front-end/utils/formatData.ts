export const formatDate = (
  data: Date, 
  style: Intl.DateTimeFormatOptions["dateStyle"]
  ) => {
  const date = data.toLocaleDateString(
    "pt-BR", { dateStyle: style, timeZone: "UTC" }
  );
  
  return date;
};