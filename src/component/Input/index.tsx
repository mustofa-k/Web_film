import React from "react";

type Proptypes = {
  type: string;
  placeholder: string;
  id: string;
  label: string;
};

function FormInput(props: Proptypes) {
  const { type, placeholder, id, label } = props;
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label text-light">
        {label}
      </label>
      <input type={type} className="form-control" id={id} placeholder={placeholder} />
    </div>
  );
}

export default FormInput;
