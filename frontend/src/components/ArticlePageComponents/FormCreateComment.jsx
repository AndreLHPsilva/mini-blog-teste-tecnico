import { useNotification } from "@/hooks/useNotification";
import api from "@/services/api";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function FormCreateComment({ articleId }) {
  const { Success, Error, WaitToDisappear } = useNotification();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await api.post(`/articles/${articleId}/comment`, {
        content: data.content,
      });

      Success(response.data.message);
      WaitToDisappear(1500);
      router.reload();
    } catch (error) {
      if(error.response){
        Error(error.response.data.message);
        WaitToDisappear(1700);
        router.reload();
      }
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-2">
        <label
          htmlFor="contentComment"
          className="text-sm font-bold text-gray-700"
        >
          Criar comentário:
        </label>
        <textarea
          className={`border rounded shadow resize-none p-3 text-sm outline-none ${
            errors.content
              ? "focus:border-red-500 border-red-500"
              : "focus:border-blue-400"
          }`}
          id="contentComment"
          rows={5}
          {...register("content", {
            required: "Campo obrigatório",
          })}
        />
        {errors.content && (
          <span className="text-red-500 text-xs">{errors.content.message}</span>
        )}
      </fieldset>
      <button
        type="submit"
        className="self-start border rounded py-1 px-3 bg-gray-800 text-white shadow transition-all duration-300 hover:scale-95 hover:opacity-90"
      >
        Criar
      </button>
    </form>
  );
}
