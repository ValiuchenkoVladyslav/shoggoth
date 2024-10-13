import { BellingcatTg } from "~/tools/bellingcat_tg/config";
import { PhoneInfoga } from "~/tools/phone_infoga/config";
import { Sherlock } from "~/tools/sherlock/config";

export default function ToolsPage() {
  return (
    <section className="flexcol gap-2">
      <PhoneInfoga />
      <BellingcatTg />
      <Sherlock />
    </section>
  );
}
