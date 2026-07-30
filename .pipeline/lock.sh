#!/usr/bin/env bash
# Per-worktree single-flight lock for Pheidippides (timestamp-based).
#
# Coordination is between SEPARATE short-lived shells (the agent runs
# `bash lock.sh ...` via exec; the bash PID is transient). So we key off a
# timestamp written at acquire time, NOT a PID. A run is "fresh" if its lock
# is younger than STALE_SEC. Real runs are bounded (cron <=900s, heartbeat =
# one item), so a fresh lock reliably means "another run is in flight".
#
#   lock.sh <name> acquire        -> ACQUIRED (exit 0) or LOCKED (exit 1)
#   lock.sh <name> release        -> RELEASED (removes the lock; only call if YOU held it)
#   lock.sh <name> check          -> FREE (exit 0) or LOCKED (exit 1); auto-clears stale
#   lock.sh <name> status         -> "HELD age=<sec> stale=<0|1>" or "FREE age=0 stale=0" (exit 0)
#   lock.sh <name> force-release  -> FORCE-RELEASED (clears even a fresh lock; driver only, on dead session)
set -uo pipefail

# Determine BOARD as the directory where this lock.sh resides (the board directory)
BOARD="$(cd "$(dirname "$0")" && pwd)"
NAME="${1:?usage: lock.sh <name> <acquire|release|check>}"
MODE="${2:-acquire}"
# Auto-expire: a held lock older than this is treated as stale/abandoned and
# cleared automatically. This makes a crash during a cycle (e.g. the owning
# agent aborts before reaching its release step) self-healing: the lane can't
# be wedged by a dead holder. Real cycles are bounded (cron <=900s, heartbeat
# = one item) and ALWAYS release on success, so a normal run never approaches
# this age. Only a dead holder lingers this long.
STALE_SEC=2400   # 40 min; far beyond any real run, clears crashed locks safely
LOCK_DIR="${BOARD}/.${NAME}-lock.d"
TS_FILE="${LOCK_DIR}/ts"

now()  { date +%s; }
age()  { local t; t="$(cat "$TS_FILE" 2>/dev/null || echo 0)"; echo $(( $(now) - t )); }
fresh() { [ -d "$LOCK_DIR" ] && [ -f "$TS_FILE" ] && [ "$(age)" -lt "$STALE_SEC" ]; }

case "$MODE" in
  check)
    if fresh; then echo "LOCKED"; else rm -rf "$LOCK_DIR" 2>/dev/null; echo "FREE"; fi ;;
  acquire)
    if fresh; then echo "LOCKED"; exit 1; fi
    rm -rf "$LOCK_DIR" 2>/dev/null
    if mkdir "$LOCK_DIR" 2>/dev/null; then echo "$(now)" > "$TS_FILE"; echo "ACQUIRED"; exit 0; fi
    # rare race with a concurrent acquirer; re-check once
    if fresh; then echo "LOCKED"; exit 1; fi
    rm -rf "$LOCK_DIR" 2>/dev/null
    if mkdir "$LOCK_DIR" 2>/dev/null; then echo "$(now)" > "$TS_FILE"; echo "ACQUIRED"; exit 0; fi
    echo "LOCKED"; exit 1 ;;
  release)
    # Only safe because real runs finish (and release) well within STALE_SEC,
    # so a fresh lock always belongs to this same run. Do NOT call on a LOCKED skip.
    rm -rf "$LOCK_DIR" 2>/dev/null
    echo "RELEASED"; exit 0 ;;
  status)
    if [ -d "$LOCK_DIR" ] && [ -f "$TS_FILE" ]; then
      a="$(age)"
      if [ "$a" -lt "$STALE_SEC" ]; then
        echo "HELD age=${a} stale=0"
      else
        echo "HELD age=${a} stale=1"
      fi
    else
      echo "FREE age=0 stale=0"
    fi
    exit 0 ;;
  force-release)
    # Driver-only escape hatch: clears a lock even if still "fresh". Only called
    # by the pipeline driver AFTER confirming the holding session is dead, so it
    # cannot steal a lock from a live run.
    rm -rf "$LOCK_DIR" 2>/dev/null
    echo "FORCE-RELEASED"; exit 0 ;;
  *)
    echo "unknown mode: $MODE" >&2; exit 2 ;;
esac
