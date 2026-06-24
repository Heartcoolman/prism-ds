# Interaction & States

## Gestures

Follow standard system gestures; don't redefine their meaning. Gestures need a visible cue, and a visible equivalent action path is always preserved.

- **Swipe** — left-swipe a list row reveals delete / archive.
- **Pull to refresh** — pull down at the top of a list to refresh.
- **Long press** — long-press summons a context menu.
- **Edge back** — swipe right from the screen's left edge to go back.
- ✓ **DO** — Use system-conventional gestures; provide a visible alternative; add confirmation to dangerous gestures.
- ✕ **DON'T** — Don't hide critical actions behind obscure gestures only; don't override system edge gestures.

## Haptics & sound

Haptics reinforce key moments and work alongside (not instead of) visuals and sound. Use restraint — too much vibration becomes noise. Respect the system's mute and haptics switches.

| Type | Trigger |
|---|---|
| Light | selection change, sliding over a tick |
| Medium | toggle switch, button confirm |
| Heavy | drag snap, long-press trigger |
| Success | task complete, payment success |
| Error | action failed, validation failed |

Haptics always accompany a clear visual change; never make haptics the only feedback channel. Web: `navigator.vibrate?.(10)`.

## Page states

Every data-loading screen designs four states: **empty, loading, error, success**. They're the most often forgotten, yet they most affect consistency and trust.

- **Empty** — explain what's missing and offer the first action (e.g. "还没有项目 · 新建项目").
- **Loading** — a skeleton placeholder (`Skeleton`), not a bare spinner where layout is known.
- **Error** — say what failed and offer retry ("加载失败 · 请检查网络后重试 · 重试").
- **Success** — confirm completion ("提交完成 · 我们会尽快与你联系").

Skeleton: pulse animation `opacity 1 → .45 → 1` over ~1.4s.
