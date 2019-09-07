import { useState } from "react";

export default function useFormData(initial) {
  const [formData, setFormData] = useState(initial);
  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  return [formData, updateFormData, setFormData];
}
