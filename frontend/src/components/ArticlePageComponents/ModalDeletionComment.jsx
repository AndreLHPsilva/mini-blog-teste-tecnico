import { useNotification } from "@/hooks/useNotification";
import ModalComponent from "../Global/ModalComponent";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import api from "@/services/api";

export default function ModalDeletionComment({ comment, onClose, showModal }) {
  const { Success, Error, WaitToDisappear } = useNotification();

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const resp = await api.delete(`/articles/comment/${comment?.id}`);

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
      title={"Excluir comentário"}
    >
      <form className="p-5 md:w-512px w-280px" onSubmit={(e) => onSubmit(e)}>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold flex flex-col gap-5 text-gray-500">
            Tem certeza que deseja prosseguir ?
            <span className="text-xs border rounded p-2 text-gray-900 font-bold max-h-20 overflow-hidden overflow-y-auto">
              {comment?.content}
            </span>
            <span className="text-red-500 text-xs">
              *Após clicar em{" "}
              <span className="uppercase font-semibold">excluir</span>, não poderá desfazer a ação.
            </span>
          </p>
          <button
            type="submit"
            className="self-start border rounded py-1 px-3 bg-gray-800 text-white shadow transition-all duration-300 hover:scale-95 hover:opacity-90"
          >
            Excluir
          </button>
        </div>
      </form>
    </ModalComponent>
  );
}
