#!/bin/bash

# Get API key from .env
API_KEY=$(grep VITE_FIREBASE_API_KEY frontend/.env | cut -d'=' -f2)

if [ -z "$API_KEY" ]; then
  echo "Error: Could not find API key in frontend/.env"
  exit 1
fi

echo "🗑️  Deleting all Firebase Authentication users..."
echo ""

# User IDs from export
USER_IDS=(
  "2tzPELUF5MfpKihg7PPTVbnD5Wo1"
  "K7mAXYdpgOP8RXc9OV3tKjIOOKo1"
  "TsdE439bfNOf8esiGl4jwH6KhVl1"
  "jCRWYnAL9JO4Rs3mZU7TZlumtHv2"
)

DELETED=0
FAILED=0

for uid in "${USER_IDS[@]}"; do
  echo "Deleting user: $uid"
  
  RESPONSE=$(curl -s -X POST \
    "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=$API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"localId\":\"$uid\"}")
  
  if echo "$RESPONSE" | grep -q "error"; then
    echo "  ❌ Failed: $RESPONSE"
    ((FAILED++))
  else
    echo "  ✅ Deleted"
    ((DELETED++))
  fi
done

echo ""
echo "✅ Deleted $DELETED users"
if [ $FAILED -gt 0 ]; then
  echo "❌ Failed to delete $FAILED users"
fi

# Clean up export file
rm -f users.json
echo "🧹 Cleaned up users.json"
