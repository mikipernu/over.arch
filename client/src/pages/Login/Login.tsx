import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import TypeSafeForm from "../../components/form/TypeSafeForm";
import EmailSchema from "../../components/form/schemas/EmailSchema";
import PasswordSchema from "../../components/form/schemas/PasswordSchema";
import { AccountContext } from "../../context/AccountContext";

const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
});

export default function Login () {
  const { authenticate } = useContext(AccountContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit({ email, password }: z.infer<typeof LoginSchema>) {
    if (authenticate) {
      authenticate(email, password)
      .then(() => {
        navigate("/", {replace: true });
      })
      .catch(err => {
        if (err.name === "UserNotConfirmedException") {
          console.error("User has not been confirmed by admin.", err);
          setErrorMessage('User has not yet been confirmed.');
        } else {
          console.error("Failed to log in: ", err);
          setErrorMessage('Failed to log in. Please try again.');
        }
      })
    } else {
      console.error("Cannot currently authenticate users.");
      setErrorMessage('Authentication service is currently unavailable.');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2.5">Login</h2>
        {errorMessage && <div className="text-red-600 mb-2">{errorMessage}</div>}
        <TypeSafeForm
          schema={LoginSchema}
          onSubmit={onSubmit}
        />
        <div className="mt-4 text-left">
          <p className="text-sm text-gray-600">
            Want to create an account?
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium ml-1.5">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}