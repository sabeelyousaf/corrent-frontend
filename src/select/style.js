export const styles = {
  control: (base) => ({
    ...base,
    padding: "0.375rem", // p-3.5 ≈ 14px
    fontSize: "0.875rem", // text-sm
    border: "1px solid #e4e4e7", // border-zinc-200
    borderRadius: "0.5rem", // rounded-lg
    color: "#0f172a", // text-primary_text (adjust if using custom colors)
    boxShadow: "none",
    width: "100%",
    minHeight: "auto",
    backgroundColor: "#fff",
    "&:hover": {
      borderColor: "#d4d4d8", // optional hover color
    },
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "0.875rem",
    color: "#6b7280", // optional muted placeholder
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "0.875rem",
    color: "#0f172a",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "0.25rem",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    zIndex: 50,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#e0f2fe"
      : state.isFocused
      ? "#f3f4f6"
      : "#fff",
    color: "#0f172a",
    padding: "0.75rem",
    cursor: "pointer",
  }),
};
