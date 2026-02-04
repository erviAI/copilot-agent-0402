#!/usr/bin/env python3
"""
Time Telling Script - Displays current time based on user's location.
No external dependencies required - uses only Python standard library.
"""

import datetime
import urllib.request
import json


def get_location_from_ip():
    """Get user's location and timezone info from their IP address."""
    try:
        # Use ip-api.com for geolocation (free, no API key required)
        # Request offset to calculate local time without needing tzdata
        url = "http://ip-api.com/json/?fields=status,message,country,city,timezone,offset"
        with urllib.request.urlopen(url, timeout=5) as response:
            data = json.loads(response.read().decode())
            
        if data.get("status") == "success":
            return {
                "city": data.get("city", "Unknown"),
                "country": data.get("country", "Unknown"),
                "timezone": data.get("timezone", "UTC"),
                "offset": data.get("offset", 0)  # Offset in seconds from UTC
            }
    except Exception as e:
        print(f"Warning: Could not detect location ({e}). Using UTC.")
    
    return {"city": "Unknown", "country": "Unknown", "timezone": "UTC", "offset": 0}


def get_time_with_offset(offset_seconds):
    """Get the current time adjusted by UTC offset (in seconds)."""
    # Get current UTC time (compatible with Python 3.11+)
    try:
        utc_now = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)
    except AttributeError:
        utc_now = datetime.datetime.utcnow()
    offset = datetime.timedelta(seconds=offset_seconds)
    return utc_now + offset


def format_offset(offset_seconds):
    """Format offset in seconds to +HH:MM or -HH:MM format."""
    sign = "+" if offset_seconds >= 0 else "-"
    total_minutes = abs(offset_seconds) // 60
    hours = total_minutes // 60
    minutes = total_minutes % 60
    return f"{sign}{hours:02d}:{minutes:02d}"


def tell_time(timezone_override=None, offset_override=None):
    """
    Tell the current time based on user's location.
    
    Args:
        timezone_override: Optional timezone name for display (e.g., 'America/New_York')
        offset_override: Optional UTC offset in seconds to override automatic detection
    
    Returns:
        dict with time information
    """
    if offset_override is not None:
        location = {
            "city": "Custom",
            "country": "Custom",
            "timezone": timezone_override or "Custom",
            "offset": offset_override
        }
    else:
        location = get_location_from_ip()
    
    current_time = get_time_with_offset(location["offset"])
    utc_offset_str = format_offset(location["offset"])
    
    result = {
        "city": location["city"],
        "country": location["country"],
        "timezone": location["timezone"],
        "current_time": current_time.strftime("%Y-%m-%d %H:%M:%S"),
        "date": current_time.strftime("%A, %B %d, %Y"),
        "time_12h": current_time.strftime("%I:%M:%S %p"),
        "time_24h": current_time.strftime("%H:%M:%S"),
        "utc_offset": utc_offset_str
    }
    
    return result


def display_time():
    """Display the current time with location information."""
    info = tell_time()
    
    print("=" * 50)
    print("Current Time Based on Your Location")
    print("=" * 50)
    print(f"Location: {info['city']}, {info['country']}")
    print(f"Timezone: {info['timezone']} (UTC{info['utc_offset']})")
    print("-" * 50)
    print(f"Date: {info['date']}")
    print(f"Time (12h): {info['time_12h']}")
    print(f"Time (24h): {info['time_24h']}")
    print("=" * 50)


if __name__ == "__main__":
    display_time()
