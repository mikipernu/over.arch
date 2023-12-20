import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import TypeSafeForm from "../../components/form/TypeSafeForm";
import EmailSchema from "../../components/form/schemas/EmailSchema";
import PasswordSchema from "../../components/form/schemas/PasswordSchema";
import UsernameSchema from "../../components/form/schemas/UsernameSchema";
import UserPool from "../../utils/user-pool";

const SignupSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export function Signup () {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function onSubmit({ email, password, username }: z.infer<typeof SignupSchema>) {
    UserPool.signUp(
      email,
      password,
      [new CognitoUserAttribute({
        Name: "custom:username",
        Value: username
      })],
      [],
      (err, result) => {
        if (err) {
          console.error(err);
          setErrorMessage(err.message || 'An error occurred during the signup process.');
          return;
        }
        if (result) {
          console.log("Signup success:", result);
          setSuccessMessage("Signup successful! Please check your email to confirm.");
          navigate('/login');
        }
      }
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2.5">Sign up</h2>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <TypeSafeForm
          schema={SignupSchema}
          onSubmit={onSubmit}
        />
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        <div className="mt-4 text-left">
          <p className="text-sm text-gray-600">
            Have an account already?
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1.5">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
