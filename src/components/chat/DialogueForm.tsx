import { IoSend } from "react-icons/io5";
import { useSendMessage } from "../../hooks/useSendMessage";

type DialogueFormProps = {
  name: string;
  chatId: number;
};

function DialogueForm({ name, chatId }: DialogueFormProps) {
  const { mutate, isPending } = useSendMessage({ id: chatId });

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      content: rawData.content as string,
    };
    mutate(data);
    form.reset();
  }

  return (
    <form
      className="w-full relative flex max-w-[600px] items-center"
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        name="content"
        placeholder={`Send message to ${name}`}
        className="border px-4 py-2 w-full bg-[#202024] overflow-y-scroll border-[#3B3A3F] focus:border-[#8A38F5] focus:outline-none rounded-full"
      />
      <button
        disabled={isPending}
        className="bg-[#8A38F5] disabled:cursor-not-allowed absolute right-2 rounded-full p-2 cursor-pointer hover:opacity-50 flex justify-center items-center"
      >
        <IoSend />
      </button>
    </form>
  );
}

export default DialogueForm;
