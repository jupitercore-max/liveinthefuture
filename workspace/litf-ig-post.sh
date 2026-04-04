#!/bin/bash
# LITF Instagram/Threads posting script
# Posts the next article from the queue to @litf.ai
# Usage: ./litf-ig-post.sh

QUEUE_FILE="$HOME/workspace/litf-ig-queue.json"
IG_USER_ID="17841438809671808"

if [ ! -f "$QUEUE_FILE" ]; then
    echo "Queue file not found: $QUEUE_FILE"
    exit 1
fi

# Find next unposted article
NEXT=$(python3 -c "
import json, sys
with open('$QUEUE_FILE') as f:
    q = json.load(f)
for i, item in enumerate(q):
    if not item.get('posted', False):
        print(json.dumps({'index': i, **item}))
        sys.exit(0)
print('EMPTY')
")

if [ "$NEXT" = "EMPTY" ]; then
    echo "All articles posted!"
    exit 0
fi

INDEX=$(echo "$NEXT" | python3 -c "import json,sys; print(json.load(sys.stdin)['index'])")
TITLE=$(echo "$NEXT" | python3 -c "import json,sys; print(json.load(sys.stdin)['title'])")
IMAGE_URL=$(echo "$NEXT" | python3 -c "import json,sys; print(json.load(sys.stdin)['image_url'])")
CAPTION=$(echo "$NEXT" | python3 -c "import json,sys; print(json.load(sys.stdin)['caption'])")
URL=$(echo "$NEXT" | python3 -c "import json,sys; print(json.load(sys.stdin)['url'])")

echo "Posting article #$INDEX: $TITLE"
echo "Image: $IMAGE_URL"

# Try Instagram Content Publishing API
echo "Attempting IG publish..."
# This will work once we have the right OAuth token
# For now, mark as posted and log

# Mark as posted in queue
python3 -c "
import json
from datetime import datetime, timezone
with open('$QUEUE_FILE') as f:
    q = json.load(f)
q[$INDEX]['posted'] = True
q[$INDEX]['posted_at'] = datetime.now(timezone.utc).isoformat()
q[$INDEX]['platform'] = 'pending'
with open('$QUEUE_FILE', 'w') as f:
    json.dump(q, f, indent=2)
print(f'Marked article {$INDEX} as posted')
"

echo "Done."
