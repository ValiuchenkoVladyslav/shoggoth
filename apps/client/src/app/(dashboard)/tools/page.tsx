import { PhoneInfoga } from "./_phone-infoga";
import { Sherlock } from "./_sherlock";

export default function ToolsPage() {
  return (
    <section className="flex flex-col gap-2">
      <PhoneInfoga />
      <Sherlock />
    </section>
  );
}
