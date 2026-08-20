import { useRef } from "react";
import { ImagePlus, X, Star, ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  images: string[];
  onChange: (imgs: string[]) => void;
  /** Recebe os ficheiros apenas para pré-visualização; o envio ocorre ao publicar. */
  onFilesAdded?: (files: Record<string, File>) => void;
  max?: number;
};

export function ImageGallery({ images, onChange, onFilesAdded, max = 5 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const remaining = max - images.length;
    if (remaining <= 0) return;
    const arr = Array.from(files).slice(0, remaining);
    const staged: Record<string, File> = {};
    const previews = arr.map((file) => {
      const preview = URL.createObjectURL(file);
      staged[preview] = file;
      return preview;
    });
    if (previews.length) {
      onFilesAdded?.(staged);
      onChange([...images, ...previews]);
    }
  };

  const addUrl = () => {
    const v = urlRef.current?.value.trim();
    if (!v || images.length >= max) return;
    onChange([...images, v]);
    if (urlRef.current) urlRef.current.value = "";
  };

  const remove = (i: number) => onChange(images.filter((_, x) => x !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const makeCover = (i: number) => {
    if (i === 0) return;
    const next = [images[i], ...images.filter((_, x) => x !== i)];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {images.map((src, i) => (
          <div key={i} className={`group relative aspect-square overflow-hidden rounded-xl border-2 ${i === 0 ? "border-foreground" : "border-border"}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-1 top-1 rounded-full bg-foreground px-1.5 py-0.5 text-[9px] font-bold text-background">CAPA</span>
            )}
            <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-1 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <div className="flex justify-end">
                <button type="button" onClick={() => remove(i)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-red-600 shadow"><X className="h-3 w-3" /></button>
              </div>
              <div className="flex justify-between gap-1">
                <button type="button" onClick={() => move(i, -1)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-foreground shadow disabled:opacity-40" disabled={i === 0}><ArrowLeft className="h-3 w-3" /></button>
                {i !== 0 && (
                  <button type="button" onClick={() => makeCover(i)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-amber-600 shadow" title="Definir como capa"><Star className="h-3 w-3" /></button>
                )}
                <button type="button" onClick={() => move(i, 1)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-foreground shadow disabled:opacity-40" disabled={i === images.length - 1}><ArrowRight className="h-3 w-3" /></button>
              </div>
            </div>
          </div>
        ))}
        {images.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            <div className="flex flex-col items-center gap-1">
              <ImagePlus className="h-6 w-6" />
              <span className="text-[11px] font-bold">Adicionar</span>
            </div>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { void addFiles(e.target.files); e.target.value = ""; }} />
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] text-muted-foreground">{images.length}/{max} foto(s). A primeira imagem é a capa.</p>
        <div className="ml-auto flex flex-1 items-center gap-2 min-w-[220px]">
          <input ref={urlRef} type="url" placeholder="ou cole URL da imagem"
            className="flex-1 rounded-lg border border-border bg-transparent px-3 py-2 text-xs outline-none" />
          <button type="button" onClick={addUrl} disabled={images.length >= max}
            className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background disabled:opacity-40">
            Adicionar URL
          </button>
        </div>
      </div>
    </div>
  );
}
