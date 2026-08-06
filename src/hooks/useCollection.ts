import { useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

/**
 * Generic real-time collection hook.
 * Falls back to static demo data when Supabase isn't configured, and
 * automatically subscribes to postgres_changes so admin edits reflect
 * on the public site instantly without a page refresh.
 */
export function useCollection<T extends { id: string }>(
  table: string,
  fallback: T[],
  orderBy: string = "display_order"
) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setData(fallback);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data: rows, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true });
    if (!error && rows && rows.length > 0) {
      setData(rows as T[]);
    } else {
      setData(fallback);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy]);

  useEffect(() => {
    refresh();
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel(`realtime:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refresh, table]);

  return { data, loading, refresh, setData };
}
