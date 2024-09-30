import { Resizable } from "~/components/layout-with-sidebar";
import { Sidebar } from "./_sidebar";

export default function Layout(props: React.PropsWithChildren) {
  return <Resizable sidebar={<Sidebar />} {...props} />;
}
