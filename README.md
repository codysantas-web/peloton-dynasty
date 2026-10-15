# Peloton Dynasty

A text-first pro cycling team manager for iPhone. Phase 1 of the plan in DESIGN.md.

## Put it on your iPhone (works offline)

The app is a static website that installs to your home screen. It needs to be hosted once; GitHub Pages is free.

1. Create a free account at github.com and make a new **public** repository, e.g. `peloton-dynasty`.
2. In the repository, choose **Add file → Upload files** and upload everything inside `peloton-dynasty-app.zip`
   (unzip first; `index.html` must be at the top level, not inside a folder).
3. Go to **Settings → Pages**, set **Source** to “Deploy from a branch”, branch `main`, folder `/ (root)`, and save.
4. After a minute, open `https://YOUR-USERNAME.github.io/peloton-dynasty/` in **Safari** on your iPhone.
5. Tap **Share → Add to Home Screen**. Open it once while online; after that it runs offline, on planes included.

Your career saves on the phone. Use **More → Export backup** now and then to keep a copy in Files.

## Real names

Riders, teams and brands use fictional names by default. To switch to real names, save `real-names-2026.json`
to the Files app, then in the game go to **More → Load names file** (or load it while creating a career).
You can switch back to fictional names at any time.

Names file format (any section can be left out; ids that don’t exist are ignored):

```json
{
  "format": "peloton-dynasty-names",
  "version": 1,
  "label": "My names",
  "teams":  [{ "id": "T01", "name": "Team name", "abbr": "ABC", "colors": ["#hex", "#hex"] }],
  "riders": [{ "id": 101, "first": "First", "last": "Last" }],
  "brands": [{ "id": "B01", "name": "Brand" }],
  "races":  [{ "id": "tdf", "name": "Race name" }]
}
```

## How a season works

1. **Pre-season** — on the Calendar, request WorldTour invitations and enter ProSeries and smaller races, then confirm.
2. **Race week** — from Home, go to the next race: study the parcours and favourites, pick your squad and roles.
3. **Race** — ride each stage live (groups, gaps and race-radio decisions) or quick-sim it.
4. **Season end** — team awards, rankings, licence review, retirements, then contracts, the transfer market and youth signings.

Ride every race yourself or let the team race some on its own: **More → Races you ride yourself** sets the default
(all, WorldTour, Grand Tours & Monuments, none) and every race has a Ride/Auto switch on the Home calendar.
Auto races use the same race engine and squad logic as every other team. **More → Hall of fame** and
**Achievements** keep your team's history.

**Championships.** At the end of June every nation holds its time trial and road race championship; your riders race
for the title of their own country and the winners wear the national champion's jersey for a year. The Worlds (time
trial and road race, late September, a new host every year) and, every four years, the Olympic Games are raced by
national teams: each nation's coach picks riders for the course, with more places for nations higher in the nation
ranking (Stats → Rankings → Nations). The world champion wears the rainbow jersey. Championships run on their own
when you sim; your riders' titles show on Home, on rider pages and next to their names everywhere.

**Sponsors and budget.** Your title sponsor pays most of the bills and sets two goals each season (a ranking, a
number of wins, a win at home, a Grand Tour stage…), with a bonus for each one met. Happy sponsors renew for more;
unhappy ones walk away when the deal ends. When a deal runs out, the off-season brings offers: pick a title sponsor
(and its name for the team, like Lidl–Trek), an optional co-sponsor and a bike deal. Top bike brands pay less but
give a tiny race-day edge; smaller brands pay more. Income minus running costs is your salary budget for contracts
and signings. See **More → Sponsors & budget** or tap the payroll line on the Team screen.

**Small race-day lifts.** Riders racing in their own country get a little lift, and so do riders with countrymen in
the squad (shown in race week).

WorldTour licences go to the top 18 teams over a three-year cycle (or every season if you chose arcade mode).
The top three ProTeams each season get automatic WorldTour invitations; Grand Tour wildcards need a top-30 ranking.

## Development

- `node build.mjs` builds `dist/` (installable site) and `dist-artifact/` (single-file version).
- `tsx tools/build-world.ts` regenerates the rider database and the real-names file from `data-src/real-2026.txt`.
- `tsx tools/seasontest.ts 3` simulates three full seasons headless; `tsx tools/simtest.ts lbl 5` tests one race.
