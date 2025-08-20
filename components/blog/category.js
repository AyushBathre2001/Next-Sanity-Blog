import Label from "@/components/ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Label
            key={index}
            nomargin={nomargin}
            color={category.color}>
            {category.name}
          </Label>
        ))}
    </div>
  );
}
