/* Small in-memory cache with a per-entry expiry. Keeps the app inside RAWG's
   free-tier request cap and spares Steam a HEAD request on every page load. */
class TimedCache{
    constructor(ttlMs){
        this.TtlMs = ttlMs;
        this.Entries = new Map();
    }

    /*Returns undefined for both "never cached" and "expired", so callers only
      need one check before doing the real lookup*/
    Get(key){
        const entry = this.Entries.get(key);
        if(!entry) return undefined;

        if(Date.now() - entry.storedAt > this.TtlMs){
            this.Entries.delete(key);
            return undefined;
        }
        return entry.value;
    }

    Set(key, value){
        this.Entries.set(key, { value, storedAt: Date.now() });
        return value;
    }
}

module.exports = TimedCache;
