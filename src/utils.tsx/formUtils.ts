import type { FormInstance } from "antd/es/form";

export function isFormValid(form: FormInstance) {
  const hasErrors = form
    .getFieldsError()
    .some(({ errors }) => errors.length > 0);

  const values = form.getFieldsValue();

  const allFilled = [
    "player1",
    "player2",
    "extendedStats",
    "sets",
    "whoStarts",
  ].every((field) => {
    const val = values[field];
    return val !== undefined && val !== null && val !== "";
  });

  return !hasErrors && allFilled;
}
