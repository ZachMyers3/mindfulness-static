# Black Mango webfonts

Black Mango is a **commercial** typeface by [Creative Media Lab](https://creativemedialab.net/typeface/black-mango-branding-font/).
Purchase a **Webfont** license, then drop the `.woff2` files here.

## Expected filenames

Use either the variable file **or** the static weights (or both):

| File | Weight |
|---|---|
| `BlackMango-Variable.woff2` | 100–900 (preferred) |
| `BlackMango-Regular.woff2` | 400 |
| `BlackMango-Medium.woff2` | 500 |
| `BlackMango-SemiBold.woff2` | 600 |
| `BlackMango-Bold.woff2` | 700 |

If your kit uses different names (e.g. `BlackMango-VF.woff2`), rename them to match the table above, or update the `@font-face` rules in `src/styles/fonts.css`.

Until these files are present, headings fall back to Raleway / system UI.

## Enable in the build

After the files are in place, uncomment this line in `src/styles/fonts.css`:

```css
@import './black-mango-faces.css';
```
