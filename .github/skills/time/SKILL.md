---
name: time
description: Tell the current time based on user's location. Use when the user asks for the current time, what time it is, or needs to know the time in their timezone or a specific location.
---

# Tell Time

A skill that tells the current time based on the user's geographic location, automatically detecting their timezone from their IP address.

## Prerequisites

If `uv` is not installed, install it first:

- **Windows (winget):**
  ```powershell
  winget install --id=astral-sh.uv -e
  ```

- **Windows (PowerShell script):**
  ```powershell
  irm https://astral.sh/uv/install.ps1 | iex
  ```

- **macOS/Linux:**
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

## Instructions

1. Run the `tell_time.py` script to display the current time:
   ```bash
   cd .github/skills/time && uv run python tell_time.py
   ```

   > **Note:** You must run the script from the skill's directory so that `uv` can find the `pyproject.toml` with the required dependencies. Running from the workspace root (e.g., `uv run python .github/skills/time/tell_time.py`) will cause `uv` to miss the project's dependencies, and any packages not installed globally will fail to resolve.

2. The script will automatically:
   - Detect the user's location via IP geolocation
   - Determine their timezone
   - Display the current date and time in multiple formats

## Features

- **Auto-detection**: Automatically detects user's city, country, and timezone from IP
- **Multiple formats**: Shows time in both 12-hour and 24-hour formats
- **Fallback**: Defaults to UTC if location detection fails
- **No API key required**: Uses free ip-api.com service

## Programmatic Usage

You can also import the functions directly:

```python
from tell_time import tell_time, get_location_from_ip

# Get time info as a dictionary
info = tell_time()
print(info['time_12h'])  # e.g., "03:45:22 PM"

# Override with a specific UTC offset (in seconds)
# Example: UTC+2 = 7200 seconds
info = tell_time(timezone_override='Europe/Berlin', offset_override=7200)
```

## Example Output

```
==================================================
Current Time Based on Your Location
==================================================
Location: Amsterdam, Netherlands
Timezone: Europe/Amsterdam (UTC+01:00)
--------------------------------------------------
Date: Wednesday, November 26, 2025
Time (12h): 03:45:22 PM
Time (24h): 15:45:22
==================================================
```

## Requirements

- Python 3.x (no external dependencies needed)
- Internet connection (for IP geolocation)
