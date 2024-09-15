import { useState } from "react";
import {
  Input,
  Button,
  Typography,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as API from "@/constants/api";
import axios from "axios";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const parsedData = {
      ...data,
      enter: true,
    };

    try {
      const response = await axios.post(API.REGISTER, parsedData);
      if (response.data) {
        toast.success(
          "You submitted your data. The organization will check it and contact you. Thank you!",
          {
            theme: "colored",
          }
        );
        reset();
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex gap-4 justify-center items-center h-screen">
      <div className="w-full sm:w-[50%] lg:w-1/3 py-12 bg-white border-2 shadow-xl">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign Up
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Please fill out the registration form carefully.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 mb-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="email"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", {
                required: true,
                pattern: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
              })}
            />
            {errors.email && (
              <Typography variant="small" color="red" className="mt-1">
                Please enter a valid email
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Role
            </Typography>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  id="role"
                  label="Select your role"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={!!errors.role}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              )}
            />
            {errors.role && (
              <Typography variant="small" color="red" className="mt-1">
                Please select a role
              </Typography>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-3 font-medium"
            >
              Password
            </Typography>
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
            {errors.password && (
              <Typography variant="small" color="red" className="mt-1">
                {errors.password.message}
              </Typography>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center mt-6">
              <Spinner />
            </div>
          ) : (
            <Button className="mt-6" fullWidth type="submit">
              Register Now
            </Button>
          )}

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
