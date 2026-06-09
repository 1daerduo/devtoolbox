#!/bin/bash
# Cloudflare Analytics Report for MoreToolbox
# Usage: bash scripts/cf-analytics.sh [--days N]

TOKEN="${CF_ANALYTICS_TOKEN:-}"
ZONE_ID="c8d988e69a4b7a139009c69832147a0d"
DAYS=${2:-30}
[[ "${1:-}" == "--days" ]] || DAYS=30

END_DATE=$(date +%Y-%m-%d)
START_DATE=$(date -d "$DAYS days ago" +%Y-%m-%d 2>/dev/null || echo "2026-05-10")

PYTHON="C:/Users/11836/.workbuddy/binaries/python/versions/3.13.12/python.exe"

echo ""
echo "📊 MoreToolbox Traffic Report"
echo "   Period: $START_DATE → $END_DATE"
echo "   ───────────────────────────────────────────────────────"
echo ""

# Build query
read -r -d '' QUERY << GQL
{"query":"{ viewer { zones(filter: { zoneTag: \"$ZONE_ID\" }) { httpRequests1dGroups(limit: $DAYS, filter: { date_geq: \"$START_DATE\", date_leq: \"$END_DATE\" }, orderBy: [date_ASC]) { dimensions { date } sum { pageViews requests bytes } uniq { uniques } } } } }"}
GQL

# Check token
if [ -z "$TOKEN" ]; then
  echo "   ❌ CF_ANALYTICS_TOKEN not set. Export it or add to .env file."
  exit 1
fi

# Execute and save to temp file
TMPFILE="D:/WorkBuddySpace/2026-06-03-22-43-29/tool-site/scripts/.cf-analytics-cache.json"
curl -s -X POST "https://api.cloudflare.com/client/v4/graphql" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$QUERY" > "$TMPFILE"

# Parse and display
"$PYTHON" -c "
import json
from datetime import datetime

def fmt_bytes(b):
    if b < 1024: return f'{b} B'
    if b < 1024*1024: return f'{b/1024:.1f} KB'
    if b < 1024*1024*1024: return f'{b/(1024*1024):.1f} MB'
    return f'{b/(1024*1024*1024):.1f} GB'

with open(r'$TMPFILE') as f:
    data = json.load(f)

if data.get('errors'):
    print(f\"   ❌ {data['errors'][0]['message']}\")
    exit(1)

groups = data['data']['viewer']['zones'][0]['httpRequests1dGroups']
if not groups:
    print('   ⚠️ No data.')
    exit(0)

print('   Date       | Page Views | Requests | Bandwidth | Visitors')
print('   ' + '\u2500' * 60)

total_pv = total_req = total_bytes = total_uniq = 0
days_cn = ['周一','周二','周三','周四','周五','周六','周日']

for g in groups:
    d = g['dimensions']['date']
    pv = g['sum']['pageViews']; req = g['sum']['requests']
    byt = g['sum']['bytes']; uniq = g['uniq']['uniques']
    total_pv += pv; total_req += req
    total_bytes += byt; total_uniq += uniq
    
    dt = datetime.strptime(d, '%Y-%m-%d')
    day_name = days_cn[dt.weekday()]
    print(f'   {d} {day_name} | {str(pv).rjust(10)} | {str(req).rjust(8)} | {fmt_bytes(byt).rjust(8)} | {str(uniq).rjust(8)}')

print('   ' + '\u2500' * 60)
print(f'   TOTAL      | {str(total_pv).rjust(10)} | {str(total_req).rjust(8)} | {fmt_bytes(total_bytes).rjust(8)} | {str(total_uniq).rjust(8)}')

end_date = '$END_DATE'
full_days = [g for g in groups if g['dimensions']['date'] != end_date]
if full_days:
    n = len(full_days)
    avg_pv = round(total_pv / n)
    avg_uniq = round(total_uniq / n)
    avg_req = round(total_req / n)
    ppv = total_pv / max(total_uniq, 1)
    print(f'\\n   📈 Daily Averages ({n} complete days):')
    print(f'   • {avg_pv:,} page views / day')
    print(f'   • {avg_uniq:,} unique visitors / day')
    print(f'   • {avg_req:,} requests / day')
    print(f'   • {ppv:.1f} pages per visitor')

    if len(groups) >= 2:
        td = groups[-1]; yd = groups[-2]
        pv_diff = td['sum']['pageViews'] - yd['sum']['pageViews']
        trend = '\u2191' if pv_diff > 0 else ('\u2193' if pv_diff < 0 else '\u2192')
        print(f'\\n   📉 Yesterday vs Today: {trend} {pv_diff:+d} PV')

print()
"

rm -f "$TMPFILE"
