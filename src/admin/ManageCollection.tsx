import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { CollectionConfig } from "./adminConfig";
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown, X, ImagePlus, Loader2 } from "lucide-react";

type Row = Record<string, any>;

export default function ManageCollection({ config }: { config: CollectionConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchRows = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setRows([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from(config.table)
      .select("*")
      .order(config.orderBy, { ascending: true });
    if (!error && data) setRows(data as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.table]);

  const openCreate = () => {
    setEditing(null);
    const blank: Row = {};
    config.fields.forEach((f) => (blank[f.key] = f.type === "number" ? rows.length + 1 : ""));
    setForm(blank);
    setModalOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setForm({ ...row });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSupabaseConfigured) {
      setNotice({ type: "error", text: "Connect Supabase Storage to upload images. Paste an image URL instead for now." });
      return;
    }
    setUploading(true);
    const path = `${config.table}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("cde-media").upload(path, file, {
      upsert: true,
    });
    if (error) {
      setNotice({ type: "error", text: `Upload failed: ${error.message}` });
    } else {
      const { data } = supabase.storage.from("cde-media").getPublicUrl(path);
      setForm((f) => ({ ...f, [field]: data.publicUrl }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setNotice({
        type: "error",
        text: "Connect a Supabase project (see .env.example) to save changes permanently.",
      });
      return;
    }
    setSaving(true);
    const payload = { ...form };
    delete payload.id;
    delete payload.created_at;

    const { error } = editing
      ? await supabase.from(config.table).update(payload).eq("id", editing.id)
      : await supabase.from(config.table).insert(payload);

    setSaving(false);
    if (error) {
      setNotice({ type: "error", text: error.message });
    } else {
      setNotice({ type: "success", text: `${config.titleField ? form[config.titleField] : "Item"} saved successfully.` });
      closeModal();
      fetchRows();
    }
  };

  const handleDelete = async (row: Row) => {
    if (!isSupabaseConfigured) {
      setNotice({ type: "error", text: "Connect Supabase to delete records." });
      return;
    }
    if (!confirm(`Delete "${row[config.titleField]}"? This cannot be undone.`)) return;
    const { error } = await supabase.from(config.table).delete().eq("id", row.id);
    if (error) setNotice({ type: "error", text: error.message });
    else {
      setNotice({ type: "success", text: "Item deleted." });
      fetchRows();
    }
  };

  const move = async (row: Row, dir: -1 | 1) => {
    if (!isSupabaseConfigured) return;
    const idx = rows.findIndex((r) => r.id === row.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= rows.length) return;
    const a = rows[idx];
    const b = rows[swapIdx];
    await supabase.from(config.table).update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from(config.table).update({ display_order: a.display_order }).eq("id", b.id);
    fetchRows();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">{config.title}</h1>
          <p className="text-white/50 text-sm mt-1">{config.description}</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-sm bg-[#db0000] hover:bg-[#970000] transition-colors px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shrink-0"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {notice && (
        <div
          className={`mb-6 rounded-sm border px-4 py-3 text-sm ${
            notice.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-[#db0000]/40 bg-[#db0000]/10 text-red-300"
          }`}
        >
          {notice.text}
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-sm border border-[#d4af37]/40 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#d4af37]">
          Demo mode: Supabase isn't connected, so this table has no live records yet. Connect your project via environment variables to manage real data.
        </div>
      )}

      <div className="border border-white/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white/60 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-5 py-3">Preview</th>
                <th className="px-5 py-3">{config.titleField}</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-white/40">
                    <Loader2 className="inline animate-spin mr-2" size={16} /> Loading...
                  </td>
                </tr>
              )}
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-white/40">
                    No records yet. Click "Add New" to create one.
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-5 py-3">
                    {config.imageField && row[config.imageField] ? (
                      <img
                        src={row[config.imageField]}
                        alt=""
                        className="h-10 w-10 rounded object-cover border border-white/10"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-white/5 border border-white/10" />
                    )}
                  </td>
                  <td className="px-5 py-3 text-white font-medium">{row[config.titleField]}</td>
                  <td className="px-5 py-3 text-white/50">{row.display_order ?? "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => move(row, -1)} className="p-2 text-white/50 hover:text-white" aria-label="Move up">
                        <ArrowUp size={15} />
                      </button>
                      <button onClick={() => move(row, 1)} className="p-2 text-white/50 hover:text-white" aria-label="Move down">
                        <ArrowDown size={15} />
                      </button>
                      <button onClick={() => openEdit(row)} className="p-2 text-white/50 hover:text-[#d4af37]" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(row)} className="p-2 text-white/50 hover:text-[#db0000]" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg max-h-[88vh] overflow-y-auto bg-[#0a0a0a] border border-[#970000]/50 rounded-sm p-7"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-white">
                {editing ? "Edit" : "Add"} {config.title.replace("Manage ", "")}
              </h2>
              <button type="button" onClick={closeModal} className="text-white/50 hover:text-white">
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              {config.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-1.5">
                    {f.label} {f.required && <span className="text-[#db0000]">*</span>}
                  </label>

                  {f.type === "textarea" && (
                    <textarea
                      required={f.required}
                      rows={4}
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white resize-none"
                    />
                  )}

                  {f.type === "select" && (
                    <select
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white"
                    >
                      <option value="">Select...</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}

                  {(f.type === "date" || f.type === "datetime") && (
                    <input
                      type="date"
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white"
                    />
                  )}

                  {f.type === "number" && (
                    <input
                      type="number"
                      value={form[f.key] ?? 0}
                      onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white"
                    />
                  )}

                  {(f.type === "text" || f.type === "url") && (
                    <input
                      required={f.required}
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white"
                    />
                  )}

                  {f.type === "image" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="https://... or upload below"
                        value={form[f.key] ?? ""}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full bg-black/40 border border-white/15 focus:border-[#db0000] outline-none rounded-sm px-3 py-2.5 text-sm text-white"
                      />
                      <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer hover:text-white w-fit">
                        <ImagePlus size={14} />
                        {uploading ? "Uploading..." : "Upload image file"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, f.key)}
                        />
                      </label>
                      {form[f.key] && (
                        <img
                          src={form[f.key]}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded border border-white/10"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-7">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-sm bg-[#db0000] hover:bg-[#970000] transition-colors py-2.5 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-sm border border-white/20 hover:border-white/50 transition-colors py-2.5 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
