// A text field's value from submitted form data; missing fields read as empty.
export function readFormText(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value : "";
}
