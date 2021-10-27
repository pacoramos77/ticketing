import { useState } from "react";
import axios from "axios";
function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (err) {
      console.log(err.message);
      debugger;
      const errors = err.response.data.errors;

      setErrors(
        <div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}

export default useRequest;
