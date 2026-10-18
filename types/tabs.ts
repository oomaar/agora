export type TabsVariant = "underline" | "pill";

export type TabItem<T extends string> = {
  id: T;
  label: string;
  count?: number;
};

export type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  variant?: TabsVariant;
  className?: string;
};
