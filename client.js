window.__ModuleLoader__.load({
  id: 'dsh-eye-care-theme',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    /**
     * Host settings namespace of this plugin — the bundle patch entry id. The Host
     * persists these fields in the profile, so the choice survives a restart even
     * though the page origin (and therefore Web storage) does not.
     */
    const NAMESPACE = 'eye-care-theme'
    /** Settings fields: the switch, and the appearance to restore when it turns off. */
    const ENABLED = 'enabled'
    const PREVIOUS = 'previous'
    /** Locale namespace of this plugin's Settings row copy. */
    const NS = 'eye-care'

    const zh = {
      'eyeCare.title': '护眼模式',
      'eyeCare.hintOff': '暖色纸感配色，降低蓝光与刺眼白光，久看不累。',
      'eyeCare.hintOn': '护眼配色已开启，可随时关闭回到原来的外观。',
      'eyeCare.switch': '护眼模式开关',
      'eyeCare.footerOff': '护眼模式：已关闭，点击开启',
      'eyeCare.footerOn': '护眼模式：已开启，点击关闭',
    }
    const en = {
      'eyeCare.title': 'Eye care',
      'eyeCare.hintOff': 'A warm paper-toned palette that cuts blue light and white glare for long sessions.',
      'eyeCare.hintOn': 'The eye-care palette is on. Turn it off to return to the previous appearance.',
      'eyeCare.switch': 'Toggle eye-care mode',
      'eyeCare.footerOff': 'Eye care: off, click to turn on',
      'eyeCare.footerOn': 'Eye care: on, click to turn off',
    }

    /**
     * Warm "paper" palette. Only token values are overridden: the alias layer
     * keeps reading the same static scales, so overriding those scales recolors
     * surfaces, borders, text, menus and code blocks consistently. The few
     * hard-coded alias values are overridden beside them.
     */
    const TOKENS = {
      // Warm neutral-bluish scale: surfaces, borders, labels, menus.
      '--dsw-static-neutral-bluish-00': '#fbf7ee',
      '--dsw-static-neutral-bluish-50': '#f5efe2',
      '--dsw-static-neutral-bluish-60': '#f1ebdd',
      '--dsw-static-neutral-bluish-75': '#ebe4d3',
      '--dsw-static-neutral-bluish-100': '#e5decc',
      '--dsw-static-neutral-bluish-150': '#dfd7c4',
      '--dsw-static-neutral-bluish-200': '#d7ceb9',
      '--dsw-static-neutral-bluish-300': '#c7bda5',
      '--dsw-static-neutral-bluish-400': '#a89e87',
      '--dsw-static-neutral-bluish-500': '#8e8571',
      '--dsw-static-neutral-bluish-600': '#6f6857',
      '--dsw-static-neutral-bluish-700': '#5e5747',
      '--dsw-static-neutral-bluish-750': '#4b4638',
      '--dsw-static-neutral-bluish-800': '#403c30',
      '--dsw-static-neutral-bluish-850': '#38342a',
      '--dsw-static-neutral-bluish-875': '#302d24',
      '--dsw-static-neutral-bluish-900': '#2a271f',
      '--dsw-static-neutral-bluish-950': '#26231b',
      '--dsw-static-neutral-bluish-1000': '#23201a',
      // Warm plain-neutral scale: scrollbars, inline code, idle state.
      '--dsw-static-neutral-00': '#fbf7ee',
      '--dsw-static-neutral-50': '#f4eee1',
      '--dsw-static-neutral-100': '#ede6d7',
      '--dsw-static-neutral-150': '#e6dfcf',
      '--dsw-static-neutral-200': '#ded5c2',
      '--dsw-static-neutral-250': '#d6cdb8',
      '--dsw-static-neutral-300': '#c9bfa8',
      '--dsw-static-neutral-400': '#a69c86',
      '--dsw-static-neutral-500': '#8b8271',
      '--dsw-static-neutral-550': '#78705f',
      '--dsw-static-neutral-600': '#696253',
      '--dsw-static-neutral-700': '#544e41',
      '--dsw-static-neutral-800': '#403b31',
      '--dsw-static-neutral-850': '#363128',
      '--dsw-static-neutral-900': '#2b2721',
      '--dsw-static-neutral-1000': '#23201a',
      // Accent scale (links, brand accent, user bubble): softened teal-green.
      '--dsw-static-deepseek-50': '#eaf0e7',
      '--dsw-static-deepseek-100': '#dfe9de',
      '--dsw-static-deepseek-200': '#cfdcd3',
      '--dsw-static-deepseek-300': '#a9c2b8',
      '--dsw-static-deepseek-400': '#6f9c92',
      '--dsw-static-deepseek-450': '#5b8f85',
      '--dsw-static-deepseek-500': '#4a8177',
      '--dsw-static-deepseek-600': '#3c6a62',
      '--dsw-static-deepseek-800': '#33453f',
      '--dsw-static-deepseek-900': '#2a3833',
      // Blue scale: muted steel blue (document selection, tool-bar accents).
      '--dsw-static-blue-50': '#eef2f5',
      '--dsw-static-blue-50p': '#eaf0f4',
      '--dsw-static-blue-75': '#e4ecf1',
      '--dsw-static-blue-100': '#dbe6ec',
      '--dsw-static-blue-300': '#a7c2d3',
      '--dsw-static-blue-400': '#7ba3bd',
      '--dsw-static-blue-450': '#6a95b1',
      '--dsw-static-blue-500': '#5b8aa8',
      '--dsw-static-blue-600': '#4b7691',
      '--dsw-static-blue-800': '#365669',
      '--dsw-static-blue-900': '#2c4556',
      '--dsw-static-blue-950': '#24394a',
      // Status scales: same hue, lower saturation so marks stop vibrating.
      '--dsw-static-green-100': '#e4efe4',
      '--dsw-static-green-400': '#6fb083',
      '--dsw-static-green-500': '#4f9a68',
      '--dsw-static-green-500-a08': '#4f9a6814',
      '--dsw-static-green-500-a12': '#4f9a681f',
      '--dsw-static-green-900': '#2b3d31',
      '--dsw-static-red-50': '#f8ecea',
      '--dsw-static-red-100': '#f2dcd8',
      '--dsw-static-red-400': '#d4736a',
      '--dsw-static-red-400-a12': '#d4736a1f',
      '--dsw-static-red-500': '#c9605a',
      '--dsw-static-red-600': '#bf4b45',
      '--dsw-static-red-600-a08': '#bf4b4514',
      '--dsw-static-red-900': '#4c2723',
      '--dsw-static-amber-100': '#f8eedb',
      '--dsw-static-amber-400': '#e0ad60',
      '--dsw-static-amber-500': '#d69a3f',
      '--dsw-static-amber-600': '#b9803a',
      '--dsw-static-amber-900': '#33301f',
      // Hard-coded alias values that would otherwise stay cool-toned.
      '--dsw-alias-brand-primary-new-colorprimary-new-color': '#4a8177',
      '--dsw-menu-surface-fill': '#fbf7ee94',
      '--dsw-alias-menu-group-header-fill': '#fbf7eef0',
      '--dsw-specific-menu': '#fbf7ee94',
      '--dsw-alias-bg-mask-drop': '#fbf7eeb3',
      '--dsw-alias-bg-skeleton': '#4a3e2d0d',
      '--dsw-alias-border-l1': '#4a3e2d0a',
      '--dsw-alias-border-l2': '#4a3e2d1a',
      '--dsw-alias-border-l2-darkmode-thin': '#4a3e2d1a',
      '--dsw-alias-border-l3': '#4a3e2d1f',
      '--dsw-alias-border-l4': '#4a3e2d29',
      '--dsw-alias-interactive-bg-active': '#3b33241a',
      '--dsw-alias-interactive-bg-hover': '#3b33240f',
      '--dsw-alias-interactive-bg-hover-accent': '#3b332424',
      '--dsw-alias-interactive-bg-hover-danger': '#bf4b450d',
      '--dsw-alias-button-tool-bar-fill': '#6f685780',
      '--dsw-alias-button-tool-bar-fill-invisible': '#23201a5c',
      '--dsw-alias-button-tool-bar-hover': '#6f685799',
      '--dsw-alias-file-diff-added-bg': '#e8f1de',
      '--dsw-alias-file-diff-added-gutter': '#eff6e9',
      '--dsw-alias-file-diff-added-marker': '#3f8a4f',
      '--dsw-alias-file-diff-deleted-bg': '#f7e7e1',
      '--dsw-alias-file-diff-deleted-gutter': '#fbeeea',
      '--dsw-alias-file-diff-deleted-marker': '#a8483f',
      '--dsw-alias-onboarding-accent': '#4a8177',
      '--dsw-linear-gradient-think': 'linear-gradient(180deg, #fbf7ee 20.19%, #fbf7ee00 100%)',
      '--dsw-linear-think-select': 'linear-gradient(180deg, #f2ecdd 20.19%, #f2ecdd00 100%)',
      // Syntax colors of code blocks.
      '--shiki-token-constant': '#3d6f8f',
      '--shiki-token-string': '#4c8478',
      '--shiki-token-comment': '#8d8471',
      '--shiki-token-keyword': '#96607e',
      '--shiki-token-parameter': '#a5703f',
      '--shiki-token-function': '#6a5f9e',
      '--shiki-token-string-expression': '#3f7c68',
      '--shiki-token-punctuation': '#5e5747',
      '--shiki-token-link': '#3d6f8f',
    }

    const CSS = [
      '.dshEyeCareRow{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:.5px solid var(--dsw-alias-border-l2)}',
      '.dshEyeCareText{display:flex;flex-direction:column;gap:2px;min-width:0}',
      '.dshEyeCareTitle{color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}',
      '.dshEyeCareHint{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.dshEyeCareSwitch{position:relative;flex:none;width:40px;height:24px;padding:0;border:.5px solid var(--dsw-alias-border-l4);border-radius:999px;background:var(--dsw-alias-bg-module-platform);cursor:pointer;transition:background var(--ds-transition-duration) var(--ds-ease-in-out)}',
      '.dshEyeCareSwitch[aria-checked="true"]{border-color:transparent;background:var(--dsw-alias-state-business-primary)}',
      '.dshEyeCareSwitch:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}',
      '.dshEyeCareKnob{position:absolute;top:50%;left:3px;width:18px;height:18px;margin-top:-9px;border-radius:999px;background:var(--dsw-alias-switch-thumb);box-shadow:0 1px 2px #00000026;transition:left var(--ds-transition-duration) var(--ds-ease-in-out)}',
      '.dshEyeCareSwitch[aria-checked="true"] .dshEyeCareKnob{left:19px}',
      // Footer action beside Settings: the same 28px (36px in the rail) hit area
      // and resting color the sidebar uses for its own icon buttons.
      '.dshEyeCareFooter{display:inline-flex;align-items:center;justify-content:center;flex:none;width:28px;height:28px;padding:0;border:none;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.dshEyeCareFooter:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dshEyeCareFooter[data-rail="true"]{width:36px;height:36px;border-radius:var(--dsw-radius-md);color:var(--dsw-alias-label-primary)}',
      '.dshEyeCareFooter[data-active="true"]{color:var(--dsw-alias-state-business-primary)}',
      '.dshEyeCareFooter:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}',
    ].join('')

    const PLUGIN_ID = 'dsh-eye-care-theme'

    /** The same palette in the light/dark shape `overrideTokens` validates. */
    const TOKEN_PAIRS = Object.fromEntries(
      Object.entries(TOKENS).map(([name, value]) => [name, { light: value, dark: value }]),
    )

    return {
      inject: ['theme', 'slots', 'locale', 'configForms', 'remote'],
      apply(ctx) {
        const prefs = ctx.configForms.get(NAMESPACE)
        const state = () => prefs.getSnapshot().value
        const isEnabled = () => state()?.enabled === true
        /** Guard for the synchronous `theme/change` fired by our own `setTheme` calls. */
        let ownWrite = false
        /**
         * Counts our own settings writes whose answer has not landed yet, the same
         * way ui-theme does: while one is in flight the mirror still holds the old
         * value, so a naive mirror callback would undo what the click just did.
         */
        let pending = 0
        let layer
        /** Entry components re-read `isOn` whenever the layer changes. */
        const listeners = new Set()
        const announce = () => {
          for (const notify of [...listeners]) notify(isOn())
        }
        /** What is in effect right now: the stacked layer, not a possibly stale document. */
        function isOn() {
          return layer !== undefined || isEnabled()
        }

        /** Queue one Host write and release the pending guard when it settles. */
        const track = (operation) => {
          pending += 1
          const settle = () => {
            pending -= 1
          }
          Promise.resolve()
            .then(operation)
            .then(settle, settle)
        }

        /** Stack the warm palette over the light scheme. */
        const addLayer = () => {
          // Switch to the light base FIRST. `overrideTokens` publishes, and that
          // `theme/change` would otherwise reach the appearance mirror while the
          // preference still reads system/dark — the mirror would read it as "the
          // user left eye care" and immediately remove the layer just stacked.
          if (ctx.theme.getTheme().preference !== 'light') {
            ownWrite = true
            try {
              ctx.theme.setTheme('light')
            } finally {
              ownWrite = false
            }
          }
          if (layer === undefined) layer = ctx.theme.overrideTokens(PLUGIN_ID, TOKEN_PAIRS)
          announce()
        }

        const removeLayer = () => {
          if (layer === undefined) return
          layer()
          layer = undefined
          announce()
        }

        /** Turn eye care off; `restore` puts back the appearance the user came from. */
        const disable = (restore) => {
          ownWrite = true
          try {
            // Always record the off state: a stale mirror must not leave the Host
            // document claiming the switch is on.
            track(() => prefs.set(ENABLED, false))
            removeLayer()
            if (restore) {
              const previous = state()?.previous
              const known = previous === 'light' || previous === 'dark' || previous === 'system'
              ctx.theme.setTheme(known ? previous : 'light')
            }
          } finally {
            ownWrite = false
          }
        }

        const toggle = () => {
          // Decide from what is on screen, not from a possibly lagging document read.
          if (isOn()) {
            disable(true)
            return
          }
          const previous = ctx.theme.getTheme().preference
          // One mutation so the Host document never holds half of the pair.
          track(() =>
            prefs.mutate([
              { op: 'set', path: [PREVIOUS], value: previous === 'light' ? 'light' : previous },
              { op: 'set', path: [ENABLED], value: true },
            ]),
          )
          addLayer()
        }

        ctx.effect(() => {
          const tag = document.createElement('style')
          tag.dataset.plugin = PLUGIN_ID
          tag.textContent = CSS
          document.head.appendChild(tag)
          return () => tag.remove()
        }, 'eye-care: row styles')

        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'eye-care: dictionaries')

        /**
         * Follow the Host document. Skipped while our own write is in flight and
         * while the document has not been read yet, so the layer only ever mirrors
         * a value the Host has actually accepted.
         */
        const sync = () => {
          if (pending > 0) return
          const value = state()
          if (value === undefined) return
          if (value.enabled === true) addLayer()
          else removeLayer()
        }

        ctx.effect(() => {
          sync()
          const off = prefs.subscribe(sync)
          return () => {
            off()
            removeLayer()
          }
        }, 'eye-care: settings mirror')

        // Picking light/dark/system in Appearance means the user left eye care: drop
        // the layer and let the switch follow, without rewriting their choice.
        ctx.effect(
          () =>
            ctx.on('theme/change', (snapshot) => {
              if (ownWrite || !isEnabled()) return
              if (snapshot.preference !== 'light') disable(false)
            }),
          'eye-care: appearance mirror',
        )

        /** Translate one row key, falling back to the built-in copy. */
        const makeLabel = (props) => {
          const translate = typeof props.t === 'function' ? props.t : () => undefined
          return (key) => {
            try {
              const value = translate(key)
              if (typeof value === 'string' && value !== '' && value !== key) return value
            } catch {
              // A missing binding must not take the row down; fall back to the built-in copy.
            }
            return zh[key] ?? key
          }
        }

        /** Follow what is actually in effect (the layer), so the switch matches the screen. */
        const useActive = () => {
          const [active, setActive] = React.useState(isOn)
          React.useEffect(() => {
            listeners.add(setActive)
            const off = prefs.subscribe(() => setActive(isOn()))
            return () => {
              listeners.delete(setActive)
              off()
            }
          }, [])
          return active
        }

        function EyeCareRow(props) {
          const label = makeLabel(props)
          const active = useActive()
          return h(
            'div',
            { className: 'dshEyeCareRow' },
            h(
              'div',
              { className: 'dshEyeCareText' },
              h('div', { className: 'dshEyeCareTitle' }, label('eyeCare.title')),
              h('div', { className: 'dshEyeCareHint' }, label(active ? 'eyeCare.hintOn' : 'eyeCare.hintOff')),
            ),
            h(
              'button',
              {
                type: 'button',
                role: 'switch',
                'aria-checked': active,
                'aria-label': label('eyeCare.switch'),
                className: 'dshEyeCareSwitch',
                onClick: toggle,
              },
              h('span', { className: 'dshEyeCareKnob' }),
            ),
          )
        }

        function EyeCareFooterAction(props) {
          const label = makeLabel(props)
          const active = useActive()
          const text = label(active ? 'eyeCare.footerOn' : 'eyeCare.footerOff')
          const size = props.wide === false ? 18 : 16
          return h(
            'button',
            {
              type: 'button',
              'aria-pressed': active,
              'aria-label': text,
              title: text,
              className: 'dshEyeCareFooter',
              'data-rail': props.wide === false ? 'true' : 'false',
              'data-active': active ? 'true' : 'false',
              onClick: () => {
                if (active) disable()
                else enable()
              },
            },
            h(
              'svg',
              {
                viewBox: '0 0 16 16',
                width: size,
                height: size,
                'aria-hidden': 'true',
                focusable: 'false',
                style: { display: 'block', pointerEvents: 'none' },
              },
              h('path', {
                d: 'M1.4 8C3.1 4.9 5.4 3.3 8 3.3s4.9 1.6 6.6 4.7C12.9 11.1 10.6 12.7 8 12.7S3.1 11.1 1.4 8Z',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinejoin: 'round',
              }),
              h('circle', {
                cx: 8,
                cy: 8,
                r: 2.2,
                fill: active ? 'currentColor' : 'none',
                stroke: 'currentColor',
                strokeWidth: active ? 0 : 1.2,
              }),
            ),
          )
        }

        ctx.slots.inject('settings.general.item', () =>
          ctx.slots.register(
            {
              name: 'settings.general.item',
              id: 'eye-care',
              order: 10.5,
              locale: NS,
            },
            EyeCareRow,
          ),
        )

        // One click from the sidebar foot, so switching back never means opening
        // Settings; `wide` tells the action whether it sits in the rail.
        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            {
              name: 'sidebar.footer.action',
              id: 'eye-care',
              order: 10,
              locale: NS,
            },
            EyeCareFooterAction,
          ),
        )
      },
    }
  },
})
