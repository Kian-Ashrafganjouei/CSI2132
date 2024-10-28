// ReusableForm.js
import React, { useState } from "react";
import Input from "../Input/Input";
import "./ReusableForm.css";

const ReusableForm = ({
  formConfig,
  onSubmit,
  initialValues = {},
  title = "New Form",
}) => {
  const [formData, setFormData] = useState(() =>
    formConfig.reduce((acc, field) => {
      acc[field.id] = initialValues[field.id] || "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(
      formConfig.reduce((acc, field) => {
        acc[field.id] = "";
        return acc;
      }, {})
    );
  };

  return (
    <form onSubmit={handleSubmit} className="reusable-form">
      <h1>{title}</h1>
      {formConfig.map((field) => (
        <div key={field.label} className={`form-group ${field.type}`}>
          {field.type === "select" ? (
            <Input
              type={field.type}
              id={field.id}
              options={field.options}
              value={formData[field.id]}
              onChange={handleChange}
              required={field.required}
              label={field.label}
            />
          ) : field.type === "textarea" ? (
            <Input
              label={field.label}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              required={field.required}
            />
          ) : (
            <Input
              label={field.label}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
