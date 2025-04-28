type PropsModal = {
  titleInfo?: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<PropsModal> = ({
  isOpen,
  onClose,
  titleInfo,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-yellow-200 rounded-lg p-6 max-w-xl w-[90%] relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{titleInfo}</h2>
        <p className="text-sm md:text-base mb-6 break-words text-justify">
          {content}
        </p>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-black hover:text-red-500 text-2xl"
          aria-label="Fechar"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
