// Pulls every US Chipotle from the latest All The Places run into public/data/chipotles.json.
// Run with: bun run update-chipotles
const run = await (await fetch('https://data.alltheplaces.xyz/runs/latest.json')).json()
const url = run.output_url.replace('output.zip', 'output/chipotle.geojson')
const geojson = await (await fetch(url)).json()

const stores: [number, number, string][] = []
for (const { properties: p, geometry } of geojson.features) {
  if (p['addr:country'] !== 'US' || !geometry) continue
  const [lon, lat] = geometry.coordinates
  stores.push([+lat.toFixed(5), +lon.toFixed(5), `${p['addr:street_address']}, ${p['addr:city']}, ${p['addr:state']}`])
}

await Bun.write(new URL('../public/data/chipotles.json', import.meta.url), JSON.stringify(stores))
console.log(`Saved ${stores.length} stores from run ${run.run_id}`)
