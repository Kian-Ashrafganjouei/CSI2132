// ReusableForm.js
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { capitalize } from "../Utils";
import "./ReusableForm.css";

const ReusableForm = ({
  formConfig,
  onSubmit,
  initialValues = {},
  title = "New Form",
}) => {
  const [formData, setFormData] = useState(() =>
    formConfig.reduce((acc, field) => {
      if (field.type === "subform") {
        field.subfields.forEach((subfield) => {
          acc[subfield.id] = initialValues[subfield.id] || "";
        });
      } else {
        acc[field.id] = initialValues[field.id] || "";
      }
      return acc;
    }, {})
  );

  useEffect(() => {
    formConfig.forEach((field) => {
      if (
        field.type === "select" &&
        field.options.length > 0 &&
        !field.options.find((option) => option.value === formData[field.id])
      ) {
        setFormData((prevData) => ({
          ...prevData,
          [field.id]: field.options[0].value,
        }));
      }
    });
  }, [formConfig]);

  const handleChange = (id, value) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    console.log("formData", formData);
    e.preventDefault();
    const revertedData = formConfig.reduce((acc, field) => {
      if (field.type === "subform") {
        acc[field.id] = field.subfields.reduce((subAcc, subfield) => {
          subAcc[subfield.id] = formData[`${field.id}_${subfield.id}`];
          return subAcc;
        }, {});
      } else {
        acc[field.id] = formData[field.id];
      }
      return acc;
    }, {});
    onSubmit(revertedData);
    setFormData(
      formConfig.reduce((acc, field) => {
        if (field.type === "subform") {
          field.subfields.forEach((subfield) => {
            acc[`${field.id}_${subfield.id}`] = "";
          });
        } else {
          acc[field.id] = "";
        }
        return acc;
      }, {})
    );
  };

  return (
    <form onSubmit={handleSubmit} className="reusable-form">
      <h1>{title}</h1>
      {formConfig.map((field) =>
        field.type === "subform" ? (
          field.subfields.map((subfield) => (
            <div key={subfield.id} className={`form-group ${subfield.type}`}>
              <Input
                label={subfield.label}
                type={subfield.type}
                id={`${field.id}_${subfield.id}`}
                placeholder={subfield.placeholder}
                value={formData[`${field.id}_${subfield.id}`]}
                onInputChange={handleChange}
                required={subfield.required}
              />
            </div>
          ))
        ) : (
          <div key={field.id} className={`form-group ${field.type}`}>
            <Input
              label={field.label}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onInputChange={handleChange}
              required={field.required}
              options={field.type === "select" ? field.options : undefined}
            />
          </div>
        )
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
