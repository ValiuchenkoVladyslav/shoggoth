import { permanentRedirect } from "next/navigation";

export default function NotFound() {
  permanentRedirect("/");
}
