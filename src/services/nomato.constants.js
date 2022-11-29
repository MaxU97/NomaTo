export const bookingStatuses = [
  "all",
  "approval_required",
  "approved",
  "with_customer",
  "canceled",
  "refused",
  "returned",
];

export const NewsTemplates = {
  OneColumn: { value: "one-column", label: "add-news.one-column" },
  TwoColumns: { value: "two-columns", label: "add-news.two-columns" },
};

export const getTemplate = (value) => {
  for (const [key, prop] of Object.entries(NewsTemplates)) {
    if (prop.value == value) {
      return prop;
    }
  }
  return null;
};
