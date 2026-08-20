/**
 * Retentativas automáticas para as subscrições do Firestore.
 *
 * Em internet lenta ou instável a ligação falha; em vez de deixar a página num
 * estado de erro, voltamos a tentar com espera progressiva (1s, 2s, 4s… até
 * 30s) e também sempre que o dispositivo volta a ficar online.
 */
export type Retrier = { schedule: () => void; cancel: () => void };

export function createRetrier(run: () => void): Retrier {
  let attempt = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let onlineHooked = false;

  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    attempt = 0;
  };

  const schedule = () => {
    if (typeof window === "undefined" || timer) return;
    const delay = Math.min(30000, 1000 * 2 ** attempt);
    attempt += 1;
    timer = setTimeout(() => {
      timer = null;
      run();
    }, delay);

    if (!onlineHooked) {
      onlineHooked = true;
      window.addEventListener("online", () => {
        cancel();
        run();
      });
    }
  };

  return { schedule, cancel };
}
