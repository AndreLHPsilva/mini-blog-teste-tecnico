import { Dialog, Transition } from "@headlessui/react";

export default function ModalComponent({ showModal, onClose, title, children }) {
  return (
    <Transition appear show={showModal}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="md:max-w-xl max-w-xs overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
                <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    {title}
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-transparent ml-auto inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900"
                    data-modal-toggle="defaultModal"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
