<script lang="ts">
  import PythonWarn from "../python-warn.svelte";
  import Tool from "../tool.svelte";
  import { Sherlock } from "./tauri-api";
</script>

<Tool
  name="Sherlock (Nickname search engine)"
  url="https://github.com/sherlock-project/sherlock"
  checkQuery={Sherlock.statusQuery}
  installMut={Sherlock.installMut}
>
  <PythonWarn />
</Tool>
