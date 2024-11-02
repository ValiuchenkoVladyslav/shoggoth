<script lang="ts">
  import PythonWarn from "../python-warn.svelte";
  import Tool from "../tool.svelte";
  import { sherlockInstallMutation, sherlockStatusQuery } from "./tauri-api";
</script>

<Tool
  name="Sherlock (Nickname search engine)"
  url="https://github.com/sherlock-project/sherlock"
  checkQuery={sherlockStatusQuery}
  installMut={sherlockInstallMutation}
>
  <PythonWarn />
</Tool>
