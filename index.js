import z from '@deepseek-ai/schemastery'

/**
 * Host half of the eye-care theme bundle.
 *
 * The palette and its two switches live in the browser (`client.js`). What the
 * Host owns is the durable record: `enabled` plus the appearance to restore, kept
 * in this profile's settings document so the choice survives a restart. The page
 * origin changes on every launch, so Web storage cannot hold it.
 */
export const Config = z.object({
  enabled: z.boolean().default(false).volatile(),
  previous: z.union(['light', 'dark', 'system']).default('system').volatile(),
})

/**
 * Offer the fields above as this entry's settings namespace, so the browser half
 * can read and write them through `ctx.configForms.get('eye-care-theme')`.
 * @param ctx - Host plugin context.
 */
export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    child.effect(() => child.settings.configure({ auto: false }, ctx.fiber))
  })
}
