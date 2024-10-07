import { toast } from "react-toastify";

export function errorToast(title: string, err: Error) {
  toast.error(
    <div>
      <h1 className="text-red-600 font-bold text-lg">{title}</h1>
      <p className="text-base opacity-75">{err?.message}</p>
    </div>,
  );
}
