<script lang="ts">
  import { CtxMenu, Btn, Dialog } from "$lib/components";
  import { deleteProject, editProject } from "$lib/projects/tauri-api";
  import { FileArchive, Pencil, Trash2 } from "lucide-svelte";
  import type { ProjectMeta } from "~/gen/core";
  import { changeOpenProject } from "$lib/projects/store";

  let prj: ProjectMeta = $props();

  let detelePrj = deleteProject();
  let editPrj = editProject();
</script>

<CtxMenu>
  {#snippet options()}
    <button onclick={() => console.log(prj.name)}>
      <Pencil size={20} />
      Edit
    </button>

    <button class="text-yellow-600" onclick={() => $editPrj.mutate({ ...prj, archived: !prj.archived })}>
      <FileArchive size={20} />
      {prj.archived ? "Unarchive" : "Archive"}
    </button>

    <Dialog title="DELETE PROJECT">
      {#snippet trigger()}
        <button class="text-red-600">
          <Trash2 size={20} />
          Delete
        </button>
      {/snippet}

      {#snippet options()}
        <Btn
          class="bg-red-600 text-white"
          onclick={() => $detelePrj.mutate(prj.id)}
        >
          <Trash2 size={18} />
          Delete
        </Btn>
      {/snippet}

      <p class="opacity-70">Are you sure you want to delete this project?</p>
    </Dialog>
  {/snippet}

  <article
    ondblclick={() => changeOpenProject(prj)}
    class="dark p-3 rounded-lg cursor-pointer select-none"
  >
    <h1 class={`line-clamp-1 ${prj.archived ? "opacity-60" : ""}`}>
      {prj.name}
    </h1>
    <p class={`line-clamp-3 h-[3lh] break-words ${prj.archived ? "opacity-60" : ""}`}>
      {prj.desc}
    </p>

    <div class="flex justify-between items-center pt-3">
      <time class="opacity-75">
        {new Date(Number(prj.created_at)).toDateString()}
      </time>
    </div>
  </article>
</CtxMenu>
