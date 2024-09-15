import { useEffect, useState } from "react";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as API from "@/constants/api";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "react-toastify";
import useStore from "@/context/store";
import request from "@/services";

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm();
  const navigate = useNavigate();
  const signInHook = useSignIn();
  const loginSuccess = useStore((state) => state.loginSuccess);
  useEffect(() => {
    setValue("email", watch("email"));
    setValue("password", watch("password"));
  }, [setValue, watch]);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await request.post(API.LOGIN, {
        email,
        password,
      });
      signInHook({
        auth: {
          token: response.data.token,
          type: "Bearer",
        },
        userState: {
          email: response.data.email,
        },
      });
      if (response.data) {
        const userData = response.data.user;
        console.log(response.data);
        loginSuccess(userData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
      }
      console.log(response.data);
      navigate("/dashboard");
      toast.success("Successfully signed in");
    } catch (error) {
      if (!error.response) {
        toast.error("The server is not responding. Please try again later.", {
          theme: "colored",
        });
        reset();
      } else {
        toast.error(
          error.response.data.error || "An error occurred. Please try again.",
          {
            theme: "colored",
          }
        );
        reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex gap-4 justify-center items-center h-screen">
      <div className="w-full sm:w-[50%] lg:w-1/4 py-12 bg-white border-2 shadow-xl">
        <div className="text-center">
          <Typography variant="h4" className="font-bold mb-4">
            Sign in to your account
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-3 font-medium"
            >
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("email", { required: true })}
                  size="lg"
                  placeholder="email"
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
            />
            {errors?.email && (
              <Typography variant="small" color="red" className="mb-6">
                Please enter email
              </Typography>
            )}

            <div className="flex justify-between items-center">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 font-medium"
              >
                Password
              </Typography>
              <Link className="text-blue-500 mb-3 font-medium text-sm">
                Forgot ?
              </Link>
            </div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
            />
            {errors?.password && (
              <Typography variant="small" color="red">
                {errors.password.message}
              </Typography>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center mt-6">
              <Spinner color="blue-gray" size="sm" />
            </div>
          ) : (
            <Button className="mt-6" type="submit" fullWidth>
              Sign In
            </Button>
          )}

          <div className="flex">
            <Typography
              variant="paragraph"
              className="text-center text-sm text-blue-gray-500 font-medium mt-4"
            >
              Don't have an account?
              <Link to="/auth/sign-up" className="text-blue-500 ml-1">
                Sign Up
              </Link>
            </Typography>
          </div>
          {errors && (
            <Typography variant="small" color="red" className="mt-2">
              {errors.message}
            </Typography>
          )}
        </form>
      </div>
    </section>
  );
}

export default SignIn;
