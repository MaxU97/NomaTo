export const bookingStatuses = [
  "all",
  "approval_required",
  "approved",
  "with_customer",
  "canceled",
  "refused",
  "returned",
];

export const BookingStatusesMapping = (t) => {
  return {
    all: t("my-bookings.all"),
    approval_required: t("my-bookings.approval-required"),
    approved: t("my-bookings.approved"),
    with_customer: t("my-bookings.with-customer"),
    canceled: t("my-bookings.canceled"),
    refused: t("my-bookings.declined"),
    returned: t("my-bookings.returned"),
  };
};

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
