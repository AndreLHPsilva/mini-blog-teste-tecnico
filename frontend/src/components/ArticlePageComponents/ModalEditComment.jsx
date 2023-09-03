import { useNotification } from "@/hooks/useNotification";
import ModalComponent from "../Global/ModalComponent";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import api from "@/services/api";

export default function ModalEditComment({ comment, onClose, showModal }) {
  const { Success, Error, WaitToDisappear } = useNotification();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: comment?.content,
    },
  });

  async function onSubmit(data) {
    try {
      const resp = await api.patch(`/articles/comment/${comment?.id}`, {
        content: data.content,
      });

      Success(resp.data.message);
      await WaitToDisappear(1500);
      router.reload();
    } catch (error) {
      if (error.response) {
        Error(error.response.data.message);
        await WaitToDisappear(1700);
      }
    }
  }

  return (
    <ModalComponent
      onClose={onClose}
      showModal={showModal}
      title={"Editar comentário"}
    >
      <form
        className="p-5 md:w-512px w-280px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="flex flex-col w-full gap-5">
          <textarea
            type="text"
            id="content"
            rows={4}
            {...register("content", { required: "Campo obrigatório." })}
            className={`rounded shadow py-1 px-2 border md:text-base text-xs outline-none transition-all resize-none ${
              errors.content
                ? "focus:border-red-500 border-red-500"
                : "focus:border-blue-400"
            }`}
          />
          {errors.content && (
            <span className="text-red-500 text-xs">
              {errors.content.message}
            </span>
          )}
          <button
            type="submit"
            className="self-start border rounded py-1 px-3 bg-gray-800 text-white shadow transition-all duration-300 hover:scale-95 hover:opacity-90"
          >
            Salvar
          </button>
        </fieldset>
      </form>
    </ModalComponent>
  );
}
