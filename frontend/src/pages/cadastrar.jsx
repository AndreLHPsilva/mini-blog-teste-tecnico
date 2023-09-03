import Layout from "@/components/Global/Layout";
import api from "@/services/api";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotification } from "@/hooks/useNotification";
import { useRouter } from "next/router";

export default function SignUp() {
  const { Success, Error, WaitToDisappear } = useNotification();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { confirmPassword, ...dataUser } = data;

    try {
      const resp = await api.post("/users/", dataUser);

      Success(resp.data.message);
      await WaitToDisappear(1500);
      router.push("/entrar");
    } catch (error) {
      Error(error.response.data.message);
      await WaitToDisappear(1700);
      router.reload();
    }
  }

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const iconVisiblePassword = useMemo(() => {
    if (isVisiblePassword) {
      return (
        <Icon
          icon="fluent:eye-24-filled"
          className="absolute right-3 top-1 transition-all duration-300 hover:scale-90 cursor-pointer"
          width={24}
          onClick={handleShowPassword}
        />
      );
    } else {
      return (
        <Icon
          icon="fluent:eye-off-16-filled"
          className="absolute right-3 top-1 transition-all duration-300 hover:scale-90 cursor-pointer"
          width={24}
          onClick={handleShowPassword}
        />
      );
    }
  }, [isVisiblePassword]);

  const iconVisibleConfirmPassword = useMemo(() => {
    if (isVisibleConfirmPassword) {
      return (
        <Icon
          icon="fluent:eye-24-filled"
          className="absolute right-3 top-1 transition-all duration-300 hover:scale-90 cursor-pointer"
          width={24}
          onClick={handleShowConfirmPassword}
        />
      );
    } else {
      return (
        <Icon
          icon="fluent:eye-off-16-filled"
          className="absolute right-3 top-1 transition-all duration-300 hover:scale-90 cursor-pointer"
          width={24}
          onClick={handleShowConfirmPassword}
        />
      );
    }
  }, [isVisibleConfirmPassword]);

  function handleShowPassword() {
    setIsVisiblePassword(!isVisiblePassword);
  }

  function handleShowConfirmPassword() {
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
  }

  return (
    <Layout>
      <main className="flex-1 w-full flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold">Cadastro</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5 border rounded-xl shadow-xl w-352px bg-gray-50"
        >
          <div className="flex flex-col gap-3">
            <fieldset className="flex flex-col gap-1">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "*Campo obrigatório" })}
                className={`rounded shadow py-1 px-2 border outline-none transition-all ${
                  errors.name
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-blue-400"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "*Campo obrigatório" })}
                className={`rounded shadow py-1 px-2 border outline-none transition-all ${
                  errors.email
                    ? "focus:border-red-500 border-red-500"
                    : "focus:border-blue-400"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                Senha
              </label>
              <div className="relative">
                {iconVisiblePassword}
                <input
                  type={`${isVisiblePassword ? "text" : "password"}`}
                  id="password"
                  {...register("password", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter pelo menos 8 caracteres",
                    },
                  })}
                  className={`w-full rounded shadow py-1 px-2 border outline-none transition-all ${
                    errors.password
                      ? "focus:border-red-500 border-red-500"
                      : "focus:border-blue-400"
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-1">
              <label
                className="text-sm font-semibold text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirmar Senha
              </label>
              <div className="relative">
                {iconVisibleConfirmPassword}
                <input
                  type={`${isVisibleConfirmPassword ? "text" : "password"}`}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Campo obrigatório",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter pelo menos 8 caracteres",
                    },
                    validate: (value) => {
                      const passwordValue = watch("password");

                      if (value === passwordValue) {
                        return true;
                      }

                      return "As senhas não coincidem";
                    },
                  })}
                  className={`w-full rounded shadow py-1 px-2 border outline-none transition-all ${
                    errors.confirmPassword
                      ? "focus:border-red-500 border-red-500"
                      : "focus:border-blue-400"
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </fieldset>
          </div>

          <button
            type="submit"
            className="self-start border rounded py-1 px-3 bg-gray-800 text-white shadow transition-all duration-300 hover:scale-95 hover:opacity-90"
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Layout>
  );
}
