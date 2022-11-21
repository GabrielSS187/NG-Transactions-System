export const formatDate = (
  data: Date, 
  style: Intl.DateTimeFormatOptions["dateStyle"]
  ) => {
  const date = data.toLocaleDateString(
    "pt-BR", { dateStyle: style }
  );
  
  return date;
};

export const formatHours = (date: Date) => {
  const time = date.toLocaleTimeString("pt-BR", {
    timeStyle: "short",       
    hour12: false,            
    numberingSystem: "latn",
  });

  return time;
};
